"use client";

import React, { useEffect, useMemo, useState } from "react";
import InputField from "../components/InputField";
import StatCard from "../components/StatCard";

function toNumber(v) {
  if (v === "" || v === null || v === undefined) return null;
  const n = Number(String(v).replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}

function fmt(n, digits = 2) {
  if (n === null || n === undefined || Number.isNaN(n)) return "-";
  return Number.isFinite(n)
    ? n.toLocaleString(undefined, { maximumFractionDigits: digits })
    : "-";
}

function TilePattern({ cols, rows, tileW, tileH }) {
  if (!cols || !rows) return null;
  const maxW = 420;
  const maxH = 320;
  const gridCellW = Math.max(8, Math.floor((maxW - 80) / Math.max(1, cols)));
  const gridCellH = Math.max(8, Math.floor((maxH - 80) / Math.max(1, rows)));
  const cellW = gridCellW;
  const cellH = gridCellH;
  const pad = 24; // padding for arrows/labels
  const gridW = cellW * cols;
  const gridH = cellH * rows;
  const viewW = gridW + pad * 2;
  const viewH = gridH + pad * 2;

  const orientation =
    tileW && tileH
      ? tileW > tileH
        ? "Landscape"
        : tileW < tileH
          ? "Portrait"
          : "Square"
      : "—";

  const arrowColor = "#475569"; // slate color matching theme

  // positions
  const gx = pad;
  const gy = pad;

  // arrow positions: draw arrows outside the grid to avoid overlap
  const horizY = gy - 8;
  const horizX1 = gx + 4;
  const horizX2 = gx + cellW - 4;

  const vertX = gx - 8;
  const vertY1 = gy + 4;
  const vertY2 = gy + cellH - 4;

  return (
    <div className="mt-4">
      <div className="text-sm text-slate-700 mb-2">
        Tile Pattern Preview ({orientation})
      </div>
      <svg width={viewW} height={viewH} className="rounded-md border bg-white">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0 0 L6 3 L0 6 z" fill={arrowColor} />
          </marker>
        </defs>

        {/* grid */}
        <g>
          {[...Array(rows)].map((_, r) => (
            <g key={r}>
              {[...Array(cols)].map((__, c) => (
                <rect
                  key={c}
                  x={gx + c * cellW}
                  y={gy + r * cellH}
                  width={cellW - 1}
                  height={cellH - 1}
                  fill="#f8fafc"
                  stroke="#e6eef8"
                />
              ))}
            </g>
          ))}
        </g>

        {/* horizontal arrow (above first tile) */}
        {tileW && (
          <g>
            <line
              x1={horizX1}
              y1={horizY}
              x2={horizX2}
              y2={horizY}
              stroke={arrowColor}
              strokeWidth={2}
              markerStart="url(#arrowhead)"
              markerEnd="url(#arrowhead)"
              transform={`translate(${gx},0)`}
            />
            <text
              x={gx + (horizX1 + horizX2) / 2}
              y={horizY - 6}
              fontSize="11"
              fill={arrowColor}
              textAnchor="middle"
            >
              {tileW} in
            </text>
          </g>
        )}

        {/* vertical arrow (left of first tile) */}
        {tileH && (
          <g>
            <line
              x1={vertX}
              y1={vertY1}
              x2={vertX}
              y2={vertY2}
              stroke={arrowColor}
              strokeWidth={2}
              markerStart="url(#arrowhead)"
              markerEnd="url(#arrowhead)"
              transform={`translate(0,${0})`}
            />
            <text
              x={vertX - 6}
              y={gy + (vertY1 + vertY2) / 2 + 4}
              fontSize="11"
              fill={arrowColor}
              textAnchor="end"
            >
              {tileH} in
            </text>
          </g>
        )}
      </svg>
      <div className="mt-2 text-sm text-slate-600">
        Tiles per row: <strong>{cols}</strong> • Tiles per column:{" "}
        <strong>{rows}</strong>
      </div>
    </div>
  );
}

export default function Page() {
  const [form, setForm] = useState({
    // Washroom
    length: "",
    width: "",
    height: "",
    doorDeduction: "",
    // Wall
    wallWidth: "",
    wallHeight: "",
    // Tile
    tileWidth: "",
    tileHeight: "",
    // Area
    totalArea: "",
    // Box
    tilesPerBox: "",
    // Cost
    ratePerMeter: "",
    // Customer
    customerName: "",
  });

  const [errors, setErrors] = useState({});

  const reset = () => {
    setForm({
      length: "",
      width: "",
      height: "",
      doorDeduction: "",
      wallWidth: "",
      wallHeight: "",
      tileWidth: "",
      tileHeight: "",
      totalArea: "",
      tilesPerBox: "",
      ratePerMeter: "",
      customerName: "",
    });
    setErrors({});
  };

  // parse numeric values
  const values = useMemo(() => {
    const v = {};
    Object.keys(form).forEach((k) => (v[k] = toNumber(form[k])));
    return v;
  }, [form]);

  // validation
  useEffect(() => {
    const e = {};
    const numericFields = [
      "length",
      "width",
      "height",
      "doorDeduction",
      "wallWidth",
      "wallHeight",
      "tileWidth",
      "tileHeight",
      "totalArea",
      "tilesPerBox",
      "ratePerMeter",
    ];
    numericFields.forEach((f) => {
      const val = form[f];
      if (val === "") return; // optional
      const n = Number(String(val));
      if (!Number.isFinite(n) || n < 0)
        e[f] = "Enter a valid non-negative number";
    });
    setErrors(e);
  }, [form]);

  // Calculations
  const results = useMemo(() => {
    const r = {};
    const {
      length,
      width,
      height,
      doorDeduction,
      wallWidth,
      wallHeight,
      tileWidth,
      tileHeight,
      totalArea,
      tilesPerBox,
      ratePerMeter,
    } = values;

    // tile area in sq ft
    const tileArea =
      tileWidth && tileHeight ? (tileWidth * tileHeight) / 144.0 : null;
    if (tileArea) r.tileArea = tileArea;

    // Single wall calculation
    if (wallWidth && wallHeight) {
      const wallArea = wallWidth * wallHeight;
      r.wallArea = wallArea;
      if (tileArea) {
        // tiles across dimensions (ceil)
        const tilesAcrossWidth = Math.ceil((wallWidth * 12) / tileWidth);
        const tilesAcrossHeight = Math.ceil((wallHeight * 12) / tileHeight);
        const tilesRequired = tilesAcrossWidth * tilesAcrossHeight;
        r.tilesAcrossWidth = tilesAcrossWidth;
        r.tilesAcrossHeight = tilesAcrossHeight;
        r.tilesRequired = tilesRequired;
      }
    }

    // Washroom calculation
    if (length && width && height) {
      const floorArea = length * width;
      // wall area = perimeter * height
      console.log(`${floorArea}`);
      const walllength = 2 * length;
      console.log(`walllength: ${walllength}`);
      const wallwidth = 2 * width;
      const totalwidthlength = walllength + wallwidth;
      console.log(`totalwidthlength: ${totalwidthlength}`);
      const totalafterdoordeduction = totalwidthlength - doorDeduction;
      console.log(`totalafterdoordeduction: ${totalafterdoordeduction}`);
      const wallArea = totalafterdoordeduction * height;
      console.log(`wallArea: ${wallArea}`);

      const total_area = floorArea + wallArea;
      r.floorArea = floorArea;

      r.totalArea = total_area;
      // total meter (custom formula: total area divided by 10)
      const totalMeter = total_area / 10;
      r.totalMeter = totalMeter;

      if (tileArea) {
        const tilesRequired = Math.ceil(total_area / tileArea);
        r.tilesRequired = tilesRequired;
      }
    }

    // Area-based tile quantity
    if (totalArea && tileArea) {
      r.totalArea = totalArea; // prefer explicit totalArea field if provided
      const tilesRequired = Math.ceil(totalArea / tileArea);
      r.tilesRequired = tilesRequired;
    }

    // Boxes calculation
    if (r.tilesRequired && tilesPerBox) {
      const boxes = Math.ceil(r.tilesRequired / tilesPerBox);
      r.boxesRequired = boxes;
    }

    // Cost calculation
    if (r.totalMeter && ratePerMeter) {
      r.cost = r.totalMeter * ratePerMeter;
    }

    return r;
  }, [values]);

  // Determine which result cards to show (only those present)
  const visibleCards = useMemo(() => {
    const list = [];
    if (results.floorArea)
      list.push({
        key: "floorArea",
        title: "Floor Area",
        value: fmt(results.floorArea) + " sq ft",
      });
    if (results.washroomWallArea)
      list.push({
        key: "washroomWallArea",
        title: "Wall Area",
        value: fmt(results.washroomWallArea) + " sq ft",
      });
    if (results.wallArea)
      list.push({
        key: "wallArea",
        title: "Wall Area (Single)",
        value: fmt(results.wallArea) + " sq ft",
      });
    if (results.totalArea)
      list.push({
        key: "totalArea",
        title: "Total Area",
        value: fmt(results.totalArea) + " sq ft",
      });
    if (results.totalMeter)
      list.push({
        key: "totalMeter",
        title: "Total Meter",
        value: fmt(results.totalMeter) + " m²",
      });
    if (results.tileArea)
      list.push({
        key: "tileArea",
        title: "Tile Area",
        value: fmt(results.tileArea, 4) + " sq ft",
      });
    if (results.tilesAcrossWidth)
      list.push({
        key: "tilesAcrossWidth",
        title: "Tiles Across Width",
        value: fmt(results.tilesAcrossWidth, 0),
      });
    if (results.tilesAcrossHeight)
      list.push({
        key: "tilesAcrossHeight",
        title: "Tiles Across Height",
        value: fmt(results.tilesAcrossHeight, 0),
      });
    if (results.tilesRequired)
      list.push({
        key: "tilesRequired",
        title: "Tiles Required",
        value: fmt(results.tilesRequired, 0),
      });
    if (results.boxesRequired)
      list.push({
        key: "boxesRequired",
        title: "Boxes Required",
        value: fmt(results.boxesRequired, 0),
      });
    if (results.cost)
      list.push({
        key: "cost",
        title: "Cost",
        value: "PKR " + fmt(results.cost, 2),
      });
    if (values.doorDeduction)
      list.push({
        key: "doorDeduction",
        title: "Door Deduction",
        value: fmt(values.doorDeduction, 2) + " sq ft",
      });
    return list;
  }, [results, values.doorDeduction]);

  // Calculation details / formulas used based on visible results
  const formulas = useMemo(() => {
    const f = [];
    if (visibleCards.find((c) => c.key === "wallArea")) {
      f.push({ title: "Wall Area", expr: "Wall Area = Width × Height" });
    }
    if (visibleCards.find((c) => c.key === "washroomWallArea")) {
      f.push({
        title: "Washroom Wall Area",
        expr: "Wall Area = 2 × (Length + Width) × Height",
      });
      f.push({ title: "Floor Area", expr: "Floor Area = Length × Width" });
    }
    if (visibleCards.find((c) => c.key === "totalArea")) {
      f.push({
        title: "Total Area",
        expr: "Total Area = Floor Area + Wall Area - Door Deduction",
      });
    }
    if (visibleCards.find((c) => c.key === "tileArea")) {
      f.push({
        title: "Tile Area",
        expr: "Tile Area = Tile Width (in) × Tile Height (in) ÷ 144",
      });
    }
    if (visibleCards.find((c) => c.key === "tilesRequired")) {
      f.push({
        title: "Tiles Required",
        expr: "Tiles Required = Area ÷ Tile Area (round up)",
      });
    }
    if (visibleCards.find((c) => c.key === "boxesRequired")) {
      f.push({
        title: "Boxes Required",
        expr: "Boxes Required = Tiles Required ÷ Tiles Per Box (round up)",
      });
    }
    if (visibleCards.find((c) => c.key === "totalMeter")) {
      f.push({
        title: "Total Meter",
        expr: "Total Meter = Total Area ÷ 10",
      });
    }
    if (visibleCards.find((c) => c.key === "cost")) {
      f.push({ title: "Cost", expr: "Cost = Total Meter × Rate Per Meter" });
    }
    return f;
  }, [visibleCards]);

  return (
    <div className="p-6">
      <header className="rounded-xl p-6 mb-6 bg-gradient-to-r from-sky-500 via-indigo-600 to-rose-500 text-white shadow-lg">
        <h1 className="text-2xl font-bold">All-in-One Smart Calculator</h1>
        <p className="mt-1 text-sm opacity-90">
          Intelligent, auto-detecting calculations for tiles, walls, washrooms
          and costs.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="col-span-2 bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Inputs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1 space-y-3">
              <h3 className="font-medium">Washroom</h3>
              <InputField
                id="length"
                label="Length (ft)"
                value={form.length}
                onChange={(e) => setForm({ ...form, length: e.target.value })}
                error={errors.length}
              />
              <InputField
                id="width"
                label="Width (ft)"
                value={form.width}
                onChange={(e) => setForm({ ...form, width: e.target.value })}
                error={errors.width}
              />
              <InputField
                id="height"
                label="Height (ft)"
                value={form.height}
                onChange={(e) => setForm({ ...form, height: e.target.value })}
                error={errors.height}
              />
              <InputField
                id="doorDeduction"
                label="Door Deduction (sq ft) - optional"
                value={form.doorDeduction}
                onChange={(e) =>
                  setForm({ ...form, doorDeduction: e.target.value })
                }
                error={errors.doorDeduction}
              />
            </div>

            <div className="md:col-span-1 space-y-3">
              <h3 className="font-medium">Wall</h3>
              <InputField
                id="wallWidth"
                label="Wall Width (ft)"
                value={form.wallWidth}
                onChange={(e) =>
                  setForm({ ...form, wallWidth: e.target.value })
                }
                error={errors.wallWidth}
              />
              <InputField
                id="wallHeight"
                label="Wall Height (ft)"
                value={form.wallHeight}
                onChange={(e) =>
                  setForm({ ...form, wallHeight: e.target.value })
                }
                error={errors.wallHeight}
              />

              <h3 className="font-medium mt-4">Tile</h3>
              <div className="grid grid-cols-2 gap-2">
                <InputField
                  id="tileWidth"
                  label="Tile Width (in)"
                  value={form.tileWidth}
                  onChange={(e) =>
                    setForm({ ...form, tileWidth: e.target.value })
                  }
                  error={errors.tileWidth}
                />
                <InputField
                  id="tileHeight"
                  label="Tile Height (in)"
                  value={form.tileHeight}
                  onChange={(e) =>
                    setForm({ ...form, tileHeight: e.target.value })
                  }
                  error={errors.tileHeight}
                />
              </div>
            </div>

            <div className="md:col-span-1 space-y-3">
              <h3 className="font-medium">Area / Boxes / Cost</h3>
              <InputField
                id="totalArea"
                label="Total Area (sq ft)"
                value={form.totalArea}
                onChange={(e) =>
                  setForm({ ...form, totalArea: e.target.value })
                }
                error={errors.totalArea}
              />
              <InputField
                id="tilesPerBox"
                label="Tiles Per Box"
                value={form.tilesPerBox}
                onChange={(e) =>
                  setForm({ ...form, tilesPerBox: e.target.value })
                }
                error={errors.tilesPerBox}
              />
              <InputField
                id="ratePerMeter"
                label="Rate Per Meter (PKR)"
                value={form.ratePerMeter}
                onChange={(e) =>
                  setForm({ ...form, ratePerMeter: e.target.value })
                }
                error={errors.ratePerMeter}
              />
              <InputField
                id="customerName"
                type="text"
                label="Customer Name (optional)"
                value={form.customerName}
                onChange={(e) =>
                  setForm({ ...form, customerName: e.target.value })
                }
              />

              <div className="flex gap-2 mt-2">
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow"
                  onClick={reset}
                >
                  Reset
                </button>
                <button
                  className="px-4 py-2 bg-white border border-slate-200 rounded-md shadow text-slate-700"
                  onClick={() =>
                    navigator.clipboard?.writeText(
                      JSON.stringify({ form, results }),
                    )
                  }
                >
                  Copy JSON
                </button>
              </div>
            </div>
          </div>
        </section>

        <aside className="bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Results</h2>
          {visibleCards.length === 0 && (
            <div className="text-sm text-slate-500">
              Provide a few inputs; results update in real-time.
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            {visibleCards.map((c) => (
              <StatCard key={c.key} title={c.title} value={c.value} />
            ))}
          </div>

          {/* Tile pattern preview for single wall */}
          {results.tilesAcrossWidth && results.tilesAcrossHeight && (
            <div className="mt-4">
              <TilePattern
                cols={results.tilesAcrossWidth}
                rows={results.tilesAcrossHeight}
                tileW={values.tileWidth}
                tileH={values.tileHeight}
              />
            </div>
          )}

          {form.customerName && (
            <div className="mt-4 text-sm text-slate-600">
              Customer: <strong>{form.customerName}</strong>
            </div>
          )}
        </aside>
      </div>

      <section className="mt-6 bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-3">Calculation Details</h3>
        {formulas.length === 0 && (
          <div className="text-sm text-slate-500">
            No calculations available yet.
          </div>
        )}
        <ul className="space-y-2">
          {formulas.map((f, idx) => (
            <li key={idx} className="p-3 rounded-md bg-white border">
              <div className="text-sm font-medium text-slate-700">
                {f.title}
              </div>
              <div className="text-xs text-slate-500 mt-1">{f.expr}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
