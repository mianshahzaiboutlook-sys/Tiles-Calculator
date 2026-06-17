"use client";

import React from "react";
import Header from "../components/Header";

export default function About() {
  return (
    <div className="bg-white min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <Header
          title="About"
          description="Jasim Tiles — built with Next.js and Tailwind."
        />
        <div className="mt-4 text-slate-700">
          <section className="px-4 sm:px-6 py-8">
            <h2 className="text-2xl sm:text-4xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-pink-500 to-indigo-600">
              About Me
            </h2>

            <div className="bg-slate-900 p-4 sm:p-8 rounded-2xl shadow-lg text-slate-300">
              <div className="flex items-start gap-4 sm:gap-6 flex-col sm:flex-row">
                <div className="shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                    MS
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-base sm:text-lg leading-7">
                    Hello! My name is{" "}
                    <span className="font-semibold text-white">
                      Mian Shahzaib
                    </span>
                    . I am a MERN Stack Developer focused on building modern,
                    responsive web applications. I trained at PNY Trainings in
                    Lahore and work with MongoDB, Express, React, and Node.
                  </p>

                  <p className="text-base sm:text-lg leading-7 mt-3">
                    I enjoy creating practical software like this Tile Shop
                    Calculator — it helps estimate tile quantities and costs for
                    washrooms, kitchens, and rooms quickly and accurately.
                  </p>

                  <p className="text-base sm:text-lg leading-7 mt-3">
                    I'm always learning and open to collaborating on useful
                    projects that solve real problems.
                  </p>

                  <div className="mt-4">
                    <h3 className="text-lg sm:text-2xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-600">
                      Skills
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                      {[
                        "HTML",
                        "CSS",
                        "JavaScript",
                        "React",
                        "Next.js",
                        "Node.js",
                        "Express",
                        "MongoDB",
                        "Tailwind",
                      ].map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center justify-center px-3 py-3 sm:py-1 text-xs sm:text-sm bg-blue-600 rounded-md"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
