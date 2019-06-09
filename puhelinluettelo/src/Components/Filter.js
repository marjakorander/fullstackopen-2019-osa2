import React from "react";

const Filter = ({ handleFilterChange, newFilter }) => {
  return (
    <div>
      <p>
        Rajaa näytettäviä{" "}
        <input value={newFilter} onChange={handleFilterChange} />
      </p>
    </div>
  );
};

export default Filter;