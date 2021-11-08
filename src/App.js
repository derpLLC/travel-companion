import { React, useEffect, useState } from 'react'
import './light.css'
import { CssBaseline, Grid } from '@material-ui/core'
import Header from './components/Header/Header'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import List from './components/List/List'
import Map from './components/Map/Map'
import { getPlacesData, getWeatherData } from './Api'

const App = () => {

    //for dark mode toggle
    const [theme, setTheme] = useState(false);
    
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setfilteredPlaces] = useState([])
    const [coordinates, setCoordinates] = useState({});
    const [type, setType] = useState('restaurants')
    const [rating, setRating] = useState('')
    const [weatherData,setWeatherData] = useState([]);

    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setisLoading] = useState(false)
    const [bounds, setBounds] = useState({});

    const myTheme = createTheme({
    
        // Theme settings
        palette: {
          type: theme ? "dark" : "light",
        },
      });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            console.log({ latitude, longitude })
            setCoordinates({ lat: latitude, lng: longitude })
        })


    }, [])


    useEffect(() => {
        const filterPlaces = places.filter((place) => place.rating > rating);

        setfilteredPlaces(filterPlaces);


    }, [rating])

    useEffect(() => {

        //console.log(coordinates,bounds)
        if(bounds.sw && bounds.ne) {
            setisLoading(true)

            getWeatherData(coordinates.lat,coordinates.lng)
                .then((data) => setWeatherData(data))

            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    //console.log('Places ',data)
                    setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                    setfilteredPlaces([]);
                    setisLoading(false);
                })
        }
    }, [type, bounds])

    //console.log('Places : ' ,places)
   // console.log('Filtered Places : ',filteredPlaces)

    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={myTheme}>
            <Header setCoordinates={setCoordinates} theme={theme} setTheme={setTheme} />
            <Grid container spacing={3} style={{ width: '100%' }  }>
                <Grid item xs={12} md={4}>
                    <List places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8} >
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                    />
                </Grid>



            </Grid>
            </ThemeProvider>
        </>

    )
}

export default App
