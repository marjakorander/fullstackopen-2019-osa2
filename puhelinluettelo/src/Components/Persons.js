import React from "react";

const Persons = ({ handleRemoval, persons }) => {
  const rows = () =>
    persons.map(person => (
      <div key={person.name}>
        {person.name} {person.number}
        <button onClick={() => handleRemoval(person.id, person.name)}>Poista</button>
      </div>
    ));

  return (
    <div>
      <h2>Numerot</h2>
      {rows()}
    </div>
  );
};

export default Persons;