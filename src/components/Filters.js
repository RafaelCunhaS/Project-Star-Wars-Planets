import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import './Filters.css';
import Delete from '../delete.svg';

export default function Filters() {
  const { filterByName, handleNameFilter, columnOptions, showFilters, removeAll,
    handleSubmit, handleSort,
    removeButton, radioButtons, handleRadioBtn } = useContext(PlanetsContext);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('greater than');
  const [value, setValue] = useState('0');
  const [columnSort, setColumnSort] = useState('population');

  const handleFilters = ({ target }) => {
    if (target.name === 'column') setColumn(target.value);
    if (target.name === 'comparison') setComparison(target.value);
    if (target.name === 'value') setValue(target.value);
  };

  useEffect(() => setColumn(columnOptions[0]), [columnOptions]);

  const sortColumns = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  const handleColumnSort = ({ target }) => {
    setColumnSort(target.value);
  };

  return (
    <div className="filters-container">
      <div className="title-container">
        <p>STAR WARS PLANETS</p>
        <input
          type="text"
          className="name-filter filters"
          value={ filterByName.name }
          onChange={ handleNameFilter }
          placeholder="Planet name"
        />
      </div>
      <div className="filters">
        <label htmlFor="columns">
          Column:
          {' '}
          <select
            id="columns"
            className="column-filter filter"
            name="column"
            onChange={ handleFilters }
            value={ column }
          >
            {columnOptions.map((item) => <option key={ item }>{item}</option>)}
          </select>
        </label>
        <label htmlFor="comparison">
          Operator:
          {' '}
          <select
            id="comparison"
            className="comparison-filter filter"
            name="comparison"
            onChange={ handleFilters }
            value={ comparison }
          >
            <option>greater than</option>
            <option>less than</option>
            <option>equal to</option>
          </select>
        </label>
        <input
          type="number"
          className="value-filter filter"
          name="value"
          min="0"
          onChange={ handleFilters }
          value={ value }
        />
        <button
          type="button"
          className="button-filter filter btn"
          onClick={ () => handleSubmit({ column, comparison, value }) }
        >
          Filter
        </button>
        <label htmlFor="sort">
          Sort by:
          {' '}
          <select
            id="sort"
            className="column-sort filter"
            name="sort"
            onChange={ handleColumnSort }
            value={ columnSort }
          >
            {sortColumns.map((item) => <option key={ item }>{item}</option>)}
          </select>
        </label>
        <div className="radio-btns filter">
          <label htmlFor="ASC">
            <input
              type="radio"
              id="ASC"
              name="ASC"
              value="ASC"
              className="radio"
              checked={ radioButtons === 'ASC' }
              onChange={ handleRadioBtn }
            />
            {' '}
            Ascending
          </label>
          <label htmlFor="DESC">
            <input
              type="radio"
              name="DESC"
              id="DESC"
              value="DESC"
              checked={ radioButtons === 'DESC' }
              onChange={ handleRadioBtn }
            />
            {' '}
            Descending
          </label>
        </div>
        <button
          type="button"
          className="column-sort-button filter btn"
          onClick={ () => handleSort(columnSort) }
        >
          Sort
        </button>
        <button
          type="button"
          className="button-remove-filters filter btn"
          onClick={ removeAll }
        >
          Remove Filters
        </button>
      </div>
      {/* eslint-disable-next-line no-shadow */}
      {showFilters.length > 0 && showFilters.map(({ column, comparison, value }) => (
        <div className="filter-span" key={ column }>
          <span>{`${column} ${comparison} ${value}`}</span>
          <button
            type="button"
            id="delete-btn"
            onClick={ () => removeButton(column) }
          >
            <img src={ Delete } alt="delete" />
          </button>
        </div>
      ))}
    </div>
  );
}
