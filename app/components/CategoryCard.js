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
    <div className="bg-white dark:bg-black p-4 sm:p-6 text-center w-full max-w-sm border border-neutral-700 dark:border-neutral-100">
      <h2 className="text-xs sm:text-sm mb-1 sm:mb-2 text-neutral-800 dark:text-neutral-500 uppercase tracking-widest">
        {title}
      </h2>
      <div
        className={`text-xl sm:text-2xl mb-2 sm:mb-4 ${
          isSpinning || isSpinningCategory ? "text-neutral-400" : color
        }`}
      >
        {selected}
      </div>
      <button
        onClick={onSpin}
        disabled={isSpinning || isSpinningCategory}
        className={`p-3 rounded-full transform ${
          isSpinning || isSpinningCategory
            ? "bg-neutral-100 text-neutral-400 dark:bg-neutral-900 dark:text-neutral-500 cursor-not-allowed"
            : "bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-white hover:bg-neutral-300 hover:dark:bg-neutral-700 hover:cursor-pointer"
        }`}
      >
        <ArrowPathIcon
          className={`w-5 h-5 ${isSpinningCategory ? "animate-spin" : ""}`}
        />
      </button>
    </div>
  );
}
