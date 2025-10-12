// src/components/DataTablePage.jsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const DataTablePage = ({
  title,
  data,
  isLoading,
  error,
  refetch,
  filterOptions = [],
  columns = [],
  emptyState,
  type = 'products',
  hideHeader = false,
  currentFilter, // Receive filter state from parent
  onFilterChange, // Callback to update filter in parent
}) => {
  const filteredData = data; // Data is already filtered based on the selected filter

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <span className="ml-2">Loading {title}...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-8 bg-red-50 rounded-lg mx-6">
        <div className="text-red-600 mb-4">
          <strong>Error loading {title}:</strong>
          <br />
          {error.response?.data?.detail ||
            error.message ||
            `Failed to load ${title}`}
        </div>
        <button
          onClick={() => refetch()}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      {!hideHeader && (
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">{title}</h1>
            <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-lg">
              {filteredData.length}{' '}
              {filteredData.length === 1 ? title.slice(0, -1) : title}
            </span>
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData?.length > 0 ? (
              filteredData?.map((item) => (
                <DataTableRow
                  key={item.id}
                  item={item}
                  columns={columns}
                  type={type}
                />
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  {emptyState}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Reusable Row Component
const DataTableRow = ({ item, columns, type }) => {
  return (
    <tr className="hover:bg-gray-50">
      {columns.map((column) => (
        <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm">
          {column.render ? column.render(item) : item[column.key]}
        </td>
      ))}
    </tr>
  );
};

export default DataTablePage;
