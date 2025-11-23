"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { X, Search } from "lucide-react";

// Enhanced demo data with full entity details
const demoData = {
  nodes: [
    // Services
    { id: "emergency-plumbing", name: "Emergency Plumbing", category: "Services", tier: 1, coverage: "high", importance: "critical", type: "service", description: "24/7 emergency plumbing services for urgent repairs and water damage prevention.", relatedTo: ["sewer-system", "leak-detection"] },
    { id: "drain-cleaning", name: "Drain Cleaning", category: "Services", tier: 1, coverage: "high", importance: "high", type: "service", description: "Professional drain cleaning to remove clogs and restore proper water flow.", relatedTo: ["snake-auger", "sewer-system"] },
    { id: "water-heater-repair", name: "Water Heater Repair", category: "Services", tier: 1, coverage: "medium", importance: "high", type: "service", description: "Expert repair and maintenance for all types of water heaters.", relatedTo: ["tankless-water-heater"] },
    { id: "pipe-repair", name: "Pipe Repair", category: "Services", tier: 2, coverage: "medium", importance: "medium", type: "service", description: "Pipe repair and replacement services for residential and commercial properties.", relatedTo: ["pipe-wrench", "corrosion"] },
    { id: "leak-detection", name: "Leak Detection", category: "Services", tier: 2, coverage: "low", importance: "medium", type: "service", description: "Advanced leak detection using thermal imaging and acoustic equipment.", relatedTo: ["camera-inspection"] },

    // Systems
    { id: "tankless-water-heater", name: "Tankless Water Heater", category: "Systems", tier: 1, coverage: "high", importance: "high", type: "system", description: "Energy-efficient tankless water heating systems that provide endless hot water.", relatedTo: ["water-heater-repair"] },
    { id: "sewer-system", name: "Sewer System", category: "Systems", tier: 1, coverage: "medium", importance: "critical", type: "system", description: "Complete sewer line inspection, repair, and replacement services.", relatedTo: ["emergency-plumbing", "drain-cleaning"] },
    { id: "water-filtration", name: "Water Filtration", category: "Systems", tier: 2, coverage: "low", importance: "medium", type: "system", description: "Whole-house water filtration systems for clean, safe drinking water.", relatedTo: ["water-discoloration"] },

    // Tools
    { id: "pipe-wrench", name: "Pipe Wrench", category: "Tools", tier: 2, coverage: "medium", importance: "low", type: "tool", description: "Essential tool for gripping and turning pipes during installation and repair.", relatedTo: ["pipe-repair"] },
    { id: "snake-auger", name: "Snake Auger", category: "Tools", tier: 2, coverage: "high", importance: "medium", type: "tool", description: "Professional drain snake for clearing tough clogs in pipes and drains.", relatedTo: ["drain-cleaning"] },
    { id: "camera-inspection", name: "Camera Inspection", category: "Tools", tier: 3, coverage: "low", importance: "medium", type: "tool", description: "Video camera inspection to identify issues inside pipes and drains.", relatedTo: ["leak-detection", "emergency-plumbing"] },

    // Symptoms
    { id: "slow-drain", name: "Slow Drain", category: "Symptoms", tier: 1, coverage: "high", importance: "medium", type: "symptom", description: "Water draining slowly indicates a partial clog or buildup in pipes.", relatedTo: ["drain-cleaning", "clogged-pipe"] },
    { id: "no-hot-water", name: "No Hot Water", category: "Symptoms", tier: 1, coverage: "medium", importance: "high", type: "symptom", description: "Lack of hot water can indicate water heater failure or mineral buildup.", relatedTo: ["water-heater-repair", "mineral-buildup"] },
    { id: "low-water-pressure", name: "Low Water Pressure", category: "Symptoms", tier: 2, coverage: "low", importance: "medium", type: "symptom", description: "Reduced water pressure may be caused by leaks, corrosion, or clogs.", relatedTo: ["pipe-repair", "corrosion"] },
    { id: "water-discoloration", name: "Water Discoloration", category: "Symptoms", tier: 3, coverage: "low", importance: "low", type: "symptom", description: "Brown or yellow water indicates rust, sediment, or pipe corrosion.", relatedTo: ["water-filtration", "mineral-buildup"] },

    // Causes
    { id: "clogged-pipe", name: "Clogged Pipe", category: "Causes", tier: 2, coverage: "medium", importance: "medium", type: "cause", description: "Buildup of debris, grease, or foreign objects causing blockage.", relatedTo: ["slow-drain"] },
    { id: "corrosion", name: "Corrosion", category: "Causes", tier: 2, coverage: "low", importance: "high", type: "cause", description: "Pipe corrosion from age, water chemistry, or galvanic reaction.", relatedTo: ["low-water-pressure"] },
    { id: "mineral-buildup", name: "Mineral Buildup", category: "Causes", tier: 3, coverage: "low", importance: "medium", type: "cause", description: "Hard water minerals accumulating in pipes and water heaters.", relatedTo: ["no-hot-water", "water-discoloration"] },
  ],
  edges: [
    { source: "emergency-plumbing", target: "sewer-system" },
    { source: "water-heater-repair", target: "tankless-water-heater" },
    { source: "drain-cleaning", target: "sewer-system" },
    { source: "drain-cleaning", target: "snake-auger" },
    { source: "leak-detection", target: "camera-inspection" },
    { source: "pipe-repair", target: "pipe-wrench" },
    { source: "slow-drain", target: "drain-cleaning" },
    { source: "no-hot-water", target: "water-heater-repair" },
    { source: "low-water-pressure", target: "pipe-repair" },
    { source: "water-discoloration", target: "water-filtration" },
    { source: "clogged-pipe", target: "slow-drain" },
    { source: "mineral-buildup", target: "no-hot-water" },
    { source: "corrosion", target: "low-water-pressure" },
    { source: "mineral-buildup", target: "water-discoloration" },
    { source: "snake-auger", target: "drain-cleaning" },
    { source: "camera-inspection", target: "emergency-plumbing" },
  ]
};

