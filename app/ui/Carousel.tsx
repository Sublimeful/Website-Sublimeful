"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

// Given a list of children links, create a carousel component that displays them in a horizontal scrollable view.
export default function Carousel(
  { children, className, autoScroll }: {
    children: React.ReactNode[];
    className?: string;
    autoScroll?: boolean;
  },
) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = children.length;

  const [autoScrollTimeout, setAutoScrollTimeout] = useState<
    NodeJS.Timeout | null
  >(null);

  function prevItem() {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  }
  function nextItem() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  }

  useEffect(() => {
    // Auto-scroll functionality
    if (!autoScroll) return;
    if (autoScrollTimeout) return;
    const interval = setInterval(() => {
      nextItem();
    }, 5000);
    return () => clearInterval(interval);
  }, [autoScroll, autoScrollTimeout, totalItems]);

  return (
    <div className={`flex flex-row w-min relative items-center ${className}`}>
      {/* Previous button */}
      <button
        type="button"
        className="w-8 h-9 cursor-pointer mr-6"
        onClick={() => {
          setAutoScrollTimeout(setTimeout(() => {
            setAutoScrollTimeout(null);
          }, 3000));
          prevItem();
        }}
      >
        <Image
          width={32}
          height={32}
          src="/chevron-left.svg"
          alt="Previous Item"
          className="filter-[invert()] dark:filter-[invert(0)]"
        />
      </button>
      <div className="flex flex-row w-[400px] overflow-hidden">
        {/* Carousel items */}
        <div
          className="flex flex-row"
          style={{
            transform: `translateX(-${currentIndex * 400}px)`,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          {children}
        </div>
      </div>
      {/* Next button */}
      <button
        type="button"
        className="w-8 h-9 cursor-pointer ml-6"
        onClick={() => {
          setAutoScrollTimeout(setTimeout(() => {
            setAutoScrollTimeout(null);
          }, 3000));
          nextItem();
        }}
      >
        <Image
          width={32}
          height={32}
          src="/chevron-right.svg"
          alt="Next Item"
          className="filter-[invert()] dark:filter-[invert(0)]"
        />
      </button>
    </div>
  );
}
