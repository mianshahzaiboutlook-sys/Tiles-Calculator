import React from "react";

export default function Header({ title, description }) {
  return (
    <header className="mb-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-pink-500 to-indigo-600">
          {title}
        </h1>
        <p className="mt-2 text-slate-600">
          <span className="inline-block px-2 py-0.5 rounded text-xs bg-amber-50 text-amber-700 mr-2">
            Jasim Tiles
          </span>
          {description}
        </p>
      </div>
    </header>
  );
}
