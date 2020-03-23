import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

import CircularProgress from '@material-ui/core/CircularProgress';
import DataTable from './components/DataTable';
import StateSelect from './components/StateSelect';

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

  // Loading & Errors
  const [isLoading, setIsLoading] = useState(false); // used for loading indicator
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchData(); // Get data on page load
  }, [sortQuery]);

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
    if (sortQuery.length > 0) {
      return baseApiUrl + "?sort=" + sortQuery;
    } else {
      return baseApiUrl;
    }
  }

  const handleSortQueryChange = (newQuery, newSortValues) => {
    setSortQuery(newQuery);
    setSortValues(newSortValues);
  }

  // Get filtered data from api
  const filterData = async (queryString) => {
    setIsError(false);
    setIsLoading(true);

    try {
      const result = await axios.get(`/causes-of-death?${queryString}`); // get data from our api
      setTimeout(() => { // Using set timeout to allow the display of the loading indicator to give feedback to the user
        setCauseOfDeathData(result.data);
        setIsLoading(false);
      }, 1000)
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <StateSelect filterData={filterData} fetchData={fetchData}/>
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
