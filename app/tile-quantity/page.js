"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import InputField from "../components/InputField";
import StatCard from "../components/StatCard";

export default function TileQuantity() {
  const [area, setArea] = useState(100);
  const [tw, setTw] = useState(12);
  const [th, setTh] = useState(12);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const tileArea = (Number(tw) * Number(th)) / 144;
    const required = Math.ceil(Number(area) / tileArea);
    setResult({ tileArea, required });
    try {
      localStorage.setItem(
        "tileQuantityResult",
        JSON.stringify({ totalArea: Number(area), requiredTiles: required }),
      );
    } catch (e) {}
  };

  return (
    <div className="bg-white min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <Header
          title="Tile Quantity Calculator"
          description="Enter total area and tile size to get required tiles."
        />

        <div className="bg-white rounded-lg shadow-md border p-5 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <InputField
              id="tarea"
              label="Total Area (sq ft)"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
            <InputField
              id="ttw"
              label="Tile Width (inch)"
              value={tw}
              onChange={(e) => setTw(e.target.value)}
            />
            <InputField
              id="tth"
              label="Tile Height (inch)"
              value={th}
              onChange={(e) => setTh(e.target.value)}
            />
          </div>

          <div className="mt-3 flex justify-end">
            <button
              onClick={calculate}
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              Calculate
            </button>
          </div>

          {result && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <StatCard
                title="Tile Area"
                value={`${result.tileArea.toFixed(3)} sq ft`}
              />
              <StatCard
                title="Required Tiles"
                value={`${result.required}`}
                highlight
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
