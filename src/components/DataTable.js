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

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 750,
  },
}));

export default function DataTable({ causeOfDeathData, columns, sortData, sortValues }) {
  const classes = useStyles();

  const handleSort = (column, direction) => {
    // Reverse sort direction
    let newDir = direction === "asc" ? "desc" : "asc";
    let sortValuesCopy = {...sortValues};
    sortValuesCopy[column] = newDir;

    // Create query string in the format needed for api to sort data
    // Will use this query string in our request as ?sort=queryString
    let queryString = buildQueryString(sortValuesCopy)

    // We will pass updated sortValues to method so state can be updated in parent -- Lifting State Up Pattern
    sortData(sortValuesCopy, queryString)
  }

  const buildQueryString = (sortValues) => {
    let sortValsArr = [];
    let queryString = "";

    for (let [key, value] of Object.entries(sortValues)) {
      let curQuery = `${value[0]}_${key}`;
      sortValsArr.push(curQuery)
    }

    queryString = sortValsArr.join(",");
    return queryString;
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="data table">

          <TableHead>
            <TableRow>
            {columns && columns.map((col) => (
              <TableCell align="right" key={col}>
                <TableSortLabel
                  active={true}
                  direction={sortValues[col]}
                  onClick={() => handleSort(col, sortValues[col])}
                >
                  {col}
                </TableSortLabel>
              </TableCell>
            ))}
            </TableRow>
          </TableHead>

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

        </Table>
      </TableContainer>
    </div>
  )
}
