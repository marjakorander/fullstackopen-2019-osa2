import React from "react";

const Persons = ({ personsToShow, handleRemoval }) => {
  const rows = () =>
    personsToShow.map(person => (
      <p key={person.id}>
        {person.name} {person.number}
        <button onClick={() => handleRemoval(person.id, person.name)}>Poista</button>
      </p>
    ));

  return (
    <div>
      <h2>Numerot</h2>
      {rows()}
    </div>
  );
};

export default Persons;