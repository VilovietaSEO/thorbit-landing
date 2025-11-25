"use client";

import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import GraphControls from "./GraphControls";
import GraphSidebar from "./GraphSidebar";
import { Loader2, AlertCircle } from "lucide-react";

interface Filters {
  categories: Set<string>;
  tiers: Set<number>;
  searchTerm: string;
}

// Category colors - using globals.css design system (Mocha Mousse + warm palette)
const categoryColors: Record<string, string> = {
  // Primary categories from GeneSight EICS data (mapped to design system)
  services: "#C4704F",              // --primary: Mocha Mousse/burnt orange
  systems_processes: "#C97A52",     // --imp-high: Warm orange
  tools_materials: "#6B9B5A",       // --high: Olive sage green
  symptoms_conditions: "#C4695A",   // --low: Warm brick red
  causes_triggers: "#B85A4A",       // --critical: Deep warm red
  brands_products: "#D9A854",       // --accent: Golden honey/amber
  governance_compliance: "#7FA9B3", // --secondary: Serene blue

  // Legacy/fallback category names (for compatibility)
  systems: "#C97A52",               // --imp-high
  tools: "#6B9B5A",                 // --high
  materials: "#D9A854",             // --accent
  symptoms: "#C4695A",              // --low
  causes: "#B85A4A",                // --critical
  processes: "#C97A52",             // --imp-high
  locations: "#7FA9B3",             // --secondary
  other: "#9B8F83"                  // --text-tertiary: Warm taupe
};

// Calculate node size based on entity tier (matches production)
function calculateNodeSize(tier: number): number {
  const sizeMap: Record<number, number> = {
    1: 24,  // Tier 1: core entities - largest
    2: 16,  // Tier 2: supporting entities
    3: 8    // Tier 3: peripheral entities - smallest
  };
  return sizeMap[tier] || 12;
}

