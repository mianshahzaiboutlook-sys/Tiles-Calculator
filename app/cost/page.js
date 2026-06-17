"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import InputField from "../components/InputField";
import StatCard from "../components/StatCard";

export default function CostCalc() {
  const [meter, setMeter] = useState(10);
  const [rate, setRate] = useState(2500);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const total = Number(meter) * Number(rate);
    setResult({ total });
    try {
      localStorage.setItem("costResult", JSON.stringify({ totalCost: total }));
    } catch (e) {}
  };

  const formatCurrency = (n) =>
    `Rs ${Number(n || 0).toLocaleString("en-PK", { maximumFractionDigits: 2 })}`;

  return (
    <div className="bg-white min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <Header
          title="Cost Calculator"
          description="Compute total cost from meter and rate."
        />

        <div className="bg-white rounded-lg shadow-md border p-5 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField
              id="meter"
              label="Total Meter"
              value={meter}
              onChange={(e) => setMeter(e.target.value)}
            />
            <InputField
              id="rate"
              label="Rate Per Meter"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
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
                title="Total Cost"
                value={formatCurrency(result.total)}
                highlight
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
