import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="40"
      height="40"
      aria-label="Well-V Logo"
      {...props}
    >
      <defs>
        <clipPath id="clip-left">
          <path d="M0,0 L100,0 L0,100 Z" />
        </clipPath>
        <clipPath id="clip-right">
          <path d="M100,0 L100,100 L0,100 Z" />
        </clipPath>
      </defs>
      
      <path 
        d="M50 95C25 80 5 60 5 40C5 20 25 5 50 25C75 5 95 20 95 40C95 60 75 80 50 95Z"
        fill="hsl(var(--secondary))"
        clipPath="url(#clip-left)"
      />
      <path 
        d="M50 95C25 80 5 60 5 40C5 20 25 5 50 25C75 5 95 20 95 40C95 60 75 80 50 95Z"
        fill="hsl(var(--accent))"
        clipPath="url(#clip-right)"
      />
      
      <path
        d="M75,30 L78,22 L81,30 L89,33 L81,36 L78,44 L75,36 L67,33 Z"
        fill="hsl(var(--primary-foreground))"
      />
    </svg>
  );
}
