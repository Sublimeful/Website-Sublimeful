import { useEffect, useRef, useState } from "react";

export default function CursorDog() {
  const requestRef = useRef<number>(null);
  const mousePos = useRef<{ x: number; y: number }>({ x: -32, y: -32 });
  const dogSpeed = useRef(2);
  const [dogPos, setDogPos] = useState<{ x: number; y: number }>({
    x: -32,
    y: -32,
  });
  const [facing, setFacing] = useState<"left" | "right">("left");
  const dogState = useRef<"idle" | "walking">("idle");
  // Frame -3 = sitting, Frames 0 to -2 = walking
  const [frame, setFrame] = useState(0);

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

  function getNormDirVec(
    vectorA: { x: number; y: number },
    vectorB: { x: number; y: number },
  ) {
    const dist = getDist(vectorA, vectorB);
    const dirVec = getDirVec(vectorA, vectorB);
    return { x: dirVec.x / dist, y: dirVec.y / dist };
  }

  function follow() {
    const dist = getDist(dogPos, mousePos.current);

    switch (dogState.current) {
      case "idle":
        if (dist > 100) {
          dogState.current = "walking";
        }
        break;
      case "walking":
        if (dist > 1) {
          const normDirVec = getNormDirVec(dogPos, mousePos.current);
          const newX =
            dogPos.x - normDirVec.x * Math.min(dist, dogSpeed.current);
          const newY =
            dogPos.y - normDirVec.y * Math.min(dist, dogSpeed.current);
          const newDogPos = { x: newX, y: newY };
          setDogPos(newDogPos);
        } else {
          dogState.current = "idle";
        }
        break;
    }
  }

  function animate(time: number) {
    if (dogPos.x - mousePos.current.x > 0) setFacing("right");
    else setFacing("left");

    switch (dogState.current) {
      case "idle":
        setFrame(-3);
        break;
      case "walking":
        if (frame === -3) setFrame(0);
        else if (Math.trunc(time * 1000) % 500 === 0) setFrame((frame - 1) % 3);
        break;
    }
  }

  function update(time: number) {
    follow();
    animate(time);
    requestRef.current = requestAnimationFrame(update);
  }

  useEffect(() => {
    function updateMousePos(e: MouseEvent) {
      mousePos.current = {
        x: e.x,
        y: e.y,
      };
    }

    addEventListener("mousemove", updateMousePos);
    requestRef.current = requestAnimationFrame(update);
    return () => {
      removeEventListener("mousemove", updateMousePos);
      cancelAnimationFrame(requestRef.current);
    };
  }, [dogPos, frame, facing]);

  return (
    <div
      className="fixed w-[32px] h-[32px] pointer-events-none pixelate bg-[url('/dog.png')]"
      style={{
        top: `${dogPos.y}px`,
        left: `${dogPos.x}px`,
        backgroundPosition: `${frame * 32}px`,
        transform: facing === "left" ? "scaleX(1)" : "scaleX(-1)",
      }}
    ></div>
  );
}
