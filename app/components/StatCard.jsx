import React from "react";

export default function StatCard({
  title,
  value,
  subtitle,
  highlight = false,
}) {
  return (
    <div
      className={`p-4 rounded-lg shadow-md bg-white border transition transform hover:-translate-y-0.5 ${
        highlight ? "col-span-full md:col-span-2" : ""
      }`}
    >
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-sm font-medium text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-linear-to-r from-sky-500 to-indigo-600 inline-block" />
            {title}
          </div>
          <div
            className={`mt-1 ${highlight ? "text-2xl font-bold text-gradient" : "text-lg font-semibold text-slate-900"}`}
            style={
              highlight
                ? {
                    backgroundImage: "linear-gradient(90deg,#0ea5e9,#6366f1)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }
                : {}
            }
          >
            {value}
          </div>
          {subtitle && (
            <div className="text-xs text-slate-400 mt-1">{subtitle}</div>
          )}
        </div>
      </div>
    </div>
  );
}
