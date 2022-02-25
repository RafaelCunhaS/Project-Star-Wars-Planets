import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/fetchPlanets';

const INITIAL_STATE = [{ column: '', comparison: '', value: '' }];
const COLUMNS = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [allPlanets, setAllPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState(
    INITIAL_STATE,
  );
  const [columnOptions, setColumnOptions] = useState([COLUMNS]);
  const [showFilters, setShowFilters] = useState(INITIAL_STATE);
  const [sortColumn, setSortColumn] = useState('');
  const [radioButtons, setRadioButtons] = useState('');

  const getPlanets = async () => {
    const data = await fetchPlanets();
    const alphabeticalSort = data.sort((a, b) => a.name.localeCompare(b.name));
    setAllPlanets(data);
    setPlanets(alphabeticalSort);
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
    console.log(filterByNumericValues);
    const getValues = filterByNumericValues.map((item, index) => {
      const values = { ...item };
      if (index === 0) values[name] = value;
      return values;
    });
    setFilterByNumericValues(getValues);
  };

  useEffect(() => {
    let filtered = [...allPlanets];
    let newOptions = [...COLUMNS];
    showFilters.forEach(({ column, comparison, value }) => {
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
    if (showFilters[0].column) {
      const newValues = [...INITIAL_STATE, ...showFilters];
      setFilterByNumericValues(newValues);
    }
  }, [showFilters, allPlanets]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setShowFilters(filterByNumericValues);
  };

  const removeButton = (name) => {
    const newValues = filterByNumericValues.filter(({ column }) => column !== name);
    console.log(newValues);
    setFilterByNumericValues(newValues);
    setShowFilters(newValues);
  };

  const removeAll = () => {
    setShowFilters(INITIAL_STATE);
    setFilterByNumericValues(INITIAL_STATE);
  };

  const handleColumnSort = ({ target }) => {
    setSortColumn(target.value);
  };

  const handleRadioBtn = ({ target }) => {
    setRadioButtons(target.value);
  };

  const handleSort = () => {
    const numbers = [];
    const unknowns = [];
    allPlanets.forEach((value) => {
      if (!Number.isNaN(Number(value[sortColumn]))) numbers.push(value);
      else unknowns.push(value);
    });
    if (radioButtons === 'ASC') {
      const newPlanets = numbers.sort((a, b) => Number(a[sortColumn]) - b[sortColumn]);
      const get = [...newPlanets, ...unknowns];
      setPlanets(get);
    }
    if (radioButtons === 'DESC') {
      const newPlanets = numbers.sort((a, b) => Number(b[sortColumn]) - a[sortColumn]);
      const get = [...newPlanets, ...unknowns];
      setPlanets(get);
    }
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
    showFilters,
    removeButton,
    removeAll,
    radioButtons,
    handleRadioBtn,
    handleColumnSort,
    handleSort,
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
