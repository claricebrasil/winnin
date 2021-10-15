import React from 'react';

export default function Button({ search, setSearch, value }) {
  return (
    <button
      className={search === value ? "btn-filter-active" : "btn-filter"}
      value={value}
      onClick={(e) => setSearch(e.target.value)}
    >
    {value === "hot" && "Hot"}
    {value === "new" && "News"}
    {value === "rising" && "Rising"}
    </button>
  );
}