import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120
  },
}));

export default function FilterDropdown({ handleFilterQueryChange, filterName, valueOpts, elementId, label }) {
  const classes = useStyles();
  const [value, setValue] = useState(null);

  const handleFilter = (event, newValue) => {
    if (value === newValue) return;

    if (newValue) {
      // Will use newValue in the query string for filtering
      handleFilterQueryChange(newValue, filterName);
    } else {
      handleFilterQueryChange("", filterName)
    }
    
    setValue(newValue);
  }

  return (
    <div>
      {/* States are defined in our filterConstants.js file */}
      {/* TODO add disabled prop */}
      {/*  disabled={isDisabled} */}
      <FormControl className={classes.formControl}>
        <Autocomplete
          id={elementId}
          style={{ width: 300, margin: "20px 20px 20px 0" }}
          options={valueOpts}
          autoHighlight
          autoComplete={true}
          getOptionLabel={option => option}
          renderInput={params => <TextField {...params} label={label} variant="outlined" />}
          onChange={(e, newValue) => handleFilter(e, newValue)}
        />
      </FormControl>
    </div>
  )
}
