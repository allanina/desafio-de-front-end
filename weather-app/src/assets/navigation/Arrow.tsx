import type { SVGProps } from "react";

import ArrowUp from "../../assets/navigation/ArrowUp";

interface ArrowProps extends SVGProps<SVGSVGElement> {
  direction?: "up" | "down" | "left" | "right";
}

const rotations = {
  up: "0deg",
  right: "90deg",
  down: "180deg",
  left: "-90deg",
};

export function Arrow({
  direction = "up",
  style,
  ...props
}: ArrowProps) {
  return (
    <ArrowUp
      {...props}
      style={{
        transform: `rotate(${rotations[direction]})`,
        ...style,
      }}
    />
  );
}