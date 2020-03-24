import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

import CircularProgress from '@material-ui/core/CircularProgress';
import DataTable from './components/DataTable';
import FilterDropdown from './components/FilterDropdown';

import { STATES } from './constants/filterConstants';
import { CAUSES } from './constants/filterConstants';

function App() {
  // Cause of death data set from api
  const [causeOfDeathData, setCauseOfDeathData] = useState({});
  const [columns, setColumns] = useState([]);
  const [sortValues, setSortValues] = useState({
    "Year": "asc",
    "113 Cause Name": "asc",
    "Cause Name": "asc",
    "State": "asc",
    "Deaths": "asc",
    "Age-adjusted Death Rate": "asc"
  });
  const [sortQuery, setSortQuery] = useState("")
  const [filterQuery, setFilterQuery] = useState("")
  const [filterQueryDict, setFilterQueryDict] = useState({})

  // Loading & Errors
  const [isLoading, setIsLoading] = useState(false); // used for loading indicator
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchData(); // Get data on page load
  }, [sortQuery, filterQuery]);

  // Use this method to load our data from the api
  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);

    let url = buildUrl();

    try {
      const result = await axios.get(url); // get data from our api
      setTimeout(() => { // Using set timeout to allow the display of the loading indicator to give feedback to the user
        columns.length === 0 && setColumns(result.data.columns);
        setCauseOfDeathData(result.data);
        setIsLoading(false);
      }, 1000)
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const buildUrl = () => {
    let baseApiUrl = "/causes-of-death";

    if (sortQuery.length > 0 && filterQuery.length > 0) {
      return baseApiUrl + "?sort=" + sortQuery + "&" + filterQuery;
    } else if (sortQuery.length > 0) {
      return baseApiUrl + "?sort=" + sortQuery;
    } else if (filterQuery.length > 0) {
      return baseApiUrl + "?" + filterQuery;
    } else {
      return baseApiUrl;
    }
  }

  const handleSortQueryChange = (newQuery, newSortValues) => {
    setSortQuery(newQuery);
    setSortValues(newSortValues);
  }

  const handleFilterQueryChange = (newQuery, filterKey) => {
    let filterQueryDictCopy = {...filterQueryDict};

    // Update the dictionary keeping track of our filters and their values
    if (newQuery.length > 0) {
      filterQueryDictCopy[filterKey] = newQuery;
    } else {
      delete filterQueryDictCopy[filterKey]
    }

    setFilterQueryDict(filterQueryDictCopy);

    // Using a copy of the filterQueryDict as state updates can be asynchronous
    if (Object.keys(filterQueryDictCopy).length == 0) {
      setFilterQuery("");
    } else {
      let queries = [];
      for (let [key, value] of Object.entries(filterQueryDictCopy)) {
        let cur = key + "=" + value;
        queries.push(cur);
      }

      let queryString = queries.join("&");
      setFilterQuery(queryString);
    }
  }

  return (
    <div className="App">
      {/* State Dropdown */}
      <FilterDropdown
        handleFilterQueryChange={handleFilterQueryChange}
        filterName={"State"}
        valueOpts={STATES}
        label={"Select State or United States"}
      />
      {/* Cause Dropdown */}
      <FilterDropdown 
        handleFilterQueryChange={handleFilterQueryChange}
        filterName={"Cause Name"}
        valueOpts={CAUSES}
        label={"Select Cause Name"}
      />

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <CircularProgress />
      ) : (
        <DataTable 
          causeOfDeathData={causeOfDeathData} 
          columns={columns}
          sortValues={sortValues} 
          curSortQuery={sortQuery}
          handleSortQueryChange={handleSortQueryChange}
        />
      )}
    </div>
  );
}

export default App;
