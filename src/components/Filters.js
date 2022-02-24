import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Filters() {
  const { filterByName, handleFilter } = useContext(PlanetsContext);
  return (
    <input
      type="text"
      data-testid="name-filter"
      value={ filterByName.name }
      onChange={ handleFilter }
      placeholder="Planet name"
    />
  );
}
