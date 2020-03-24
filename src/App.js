import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import './App.css';
import axios from 'axios';

import Layout from './components/layout/Layout';
import DataTable from './components/DataTable';
import FilterDropdown from './components/FilterDropdown';

import { STATES } from './constants/filterConstants';
import { CAUSES } from './constants/filterConstants';
import ErrorPage from './components/ErrorPage';

const useStyles = makeStyles(theme => ({
  dropdownSection: {
    overflow: 'hidden',
    width: "90%",
    margin: "0 auto",
  },
  pagination: {
    margin: 20,

    "& ul": {
      justifyContent: 'center',
    }
  },
}));

function App() {
  const classes = useStyles();

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

  // Pagination
  const [pages, setPages] = useState(0);
  const [curPage, setCurPage] = useState(0);

  // Loading & Errors
  const [isLoading, setIsLoading] = useState(false); // used for loading indicator
  const [isError, setIsError] = useState(false);
  const [errorResponse, setErrorResponse] = useState({});

  useEffect(() => {
    fetchData(); // Get data on page load
  }, [curPage, sortQuery, filterQuery]);

  // Use this method to load our data from the api
  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);

    let url = buildUrl();

    try {
      const result = await axios.get(url); // get data from our api
      setTimeout(() => { // Using set timeout to allow the display of the loading indicator to give feedback to the user
        let data = JSON.parse(result.data.records);
        columns.length === 0 && setColumns(data.columns);
        setCauseOfDeathData(data);
        setPages(result.data.pages);
        setIsLoading(false);
      }, 1000)
    } catch (error) {
      setErrorResponse(error.response)
      setIsError(true);
      setIsLoading(false);
    }
  };

  const buildUrl = () => {
    let baseApiUrl = `/causes-of-death?page=${curPage}`;

    if (sortQuery.length > 0 && filterQuery.length > 0) {
      return baseApiUrl + "&sort=" + sortQuery + "&" + filterQuery;
    } else if (sortQuery.length > 0) {
      return baseApiUrl + "&sort=" + sortQuery;
    } else if (filterQuery.length > 0) {
      return baseApiUrl + "&" + filterQuery;
    } else {
      return baseApiUrl;
    }
  }

  const handleSortQueryChange = (newQuery, newSortValues) => {
    setSortQuery(newQuery);
    setSortValues(newSortValues);
    setCurPage(0);
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
    if (Object.keys(filterQueryDictCopy).length === 0) {
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

    setCurPage(0);
  }

  // When user changes page this will set a new current page and make a GET request for the next page of data
  // Subtract 1 to account for backend data that is 0 indexed
  const handlePageChange = (event, value) => {
    setCurPage(value - 1);
  }

  return (
    <div className="App">
      <Layout>
        <Grid container spacing={2} alignItems="center" className={classes.dropdownSection}>
          {/* State Dropdown */}
          <FilterDropdown
            handleFilterQueryChange={handleFilterQueryChange}
            filterName={"State"}
            valueOpts={STATES}
            elementId={"state-select"}
            label={"Select State or United States"}
          />
          {/* Cause Dropdown */}
          <FilterDropdown 
            handleFilterQueryChange={handleFilterQueryChange}
            filterName={"Cause Name"}
            valueOpts={CAUSES}
            elementId={"cause-select"}
            label={"Select Cause Name"}
          />
        </Grid>

        {isError && <ErrorPage errorResponse={errorResponse} />}
        
        <DataTable 
          causeOfDeathData={causeOfDeathData} 
          columns={columns}
          sortValues={sortValues} 
          curSortQuery={sortQuery}
          handleSortQueryChange={handleSortQueryChange}
          isLoading={isLoading}
        />

        {/* Add 1 to page prop to account for backend data that is 0 indexed */}
        <Pagination className={classes.pagination} count={pages} page={curPage + 1} onChange={handlePageChange} disabled={isError} />
      </Layout>
    </div>
  );
}

export default App;
