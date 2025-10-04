import { useState } from 'react';
import { ChevronDown, ChevronUp, Check, X } from 'lucide-react';

export default function FiltersComponent({ setFilterOpen }) {
    const [expandedSection, setExpandedSection] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedProductTypes, setSelectedProductTypes] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [maxPrice, setMaxPrice] = useState('');

    const categories = ['Vegetables', 'Livestock', 'Crops and Grain'];
    const productTypes = ['Fresh', 'Processed', 'Organic', 'Conventional'];
    const locations = ['North', 'South', 'East', 'West', 'Central'];

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const toggleCategory = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const toggleProductType = (type) => {
        setSelectedProductTypes(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    const toggleLocation = (location) => {
        setSelectedLocations(prev =>
            prev.includes(location)
                ? prev.filter(l => l !== location)
                : [...prev, location]
        );
    };

    const clearAll = () => {
        setSelectedCategories([]);
        setSelectedProductTypes([]);
        setSelectedLocations([]);
        setMaxPrice('');
        setExpandedSection(null);
    };

    const handleClose = () => {
        if (setFilterOpen) {
            setFilterOpen(false);
        }
    };

    const applyFilters = () => {
        console.log({
            categories: selectedCategories,
            productTypes: selectedProductTypes,
            locations: selectedLocations,
            maxPrice
        });
        handleClose();
    };

    return (
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <button onClick={handleClose} className="text-gray-900 hover:text-gray-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h1 className="text-2xl font-semibold text-gray-900">Filters</h1>
                    </div>
                    <button
                        onClick={clearAll}
                        className="text-gray-500 text-base hover:text-gray-700"
                    >
                        Clear All
                    </button>
                </div>

                {/* Filters Container */}
                <div className="space-y-3">
                    {/* Category */}
                    <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                        <button
                            onClick={() => toggleSection('category')}
                            className="w-full flex items-center justify-between px-4 py-5 text-left bg-gray-50"
                        >
                            <span className="text-gray-600 text-lg">Category</span>
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                        </button>
                        {expandedSection === 'category' && (
                            <div className="px-4 py-4 bg-white space-y-3">
                                {categories.map((category) => (
                                    <label
                                        key={category}
                                        className="flex items-center gap-3 cursor-pointer"
                                    >
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(category)}
                                                onChange={() => toggleCategory(category)}
                                                className="sr-only"
                                            />
                                            <div
                                                className={`w-5 h-5 border-2 rounded flex items-center justify-center ${selectedCategories.includes(category)
                                                    ? 'bg-green-500 border-green-500'
                                                    : 'border-gray-300'
                                                    }`}
                                            >
                                                {selectedCategories.includes(category) && (
                                                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                                )}
                                            </div>
                                        </div>
                                        <span className="text-gray-700">{category}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Type */}
                    <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                        <button
                            onClick={() => toggleSection('productType')}
                            className="w-full flex items-center justify-between px-4 py-5 text-left bg-gray-50"
                        >
                            <span className="text-gray-600 text-lg">Product Type</span>
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                        </button>
                        {expandedSection === 'productType' && (
                            <div className="px-4 py-4 bg-white space-y-3">
                                {productTypes.map((type) => (
                                    <label
                                        key={type}
                                        className="flex items-center gap-3 cursor-pointer"
                                    >
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={selectedProductTypes.includes(type)}
                                                onChange={() => toggleProductType(type)}
                                                className="sr-only"
                                            />
                                            <div
                                                className={`w-5 h-5 border-2 rounded flex items-center justify-center ${selectedProductTypes.includes(type)
                                                    ? 'bg-green-500 border-green-500'
                                                    : 'border-gray-300'
                                                    }`}
                                            >
                                                {selectedProductTypes.includes(type) && (
                                                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                                )}
                                            </div>
                                        </div>
                                        <span className="text-gray-700">{type}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Location */}
                    <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                        <button
                            onClick={() => toggleSection('location')}
                            className="w-full flex items-center justify-between px-4 py-5 text-left bg-gray-50"
                        >
                            <span className="text-gray-600 text-lg">Location</span>
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                        </button>
                        {expandedSection === 'location' && (
                            <div className="px-4 py-4 bg-white space-y-3">
                                {locations.map((location) => (
                                    <label
                                        key={location}
                                        className="flex items-center gap-3 cursor-pointer"
                                    >
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={selectedLocations.includes(location)}
                                                onChange={() => toggleLocation(location)}
                                                className="sr-only"
                                            />
                                            <div
                                                className={`w-5 h-5 border-2 rounded flex items-center justify-center ${selectedLocations.includes(location)
                                                    ? 'bg-green-500 border-green-500'
                                                    : 'border-gray-300'
                                                    }`}
                                            >
                                                {selectedLocations.includes(location) && (
                                                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                                )}
                                            </div>
                                        </div>
                                        <span className="text-gray-700">{location}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Max Price */}
                    <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                        <button
                            onClick={() => toggleSection('maxPrice')}
                            className="w-full flex items-center justify-between px-4 py-5 text-left bg-gray-50"
                        >
                            <span className="text-gray-600 text-lg">Max Price</span>
                            <div className="flex flex-col">
                                <ChevronUp className="w-4 h-4 text-gray-400 -mb-1" />
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </div>
                        </button>
                        {expandedSection === 'maxPrice' && (
                            <div className="px-4 py-4 bg-white">
                                <input
                                    type="number"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    placeholder="Enter max price"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Apply Button */}
                <button
                    onClick={applyFilters}
                    className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
}