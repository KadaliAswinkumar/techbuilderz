import { Suspense, useEffect, useState, type ComponentProps } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

type ThreeCanvasProps = ComponentProps<typeof Canvas>;

/** R3F requires a browser WebGL context — defer until after hydration (TanStack Start SSR). */
export function ThreeCanvas({ style, className, ...props }: ThreeCanvasProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={className ?? "absolute inset-0 h-full w-full"}
        style={style}
        aria-hidden
      />
    );
  }

  return (
    <Canvas
      className={className}
      style={{ width: "100%", height: "100%", display: "block", ...style }}
      frameloop="always"
      {...props}
    />
  );
}

export function SceneEnvironment() {
  return (
    <Suspense fallback={null}>
      <Environment preset="city" />
    </Suspense>
  );
}
