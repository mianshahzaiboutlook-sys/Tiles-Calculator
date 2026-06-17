"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import InputField from "../components/InputField";
import StatCard from "../components/StatCard";

export default function BoxCalc() {
  const [tiles, setTiles] = useState(120);
  const [perBox, setPerBox] = useState(8);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const boxes = Math.ceil(Number(tiles) / Number(perBox));
    setResult({ boxes });
    try {
      localStorage.setItem(
        "boxResult",
        JSON.stringify({ requiredBoxes: boxes }),
      );
    } catch (e) {}
  };

  return (
    <div className="bg-white min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <Header
          title="Box Calculator"
          description="Compute number of boxes needed."
        />

        <div className="bg-white rounded-lg shadow-md border p-5 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField
              id="reqTiles"
              label="Required Tiles"
              value={tiles}
              onChange={(e) => setTiles(e.target.value)}
            />
            <InputField
              id="perBox"
              label="Tiles Per Box"
              value={perBox}
              onChange={(e) => setPerBox(e.target.value)}
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
                title="Boxes Needed"
                value={`${result.boxes}`}
                highlight
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
