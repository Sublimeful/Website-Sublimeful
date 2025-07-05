import { useCallback, useEffect, useRef, useState } from "react";
import usePersistentState from "../hooks/usePersistentState";

interface CursorDogProps {
  mousePos: { x: number; y: number };
}

export default function CursorDog({ mousePos }: CursorDogProps) {
  const requestRef = useRef<number>(null);
  const dogSpeed = useRef(2);
  const [dogPos, setDogPos] = usePersistentState<{ x: number; y: number }>(
    "dogPos",
    {
      x: -32,
      y: -32,
    },
  );
  const [facing, setFacing] = useState<"left" | "right">("left");
  const dogState = useRef<"idle" | "walking">("idle");
  // Frame -3 = sitting, Frames 0 to -2 = walking
  const [frame, setFrame] = useState(0);
  const [prevFrameTime, setPrevFrameTime] = useState(0);

  function getDist(
    vectorA: { x: number; y: number },
    vectorB: { x: number; y: number },
  ) {
    return Math.sqrt(
      Math.pow(vectorA.x - vectorB.x, 2) + Math.pow(vectorA.y - vectorB.y, 2),
    );
  }

  function getDirVec(
    vectorA: { x: number; y: number },
    vectorB: { x: number; y: number },
  ) {
    return {
      x: vectorA.x - vectorB.x,
      y: vectorA.y - vectorB.y,
    };
  }

  const getNormDirVec = useCallback((
    vectorA: { x: number; y: number },
    vectorB: { x: number; y: number },
  ) => {
    const dist = getDist(vectorA, vectorB);
    const dirVec = getDirVec(vectorA, vectorB);

    return { x: dirVec.x / dist, y: dirVec.y / dist };
  }, []);

  const follow = useCallback(() => {
    const dist = getDist(dogPos, mousePos);

    switch (dogState.current) {
      case "idle":
        if (dist > 100) {
          dogState.current = "walking";
        }
        break;
      case "walking":
        if (dist > 1) {
          const normDirVec = getNormDirVec(dogPos, mousePos);

          const newX = dogPos.x -
            normDirVec.x * Math.min(dist, dogSpeed.current);
          const newY = dogPos.y -
            normDirVec.y * Math.min(dist, dogSpeed.current);

          setDogPos({ x: newX, y: newY });
        } else {
          dogState.current = "idle";
        }
        break;
    }
  }, [dogPos, getNormDirVec, mousePos, setDogPos]);

  const animate = useCallback((time: number) => {
    if (dogPos.x - mousePos.x > 0) setFacing("right");
    else setFacing("left");

    switch (dogState.current) {
      case "idle":
        setFrame(-3);
        break;
      case "walking":
        if (frame === -3) setFrame(0);
        else if (time - prevFrameTime > 75) {
          setPrevFrameTime(time);
          setFrame((f) => (f - 1) % 3);
        }
        break;
    }
  }, [dogPos, frame, mousePos, prevFrameTime]);

  const update = useCallback((time: number) => {
    follow();
    animate(time);
  }, [animate, follow]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [mousePos, dogPos, frame, update]);

  return (
    <div
      className="fixed z-50 w-[32px] h-[32px] pointer-events-none pixelate bg-[url('/dog.png')]"
      style={{
        top: `${dogPos.y}px`,
        left: `${dogPos.x}px`,
        backgroundPosition: `${frame * 32}px`,
        transform: facing === "left" ? "scaleX(1)" : "scaleX(-1)",
      }}
    >
    </div>
  );
}
