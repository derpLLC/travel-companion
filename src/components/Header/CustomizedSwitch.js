import React from 'react'
import FormGroup from '@mui/material/FormGroup';
import { FormControlLabel } from '@mui/material';
import MaterialUISwitch from './MUISwitch';


const CustomizedSwitch = (checked, onChange, name, color) => {
    
    
    return (
        <FormGroup>

        <FormControlLabel
        control={<MaterialUISwitch sx={{ m: 1 }}  />}
        checked={checked.checked}
        onChange={checked.onChange}

        label="Toggle Mode" />

            
        </FormGroup>
    )
}

export default CustomizedSwitch
