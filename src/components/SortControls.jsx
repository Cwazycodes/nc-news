import React from "react";
import { useSearchParams } from "react-router-dom";

const SortControls = ({ sortLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sort_by = e.target.value;
    searchParams.set("sort_by", sort_by);
    setSearchParams(searchParams);
  };

  const handleOrderChange = (e) => {
    const order = e.target.value;
    searchParams.set("order", order);
    setSearchParams(searchParams);
  };

  return (
    <fieldset className="sort-controls" aria-live="polite">
      <div>
        <label htmlFor="sort_by">Sort by:</label>
        <select
          id="sort_by"
          onChange={handleSortChange}
          value={searchParams.get("sort_by") || "created_at"}
        >
          <option value="created_at">Date</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>
      </div>
      <div>
        <label htmlFor="order">Order:</label>
        <select
          id="order"
          onChange={handleOrderChange}
          value={searchParams.get("order") || "desc"}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
      {sortLoading && <span className="sort-loading">Loading...</span>}
    </fieldset>
  );
};

export default SortControls;
