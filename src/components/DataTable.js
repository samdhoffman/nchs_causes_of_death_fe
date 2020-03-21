import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 750,
  },
}));

export default function DataTable({ causeOfDeathData }) {
  const classes = useStyles();

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="data table">

          <TableHead>
            <TableRow>
            {causeOfDeathData.columns && causeOfDeathData.columns.map(col => (
              <TableCell>{col}</TableCell>
            ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {causeOfDeathData.data && causeOfDeathData.data.map((rowData, index) => (
              <TableRow name={index}>
                {rowData.map((cellData, i) => (
                  // For accessibility, the first column is set to be a <th> element, with a scope of "row". 
                  // This enables screen readers to identify a cell's value by it's row and column name.
                  <TableCell component={i == 0 && "th"} scope={i == 0 && "row"}>{cellData}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </div>
  )
}
