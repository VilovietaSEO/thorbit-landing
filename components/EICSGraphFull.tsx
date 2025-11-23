"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { X, Search, Loader2 } from "lucide-react";

const categoryColors: Record<string, string> = {
  services: "var(--primary)",
  materials: "var(--accent)",
  tools: "var(--high)",
  symptoms: "var(--medium)",
  causes: "var(--low)",
  systems: "var(--imp-high)",
  other: "var(--text-tertiary)",
};

export default function EICSGraphFull() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const simulationRef = useRef<d3.Simulation<any, any> | null>(null);

  const [graphData, setGraphData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set());

  // Load GeneSight data
  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch("/genesight-data.json");
        const data = await response.json();

        // Build edges from relationships
        const edges: any[] = [];
        data.nodes.forEach((node: any) => {
          const relationships = node.yaml_content?.relationships || {};

          // Process different relationship types
          ['solves', 'prevents', 'requires', 'relatedTo'].forEach(relType => {
            if (relationships[relType]) {
              relationships[relType].forEach((related: any) => {
                if (related.entity_id) {
                  edges.push({
                    source: node.id,
                    target: related.entity_id
                  });
                }
              });
            }
          });
        });

        setGraphData({ nodes: data.nodes, edges });
        setLoading(false);
      } catch (error) {
        console.error("Error loading graph data:", error);
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const categories = graphData ? [...new Set(graphData.nodes.map((n: any) => n.category))] : [];

  useEffect(() => {
    if (!graphData || !svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Clear existing
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const g = svg.append("g");

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    // Filter data
    let filteredNodes = graphData.nodes.filter((node: any) => {
      if (searchTerm && !node.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (activeCategories.size > 0 && !activeCategories.has(node.category)) {
        return false;
      }
      return true;
    });

    const filteredNodeIds = new Set(filteredNodes.map((n: any) => n.id));
    const filteredEdges = graphData.edges.filter((edge: any) =>
      filteredNodeIds.has(edge.source) && filteredNodeIds.has(edge.target)
    );

    // Create force simulation
    const simulation = d3.forceSimulation(filteredNodes as any)
      .force("link", d3.forceLink(filteredEdges).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(30));

    simulationRef.current = simulation;

    // Draw links
    const link = g.append("g")
      .selectAll("line")
      .data(filteredEdges)
      .join("line")
      .attr("stroke", "var(--accent)")
      .attr("stroke-opacity", 0.25)
      .attr("stroke-width", 1.5);

    // Draw nodes
    const node = g.append("g")
      .selectAll("g")
      .data(filteredNodes)
      .join("g")
      .style("cursor", "pointer")
      .call(d3.drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any)
      .on("click", (event, d: any) => {
        event.stopPropagation();
        setSelectedNode(d);
      });

    // Add circles
    node.append("circle")
      .attr("r", (d: any) => {
        const connections = filteredEdges.filter((e: any) =>
          e.source === d.id || e.target === d.id
        ).length;
        return Math.max(6, Math.min(16, 6 + connections * 0.4));
      })
      .attr("fill", (d: any) => categoryColors[d.category] || categoryColors.other)
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("opacity", 0.9);

    // Add labels (only for tier 1 nodes)
    node.filter((d: any) => d.tier === 1)
      .append("text")
      .text((d: any) => d.name.substring(0, 20))
      .attr("x", 12)
      .attr("y", 4)
      .attr("font-size", "11px")
      .attr("fill", "var(--text-secondary)")
      .attr("font-weight", "500")
      .style("pointer-events", "none");

    // Hover effects
    node.on("mouseenter", function() {
      d3.select(this).select("circle")
        .transition()
        .duration(150)
        .attr("stroke-width", 3)
        .attr("opacity", 1);
    });

    node.on("mouseleave", function() {
      d3.select(this).select("circle")
        .transition()
        .duration(150)
        .attr("stroke-width", 2)
        .attr("opacity", 0.9);
    });

    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Click background to deselect
    svg.on("click", (event) => {
      if (event.target === event.currentTarget) {
        setSelectedNode(null);
      }
    });

    // Drag functions
    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [graphData, searchTerm, activeCategories]);

  const toggleCategory = (category: string) => {
    setActiveCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const getConnections = (nodeId: string) => {
    if (!graphData) return 0;
    return graphData.edges.filter((e: any) =>
      e.source === nodeId || e.target === nodeId ||
      e.source.id === nodeId || e.target.id === nodeId
    ).length;
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-bg-secondary rounded-2xl">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
          <p className="text-text-secondary">Loading GeneSight graph...</p>
        </div>
      </div>
    );
  }

  if (!graphData) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-bg-secondary rounded-2xl">
        <p className="text-text-secondary">Failed to load graph data</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full bg-bg-primary rounded-2xl border border-border overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-80 flex flex-col bg-white border-r border-border-light">
        {/* Header */}
        <div className="p-5 border-b border-border-light">
          <h3 className="text-lg font-black text-text-primary">GeneSight EICS</h3>
          <p className="text-sm text-text-secondary font-light mt-1">{graphData.nodes.length} entities</p>
        </div>

        {/* Search */}
        <div className="p-5 border-b border-border-light">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search entities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="p-5 border-b border-border-light">
          <h4 className="text-xs font-semibold text-text-tertiary uppercase mb-3">Categories</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat: string) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${
                  activeCategories.has(cat)
                    ? 'text-white'
                    : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
                }`}
                style={activeCategories.has(cat) ? {
                  backgroundColor: categoryColors[cat] || categoryColors.other,
                } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Entity Details */}
        <div className="flex-1 overflow-y-auto p-5">
          {selectedNode ? (
            <div>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-text-primary pr-2">{selectedNode.name}</h3>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-1 hover:bg-bg-secondary rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-text-tertiary mb-1">
                    <span className="font-medium">Category:</span> <span className="capitalize">{selectedNode.category}</span>
                  </p>
                  <p className="text-text-tertiary mb-1">
                    <span className="font-medium">Type:</span> {selectedNode.yaml_content?.type || 'N/A'}
                  </p>
                  <p className="text-text-tertiary mb-1">
                    <span className="font-medium">Tier:</span> {selectedNode.tier}
                  </p>
                  <p className="text-text-tertiary mb-1">
                    <span className="font-medium">Importance:</span> {selectedNode.importance}
                  </p>
                  <p className="text-text-tertiary">
                    <span className="font-medium">Connections:</span> {getConnections(selectedNode.id)}
                  </p>
                </div>

                {selectedNode.yaml_content?.initial_description && (
                  <div>
                    <h4 className="font-semibold text-text-primary mb-2">Description</h4>
                    <p className="text-text-secondary font-light leading-relaxed">
                      {selectedNode.yaml_content.initial_description}
                    </p>
                  </div>
                )}

                {selectedNode.yaml_content?.keywords && selectedNode.yaml_content.keywords.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-text-primary mb-2">Keywords</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedNode.yaml_content.keywords.slice(0, 5).map((kw: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-bg-secondary rounded text-xs text-text-secondary">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedNode.yaml_content?.relationships && (
                  <div>
                    <h4 className="font-semibold text-text-primary mb-2">Relationships</h4>
                    {Object.entries(selectedNode.yaml_content.relationships).map(([relType, entities]: [string, any]) => (
                      entities && entities.length > 0 && (
                        <div key={relType} className="mb-2">
                          <p className="text-xs font-medium text-text-tertiary capitalize mb-1">{relType}:</p>
                          <ul className="space-y-1 pl-2">
                            {entities.slice(0, 3).map((entity: any, i: number) => (
                              <li key={i} className="text-xs text-text-secondary">
                                • {entity.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-tertiary font-light">Click on a node to see details</p>
            </div>
          )}
        </div>
      </div>

      {/* Graph Container */}
      <div ref={containerRef} className="flex-1 relative bg-bg-secondary/30">
        <svg ref={svgRef} className="w-full h-full" />

        {/* Controls hint */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 border border-border-light text-xs text-text-tertiary">
          Scroll to zoom • Drag to pan • Click nodes for details
        </div>

        {/* Stats */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 border border-border-light text-xs">
          <p className="text-text-primary font-medium">
            {graphData.nodes.filter((n: any) => {
              if (searchTerm && !n.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
              if (activeCategories.size > 0 && !activeCategories.has(n.category)) return false;
              return true;
            }).length} / {graphData.nodes.length} entities shown
          </p>
        </div>
      </div>
    </div>
  );
}
