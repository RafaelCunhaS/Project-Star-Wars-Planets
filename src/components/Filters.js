import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Filters() {
  const { filterByName, handleNameFilter, columnOptions,
    handleNumericFilter, handleSubmit } = useContext(PlanetsContext);
  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        value={ filterByName.name }
        onChange={ handleNameFilter }
        placeholder="Planet name"
      />
      <form onSubmit={ handleSubmit }>
        <label htmlFor="columns">
          Coluna:
          <select
            id="columns"
            data-testid="column-filter"
            name="column"
            onChange={ handleNumericFilter }
          >
            {columnOptions.map((item) => <option key={ item }>{item}</option>)}
          </select>
        </label>
        <label htmlFor="comparison">
          Operador:
          <select
            id="comparison"
            data-testid="comparison-filter"
            name="comparison"
            onChange={ handleNumericFilter }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          defaultValue="0"
          onChange={ handleNumericFilter }
        />
        <button type="submit" data-testid="button-filter">Filtrar</button>
      </form>
    </div>
  );
}
