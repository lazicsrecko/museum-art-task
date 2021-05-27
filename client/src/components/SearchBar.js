import React, { useState } from 'react';
import {
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    TextField
} from '@material-ui/core'

export default function SearchBar(props) {
    const { typeFilter, handleTypeChange, handleTextChange } = props;

    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label="typeFilter" name="typeFilter" value={typeFilter} onChange={handleTypeChange} row>
                <FormControlLabel value="all" control={<Radio />} label="All" />
                <FormControlLabel value="painting" control={<Radio />} label="Painting" />
                <FormControlLabel value="potery" control={<Radio />} label="Potteries" />
            </RadioGroup>
            <TextField aria-label="textFilter" name="textFilter" variant="outlined" id="outlined-basic" size="small" onChange={handleTextChange} />
        </FormControl>
    )
}