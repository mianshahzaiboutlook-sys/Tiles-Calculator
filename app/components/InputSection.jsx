import React from "react";

export default function InputSection({ title, icon, children }) {
  return (
    <section className="p-4 border rounded-lg shadow-sm bg-white">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-blue-600 bg-blue-50 rounded-md p-2">{icon}</div>
        <h3 className="text-sm font-medium text-slate-800">{title}</h3>
      </div>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
