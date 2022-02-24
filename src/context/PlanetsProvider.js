import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/fetchPlanets';

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [allPlanets, setAllPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });

  const getPlanets = async () => {
    const data = await fetchPlanets();
    setPlanets(data);
    setAllPlanets(data);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const handleFilter = async ({ target }) => {
    setFilterByName(({ name: target.value }));
  };

  useEffect(() => {
    console.log(filterByName.name);
    const newPlanets = allPlanets.filter((planet) => planet.name
      .toLowerCase().includes(filterByName.name));
    setPlanets(newPlanets);
  }, [filterByName, allPlanets]);

  const contextValue = {
    planets,
    filterByName,
    handleFilter,
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
