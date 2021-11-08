import React, {useState} from 'react';
import {Autocomplete} from '@react-google-maps/api'
import { AppBar , Toolbar,Typography, InputBase,Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import useStyles from './styles'
import Switch from "@material-ui/core/Switch";
import CustomizedSwitch from './CustomizedSwitch';

const Header = ({setCoordinates,theme,setTheme} ) => {

    const classes = useStyles();

    const [autocomplete,setAutocomplete] = useState(null);

    const onLoad = (autoC) => {
        setAutocomplete(autoC);

    }
    const handleModeChange = () => {
        setTheme(theme=> !theme)
    }

    const onPlaceChanged =  async () => {
        const lat = await autocomplete.getPlace().geometry.location.lat();
        const lng = await autocomplete.getPlace().geometry.location.lng();

       // console.log('Coordinates of new place : ', {lat, lng});

        setCoordinates({lat,lng});
    }

    return (
        <AppBar position="static" className={theme && classes.root} >
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    Travel Companion
                </Typography>
                <Box display="flex" style={{marginRight:"10px"}}>
                
                <CustomizedSwitch  checked={theme} onChange={handleModeChange} name="theme" color="default"/>
              {/* <Switch
                
                checked={theme}
                onChange={handleModeChange}
                name="theme"
                color="default"
                /> */}
                </Box>


                <Box display="flex">
                <Typography variant="h6" className={classes.title}>
                    Explore new places
                </Typography>
                 <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>   
                <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase placeholder="Search..." classes={{root:classes.inputRoot,input:classes.inputInput}} />
                    </div>
                 </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
