// Clean implementation below — removed legacy commented sample code.

"use client";

import React, { useState, useRef } from "react";
import Header from "../components/Header";
import InputField from "../components/InputField";
import InputSection from "../components/InputSection";
import StatCard from "../components/StatCard";
import LoadingSpinner from "../components/LoadingSpinner";

const IconMeasure = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 3h18v4H3z" fill="#2563EB" />
    <path d="M3 10h18v11H3z" fill="#DBEAFE" />
  </svg>
);

export default function Washroom() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});
  const formRef = useRef(null);

  const requiredFilled = width && length && height;

  const handleBlur = (field) => setTouched((t) => ({ ...t, [field]: true }));

  const reset = () => {
    setLength("");
    setWidth("");
    setHeight("");
    setResult(null);
    setTouched({});
  };

  const calculateTiles = async () => {
    const l = Number(length);
    const w = Number(width);
    const h = Number(height);

    if (!l || !w || !h) {
      setTouched({ width: true, length: true, height: true });
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));

    // Preserve original calculation logic
    const floorArea = l * w;
    const perimeter = l + l + w + w;
    const adjustedPerimeter = perimeter - 2; // Door space (unchanged)
    const wallArea = adjustedPerimeter * h;
    const totalSqFt = floorArea + wallArea;
    const totalMeter = totalSqFt / 10;

    setResult({
      floorArea,
      wallArea,
      totalSqFt,
      totalMeter,
      adjustedPerimeter,
    });

    // persist last washroom result for dashboard aggregation
    try {
      localStorage.setItem(
        "washroomResult",
        JSON.stringify({ floorArea, wallArea, totalSqFt, totalMeter }),
      );
    } catch (e) {}

    setLoading(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    calculateTiles();
  };

  return (
    <div className="bg-white min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <Header
          title="Washroom Tile Calculator"
          description="Estimate washroom tiles and area quickly."
        />

        <form ref={formRef} onSubmit={onSubmit} className="mt-4">
          <div className="bg-white rounded-lg shadow-md border p-5">
            <InputSection title="Washroom Dimensions" icon={IconMeasure}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <InputField
                  id="width"
                  label="Width (ft)"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  onBlur={() => handleBlur("width")}
                  placeholder="e.g. 5"
                  required
                  error={
                    touched.width && !width ? "Width is required" : undefined
                  }
                />

                <InputField
                  id="length"
                  label="Length (ft)"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  onBlur={() => handleBlur("length")}
                  placeholder="e.g. 7"
                  required
                  error={
                    touched.length && !length ? "Length is required" : undefined
                  }
                />

                <InputField
                  id="height"
                  label="Height (ft)"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  onBlur={() => handleBlur("height")}
                  placeholder="e.g. 8"
                  required
                  error={
                    touched.height && !height ? "Height is required" : undefined
                  }
                />
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={!requiredFilled || loading}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-white shadow-sm transition focus:outline-none ${
                    !requiredFilled || loading
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  aria-disabled={!requiredFilled || loading}
                >
                  {loading ? <LoadingSpinner size={16} /> : null}
                  <span>{loading ? "Calculating..." : "Calculate"}</span>
                </button>

                <button
                  type="button"
                  onClick={reset}
                  className="px-3 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
                >
                  Reset
                </button>
              </div>
            </InputSection>
          </div>
        </form>

        {result && (
          <section className="mt-6">
            <h2 className="sr-only">Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <StatCard
                title="Adjusted Perimeter"
                value={`${result.adjustedPerimeter} ft`}
              />
              <StatCard
                title="Floor Area"
                value={`${result.floorArea.toFixed(2)} sq ft`}
              />
              <StatCard
                title="Wall Area"
                value={`${result.wallArea.toFixed(2)} sq ft`}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <StatCard
                title="Total Area"
                value={`${result.totalSqFt.toFixed(2)} sq ft`}
              />
              <StatCard
                title="Total Meter"
                value={`${result.totalMeter.toFixed(2)} m`}
                highlight
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
