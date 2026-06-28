import React from 'react';

/**
 * SearchFilter Component
 * Properties (Inputs):
 *  - searchValue: string
 *  - selectedStyle: string
 *  - placeholder: string
 *  - stylesLabel: string
 *  - options: Object (key-value translations for categories)
 *  - allLabel: string (e.g. "Todos los estilos")
 * Events (Outputs):
 *  - onSearchChange: Function(value)
 *  - onStyleChange: Function(value)
 */
function SearchFilter({ 
  searchValue = '', 
  selectedStyle = '', 
  placeholder = 'Search...', 
  stylesLabel = 'Styles', 
  options = {}, 
  allLabel = 'All styles',
  onSearchChange, 
  onStyleChange 
}) {
  return (
    <div className="filters-container">
      {/* Search Input Box */}
      <div className="search-input-wrapper">
        <input
          type="text"
          id="search-input-field"
          className="search-input"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
        />
      </div>

      {/* Styles Select Dropdown */}
      <div className="styles-combobox-wrapper">
        <select
          id="style-select-dropdown"
          className="combobox-styles"
          value={selectedStyle}
          onChange={(e) => onStyleChange && onStyleChange(e.target.value)}
        >
          <option value="">{allLabel}</option>
          {Object.entries(options).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SearchFilter;
