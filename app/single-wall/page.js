"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import InputField from "../components/InputField";
import StatCard from "../components/StatCard";

const presets = [
  [12, 24],
  [24, 24],
  [18, 18],
  [8, 12],
  [16, 32],
];

export default function SingleWall() {
  const [wft, setWft] = useState(6);
  const [hft, setHft] = useState(7);
  const [tw, setTw] = useState(24);
  const [th, setTh] = useState(24);
  const [result, setResult] = useState(null);

  useEffect(() => {
    // compute on mount
  }, []);

  const calculate = () => {
    const wallWidthIn = Number(wft) * 12;
    const wallHeightIn = Number(hft) * 12;
    const tileW = Number(tw);
    const tileH = Number(th);

    const across = Math.ceil(wallWidthIn / tileW);
    const down = Math.ceil(wallHeightIn / tileH);
    const total = across * down;
    const wallArea = Number(wft) * Number(hft);
    const tileArea = (tileW * tileH) / 144;

    const res = { wallArea, tileArea, across, down, total };
    setResult(res);

    try {
      localStorage.setItem(
        "singleWallResult",
        JSON.stringify({ wallArea, totalTiles: total }),
      );
    } catch (e) {}
  };

  const selectPreset = (p) => {
    setTw(p[0]);
    setTh(p[1]);
  };

  return (
    <div className="bg-white min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <Header
          title="Single Wall Calculator"
          description="Calculate tiles required for a single wall."
        />

        <div className="bg-white rounded-lg shadow-md border p-5 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              id="wallWidth"
              label="Wall Width (ft)"
              value={wft}
              onChange={(e) => setWft(e.target.value)}
            />
            <InputField
              id="wallHeight"
              label="Wall Height (ft)"
              value={hft}
              onChange={(e) => setHft(e.target.value)}
            />
            <InputField
              id="tileW"
              label="Tile Width (inch)"
              value={tw}
              onChange={(e) => setTw(e.target.value)}
            />
            <InputField
              id="tileH"
              label="Tile Height (inch)"
              value={th}
              onChange={(e) => setTh(e.target.value)}
            />
          </div>

          <div className="mt-3 flex items-center gap-2">
            {presets.map((p) => (
              <button
                key={`${p[0]}x${p[1]}`}
                onClick={() => selectPreset(p)}
                className="px-3 py-1 rounded bg-blue-50 text-blue-700 text-sm"
              >
                {p[0]}×{p[1]}
              </button>
            ))}

            <button
              onClick={calculate}
              className="ml-auto px-4 py-2 rounded bg-blue-600 text-white"
            >
              Calculate
            </button>
          </div>

          {result && (
            <div className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                  title="Wall Area"
                  value={`${result.wallArea.toFixed(2)} sq ft`}
                />
                <StatCard
                  title="Tile Area"
                  value={`${result.tileArea.toFixed(2)} sq ft`}
                />
                <StatCard title="Tiles Across (W)" value={`${result.across}`} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <StatCard title="Tiles Across (H)" value={`${result.down}`} />
                <StatCard
                  title="Total Tiles"
                  value={`${result.total}`}
                  highlight
                />
                <div className="p-4 rounded-lg bg-white border shadow-md">
                  <div className="text-sm text-slate-500">Formula</div>
                  <div className="mt-2 text-sm text-slate-800">{`${wft} ft → ${wft * 12} in; ${wft * 12} ÷ ${tw} = ${result.across}`}</div>
                  <div className="mt-1 text-sm text-slate-800">{`${hft} ft → ${hft * 12} in; ${hft * 12} ÷ ${th} = ${result.down}`}</div>
                </div>
              </div>

              {/* visual grid */}
              <div className="mt-6">
                <div className="text-sm font-medium mb-2">Visual Preview</div>
                <div className="w-full bg-slate-50 border p-3">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: `repeat(${result.across}, 1fr)`,
                      gap: 4,
                    }}
                  >
                    {Array.from({ length: result.across * result.down }).map(
                      (_, i) => (
                        <div
                          key={i}
                          className="bg-blue-50 border border-blue-100 aspect-square flex items-center justify-center text-xs text-blue-700"
                        >
                          Tile
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