const categoryColors: Record<string, string> = {
  Services: "var(--primary)",
  Systems: "var(--accent)",
  Tools: "var(--high)",
  Symptoms: "var(--medium)",
  Causes: "var(--low)",
};

const coverageColors: Record<string, string> = {
  high: "var(--high)",
  medium: "var(--medium)",
  low: "var(--low)",
};

export default function EICSGraphFull() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const simulationRef = useRef<d3.Simulation<any, any> | null>(null);

  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set());

  const categories = ["Services", "Systems", "Tools", "Symptoms", "Causes"];

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

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

    // Filter data based on search and categories
    let filteredNodes = demoData.nodes.filter(node => {
      if (searchTerm && !node.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (activeCategories.size > 0 && !activeCategories.has(node.category)) {
        return false;
      }
      return true;
    });

    const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
    const filteredEdges = demoData.edges.filter(edge =>
      filteredNodeIds.has(edge.source as string) && filteredNodeIds.has(edge.target as string)
    );

    // Create force simulation
    const simulation = d3.forceSimulation(filteredNodes as any)
      .force("link", d3.forceLink(filteredEdges).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(30));

    simulationRef.current = simulation;

    // Draw links
    const link = g.append("g")
      .selectAll("line")
      .data(filteredEdges)
      .join("line")
      .attr("stroke", "var(--accent)")
      .attr("stroke-opacity", 0.3)
      .attr("stroke-width", 2);

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
      .attr("r", (d: any) => d.tier === 1 ? 14 : d.tier === 2 ? 10 : 8)
      .attr("fill", (d: any) => coverageColors[d.coverage] || "var(--text-tertiary)")
      .attr("stroke", (d: any) => categoryColors[d.category] || "var(--border)")
      .attr("stroke-width", 3);

    // Add labels
    node.append("text")
      .text((d: any) => d.name)
      .attr("x", 18)
      .attr("y", 4)
      .attr("font-size", "12px")
      .attr("fill", "var(--text-secondary)")
      .attr("font-weight", "400")
      .style("pointer-events", "none");

    // Hover effects
    node.on("mouseenter", function() {
      d3.select(this).select("circle")
        .transition()
        .duration(200)
        .attr("r", (d: any) => (d.tier === 1 ? 14 : d.tier === 2 ? 10 : 8) * 1.4)
        .attr("stroke-width", 4);

      d3.select(this).select("text")
        .attr("fill", "var(--text-primary)")
        .attr("font-weight", "600");
    });

    node.on("mouseleave", function() {
      d3.select(this).select("circle")
        .transition()
        .duration(200)
        .attr("r", (d: any) => d.tier === 1 ? 14 : d.tier === 2 ? 10 : 8)
        .attr("stroke-width", 3);

      d3.select(this).select("text")
        .attr("fill", "var(--text-secondary)")
        .attr("font-weight", "400");
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
  }, [searchTerm, activeCategories]);

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
    return demoData.edges.filter(e =>
      (e.source as any) === nodeId || (e.target as any) === nodeId
    ).length;
  };

  return (
    <div className="flex h-full w-full bg-bg-primary rounded-2xl border border-border overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-80 flex flex-col bg-white border-r border-border-light">
        {/* Header */}
        <div className="p-5 border-b border-border-light">
          <h3 className="text-lg font-black text-text-primary">EICS Graph Demo</h3>
          <p className="text-sm text-text-secondary font-light mt-1">{demoData.nodes.length} entities</p>
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
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  activeCategories.has(cat)
                    ? 'text-white'
                    : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
                }`}
                style={activeCategories.has(cat) ? {
                  backgroundColor: categoryColors[cat],
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
                    <span className="font-medium">Category:</span> {selectedNode.category}
                  </p>
                  <p className="text-text-tertiary mb-1">
                    <span className="font-medium">Type:</span> {selectedNode.type}
                  </p>
                  <p className="text-text-tertiary mb-1">
                    <span className="font-medium">Tier:</span> {selectedNode.tier}
                  </p>
                  <p className="text-text-tertiary mb-1">
                    <span className="font-medium">Importance:</span> {selectedNode.importance}
                  </p>
                  <p className="text-text-tertiary mb-1">
                    <span className="font-medium">Coverage:</span> {selectedNode.coverage}
                  </p>
                  <p className="text-text-tertiary">
                    <span className="font-medium">Connections:</span> {getConnections(selectedNode.id)}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-text-primary mb-2">Description</h4>
                  <p className="text-text-secondary font-light leading-relaxed">
                    {selectedNode.description}
                  </p>
                </div>

                {selectedNode.relatedTo && selectedNode.relatedTo.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-text-primary mb-2">Related Entities</h4>
                    <ul className="space-y-1">
                      {selectedNode.relatedTo.map((id: string) => {
                        const related = demoData.nodes.find(n => n.id === id);
                        return related ? (
                          <li key={id}>
                            <button
                              onClick={() => setSelectedNode(related)}
                              className="text-primary hover:underline text-sm"
                            >
                              {related.name}
                            </button>
                          </li>
                        ) : null;
                      })}
                    </ul>
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
      </div>
    </div>
  );
}
