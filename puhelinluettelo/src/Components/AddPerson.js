import React from "react";

const AddPerson = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addNameAndNumber
}) => {
  return (
    <div>
      <h3>Lisää uusi nimi ja numero</h3>
      <form onSubmit={addNameAndNumber}>
        <div>
          nimi: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          numero: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
    </div>
  );
};

export default AddPerson;