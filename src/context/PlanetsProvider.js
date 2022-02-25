import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/fetchPlanets';

const INITIAL_STATE = { column: '', comparison: '', value: '0' };

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [allPlanets, setAllPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState(
    [INITIAL_STATE],
  );
  const [columnOptions, setColumnOptions] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  const getPlanets = async () => {
    const data = await fetchPlanets();
    setAllPlanets(data);
    setPlanets(data);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const handleNameFilter = async ({ target }) => {
    setFilterByName(({ name: target.value }));
  };

  useEffect(() => {
    const newPlanets = allPlanets.filter((planet) => planet.name
      .toLowerCase().includes(filterByName.name));
    setPlanets(newPlanets);
  }, [filterByName, allPlanets]);

  const handleNumericFilter = ({ target: { name, value } }) => {
    const getValues = filterByNumericValues.map((item, index) => {
      const values = { ...item };
      if (index === 0) values[name] = value;
      return values;
    });
    setFilterByNumericValues(getValues);
  };

  // const removeFromOptions = (column) => {
  //   const newOptions = [...columnOptions];

  //   setColumnOptions()
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    let filtered = [...allPlanets];
    let newOptions = [...columnOptions];
    filterByNumericValues.forEach(({ column, comparison, value }) => {
      console.log(filtered);
      if (comparison === 'maior que') {
        filtered = filtered.filter((planet) => Number(planet[column]) > value);
      }
      if (comparison === 'menor que') {
        filtered = filtered.filter((planet) => Number(planet[column]) < value);
      }
      if (comparison === 'igual a') {
        filtered = filtered.filter((planet) => planet[column] === value);
      }
      newOptions = newOptions.filter((item) => item !== column);
    });
    setPlanets(filtered);
    setColumnOptions(newOptions);
    const newValues = [INITIAL_STATE, ...filterByNumericValues];
    setFilterByNumericValues(newValues);
  };

  const contextValue = {
    planets,
    allPlanets,
    filterByName,
    handleNameFilter,
    filterByNumericValues,
    handleNumericFilter,
    handleSubmit,
    columnOptions,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
