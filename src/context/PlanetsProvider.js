import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/fetchPlanets';

const COLUMNS = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [allPlanets, setAllPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [columnOptions, setColumnOptions] = useState(COLUMNS);
  const [showFilters, setShowFilters] = useState([]);
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
      .toLowerCase().includes((filterByName.name).toLowerCase()));
    setPlanets(newPlanets);
  }, [filterByName, allPlanets]);

  useEffect(() => {
    let filtered = [...allPlanets];
    let newOptions = [...COLUMNS];
    if (showFilters.length > 0) {
      showFilters.forEach(({ column, comparison, value }) => {
        console.log(column, comparison, value);
        if (comparison === 'greater than') {
          filtered = filtered.filter((planet) => Number(planet[column]) > value);
        }
        if (comparison === 'less than') {
          filtered = filtered.filter((planet) => Number(planet[column]) < value);
        }
        if (comparison === 'equal to') {
          filtered = filtered.filter((planet) => planet[column] === value);
        }
        newOptions = newOptions.filter((item) => item !== column);
      });
    }
    setPlanets(filtered);
    setColumnOptions(newOptions);
  }, [showFilters, allPlanets]);

  const handleSubmit = (obj) => {
    setShowFilters((prevState) => [...prevState, obj]);
    console.log(obj);
  };

  const removeButton = (name) => {
    const newValues = showFilters.filter(({ column }) => column !== name);
    setShowFilters(newValues);
  };

  const removeAll = () => {
    setShowFilters([]);
    setRadioButtons(false);
  };

  const handleRadioBtn = ({ target }) => {
    setRadioButtons(target.value);
  };

  const handleSort = (sortColumn) => {
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
    handleSubmit,
    columnOptions,
    showFilters,
    removeButton,
    removeAll,
    radioButtons,
    handleRadioBtn,
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
