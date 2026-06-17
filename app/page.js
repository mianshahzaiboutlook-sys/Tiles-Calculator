"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Header from "./components/Header";
import StatCard from "./components/StatCard";

export default function HomePage() {
  const [totals, setTotals] = useState({
    area: 0,
    tiles: 0,
    boxes: 0,
    cost: 0,
  });
  const featuresRef = useRef(null);

  const readTotals = () => {
    try {
      const wash = JSON.parse(localStorage.getItem("washroomResult")) || {};
      const single = JSON.parse(localStorage.getItem("singleWallResult")) || {};
      const floor = JSON.parse(localStorage.getItem("floorResult")) || {};
      const qty = JSON.parse(localStorage.getItem("tileQuantityResult")) || {};
      const box = JSON.parse(localStorage.getItem("boxResult")) || {};
      const cost = JSON.parse(localStorage.getItem("costResult")) || {};

      const area =
        (wash.totalSqFt || 0) +
        (floor.totalSqFt || 0) +
        (single.wallArea || 0) +
        (qty.totalArea || 0);
      const tiles =
        (wash.tilesRequired || 0) +
        (floor.tilesRequired || 0) +
        (single.totalTiles || 0) +
        (qty.requiredTiles || 0) +
        (box.requiredBoxes || 0);
      const boxesTotal =
        (wash.boxesRequired || 0) +
        (floor.boxesRequired || 0) +
        (box.boxesNeeded || 0);
      const totalCost = (wash.totalCost || 0) + (cost.totalCost || 0);

      setTotals({ area, tiles, boxes: boxesTotal, cost: totalCost });
    } catch (e) {
      setTotals({ area: 0, tiles: 0, boxes: 0, cost: 0 });
    }
  };

  useEffect(() => {
    readTotals();
    window.addEventListener("storage", readTotals);
    return () => window.removeEventListener("storage", readTotals);
  }, []);

  const formatCurrency = (n) =>
    `Rs ${Number(n || 0).toLocaleString("en-PK", { maximumFractionDigits: 2 })}`;

  // Simple animated counters for stats section
  const [counters, setCounters] = useState({
    accuracy: 0,
    speed: 0,
    tools: 0,
    receipts: 0,
  });
  useEffect(() => {
    let raf;
    const start = performance.now();
    const duration = 800;
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setCounters({
        accuracy: Math.floor(t * 99) + 1,
        speed: Math.floor(t * 120) + 30,
        tools: Math.floor(t * 7) + 1,
        receipts: Math.floor(t * 250) + 10,
      });
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onExploreFeatures = () =>
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });

  const FEATURES = [
    {
      href: "/washroom-calculator",
      title: "Washroom Calculator",
      desc: "Calculate complete washroom tile requirements.",
      icon: (
        <svg
          className="w-7 h-7 text-white"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 12h18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M6 6h.01M6 18h.01"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      href: "/single-wall",
      title: "Single Wall Calculator",
      desc: "Calculate tiles for a single wall.",
      icon: (
        <svg
          className="w-7 h-7 text-white"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 4h18v16H3z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      href: "/floor",
      title: "Floor Calculator",
      desc: "Calculate floor tile requirements.",
      icon: (
        <svg
          className="w-7 h-7 text-white"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      ),
    },
    {
      href: "/tile-quantity",
      title: "Tile Quantity Calculator",
      desc: "Calculate tile quantity from area.",
      icon: (
        <svg
          className="w-7 h-7 text-white"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      ),
    },
    {
      href: "/box",
      title: "Box Calculator",
      desc: "Calculate required tile boxes.",
      icon: (
        <svg
          className="w-7 h-7 text-white"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 7l9 5 9-5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      href: "/cost",
      title: "Cost Calculator",
      desc: "Estimate project costs.",
      icon: (
        <svg
          className="w-7 h-7 text-white"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 6v6l4 2"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      href: "/receipt",
      title: "Receipt Generator",
      desc: "Generate customer receipts and invoices.",
      icon: (
        <svg
          className="w-7 h-7 text-white"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 3h10v18l-5-3-5 3V3z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <header className="relative overflow-hidden bg-gradient-to-r from-sky-600 via-indigo-600 to-blue-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 bg-blue-600">
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
              Jasim Tiles
            </h1>
            <p className="mt-3 text-lg sm:text-xl text-white/90">
              Professional Tile Calculation & Estimation Software
            </p>
            <p className="mt-4 text-sky-50/90 max-w-xl">
              Calculate washroom tiles, wall tiles, floor tiles, box quantities,
              costs, and customer estimates quickly and accurately.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/washroom-calculator"
                className="inline-flex items-center px-5 py-3 bg-white text-blue-700 rounded-full font-medium shadow hover:shadow-lg transition"
              >
                Start Calculating
              </Link>
              <button
                onClick={onExploreFeatures}
                className="inline-flex items-center px-5 py-3 bg-white/10 border border-white/20 text-white rounded-full hover:bg-white/20 transition"
              >
                Explore Features
              </button>
            </div>

            <div className="mt-8 sm:mt-12 flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center">
                🏗️
              </div>
              <div className="text-sm text-white/90">
                Professional-grade estimates — trusted by tile shops.
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="bg-white/10 p-6 rounded-2xl shadow-inner backdrop-blur">
              {/* Illustration placeholder */}
              <svg
                viewBox="0 0 600 400"
                className="w-full h-64 sm:h-80"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="10"
                  y="10"
                  width="580"
                  height="380"
                  rx="20"
                  fill="rgba(255,255,255,0.06)"
                />
                <g
                  fill="none"
                  stroke="#fff"
                  strokeOpacity="0.9"
                  strokeWidth="1.2"
                >
                  <path d="M80 320 L120 120 L200 160 L260 80 L340 220 L420 140 L500 300" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Header
          title="Home"
          description="Explore Jasim Tiles features and tools"
        />

        {/* Features */}
        <section ref={featuresRef} id="features" className="mt-8">
          <h2 className="text-2xl font-semibold">Features</h2>
          <p className="mt-2 text-slate-600">
            All tools available in one place — click to open any calculator.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {FEATURES.map((f) => (
              <div
                key={f.href}
                className="bg-white border rounded-xl p-4 shadow hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{f.title}</h3>
                    <p className="text-sm text-slate-600">{f.desc}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end">
                  <Link
                    href={f.href}
                    className="text-sm inline-flex items-center gap-2 px-3 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition"
                  >
                    Open Tool
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Access */}
        <section className="mt-10">
          <h3 className="text-xl font-semibold">Quick Access</h3>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              href="/washroom-calculator"
              className="px-4 py-6 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition"
            >
              Washroom
            </Link>
            <Link
              href="/single-wall"
              className="px-4 py-6 bg-indigo-600 text-white rounded-lg text-center hover:bg-indigo-700 transition"
            >
              Single Wall
            </Link>
            <Link
              href="/floor"
              className="px-4 py-6 bg-sky-600 text-white rounded-lg text-center hover:bg-sky-700 transition"
            >
              Floor
            </Link>
            <Link
              href="/receipt"
              className="px-4 py-6 bg-emerald-600 text-white rounded-lg text-center hover:bg-emerald-700 transition"
            >
              Receipt
            </Link>
          </div>
        </section>

        {/* How it works */}
        <section className="mt-10">
          <h3 className="text-xl font-semibold">How It Works</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { title: "Enter Dimensions", icon: "📐" },
              { title: "Choose Tile Size", icon: "🧱" },
              { title: "Calculate Quantity", icon: "🔢" },
              { title: "Generate Cost & Receipt", icon: "📄" },
            ].map((s) => (
              <div
                key={s.title}
                className="bg-white p-4 rounded-lg shadow flex flex-col items-center text-center"
              >
                <div className="text-3xl">{s.icon}</div>
                <h4 className="mt-3 font-semibold">{s.title}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* Statistics */}
        <section className="mt-10">
          <h3 className="text-xl font-semibold">Statistics</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
            <StatCard
              title="Accurate Calculations"
              value={`${counters.accuracy}%`}
            />
            <StatCard
              title="Fast Estimation"
              value={`${counters.speed}+ ops/min`}
            />
            <StatCard
              title="Multiple Calculators"
              value={`${counters.tools}`}
            />
            <StatCard
              title="Professional Receipts"
              value={`${counters.receipts}+`}
              highlight
            />
          </div>
        </section>

        {/* Totals summary (preserve existing dashboard functionality) */}
        <section className="mt-10">
          <h3 className="text-xl font-semibold">Your Recent Totals</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              title="Total Area"
              value={`${totals.area.toFixed ? totals.area.toFixed(2) : totals.area} sq ft`}
            />
            <StatCard title="Total Tiles" value={`${totals.tiles || 0}`} />
            <StatCard title="Total Boxes" value={`${totals.boxes || 0}`} />
            <StatCard
              title="Total Cost"
              value={formatCurrency(totals.cost)}
              highlight
            />
          </div>
        </section>

        {/* Why Choose */}
        <section className="mt-10">
          <h3 className="text-xl font-semibold">Why Choose Jasim Tiles</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold">Easy to use</h4>
              <p className="text-sm text-slate-600 mt-2">
                Clear UI for quick input and results — works on mobile.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold">Accurate calculations</h4>
              <p className="text-sm text-slate-600 mt-2">
                Built-in formulas and validation to reduce errors.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold">Time saving</h4>
              <p className="text-sm text-slate-600 mt-2">
                Estimate materials and costs in minutes, not hours.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 bg-gradient-to-r from-sky-50 to-white p-6 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Ready to Calculate Tiles?</h3>
            <p className="text-sm text-slate-600 mt-1">
              Start with the Washroom Calculator and explore other tools.
            </p>
          </div>
          <div>
            <Link
              href="/washroom-calculator"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Start Now
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
