import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import flags from "emoji-flags";

const Dropdown = ({ countries = [], onSelect, isOpen, onToggle }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (country) => {
    setSelected(country);
    onSelect(country);
  };

  return (
    <div className="relative w-10">
      {/* Toggle Button */}
      <div
        className="py-1 rounded cursor-pointer bg-white flex items-center justify-between text-xl"
        onClick={onToggle}
      >
        {selected ? selected.flag : flags.countryCode("NG").emoji}
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </div>

      {/* Animated Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute  w-[16.3rem] mt-1 left-15 top-10 bg-white shadow rounded z-20 text-center"
          >
            {countries.map((country, id) => (
              <div
                key={id}
                className="flex items-center p-2 cursor-pointer"
                onClick={() => handleSelect(country)}
              >
                <div className="w-[350px] h-8 inline-flex items-center gap-1 text-left px-2 text-[#3C3C3C] hover:bg-[#E9E9E9] font-normal">
                  <span>{country.flag}</span>
                  <span>{country.name}</span>
                  <span className="font-extralight text-sm">{country.code}</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;