import React, { useState, useEffect } from "react";
import Persons from "./Components/Persons";
import AddPerson from "./Components/AddPerson";
import Filter from "./Components/Filter";
import personService from "./Services/persons";
import Notification from "./Components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [showAll] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    personService.getAll().then(response => {
      setPersons(response.data);
    });
  }, []);
  console.log("render", persons.length, "persons");

  const personsToShow = showAll
    ? persons
    : persons.filter(person =>
        person.name.toUpperCase().includes(newFilter.toUpperCase())
      );

  const addNameAndNumber = event => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber
    };
    if (persons.some(person => person.name === newName)) {
      const samePerson = persons.find(p => p.name === newName);
      const changedPerson = { ...samePerson, number: newNumber };

      personService
        .update(changedPerson)
        .then(returnedPerson => {
          setPersons(
            persons.map(person =>
              person.name !== newName ? person : returnedPerson
            )
          );
          setNotificationMessage(
            `${newName} on jo luettelossa, puhelinnumero muutettu`
          );
          console.log("Updated person");
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch(error => {
          alert(`henkilö ${changedPerson.name} on jo poistettu palvelimelta`);
          setPersons(persons.filter(p => p.name !== changedPerson.name));
        });
      setNewName("");
      setNewNumber("");
    } else {
      personService.create(nameObject).then(response => {
        setPersons(persons.concat(response.data));
      });
      setNotificationMessage(`${newName} lisätty luetteloon`);
      console.log("Added person");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
      setNewName("");
      setNewNumber("");
    }
  };

  const handleRemoval = (id, name) => {
    if (window.confirm(`Poistetaanko ${name}?`)) {
      personService
        .remove(id)
        .then(setPersons(persons.filter(p => p.id !== id)));
      setNotificationMessage(`${name} poistettu luettelosta`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h1>Puhelinluettelo</h1>

      <Notification message={notificationMessage} />
      <AddPerson
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addNameAndNumber={addNameAndNumber}
      />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Persons personsToShow={personsToShow} handleRemoval={handleRemoval} />
    </div>
  );
};

export default App;
