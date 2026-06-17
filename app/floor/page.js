"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import InputField from "../components/InputField";
import StatCard from "../components/StatCard";

export default function Floor() {
  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(8);
  const [tw, setTw] = useState(12);
  const [th, setTh] = useState(12);
  const [tiles, setTiles] = useState(null);
  const [boxes, setBoxes] = useState(null);
  const [boxSize, setBoxSize] = useState(0);

  const calculate = () => {
    const area = Number(length) * Number(width);
    const tileArea = (Number(tw) * Number(th)) / 144;
    const tilesRequired = Math.ceil(area / tileArea);
    const boxesRequired =
      boxSize > 0 ? Math.ceil(tilesRequired / boxSize) : null;

    setTiles({ area, tilesRequired });
    setBoxes({ boxesRequired });

    try {
      localStorage.setItem(
        "floorResult",
        JSON.stringify({ totalSqFt: area, tilesRequired, boxesRequired }),
      );
    } catch (e) {}
  };

  return (
    <div className="bg-white min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <Header
          title="Floor Calculator"
          description="Calculate floor tiles and boxes."
        />

        <div className="bg-white rounded-lg shadow-md border p-5 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField
              id="flength"
              label="Floor Length (ft)"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <InputField
              id="fwidth"
              label="Floor Width (ft)"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
            <InputField
              id="ftw"
              label="Tile Width (inch)"
              value={tw}
              onChange={(e) => setTw(e.target.value)}
            />
            <InputField
              id="fth"
              label="Tile Height (inch)"
              value={th}
              onChange={(e) => setTh(e.target.value)}
            />
            <InputField
              id="boxSize"
              label="Tiles Per Box (optional)"
              value={boxSize}
              onChange={(e) => setBoxSize(e.target.value)}
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

          {tiles && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                title="Floor Area"
                value={`${tiles.area.toFixed(2)} sq ft`}
              />
              <StatCard
                title="Tiles Required"
                value={`${tiles.tilesRequired}`}
              />
              <StatCard
                title="Boxes Required"
                value={`${boxes.boxesRequired ?? "-"}`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
