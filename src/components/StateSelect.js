import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { STATES } from '../constants/filterConstants';

export default function StateSelect({ handleFilterQueryChange }) {
  const [value, setValue] = useState(null);

  const handleFilter = (event, newValue) => {
    if (value === newValue) return;

    if (newValue) {
      // Create query string in the format needed for api to filter data
      // Will use this query string in our request e.g. ?State=Alabama
      let queryString = `State=${newValue}`;
      handleFilterQueryChange(queryString);
    } else {
      handleFilterQueryChange("")
    }
    
    setValue(newValue);
  }

  return (
    <div>
      {/* States are defined in our filterConstants.js file */}
      <Autocomplete
        id="state-select"
        style={{ width: 300, margin: 20 }}
        options={STATES}
        autoHighlight
        autoComplete={true}
        getOptionLabel={option => option}
        renderInput={params => <TextField {...params} label="Select State or United States" variant="outlined" />}
        onChange={(e, newValue) => handleFilter(e, newValue)}
      />
    </div>
  )
}
