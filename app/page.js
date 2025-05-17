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

const starches = ["Potatoes", "Pasta", "Rice", "Grits", "Bread"];

const cuisines = [
  "American",
  "Mexican",
  "Indian",
  "Mediterranean",
  "Middle Eastern",
  "Irish",
  "Asian",
  "Italian",
  "Cajun",
  "Creole",
  "German",
];

export default function Home() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [isSpinningProtein, setIsSpinningProtein] = useState(false);
  const [isSpinningStarch, setIsSpinningStarch] = useState(false);
  const [isSpinningCuisine, setIsSpinningCuisine] = useState(false);
  const [selectedProtein, setSelectedProtein] = useState(proteins[0]);
  const [selectedStarch, setSelectedStarch] = useState(starches[0]);
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
      setSelectedStarch(getRandomItem(starches));
      setSelectedCuisine(getRandomItem(cuisines));

      spins++;
      if (spins >= maxSpins) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center md:justify-center">
      <main className="w-full max-w-5xl mx-auto">
        <h1 className="text-xl sm:text-3xl lg:text-4xl text-center mb-5 sm:mb-8 lg:mb-12 text-neutral-700 dark:text-white">
          Dinner Configurator 9000
        </h1>

        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 items-center">
          <CategoryCard
            title="Protein"
            selected={selectedProtein}
            isSpinning={isSpinning}
            isSpinningCategory={isSpinningProtein}
            onSpin={() =>
              spinSingle(setIsSpinningProtein, setSelectedProtein, proteins)
            }
            color="text-amber-600 dark:text-amber-500"
          />

          <CategoryCard
            title="Starch"
            selected={selectedStarch}
            isSpinning={isSpinning}
            isSpinningCategory={isSpinningStarch}
            onSpin={() =>
              spinSingle(setIsSpinningStarch, setSelectedStarch, starches)
            }
            color="text-sky-600 dark:text-sky-400"
          />

          <CategoryCard
            title="Cuisine"
            selected={selectedCuisine}
            isSpinning={isSpinning}
            isSpinningCategory={isSpinningCuisine}
            onSpin={() =>
              spinSingle(setIsSpinningCuisine, setSelectedCuisine, cuisines)
            }
            color="text-teal-600 dark:text-teal-400"
          />
        </div>

        <div className="text-center mt-5 sm:mt-8 lg:mt-12">
          <button
            onClick={spin}
            disabled={
              isSpinning ||
              isSpinningProtein ||
              isSpinningStarch ||
              isSpinningCuisine
            }
            className={`pl-7 pr-8 py-4 text-lg md:text-xl rounded-full transform inline-flex items-center space-x-3 ${
              isSpinning ||
              isSpinningProtein ||
              isSpinningStarch ||
              isSpinningCuisine
                ? "bg-neutral-100 text-neutral-400 dark:bg-neutral-900 dark:text-neutral-500 cursor-not-allowed"
                : "bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 hover:cursor-pointer hover:bg-neutral-700 dark:hover:bg-neutral-300"
            }`}
          >
            {isSpinning ? (
              <>
                <ArrowPathIcon className="w-5 h-5 inline-block mr-3 animate-spin" />
                Spin All Categories
              </>
            ) : (
              <>
                <ArrowPathIcon className="w-5 h-5 inline-block mr-3" />
                Spin All Categories
              </>
            )}
          </button>
          <div className="mt-4">
            <button
              onClick={() => {
                const result = `${selectedCuisine} ${selectedProtein} and ${selectedStarch} recipe`;
                window.open(
                  `https://www.google.com/search?q=${encodeURIComponent(
                    result
                  )}`,
                  "_blank"
                );
              }}
              className="pl-3 pr-4 py-2 text-sm rounded-full inline-flex items-center bg-neutral-200 dark:bg-neutral-800 dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-700 hover:cursor-pointer"
            >
              <MagnifyingGlassIcon className="w-4 h-4 inline-block mr-2" />
              Search Result
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
