import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Filters() {
  const { filterByName, handleNameFilter, columnOptions, showFilters, removeAll,
    handleNumericFilter, handleSubmit, handleColumnSort, handleSort,
    removeButton, radioButtons, handleRadioBtn } = useContext(PlanetsContext);
  // const [column, setColumn] = useState('population');
  // const [comparison, setComparison] = useState('');
  // const [values, setValues] = useState('');

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
            <option defaultValue>maior que</option>
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
        {showFilters.map(({ column, comparison, value }) => (
          <div data-testid="filter" key={ column }>
            <span>{`${column} ${comparison} ${value}`}</span>
            { column && (
              <button type="button" onClick={ () => removeButton(column) }>X</button>)}
          </div>
        ))}
      </form>
      <label htmlFor="sort">
        Ordenar:
        <select
          id="sort"
          data-testid="column-sort"
          name="sort"
          onChange={ handleColumnSort }
        >
          {columnOptions.map((item) => <option key={ item }>{item}</option>)}
        </select>
      </label>
      <div>
        <label htmlFor="ASC">
          Ascendente
          <input
            type="radio"
            id="ASC"
            name="ASC"
            value="ASC"
            data-testid="column-sort-input-asc"
            checked={ radioButtons === 'ASC' }
            onChange={ handleRadioBtn }
          />
        </label>
        <label htmlFor="DESC">
          Descendente
          <input
            type="radio"
            name="DESC"
            id="DESC"
            value="DESC"
            data-testid="column-sort-input-desc"
            checked={ radioButtons === 'DESC' }
            onChange={ handleRadioBtn }
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleSort }
      >
        Ordenar
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeAll }
      >
        Remover Filtros
      </button>
    </div>
  );
}
