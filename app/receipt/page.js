"use client";

import React, { useRef, useState } from "react";
import Header from "../components/Header";

export default function ReceiptPage() {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [totalMeter, setTotalMeter] = useState("");
  const [tileSize, setTileSize] = useState("");
  const [tilesRequired, setTilesRequired] = useState("");
  const [boxesRequired, setBoxesRequired] = useState("");
  const [ratePerMeter, setRatePerMeter] = useState("");
  const [totalCost, setTotalCost] = useState("");

  const receiptRef = useRef(null);
  const [pdfLoading, setPdfLoading] = useState(false);

  const printReceipt = () => {
    window.print();
  };

  const downloadPdf = () => {
    // Try to generate a PDF client-side (html2canvas + jsPDF). If loading fails,
    // fall back to the browser print dialog where user can "Save as PDF".
    (async () => {
      setPdfLoading(true);
      const loadScript = (src) =>
        new Promise((resolve, reject) => {
          if (document.querySelector(`script[src="${src}"]`)) return resolve();
          const s = document.createElement("script");
          s.src = src;
          s.async = true;
          s.onload = resolve;
          s.onerror = reject;
          document.body.appendChild(s);
        });

      try {
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
        );
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
        );

        const html2canvas = window.html2canvas;
        const jspdfGlobal = window.jspdf || window.jspdf;

        if (!html2canvas || !jspdfGlobal)
          throw new Error("PDF libs not available");

        // Clone the receipt DOM and inline computed styles to avoid unsupported CSS
        // (like lab() color functions) that html2canvas may choke on.
        const orig = receiptRef.current;
        if (!orig) throw new Error("Receipt element not found");

        const clone = orig.cloneNode(true);

        const inlineStyles = (source, target) => {
          if (!source || source.nodeType !== 1) return;
          const cs = window.getComputedStyle(source);

          // Helper: normalize color strings (convert lab() etc to rgb/hex) using canvas
          const normalizeColor = (colorStr) => {
            if (!colorStr) return colorStr;
            try {
              // If gradient or complex value, return empty so we fallback
              if (colorStr.includes("gradient") || colorStr === "transparent")
                return "";
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              ctx.fillStyle = "#000"; // ensure valid context
              ctx.fillStyle = colorStr;
              return ctx.fillStyle; // normalized string (rgb(...) or #rrggbb)
            } catch (e) {
              return colorStr;
            }
          };

          // Inline only essential visual properties; avoid complex CSS like gradients
          try {
            // Remove background-image/gradients to avoid parsing issues
            if (cs.backgroundImage && cs.backgroundImage !== "none") {
              target.style.backgroundImage = "none";
              // fallback to solid background color (normalized)
              target.style.backgroundColor =
                normalizeColor(cs.backgroundColor) || "#ffffff";
            } else {
              const bg = normalizeColor(cs.backgroundColor);
              if (bg) target.style.backgroundColor = bg;
            }

            const col = normalizeColor(cs.color);
            if (col) target.style.color = col;

            target.style.fontFamily = cs.fontFamily;
            target.style.fontSize = cs.fontSize;
            target.style.fontWeight = cs.fontWeight;
            target.style.lineHeight = cs.lineHeight;
            target.style.textAlign = cs.textAlign;
            target.style.padding = cs.padding;
            target.style.margin = cs.margin;

            // Normalize border color if present
            if (cs.borderColor) {
              const bcol = normalizeColor(cs.borderColor);
              if (bcol) target.style.border = `1px solid ${bcol}`;
            }

            target.style.boxShadow = "none";
          } catch (e) {
            // ignore any style assignment errors
          }

          const sChildren = Array.from(source.children || []);
          const tChildren = Array.from(target.children || []);
          for (let i = 0; i < sChildren.length; i++) {
            inlineStyles(sChildren[i], tChildren[i]);
          }
        };

        inlineStyles(orig, clone);

        // Put clone offscreen so it inherits no problematic global styles
        const wrapper = document.createElement("div");
        wrapper.style.position = "fixed";
        wrapper.style.left = "-9999px";
        wrapper.style.top = "0";
        wrapper.appendChild(clone);
        document.body.appendChild(wrapper);

        const canvas = await html2canvas(clone, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL("image/png");

        const pdfWidth = canvas.width;
        const pdfHeight = canvas.height;

        const jsPDF = jspdfGlobal.jsPDF || jspdfGlobal;
        const pdf = new jsPDF({ unit: "px", format: [pdfWidth, pdfHeight] });
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("receipt.pdf");

        // cleanup
        document.body.removeChild(wrapper);
      } catch (err) {
        console.error("PDF generation failed, falling back to print:", err);
        window.print();
      } finally {
        setPdfLoading(false);
      }
    })();
  };

  return (
    <div className="bg-white min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <Header
          title="Receipt"
          description="Generate customer receipts for orders."
        />

        <div className="bg-white rounded-lg shadow-md border p-5 mt-4 no-print">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Customer Name
              </label>
              <input
                className="mt-1 block w-full rounded-md border px-3 py-2"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Phone Number
              </label>
              <input
                className="mt-1 block w-full rounded-md border px-3 py-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">
                Address
              </label>
              <input
                className="mt-1 block w-full rounded-md border px-3 py-2"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Area (sq ft)
              </label>
              <input
                className="mt-1 block w-full rounded-md border px-3 py-2"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Total Meter
              </label>
              <input
                className="mt-1 block w-full rounded-md border px-3 py-2"
                value={totalMeter}
                onChange={(e) => setTotalMeter(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Tile Size
              </label>
              <input
                className="mt-1 block w-full rounded-md border px-3 py-2"
                value={tileSize}
                onChange={(e) => setTileSize(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Tiles Required
              </label>
              <input
                className="mt-1 block w-full rounded-md border px-3 py-2"
                value={tilesRequired}
                onChange={(e) => setTilesRequired(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Boxes Required
              </label>
              <input
                className="mt-1 block w-full rounded-md border px-3 py-2"
                value={boxesRequired}
                onChange={(e) => setBoxesRequired(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Rate Per Meter
              </label>
              <input
                className="mt-1 block w-full rounded-md border px-3 py-2"
                value={ratePerMeter}
                onChange={(e) => setRatePerMeter(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Total Cost
              </label>
              <input
                className="mt-1 block w-full rounded-md border px-3 py-2"
                value={totalCost}
                onChange={(e) => setTotalCost(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4 flex gap-2 justify-end">
            <button
              onClick={printReceipt}
              className="px-4 py-2 rounded bg-blue-600 text-white no-print"
            >
              Print Receipt
            </button>
            <button
              onClick={downloadPdf}
              className="px-4 py-2 rounded border no-print flex items-center gap-2"
              disabled={pdfLoading}
            >
              {pdfLoading ? (
                <span>Generating...</span>
              ) : (
                <span>Download PDF</span>
              )}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div
          id="receipt"
          ref={receiptRef}
          className="mt-6 p-6 bg-white border rounded shadow-md"
        >
          <div className="text-center">
            <div className="text-2xl font-bold">Jasim Tiles</div>
            <div className="text-sm text-slate-600">Customer Receipt</div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2">
            <div>
              <strong>Customer:</strong> {customerName || "-"}
            </div>
            <div>
              <strong>Phone:</strong> {phone || "-"}
            </div>
            <div>
              <strong>Address:</strong> {address || "-"}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <strong>Tile Size</strong>
              <div className="text-sm text-slate-700">{tileSize || "-"}</div>
            </div>
            <div>
              <strong>Area</strong>
              <div className="text-sm text-slate-700">{area || "-"}</div>
            </div>
            <div>
              <strong>Tiles</strong>
              <div className="text-sm text-slate-700">
                {tilesRequired || "-"}
              </div>
            </div>
            <div>
              <strong>Boxes</strong>
              <div className="text-sm text-slate-700">
                {boxesRequired || "-"}
              </div>
            </div>
            <div>
              <strong>Rate</strong>
              <div className="text-sm text-slate-700">
                {ratePerMeter || "-"}
              </div>
            </div>
            <div>
              <strong>Cost</strong>
              <div className="text-sm text-slate-700">{totalCost || "-"}</div>
            </div>
          </div>

          <div className="mt-6 text-right text-xl font-bold">
            Grand Total:{" "}
            {totalCost
              ? `Rs ${Number(totalCost).toLocaleString("en-PK")}`
              : "-"}
          </div>
        </div>
      </div>
    </div>
  );
}
