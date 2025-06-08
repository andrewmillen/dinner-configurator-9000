"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function CategoryCard({
  title,
  selected,
  isSpinning,
  isSpinningCategory,
  onSpin,
  color,
}) {
  return (
    <button
      onClick={onSpin}
      disabled={isSpinning || isSpinningCategory}
      className={`w-64 lg:w-72 h-32 lg:h-48 p-1.5 pb-0 flex flex-col justify-center items-center old-button pointer-events-all group ${
        isSpinning || isSpinningCategory
          ? "cursor-not-allowed"
          : "cursor-pointer"
      }`}
    >
      <div className="w-full h-full bg-neutral-200 border-1 border-neutral-200 border-l-neutral-400 border-t-neutral-400 outline-1 outline-neutral-600 flex flex-col justify-center items-center pointer-events-none group-active:border-neutral-400 group-active:border-t-neutral-200 group-active:border-l-neutral-200">
        <h2 className="text-xs lg:mb-2 text-neutral-800 uppercase tracking-widest">
          {title}
        </h2>
        <div
          className={`text-xl lg:text-2xl tracking-tight ${
            isSpinning || isSpinningCategory ? "text-neutral-400" : color
          }`}
        >
          {selected}
        </div>
      </div>
      <div
        className={`py-3 lg:py-4 w-full flex justify-center items-center transform ${
          isSpinning || isSpinningCategory ? "text-neutral-500" : ""
        }`}
      >
        <ArrowPathIcon
          className={`w-5 h-5 ${isSpinningCategory ? "animate-spin" : ""}`}
        />
      </div>
    </button>
  );
}
