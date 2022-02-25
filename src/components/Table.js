import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Filters from './Filters';

export default function Table() {
  const { planets, allPlanets } = useContext(PlanetsContext);
  return (
    <main>
      <Filters />
      <table>
        <thead>
          <tr>
            {allPlanets.length > 0 && Object.keys(allPlanets[0]).filter((item) => item
                !== 'residents').map((item) => <th key={ item }>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {planets.length > 0 && planets.map((planet) => (
            <tr key={ planet.name }>
              <td data-testid="planet-name">{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
