import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CAUSES } from '../constants/filterConstants';

export default function CauseSelect({ handleFilterQueryChange }) {
  const [value, setValue] = useState(null);

  const handleFilter = (event, newValue) => {
    if (value === newValue) return;

    if (newValue) {
      // Will use newValue in the query string for filtering
      handleFilterQueryChange(newValue, "Cause Name");
    } else {
      handleFilterQueryChange("", "Cause Name")
    }
    
    setValue(newValue);
  }

  return (
    <div>
      {/* Causes are defined in our filterConstants.js file */}
      <Autocomplete
        id="state-select"
        style={{ width: 300, margin: 20 }}
        options={CAUSES}
        autoHighlight
        autoComplete={true}
        getOptionLabel={option => option}
        renderInput={params => <TextField {...params} label="Select Cause Name" variant="outlined" />}
        onChange={(e, newValue) => handleFilter(e, newValue)}
      />
    </div>
  )
}
