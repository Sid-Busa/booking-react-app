import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Spinner from '../assets/spinner.svg';

import Airport from '../assets/plane.svg';
import Rent from '../assets/rent.svg';
import Train from '../assets/train.svg';

import { submitFlightData } from '../store/actions/flightActions';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// If you want to use the provided css
// import 'react-google-places-autocomplete/dist/index.min.css';
import imgOverView7 from '../assets/imgOverView7.jpg';

const useStyles = makeStyles((theme) => ({
  imgFluid: {
    maxWidth: '100%',
    height: 'auto',
  },
  topBarContainer: {
    height: '90px',
  },
  cabboLogo: {
    maxWidth: '100%',
    height: '80px',
  },
  verticalLine: {
    borderLeft: '2px solid #DBB7EF',
    height: '40px',
  },
  borgoLogo: {
    maxWidth: '100%',
    height: '50px',
  },
  menuItem: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#c0c0c0',
    },
    // backgroundImage: `url('menu-background.png')`,
    backgroundSize: '100% 100%',
    minWidth: '80px',
    textAlign: 'center',
    color: '#fff',
    marginLeft: '10px',
    marginRight: '10px',
    backgroundColor: '#888B8D',
    borderRadius: '20px',
  },
  mainContainer: {
    padding: theme.spacing(10),
    // backgroundImage: `url('main-background-image.png')`,
    backgroundSize: '100% 100%',
  },
  mainContainerTitle: {
    color: '#fff',
    fontWeight: 400,
    marginBottom: theme.spacing(2),
  },
  mainContainerSubTitle: {
    color: '#fff',
    fontWeight: 500,
  },
  bookTransferCard: {
    borderRadius: '20px',
    padding: theme.spacing(2),
  },
  bookTransferCardTitle: {
    color: '#A327C8',
    fontWeight: 600,
  },
  inputsContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    border: '1px solid #9C9C9C',
    borderRadius: '5px',
    padding: theme.spacing(1),
  },
  select: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%',
    fontSize: '13px',
    paddingLeft: theme.spacing(1),
    '&:focus': {
      backgroundColor: 'transparent!important',
    },
    '&:hover': {
      borderBottom: 'none!important',
    },
    '&:before': {
      borderBottom: 'none',
    },
    '&:after': {
      borderBottom: 'none',
    },
    '&:hover:not($disabled):not($focused):not($error):before': {
      borderBottom: 'none',
    },
  },
  countersContainer: {
    marginTop: theme.spacing(2),
  },
  counterContainer: {
    border: '1px solid #9C9C9C',
    borderRadius: '5px',
    padding: theme.spacing(1),
  },
  boxesContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  boxContainer: {
    width: '600px',
    height: '180px',
    border: '1px solid #707070',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  infoContainer: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(8),
  },
  infoTitle: {
    color: '#8A64B7',
  },
  infoSubtitle: {
    color: '#8A64B7',
  },
  reviewsContainer: {
    backgroundColor: '#EBEBEB',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  trustpilotLogo: {
    width: '153px',
    height: '64px',
    marginBottom: theme.spacing(3),
  },
  reviewBoxContainer: {
    '&:focus': {
      outline: 'none!important',
    },
  },
  reviewBox: {
    backgroundColor: '#fff',
    boxShadow: '1px 1px 10px 0px rgba(0,0,0,0.25)',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(2),
  },
  reviewBoxAvatar: {},
  faqContainer: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  faqTitle: {
    marginBottom: theme.spacing(6),
  },
  faqAnswer: {
    padding: theme.spacing(2, 3),
  },
  footer: {
    height: '200px',
    backgroundColor: '#232222',
  },
  owlTheme: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    width: '100%',
    height: '100%'
  },
  owlImage: {
    width: '100%',
    height: '100%',
  },
  suggestionsContainer: {
    position: 'absolute',
    zIndex: 200,
    backgroundColor: '#fff',
    width: 230,
    border: '2px solid #e4e4e4',
  },
  suggestion: {
    '&:hover': {
      backgroundColor: '#e4e4e4',
    },
    backgroundColor: '#fff',
    padding: '5px',
    margin: '5px',
    // '&:nth-child(odd)': {
    //   backgroundColor: '#c0c0c0',
    // },
  },
  googlePlacesInput: {
    border: '0',
    outline: 'none',
    padding: '7px',
    margin: '5px 0',
    width: '100%',
  },
  suggestionText: {
    fontSize: '12px',
    width: '80%',
  },
  suggestionContent: {
    display: 'flex',
    alignItems: 'center',
  },
  imgContainer: {
    height: '100vh',
    width: '100vw'
  },
  bookBtn: {
    '&:hover': {
      backgroundColor: '#DEB887',
    },
    width: '100%',
    paddingTop: '10px',
    paddingBottom: '10px',
    backgroundColor: '#F4A460'
  },
 
}));

