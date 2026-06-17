"use client";

import React from "react";
import Header from "../components/Header";

export default function TilePatterns() {
  const patterns = [
    {
      name: "Herringbone",
      desc: "Classic diagonal pattern great for long rooms.",
    },
    { name: "Stack Bond", desc: "Simple grid aligned tiles; modern look." },
    { name: "Running Bond", desc: "Offset joints; common in floors." },
    { name: "Basket Weave", desc: "Decorative alternating pairs." },
  ];

  return (
    <div className="bg-white min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <Header
          title="Tile Patterns Guide"
          description="Common tile patterns and usage guide."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {patterns.map((p) => (
            <div key={p.name} className="p-4 bg-white border rounded shadow-sm">
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-slate-600 mt-1">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
