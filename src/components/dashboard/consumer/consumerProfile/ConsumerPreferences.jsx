import { preferences as preferenceOptions } from '../../../../lib/consumerPreference';
import React, { useState } from 'react';

const ConsumerPreferences = ({onNext}) => {
  const [selectedPreferences, setSelectedPreferences] = useState([]);

  const togglePreference = (id) => {
    setSelectedPreferences((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handlePreferenceSubmit = () => {
    console.log("Selected Preferences:", selectedPreferences);
    onNext()
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
        <h2 className="text-xl font-semibold mb-6">
          Choose your favorite product categories
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {preferenceOptions.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => togglePreference(cat.id)}
              className={`border rounded-lg p-4 flex items-center justify-center space-x-2 transition ${
                selectedPreferences.includes(cat.id)
                  ? "bg-green-100 border-green-600"
                  : "bg-white hover:border-gray-400"
              }`}
            >
              <img src={cat.profileImage} alt={cat.label}/>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
        <button
          onClick={handlePreferenceSubmit}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ConsumerPreferences;