function HomePage(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [pickupLocation, setPickupLocation] = React.useState('');
  const [pickupDestination, setPickupDestination] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );
  const [passengers, setPassengers] = React.useState(0);
  const [luggages, setLuggages] = React.useState(0);

  const handlePickupLocation = (location) => {
    setPickupLocation(location);
  };

  const handlePickupDestination = (location) => {
    setPickupDestination(location);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const submitData = () => {
    let data = {
      pickupLocation,
      pickupDestination,
      selectedDate,
      passengers,
      luggages,
    };
    console.log(data);
    dispatch(submitFlightData(data));
    props.history.push('transfer');
  };

  const fetchLocationIcon = (location) => {
    let locationIcon;
    const locationArr = location.types.map((loc) => loc);
    console.log(location.types);

    if (locationArr.indexOf('airport') > -1) {
      locationIcon = <img src={Airport} alt='icon' style={{ width: '100%' }} />;
    } else if (locationArr.indexOf('point_of_interest') > -1) {
      locationIcon = <img src={Train} alt='icon' style={{ width: '100%' }} />;
    } else {
      locationIcon = <img src={Rent} alt='icon' style={{ width: '100%' }} />;
    }

    return (
      <div style={{ width: '20px', height: '20px', marginRight: '10px' }}>
        {locationIcon}
      </div>
    );
  };

  return (
    <>
      <Grid container className={classes.topBarContainer}>
        <Grid item md={4} container justify='center'></Grid>
        <Grid item md={4} container justify='center' direction='row'>
          <Grid item md={5} container alignItems='center' justify='center'>
            <img src='cabbo-logo.png' className={classes.cabboLogo} />
          </Grid>
          <Grid item md={2} container alignItems='center' justify='center'>
            <div className={classes.verticalLine}></div>
          </Grid>
          <Grid item md={5} container alignItems='center' justify='center'>
            <img src='logo-be.png' className={classes.borgoLogo} />
          </Grid>
        </Grid>
        <Grid
          item
          md={4}
          container
          justify='center'
          alignItems='center'
          spacing={2}
        >
          <Grid item className={classes.menuItem}>
            tours
          </Grid>
          <Grid item className={classes.menuItem}>
            contact
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        justify='center'
        alignItems='center'
        className={classes.mainContainer}
      >
        <Grid item xs={12}
          className={classes.owlTheme}
          margin={10}
        >
          <div className='item' className={classes.imgContainer}>
            <img
              className={classes.owlImage}
              src={imgOverView7}
              alt='Scenery'
            />
          </div>
        </Grid>
        <Grid item md={9} container>
          <Grid item md={9} className={classes.animatedText}>
            <Typography variant='h4' className={classes.mainContainerTitle}>
              Your transfer service in Puglia, between Borgo Egnazia and the
              main hubs.
            </Typography>
            <Typography variant='h3' className={classes.mainContainerSubTitle}>
              Ride in safety and style!
            </Typography>
          </Grid>
        </Grid>
        <Grid item md={3}>
          <Card className={classes.bookTransferCard}>
            <CardContent>
              <Grid container justify='center'>
                <Grid item>
                  <Typography
                    variant='h6'
                    className={classes.bookTransferCardTitle}
                  >
                    Book a transfer
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  justify='center'
                  className={classes.inputsContainer}
                >
                  <FormControl
                    className={classes.formControl}
                    style={{ width: '100%' }}
                  >
                    <Grid container>
                      <Grid
                        item
                        md={1}
                        container
                        alignItems='center'
                        justify='center'
                      >
                        <RadioButtonUncheckedIcon
                          style={{ fontSize: '10px' }}
                        />
                      </Grid>
                      <Grid item md={11} container alignItems='center'>
                        <GooglePlacesAutocomplete
                          loader={
                            <img src={Spinner} alt='icon' height='40px' />
                          }
                          inputClassName={classes.googlePlacesInput}
                          placeholder='From (airport, port, address)'
                          renderSuggestions={(
                            active,
                            suggestions,
                            onSelectSuggestion
                          ) => (
                            <div className={classes.suggestionsContainer}>
                              {suggestions.map((suggestion) => (
                                <div
                                  className={classes.suggestion}
                                  onClick={(event) => {
                                    onSelectSuggestion(suggestion, event);
                                    handlePickupLocation(suggestion);
                                    console.log(suggestion);
                                  }}
                                >
                                  <div className={classes.suggestionContent}>
                                    {fetchLocationIcon(suggestion)}
                                    <span className={classes.suggestionText}>
                                      {suggestion.description}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        />
                      </Grid>
                    </Grid>
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                    style={{ width: '100%' }}
                  >
                    <Grid container>
                      <Grid
                        item
                        md={1}
                        container
                        alignItems='center'
                        justify='center'
                      >
                        <RadioButtonCheckedIcon style={{ fontSize: '10px' }} />
                      </Grid>
                      <Grid item md={11} container alignItems='center'>
                        <GooglePlacesAutocomplete
                          loader={
                            <img src={Spinner} alt='icon' height='40px' />
                          }
                          inputClassName={classes.googlePlacesInput}
                          placeholder='To (airport, port, address)'
                          initialValue='Borgo Egnazia, Strada Comunale Egnazia, Savelletri, Fasano, BR, Italy'
                          renderSuggestions={(
                            active,
                            suggestions,
                            onSelectSuggestion
                          ) => (
                            <div className={classes.suggestionsContainer}>
                              {suggestions.map((suggestion) => (
                                <div
                                  className={classes.suggestion}
                                  onClick={(event) => {
                                    onSelectSuggestion(suggestion, event);
                                    handlePickupDestination(suggestion);
                                    console.log(suggestion);
                                  }}
                                >
                                  <div className={classes.suggestionContent}>
                                    {fetchLocationIcon(suggestion)}
                                    <span className={classes.suggestionText}>
                                      {suggestion.description}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        />
                      </Grid>
                    </Grid>
                  </FormControl>
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify='space-around' spacing={1}>
                    <Grid item md={6}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant='inline'
                        format='dd/MM'
                        margin='normal'
                        id='date-picker-inline'
                        label='Pickup Date'
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <KeyboardTimePicker
                        margin='normal'
                        id='time-picker'
                        label='Time'
                        ampm={false}
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change time',
                        }}
                      />
                    </Grid>
                  </Grid>
                </MuiPickersUtilsProvider>
                <Grid
                  container
                  className={classes.countersContainer}
                  spacing={2}
                >
                  <Grid item md={6}>
                    <Typography variant='subtitle2'>Passengers</Typography>
                    <Grid
                      container
                      alignItems='center'
                      className={classes.counterContainer}
                    >
                      <Grid
                        item
                        md={4}
                        container
                        alignItems='center'
                        justify='center'
                      >
                        <RemoveIcon
                          onClick={(e) => setPassengers(passengers - 1)}
                          style={{
                            fontSize: '20px',
                            color: '#707070',
                            cursor: 'pointer',
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        md={4}
                        container
                        alignItems='center'
                        justify='center'
                      >
                        {passengers}
                      </Grid>
                      <Grid
                        item
                        md={4}
                        container
                        alignItems='center'
                        justify='center'
                      >
                        <AddIcon
                          onClick={(e) => setPassengers(passengers + 1)}
                          style={{
                            fontSize: '20px',
                            color: '#707070',
                            cursor: 'pointer',
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={6}>
                    <Typography variant='subtitle2'>Luggages</Typography>
                    <Grid
                      container
                      alignItems='center'
                      className={classes.counterContainer}
                    >
                      <Grid
                        item
                        md={4}
                        container
                        alignItems='center'
                        justify='center'
                      >
                        <RemoveIcon
                          onClick={(e) => setLuggages(luggages - 1)}
                          style={{
                            fontSize: '20px',
                            color: '#707070',
                            cursor: 'pointer',
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        md={4}
                        container
                        alignItems='center'
                        justify='center'
                      >
                        {luggages}
                      </Grid>
                      <Grid
                        item
                        md={4}
                        container
                        alignItems='center'
                        justify='center'
                      >
                        <AddIcon
                          onClick={(e) => setLuggages(luggages + 1)}
                          style={{
                            fontSize: '20px',
                            color: '#707070',
                            cursor: 'pointer',
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Grid container justify='center'>
                <Grid item md={12}>
                  <Button onClick={submitData} className={classes.bookBtn}>
                    Book now
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default HomePage;