export default function EICSGraphFull() {
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<d3.Simulation<any, any> | null>(null);

  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [filters, setFilters] = useState<Filters>({
    categories: new Set(),
    tiers: new Set(),
    searchTerm: ""
  });
  const [graphData, setGraphData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load and transform data
  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch("/genesight-data.json");
        const rawData = await response.json();

        // Build edges from relationships
        const edges: any[] = [];
        rawData.nodes.forEach((node: any) => {
          const relationships = node.yaml_content?.relationships || {};
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

        // Calculate connection counts for each node
        const connectionCounts = new Map<string, number>();
        edges.forEach(edge => {
          connectionCounts.set(edge.source, (connectionCounts.get(edge.source) || 0) + 1);
          connectionCounts.set(edge.target, (connectionCounts.get(edge.target) || 0) + 1);
        });

        // Transform nodes to match production structure
        const transformedNodes = rawData.nodes.map((node: any) => {
          const connections = connectionCounts.get(node.id) || 0;
          const size = calculateNodeSize(node.tier || 3);  // Tier-based sizing like production
          const color = categoryColors[node.category] || categoryColors.other;

          // Extract metadata from yaml_content
          const yamlContent = node.yaml_content || {};

          return {
            ...node,
            size,
            color,
            connections,
            metadata: {
              ...yamlContent,
              keywords: yamlContent.keywords || [],
              synonyms: yamlContent.synonyms || [],
              relationships: yamlContent.relationships || {},
              description: yamlContent.initial_description || '',
              type: yamlContent.type || 'Unknown'
            },
            coverage: {
              high: 0,
              medium: 0,
              low: 0,
              total: 0
            }
          };
        });

        // Build metadata for filters
        const categories = new Map<string, { id: string; name: string; color: string; count: number }>();
        const tiers = new Map<number, { tier: number; count: number }>();

        transformedNodes.forEach((node: any) => {
          // Categories
          if (!categories.has(node.category)) {
            categories.set(node.category, {
              id: node.category,
              name: node.category.charAt(0).toUpperCase() + node.category.slice(1),
              color: node.color,
              count: 0
            });
          }
          categories.get(node.category)!.count++;

          // Tiers
          if (!tiers.has(node.tier)) {
            tiers.set(node.tier, { tier: node.tier, count: 0 });
          }
          tiers.get(node.tier)!.count++;
        });

        const transformedData = {
          graph: {
            nodes: transformedNodes,
            edges
          },
          metadata: {
            categories: Array.from(categories.values()).sort((a, b) => a.name.localeCompare(b.name)),
            tiers: Array.from(tiers.values()).sort((a, b) => a.tier - b.tier)
          },
          stats: {
            totalNodes: transformedNodes.length,
            totalEdges: edges.length,
            categories: categories.size
          }
        };

        setGraphData(transformedData);
        setLoading(false);
      } catch (err) {
        console.error("Error loading graph data:", err);
        setError(String(err));
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Render graph when data or filters change
  useEffect(() => {
    if (graphData && svgRef.current) {
      renderGraph(graphData, filters);
    }
  }, [graphData, filters]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
    };
  }, []);

  // Handle clicking on a related entity in the sidebar
  function handleNodeClick(nodeId: string) {
    const node = graphData?.graph.nodes.find((n: any) => n.id === nodeId);
    if (node) {
      setSelectedNode(node);
    }
  }

  function renderGraph(data: any, filters: Filters) {
    // Filter nodes
    let filteredNodes = data.graph.nodes.filter((node: any) => {
      if (filters.categories.size > 0 && !filters.categories.has(node.category)) {
        return false;
      }
      if (filters.tiers.size > 0 && !filters.tiers.has(node.tier)) {
        return false;
      }
      if (filters.searchTerm && !node.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }
      return true;
    });

    const filteredNodeIds = new Set(filteredNodes.map((n: any) => n.id));

    // Make deep copy of edges
    const filteredEdges = data.graph.edges
      .filter((edge: any) =>
        filteredNodeIds.has(edge.source) && filteredNodeIds.has(edge.target)
      )
      .map((edge: any) => ({
        ...edge,
        source: edge.source,
        target: edge.target
      }));

    // Remove isolated nodes
    const connectedNodeIds = new Set<string>();
    filteredEdges.forEach((edge: any) => {
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    });

    filteredNodes = filteredNodes.filter((node: any) => connectedNodeIds.has(node.id));

    // Clear existing SVG
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = svgRef.current!.clientWidth;
    const height = svgRef.current!.clientHeight;

    // Create zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom as any);

    // Create container group for zoom
    const g = svg.append("g");

    // Start zoomed out to show entire graph - center and scale down
    const initialScale = 0.55;
    const initialX = width * (1 - initialScale) / 2;
    const initialY = height * (1 - initialScale) / 2;
    svg.call(
      zoom.transform as any,
      d3.zoomIdentity.translate(initialX, initialY).scale(initialScale)
    );

    // Calculate category foci - GRID LAYOUT with proportional spacing for distinct clusters
    const categories = Array.from(new Set(filteredNodes.map((n: any) => n.category))) as string[];
    const categoryFociMap: { [key: string]: { x: number; y: number } } = {};
    const cols = Math.ceil(Math.sqrt(categories.length));
    const rows = Math.ceil(categories.length / cols);

    // Proportional spacing based on container size (fills ~90% of available space)
    const spacingX = (width * 0.9) / cols;
    const spacingY = (height * 0.9) / rows;
    const minSpacing = Math.min(spacingX, spacingY);
    const gridWidth = cols * minSpacing;
    const gridHeight = rows * minSpacing;
    const offsetX = (width - gridWidth) / 2;
    const offsetY = (height - gridHeight) / 2;

    categories.forEach((cat: string, i: number) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      categoryFociMap[cat] = {
        x: offsetX + (col + 0.5) * minSpacing,
        y: offsetY + (row + 0.5) * minSpacing
      };
    });

    // Initialize nodes near their category centers
    filteredNodes.forEach((node: any) => {
      const focus = categoryFociMap[node.category];
      if (focus) {
        node.x = focus.x + (Math.random() - 0.5) * 60;
        node.y = focus.y + (Math.random() - 0.5) * 60;
      } else {
        node.x = width / 2 + (Math.random() - 0.5) * 100;
        node.y = height / 2 + (Math.random() - 0.5) * 100;
      }
    });

    // Custom cluster force - pulls nodes toward their category centers
    function forceCluster() {
      let nodes: any[];
      let strength = 0.9; // VERY STRONG pull to category center

      function force(alpha: number) {
        nodes.forEach((d: any) => {
          const focus = categoryFociMap[d.category];
          if (focus) {
            d.vx += (focus.x - d.x) * strength * alpha;
            d.vy += (focus.y - d.y) * strength * alpha;
          }
        });
      }

      force.initialize = (_: any) => nodes = _;
      force.strength = (_?: number) => _ == null ? strength : (strength = _, force);

      return force;
    }

    // Create force simulation - DISTINCT CLUSTERS, NO OVERLAP (matches production)
    const simulation = d3.forceSimulation(filteredNodes)
      .force("link", d3.forceLink(filteredEdges)
        .id((d: any) => d.id)
        .distance(100)       // Shorter links
        .strength(0.02)      // VERY WEAK: almost ignore cross-category links
      )
      .force("charge", d3.forceManyBody()
        .strength(-150)      // WEAKER: don't push nodes away from their cluster
        .distanceMax(400)    // SHORTER: only affect nearby nodes
      )
      .force("collision", d3.forceCollide()
        .radius((d: any) => d.size + 30)  // More padding to prevent overlap
        .strength(1.0)       // MAX STRENGTH: hard collision detection
        .iterations(3)       // Multiple iterations for better collision
      )
      .force("cluster", forceCluster().strength(0.9) as any)  // EXTREME: very strong pull to category center
      .alphaDecay(0.01)        // VERY SLOW: lots of time to settle into clusters
      .velocityDecay(0.3)      // MORE FREEDOM: let nodes move to clusters
      .alpha(1)
      .alphaTarget(0)
      .stop();

    // Pre-compute positions so graph appears stable on load
    for (let i = 0; i < 1000; ++i) simulation.tick();

    // Start with very low alpha - graph appears settled, only reacts to interaction
    simulation
      .alpha(0.01)          // Nearly settled - minimal movement on load
      .alphaTarget(0)
      .alphaDecay(0.02)
      .restart();

    simulationRef.current = simulation;

    // Create links
    const link = g.append("g")
      .selectAll("line")
      .data(filteredEdges)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.3)
      .attr("stroke-width", 1)
      .attr("class", "graph-link");

    // Add labels - ALWAYS VISIBLE
    const label = g.append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(filteredNodes)
      .join("text")
      .attr("text-anchor", "middle")
      .attr("dy", (d: any) => d.size + 16)
      .style("font-size", "11px")
      .style("font-weight", "600")
      .style("pointer-events", "none")
      .style("fill", "#374151")
      .style("stroke", "#ffffff")
      .style("stroke-width", "3px")
      .style("paint-order", "stroke")
      .text((d: any) => d.name);

    // Store original edges for highlighting
    const originalEdges = filteredEdges.map((e: any) => ({
      source: typeof e.source === 'object' ? e.source.id : e.source,
      target: typeof e.target === 'object' ? e.target.id : e.target
    }));

    // Highlight connections
    function highlightConnections(selectedId: string | null) {
      if (!selectedId) {
        node
          .attr("opacity", 1)
          .attr("stroke-width", 2)
          .attr("stroke", "#fff")
          .style("filter", "none");

        link
          .attr("stroke", "#999")
          .attr("stroke-opacity", 0.3)
          .attr("stroke-width", 1);

        label
          .attr("opacity", 1);

        return;
      }

      // Get connected node IDs
      const connectedIds = new Set<string>();
      connectedIds.add(selectedId);

      originalEdges.forEach((edge: any) => {
        if (edge.source === selectedId) {
          connectedIds.add(edge.target);
        }
        if (edge.target === selectedId) {
          connectedIds.add(edge.source);
        }
      });

      // Dim non-connected nodes
      node
        .attr("opacity", (d: any) => connectedIds.has(d.id) ? 1 : 0.15)
        .attr("stroke-width", (d: any) => d.id === selectedId ? 6 : 2)
        .attr("stroke", (d: any) => d.id === selectedId ? "#FFD700" : "#fff")
        .style("filter", (d: any) => d.id === selectedId ? "drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))" : "none");

      // Highlight connected edges
      link
        .attr("stroke", (d: any, i: number) => {
          const edge = originalEdges[i];
          return (edge.source === selectedId || edge.target === selectedId) ? "#FFD700" : "#999";
        })
        .attr("stroke-opacity", (d: any, i: number) => {
          const edge = originalEdges[i];
          return (edge.source === selectedId || edge.target === selectedId) ? 0.8 : 0.1;
        })
        .attr("stroke-width", (d: any, i: number) => {
          const edge = originalEdges[i];
          return (edge.source === selectedId || edge.target === selectedId) ? 3 : 1;
        });

      // Dim non-connected labels
      label
        .attr("opacity", (d: any) => connectedIds.has(d.id) ? 1 : 0.15);
    }

    // Track drag vs click
    let dragStartPos = { x: 0, y: 0 };
    let hasDragged = false;

    // Create nodes
    const node = g.append("g")
      .selectAll("circle")
      .data(filteredNodes)
      .join("circle")
      .attr("r", (d: any) => d.size)
      .attr("fill", (d: any) => d.color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .on("click", (event: any, d: any) => {
        if (!hasDragged) {
          event.stopPropagation();

          // Toggle selection
          if (selectedNode && selectedNode.id === d.id) {
            setSelectedNode(null);
            highlightConnections(null);
          } else {
            setSelectedNode(d);
            highlightConnections(d.id);
          }
        }
        hasDragged = false;
      })
      .on("mouseenter", function(event: any, d: any) {
        if (!selectedNode || selectedNode.id !== d.id) {
          d3.select(this)
            .attr("stroke-width", 4)
            .attr("stroke", "#FFD700");
        }
      })
      .on("mouseleave", function(event: any, d: any) {
        if (!selectedNode || selectedNode.id !== d.id) {
          d3.select(this)
            .attr("stroke-width", 2)
            .attr("stroke", "#fff");
        }
      })
      .call(d3.drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any
      );

    // Update positions on tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);

      label
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y);
    });

    // Drag functions - SMOOTH with simulation restart for bouncy effect (matches production)
    function dragstarted(event: any, d: any) {
      dragStartPos = { x: event.x, y: event.y };
      hasDragged = false;
      if (!event.active) {
        // Heat up simulation for bouncy drag - slower decay for sustained interaction
        simulation
          .alphaDecay(0.01)      // Slow decay during drag for sustained bounciness
          .alphaTarget(0.15)
          .restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      // Check if we've moved more than 5 pixels (threshold for "dragging")
      const dx = event.x - dragStartPos.x;
      const dy = event.y - dragStartPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 5) {
        hasDragged = true;
      }

      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) {
        // Cool down simulation - faster decay to settle quickly
        simulation
          .alphaDecay(0.02)
          .alphaTarget(0);
      }
      // Keep node pinned where user dragged it
      d.fx = event.x;
      d.fy = event.y;
    }

    // Clear selection on background click
    svg.on("click", () => {
      setSelectedNode(null);
      highlightConnections(null);
    });
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <p className="text-text-secondary">Loading knowledge graph...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <AlertCircle className="h-12 w-12 text-low mb-4" />
        <p className="text-text-primary font-semibold mb-2">Failed to Load Graph</p>
        <p className="text-text-secondary">{error}</p>
      </div>
    );
  }

  if (!graphData) return null;

  return (
    <div className="relative h-full">
      <div className="flex gap-6 h-full">
        {/* Left Panel: Controls Only */}
        <div className="w-80 flex flex-col gap-4 overflow-y-auto">
          <GraphControls
            graphData={graphData}
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>

        {/* Right Panel: Graph Canvas */}
        <div className="flex-1 flex flex-col">
          {/* Stats Bar */}
          <div className="flex gap-6 mb-4 text-sm text-text-secondary">
            <div>Nodes: <span className="font-semibold text-text-primary">{graphData.stats.totalNodes}</span></div>
            <div>Edges: <span className="font-semibold text-text-primary">{graphData.stats.totalEdges}</span></div>
            <div>Categories: <span className="font-semibold text-text-primary">{graphData.stats.categories}</span></div>
          </div>

          {/* SVG Canvas */}
          <svg
            ref={svgRef}
            className="w-full flex-1 bg-bg-secondary rounded-lg border border-border-light"
            style={{ boxShadow: 'var(--shadow)' }}
          />
        </div>
      </div>

      {/* Modal Overlay for Entity Details */}
      {selectedNode && (
        <>
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm z-40 rounded-lg"
            onClick={() => setSelectedNode(null)}
          />

          {/* Modal - sized to match container */}
          <div className="absolute inset-0 flex items-center justify-center z-50 p-6">
            <div className="bg-white w-full max-w-2xl h-full rounded-lg overflow-y-auto border-2 border-border-light" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <GraphSidebar
                node={selectedNode}
                onClose={() => setSelectedNode(null)}
                onNodeClick={handleNodeClick}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
