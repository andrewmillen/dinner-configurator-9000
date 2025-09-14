
import {
  CheckIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

export default function ConfigScreen({ onSave, onCancel, proteins, carbs, cuisines }) {
  const [config, setConfig] = useState({
    proteins: new Set(proteins),
    carbs: new Set(carbs),
    cuisines: new Set(cuisines),
  });

  useEffect(() => {
    const savedConfig = localStorage.getItem("dinnerConfig");
    if (savedConfig) {
      const parsed = JSON.parse(savedConfig);
      setConfig({
        proteins: new Set(parsed.proteins),
        carbs: new Set(parsed.carbs),
        cuisines: new Set(parsed.cuisines),
      });
    }
  }, [proteins, carbs, cuisines]);

  const handleToggleAll = (category, items) => {
    setConfig((prev) => ({
      ...prev,
      [category]: prev[category].size === items.length ? new Set() : new Set(items),
    }));
  };

  const handleToggleItem = (category, item) => {
    setConfig((prev) => {
      const newSet = new Set(prev[category]);
      if (newSet.has(item)) {
        newSet.delete(item);
      } else {
        newSet.add(item);
      }
      return { ...prev, [category]: newSet };
    });
  };

  const handleSave = () => {
    if (config.proteins.size === 0 || config.carbs.size === 0 || config.cuisines.size === 0) {
      alert("Please select at least one option in each category");
      return;
    }

    const newConfig = {
      proteins: Array.from(config.proteins),
      carbs: Array.from(config.carbs),
      cuisines: Array.from(config.cuisines),
    };

    localStorage.setItem("dinnerConfig", JSON.stringify(newConfig));
    onSave(newConfig);
  };

  return (
    <div className="min-h-svh p-8 flex flex-col bg-neutral-400/60">

      <div className="flex-1 flex gap-20 items-center justify-center overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {[
          { title: "Proteins", items: proteins, key: "proteins" },
          { title: "Carbs", items: carbs, key: "carbs" },
          { title: "Cuisines", items: cuisines, key: "cuisines" },
        ].map(({ title, items, key }) => (
          <div key={key} className="mb-8 border-2 bg-neutral-300 outline-1 border-neutral-400 border-l-neutral-200 border-t-neutral-200 outline-neutral-500 p-2 w-64 lg:w-72 h-128 overflow-y-scroll">
              <h3 className="text-xs tracking-widest uppercase w-full text-center text-neutral-800 mt-2 mb-4">{title}</h3>
            <div className="w-full items-center mb-2">
                <label className="h-12 w-full old-button flex items-center gap-2 p-2">
                <input
                  type="checkbox"
                  checked={config[key].size === items.length}
                  onChange={() => handleToggleAll(key, items)}
                  className="appearance-none size-4 border border-neutral-800 rounded-xs bg-neutral-300 checked:bg-neutral-800 focus:outline-none cursor-pointer peer"
                />
                  <span className="text-sm text-neutral-500 peer-checked:text-neutral-800">All</span>
              </label>
            </div>
            <div className="">
              {items.map((item) => {
                let checkedBg = "";
                if (key === "cuisines") checkedBg = "checked:bg-lime-600";
                else if (key === "carbs") checkedBg = "checked:bg-cyan-600";
                else checkedBg = "checked:bg-amber-600";
                return (
                  <label key={item} className="h-12 w-full old-button flex items-center gap-2 p-2">
                    <input
                      type="checkbox"
                      checked={config[key].has(item)}
                      onChange={() => handleToggleItem(key, item)}
                      className={`appearance-none size-4 border border-neutral-800 rounded-xs bg-neutral-300 focus:outline-none cursor-pointer peer ${checkedBg}`}
                    />
                    <span className="text-sm text-neutral-500 peer-checked:text-neutral-800">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button onClick={onCancel} className="old-button flex items-center h-12 px-8 uppercase tracking-wider text-sm gap-3">
          <XMarkIcon className="w-4 h-4 inline-block" />
          Cancel
        </button>
        <button onClick={handleSave} className="old-button flex items-center h-12 px-8 uppercase tracking-wider text-sm gap-3">
          <CheckIcon className="w-4 h-4 inline-block" />
          Save
        </button>
      </div>
    </div>
  );
}
