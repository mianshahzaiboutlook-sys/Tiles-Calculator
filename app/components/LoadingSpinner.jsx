import React from "react";

export default function LoadingSpinner({ size = 20 }) {
  return (
    <svg
      className="animate-spin"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="#c7d2fe" strokeWidth="4" />
      <path
        d="M22 12a10 10 0 00-10-10"
        stroke="#1e3a8a"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
