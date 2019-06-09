import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [showAll] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  const countriesToShow = showAll
    ? countries
    : countries.filter(country =>
        country.name.toUpperCase().includes(newFilter.toUpperCase())
      );

  const countryRows = () => {
    console.log("CountriesToShow", countriesToShow.length);
    if (newFilter.length === 0) {
      return <div>Start typing!</div>
    }
    if (countriesToShow.length >= 10) {
      return <div>Too many matches, specify another filter</div>;
    }
    if (countriesToShow.length < 10 && countriesToShow.length > 1) {
      return countriesToShow.map(country => (
        <p key={country.name}>{country.name}</p>
      ));
    }
    if (countriesToShow.length === 1) {
      return countriesToShow.map(country => (
        <div key={country.name}>
          <h3>{country.name} </h3>
          <p>
            Capital: {country.capital} <br/>
            Population: {country.population}
          </p>
          <h4>Languages</h4>
          <ul>
            {country.languages.map(language => <li key={language.name}>
            {language.name}</li>)}
          </ul>
          <img width="100px" src={country.flag}></img>
        </div>
      ));
    }
    else {
      return (
        <p>No countries found!</p>
      )
    }
  };

  const handleFilterChange = event => {
    console.log(event.target.value);
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <p>
        Find countries {""}
        <input value={newFilter} onChange={handleFilterChange} />
      </p>
      {countryRows()}
    </div>
  );
};

export default App;
