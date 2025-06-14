"use client";

import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import CategoryCard from "./components/CategoryCard";
import { useState } from "react";

const proteins = [
  "Chicken Breast",
  "Chicken Thigh",
  "Chicken Wing",
  "Shrimp",
  "Fish",
  "Pork Chop",
  "Pork Tenderloin",
  "Ground Pork",
  "Ground Beef",
  "Steak",
  "Bratwurst",
  "Ground Sausage",
  "Sausage",
];

const carbs = ["Potatoes", "Pasta", "Rice", "Grits", "Bread"];

const cuisines = [
  "American",
  "Mexican",
  "Indian",
  "Greek",
  "Middle Eastern",
  "Irish",
  "Japanese",
  "Chinese",
  "Korean",
  "Italian",
  "Cajun",
  "Creole",
  "German",
];

export default function Home() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [isSpinningProtein, setIsSpinningProtein] = useState(false);
  const [isSpinningCarb, setIsSpinningCarb] = useState(false);
  const [isSpinningCuisine, setIsSpinningCuisine] = useState(false);
  const [selectedProtein, setSelectedProtein] = useState(proteins[0]);
  const [selectedCarb, setSelectedCarb] = useState(carbs[0]);
  const [selectedCuisine, setSelectedCuisine] = useState(cuisines[0]);

  const getRandomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const spinSingle = (setIsSpinning, setSelected, array) => {
    setIsSpinning(true);
    let spins = 0;
    const maxSpins = 20;
    const interval = setInterval(() => {
      setSelected(getRandomItem(array));
      spins++;
      if (spins >= maxSpins) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 100);
  };

  const spin = () => {
    setIsSpinning(true);
    let spins = 0;
    const maxSpins = 20;
    const interval = setInterval(() => {
      setSelectedProtein(getRandomItem(proteins));
      setSelectedCarb(getRandomItem(carbs));
      setSelectedCuisine(getRandomItem(cuisines));

      spins++;
      if (spins >= maxSpins) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 100);
  };

  return (
    <div className="min-h-svh flex flex-col items-center justify-center">
      <main className="grid grid-cols-1 gap-8 lg:gap-12 justify-items-center">
        <h1 className="text-lg lg:text-xl uppercase tracking-widest text-center text-neutral-700 h-8 lg:h-12 flex items-center justify-center">
          Dinner Configurator 9000
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          <CategoryCard
            title="Cuisine"
            selected={selectedCuisine}
            isSpinning={isSpinning}
            isSpinningCategory={isSpinningCuisine}
            onSpin={() =>
              spinSingle(setIsSpinningCuisine, setSelectedCuisine, cuisines)
            }
            color="text-amber-600"
          />
          <CategoryCard
            title="Protein"
            selected={selectedProtein}
            isSpinning={isSpinning}
            isSpinningCategory={isSpinningProtein}
            onSpin={() =>
              spinSingle(setIsSpinningProtein, setSelectedProtein, proteins)
            }
            color="text-cyan-600"
          />

          <CategoryCard
            title="Carb"
            selected={selectedCarb}
            isSpinning={isSpinning}
            isSpinningCategory={isSpinningCarb}
            onSpin={() => spinSingle(setIsSpinningCarb, setSelectedCarb, carbs)}
            color="text-lime-600"
          />
        </div>

        <button
          onClick={spin}
          disabled={
            isSpinning ||
            isSpinningProtein ||
            isSpinningCarb ||
            isSpinningCuisine
          }
          className={`h-8 lg:h-12 w-64 lg:w-72 old-button flex items-center justify-center uppercase tracking-wider text-sm space-x-3 ${
            isSpinning ||
            isSpinningProtein ||
            isSpinningCarb ||
            isSpinningCuisine
              ? "cursor-not-allowed text-neutral-400"
              : "cursor-pointer"
          }`}
        >
          {isSpinning ? (
            <>
              <ArrowPathIcon className="w-4 h-4 inline-block mr-3 animate-spin" />
              Spin All Categories
            </>
          ) : (
            <>
              <ArrowPathIcon className="w-4 h-4 inline-block mr-3" />
              Spin All Categories
            </>
          )}
        </button>
        <button
          onClick={() => {
            const result = `${selectedCuisine} ${selectedProtein} and ${selectedCarb} recipe`;
            window.open(
              `https://www.google.com/search?q=${encodeURIComponent(result)}`,
              "_blank"
            );
          }}
          className="h-8 lg:h-12 w-48 cursor-pointer old-button flex items-center justify-center uppercase tracking-wider text-sm space-x-3"
        >
          <MagnifyingGlassIcon className="w-4 h-4 inline-block mr-2" />
          Search Result
        </button>
      </main>
    </div>
  );
}
