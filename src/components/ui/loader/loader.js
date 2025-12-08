'use client'
import "./loader.css";
import { cn } from "@/lib/utils";

export function Loader({ isVisible }) {
  return (
    // this loader is from Uiverse.io by andrew-manzyk
    <div className={cn("loader z-100 backdrop-brightness-50", isVisible ? "visible" : "hidden")}>
      {[1, 2, 3].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <defs>
            <filter id="shine">
              <feGaussianBlur stdDeviation="3" />
            </filter>

            <mask id="mask">
              <path
                d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z"
                fill="white"
              />
            </mask>

            <radialGradient
              id="gradient-1"
              cx="50"
              cy="66"
              fx="50"
              fy="66"
              r="30"
              gradientTransform="translate(0 35) scale(1 0.5)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="black" stopOpacity="0.3" />
              <stop offset="50%" stopColor="black" stopOpacity="0.1" />
              <stop offset="100%" stopColor="black" stopOpacity="0" />
            </radialGradient>

            <radialGradient
              id="gradient-2"
              cx="55"
              cy="20"
              fx="55"
              fy="20"
              r="30"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="white" stopOpacity="0.3" />
              <stop offset="50%" stopColor="white" stopOpacity="0.1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="gradient-3" cx="85" cy="50" fx="85" fy="50" href="#gradient-2" />

            <radialGradient
              id="gradient-4"
              cx="50"
              cy="58"
              fx="50"
              fy="58"
              r="60"
              gradientTransform="translate(0 47) scale(1 0.2)"
              href="#gradient-3"
            />

            <linearGradient
              id="gradient-5"
              x1="50"
              y1="90"
              x2="50"
              y2="10"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="black" stopOpacity="0.2" />
              <stop offset="40%" stopColor="black" stopOpacity="0" />
            </linearGradient>
          </defs>

          <g>
            {Array(7).fill(0).map((_, j) => (
              <path
                key={j}
                d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z"
                fill={
                  [
                    "currentColor",
                    "url(#gradient-1)",
                    "none",
                    "url(#gradient-2)",
                    "url(#gradient-3)",
                    "url(#gradient-4)",
                    "url(#gradient-5)"
                  ][j]
                }
                stroke={j === 2 ? "white" : undefined}
                strokeWidth={j === 2 ? 3 : undefined}
                opacity={j === 2 ? 0.3 : undefined}
                filter={j === 2 ? "url(#shine)" : undefined}
                mask={j === 2 ? "url(#mask)" : undefined}
              />
            ))}
          </g>
        </svg>
      ))}
    </div>
  );
}
