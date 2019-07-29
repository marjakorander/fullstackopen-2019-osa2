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
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    personService.getAll()
      .then(response => {
      setPersons(response);
    })
  }, [])

  console.log('Persons', persons.length)

  const personsToShow = newFilter.length === 0
      ? persons
      : persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase()))

  const addNameAndNumber = event => {
    event.preventDefault();

    const existingPerson = persons.find(p => p.name === newName)
    if (existingPerson) {
      personService
        .update({
          ...existingPerson,
          number: newNumber
        })
        .then(updatedPerson => {
          setPersons(persons.map(person => person.name === newName ? updatedPerson : person));
          setNotificationMessage(`${newName} on jo luettelossa, puhelinnumero muutettu`);
          console.log("Updated person");
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch(error => {
          alert(`henkilö ${newName} on jo poistettu palvelimelta`);
          setPersons(persons.filter(p => p.name !== newName));
        });
      setNewName("");
      setNewNumber("");
    } else {
      personService
        .create({
          name: newName,
          number: newNumber
        })
        .then(response => {
        setPersons(persons.concat(response));
      });
      setNotificationMessage(`${newName} lisätty luetteloon`);
      console.log("Added person:", `${newName}, ${newNumber}`);
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
      <Persons persons={personsToShow} handleRemoval={handleRemoval} />
    </div>
  );
};

export default App