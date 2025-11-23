"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

// Demo data - simplified EICS graph for landing page
const demoData = {
  nodes: [
    // Services (primary color)
    { id: "emergency-plumbing", name: "Emergency Plumbing", category: "Services", tier: 1, coverage: "high" },
    { id: "drain-cleaning", name: "Drain Cleaning", category: "Services", tier: 1, coverage: "high" },
    { id: "water-heater-repair", name: "Water Heater Repair", category: "Services", tier: 1, coverage: "medium" },
    { id: "pipe-repair", name: "Pipe Repair", category: "Services", tier: 2, coverage: "medium" },
    { id: "leak-detection", name: "Leak Detection", category: "Services", tier: 2, coverage: "low" },

    // Systems (secondary color)
    { id: "tankless-water-heater", name: "Tankless Water Heater", category: "Systems", tier: 1, coverage: "high" },
    { id: "sewer-system", name: "Sewer System", category: "Systems", tier: 1, coverage: "medium" },
    { id: "water-filtration", name: "Water Filtration", category: "Systems", tier: 2, coverage: "low" },

    // Tools (high color)
    { id: "pipe-wrench", name: "Pipe Wrench", category: "Tools", tier: 2, coverage: "medium" },
    { id: "snake-auger", name: "Snake Auger", category: "Tools", tier: 2, coverage: "high" },
    { id: "camera-inspection", name: "Camera Inspection", category: "Tools", tier: 3, coverage: "low" },

    // Symptoms (medium color)
    { id: "slow-drain", name: "Slow Drain", category: "Symptoms", tier: 1, coverage: "high" },
    { id: "no-hot-water", name: "No Hot Water", category: "Symptoms", tier: 1, coverage: "medium" },
    { id: "low-water-pressure", name: "Low Water Pressure", category: "Symptoms", tier: 2, coverage: "low" },
    { id: "water-discoloration", name: "Water Discoloration", category: "Symptoms", tier: 3, coverage: "low" },

    // Causes (low color)
    { id: "clogged-pipe", name: "Clogged Pipe", category: "Causes", tier: 2, coverage: "medium" },
    { id: "corrosion", name: "Corrosion", category: "Causes", tier: 2, coverage: "low" },
    { id: "mineral-buildup", name: "Mineral Buildup", category: "Causes", tier: 3, coverage: "low" },
  ],
  edges: [
    // Service to System connections
    { source: "emergency-plumbing", target: "sewer-system" },
    { source: "water-heater-repair", target: "tankless-water-heater" },
    { source: "drain-cleaning", target: "sewer-system" },

    // Service to Tool connections
    { source: "drain-cleaning", target: "snake-auger" },
    { source: "leak-detection", target: "camera-inspection" },
    { source: "pipe-repair", target: "pipe-wrench" },

    // Symptom to Service connections
    { source: "slow-drain", target: "drain-cleaning" },
    { source: "no-hot-water", target: "water-heater-repair" },
    { source: "low-water-pressure", target: "pipe-repair" },
    { source: "water-discoloration", target: "water-filtration" },

    // Cause to Symptom connections
    { source: "clogged-pipe", target: "slow-drain" },
    { source: "mineral-buildup", target: "no-hot-water" },
    { source: "corrosion", target: "low-water-pressure" },
    { source: "mineral-buildup", target: "water-discoloration" },

    // Tool to Service connections
    { source: "snake-auger", target: "drain-cleaning" },
    { source: "camera-inspection", target: "emergency-plumbing" },
  ]
};

const categoryColors: Record<string, string> = {
  Services: "var(--primary)",      // Terracotta
  Systems: "var(--secondary)",     // Blue-green (if used)
  Tools: "var(--high)",           // Green
  Symptoms: "var(--medium)",      // Orange
  Causes: "var(--low)",           // Pink/Low
};

const coverageColors: Record<string, string> = {
  high: "var(--high)",
  medium: "var(--medium)",
  low: "var(--low)",
};

export default function EICSGraphDemo() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Clear existing
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    // Create force simulation
    const simulation = d3.forceSimulation(demoData.nodes as any)
      .force("link", d3.forceLink(demoData.edges).id((d: any) => d.id).distance(80))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(25));

    // Draw links
    const link = svg.append("g")
      .selectAll("line")
      .data(demoData.edges)
      .join("line")
      .attr("stroke", "var(--accent)")
      .attr("stroke-opacity", 0.3)
      .attr("stroke-width", 1.5);

    // Draw nodes
    const node = svg.append("g")
      .selectAll("g")
      .data(demoData.nodes)
      .join("g")
      .call(d3.drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any);

    // Add circles
    node.append("circle")
      .attr("r", (d: any) => d.tier === 1 ? 12 : d.tier === 2 ? 9 : 7)
      .attr("fill", (d: any) => coverageColors[d.coverage] || "var(--text-tertiary)")
      .attr("stroke", (d: any) => categoryColors[d.category] || "var(--border)")
      .attr("stroke-width", 2)
      .style("cursor", "pointer");

    // Add labels
    node.append("text")
      .text((d: any) => d.name)
      .attr("x", 15)
      .attr("y", 4)
      .attr("font-size", "11px")
      .attr("fill", "var(--text-secondary)")
      .attr("font-weight", "300")
      .style("pointer-events", "none")
      .style("user-select", "none");

    // Hover effects
    node.on("mouseenter", function(event, d: any) {
      d3.select(this).select("circle")
        .transition()
        .duration(200)
        .attr("r", (d: any) => (d.tier === 1 ? 12 : d.tier === 2 ? 9 : 7) * 1.3);

      d3.select(this).select("text")
        .attr("fill", "var(--text-primary)")
        .attr("font-weight", "500");
    });

    node.on("mouseleave", function() {
      d3.select(this).select("circle")
        .transition()
        .duration(200)
        .attr("r", (d: any) => d.tier === 1 ? 12 : d.tier === 2 ? 9 : 7);

      d3.select(this).select("text")
        .attr("fill", "var(--text-secondary)")
        .attr("font-weight", "300");
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
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative bg-bg-secondary/30 rounded-2xl border border-border overflow-hidden">
      <svg ref={svgRef} className="w-full h-full" />

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-bg-primary/95 backdrop-blur-sm rounded-lg p-3 border border-border-light text-xs">
        <p className="font-medium text-text-primary mb-2">Coverage</p>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{backgroundColor: "var(--high)"}}></div>
            <span className="text-text-secondary">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{backgroundColor: "var(--medium)"}}></div>
            <span className="text-text-secondary">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{backgroundColor: "var(--low)"}}></div>
            <span className="text-text-secondary">Low</span>
          </div>
        </div>
      </div>

      {/* Interaction hint */}
      <div className="absolute bottom-4 left-4 bg-bg-primary/95 backdrop-blur-sm rounded-lg px-3 py-2 border border-border-light text-xs text-text-tertiary">
        Drag nodes • Hover to highlight
      </div>
    </div>
  );
}
