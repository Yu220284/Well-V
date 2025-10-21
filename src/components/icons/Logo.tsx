import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="40"
      height="40"
      aria-label="うぇるぶい Logo"
      {...props}
    >
      <defs>
        <linearGradient id="calmGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "hsl(var(--secondary))", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M50,95 C25.16,95 5,74.84 5,50 C5,25.16 25.16,5 50,5 C74.84,5 95,25.16 95,50 C95,74.84 74.84,95 50,95 Z"
        fill="url(#calmGradient)"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="2"
      />
      <path
        d="M30 50 C30 44.477 34.477 40 40 40 C45.523 40 50 44.477 50 50 C50 55.523 54.477 60 60 60 C65.523 60 70 55.523 70 50"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
}
