import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  error: {
    color: "red"
  },
}));

export default function ErrorPage({ errorResponse }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2>Something went wrong...</h2>
      <h4 className={classes.error}>{errorResponse.status} {errorResponse.statusText}</h4>
      <h5>Please check your connection or try again later. We apologize for the inconvenience.</h5>
    </div>
  )
}
