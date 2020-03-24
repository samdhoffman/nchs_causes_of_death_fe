import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%",
    margin: "0 auto 20px",
  },
  table: {
    minHeight: 600,
    minWidth: 750,
  },
}));

export default function DataTable({ causeOfDeathData, columns, sortValues, curSortQuery, handleSortQueryChange, isLoading }) {
  const classes = useStyles();

  const handleSort = (column, direction) => {
    // Reverse sort direction
    let newDir = direction === "asc" ? "desc" : "asc";
    
    // Keep track of old query for this column, e.g. a_State
    let oldColQuery = `${sortValues[column][0]}_${column}`;

    let sortValuesCopy = {...sortValues};
    sortValuesCopy[column] = newDir;

    // Create query string in the format needed for api to sort data
    // Will use this query string in our request as ?sort=queryString
    let queryString = buildSortQuery(column, sortValuesCopy, oldColQuery)

    // We will pass updated queryString and sortValues to method so state can be updated in parent -- Lifting State Up Pattern
    handleSortQueryChange(queryString, sortValuesCopy)
  }

  // This function is building the entire sort query string across all columns
  const buildSortQuery = (column, curSortValues, oldColQuery) => {
    // Create an array from the current sort values which will give us the order needed for correct sorting
    let orderedSortOpts = curSortQuery.length > 0 ? curSortQuery.split(",") : [];
    let queryString = "";

    if (orderedSortOpts.length > 0) {
      // Remove the old query string from the array
      let oldIndex = orderedSortOpts.indexOf(oldColQuery);
      orderedSortOpts.splice(oldIndex, 1);
    } else {
      for (let [key, value] of Object.entries(curSortValues)) {
        if (key === column) continue;
        let curQuery = `${value[0]}_${key}`;
        orderedSortOpts.push(curQuery)
      }
    }

    let newQuery = `${curSortValues[column][0]}_${column}`;
    // Add most recently selected sort option to the front of the array
    orderedSortOpts.unshift(newQuery);
    
    queryString = orderedSortOpts.join(",");
    return queryString;
  }

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label="data table">

        <TableHead>
          <TableRow>
          {columns && columns.map((col) => (
            <TableCell align="right" key={col}>
              <TableSortLabel
                active={true}
                direction={sortValues[col]}
                onClick={() => handleSort(col, sortValues[col])}
                style={{color: "#003d71"}}
              >
                {col}
              </TableSortLabel>
            </TableCell>
          ))}
          </TableRow>
        </TableHead>

        {isLoading ? (
          <TableBody>
            <TableRow>
              <TableCell align="center" colSpan={12}>
                <CircularProgress />
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {causeOfDeathData.data && causeOfDeathData.data.map((rowData, index) => (
              <TableRow name={index} key={index}>
                {rowData.map((cellData, i) => (
                  // For accessibility, the first column is set to be a <th> element, with a scope of "row". 
                  // This enables screen readers to identify a cell's value by it's row and column name.
                  <TableCell 
                    component={i === 0 ? "th" : ""} 
                    scope={i === 0 ? "row" : ""} 
                    align="right"
                    key={cellData}
                  >
                    {cellData}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        )}

      </Table>
    </TableContainer>
  )
}
