import React from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import DirectionsCarOutlinedIcon from '@material-ui/icons/DirectionsCarOutlined';
import AdjustIcon from '@material-ui/icons/Adjust';
import MapContainer from './map';
import { submitBookingDetails } from '../store/actions/flightActions';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { TextareaAutosize } from '@material-ui/core';
import { getCarsFromPassengerNumber } from '../helpers/car';

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
    height: '60px',
  },
  verticalLine: {
    borderLeft: '2px solid #DBB7EF',
    height: '40px',
  },
  borgoLogo: {
    maxWidth: '100%',
    height: '40px',
  },
  menuItem: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#c0c0c0',
    },
    minWidth: '80px',
    textAlign: 'center',
    marginLeft: '10px',
    marginRight: '10px',
    backgroundColor: '#888B8D',
    borderRadius: '20px',
    color: '#fff',
  },
  menuItemText: {
    color: '#fff',
    fontWeight: 600,
  },
  stepSubtitle: {
    fontSize: '8px',
    color: '#B8A6A6',
    fontWeight: 600,
  },
  mainContainer: {
    backgroundColor: '#e3e3e3',
  },
  infoContainer: {
    backgroundColor: '#382f29',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: '8px',
    padding: theme.spacing(2),
  },
  infoContainerTitle: {
    fontSize: '15px',
    color: '#fff',
    lineHeight: 1,
  },
  infoContainerSubtitle: {
    marginTop: theme.spacing(0.5),
    fontSize: '10px',
    color: '#CECECE',
  },
  bookingDetailsCard: {
    borderRadius: '10px',
    width: '100%',
    padding: theme.spacing(1, 2),
  },
  bookingDetailsTitleGrid: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
  },
  bookingDetailsTitle: {
    fontWeight: 600,
  },
  inputGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  inputTextField: {
    padding: 0,
    width: '100%',
  },
  inputLabel: {
    fontSize: '15px',
    fontWeight: 600,
    paddingBottom: theme.spacing(1),
  },
  checkboxGrid: {
    paddingBottom: theme.spacing(2),
  },
  _continueButton: {
    '&:hover': {
      backgroundColor: '#c0c0c0',
    },
    backgroundColor: '#888B8D',
    width: '100%',
    color: '#fff',
    padding: theme.spacing(2),
  },
  orderSummaryTitle: {
    fontWeight: 600,
  },
  orderSummaryDateText: {
    color: '#707070',
  },
  orderSummaryHourText: {
    color: '#707070',
  },
  editButton: {
    textDecoration: 'none',
    color: '#707070',
  },
}));

function Transfer(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
    checkedBulkyLuggage: false,
    checkedWheelchairAccess: false,
  });

  let pickupTitle = '';
  let pickupAddress = '';
  let destTitle = '';
  let destAddress = '';

  const [infant, setInfant] = React.useState(0);
  const [child, setChild] = React.useState(0);
  const [booster, setBooster] = React.useState(0);
  const [addedNote, setAddedNote] = React.useState('');

  const [data, setData] = React.useState({});

  const flightData = useSelector(({ flight }) => {

    if(flight.flightData.pickupLocation) {
      pickupTitle = flight.flightData.pickupLocation.structured_formatting.main_text;
      pickupAddress = flight.flightData.pickupLocation.structured_formatting.secondary_text;
    }

    if(flight.flightData.pickupDestination) {
      destTitle = flight.flightData.pickupDestination.structured_formatting.main_text;
      destAddress = flight.flightData.pickupDestination.structured_formatting.secondary_text;
    }
      
    return flight.flightData;
  });

  React.useEffect(() => {
    console.log(flightData);
  }, []);

  const handleChange = (event) => {
    if (
      event.target.name === 'checkedWheelchairAccess' &&
      !state.checkedWheelchairAccess
    ) {
      setAddedNote(addedNote + 'Wheelchair Accessible Vehicle: ');
    } else if (
      event.target.name === 'checkedWheelchairAccess' &&
      state.checkedWheelchairAccess
    ) {
      setAddedNote(addedNote.replace('Wheelchair Accessible Vehicle: ', ''));
    }

    if (
      event.target.name === 'checkedBulkyLuggage' &&
      !state.checkedBulkyLuggage
    ) {
      setAddedNote(addedNote + 'Bulky luggage: ');
    } else if (
      event.target.name === 'checkedBulkyLuggage' &&
      state.checkedBulkyLuggage
    ) {
      setAddedNote(addedNote.replace('Bulky luggage: ', ''));
    }

    if (event.target.name === 'checkedB' && !state.checkedC) {
      setInfant(0);
      setChild(0);
      setBooster(0);
    }

    if (event.target.name === 'checkedC') {
      setAddedNote('');
      setState({ ...state, checkedBulkyLuggage: false });
      setState({ ...state, checkedWheelchairAccess: false });
    }

    setState({ ...state, [event.target.name]: event.target.checked });
  };

  var month_name = function (dt) {
    let mlist = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let dList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return (
      dt.getDate() + ' ' + mlist[dt.getMonth()] + ',' + dList[dt.getDay() - 1]
    );
  };

  const toHHMMSS = (date) => {
    return date.getHours() + ':' + date.getMinutes();
  };

  const updateField = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const submit = () => {
    dispatch(submitBookingDetails(data));
    props.history.push('payment');
  };

  return (
    <Grid container className={classes.topBarContainer} justify='center'>
      <Grid container item md={10} spacing={2}>
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
        <Grid item md={4} container justify='flex-end' alignItems='center'>
          <Grid item md={2} style={{ textAlign: 'center' }}>
            <CheckCircleIcon style={{ color: '#888B8D' }} />
            <Typography variant='subtitle2' className={classes.stepSubtitle}>
              QUOTE
            </Typography>
          </Grid>
          <Grid item md={2} container justify='center'>
            <img src='step-arrow.png' className={classes.imgFluid} />
          </Grid>
          <Grid item md={2} style={{ textAlign: 'center' }}>
            <AdjustIcon style={{ color: '#888B8D' }} />
            <Typography variant='subtitle2' className={classes.stepSubtitle}>
              TRANSFER
            </Typography>
          </Grid>
          <Grid item md={2} container justify='center'>
            <img src='step-arrow.png' className={classes.imgFluid} />
          </Grid>
          <Grid item md={2} style={{ textAlign: 'center' }}>
            <RadioButtonUncheckedIcon style={{ color: '#888B8D' }} />
            <Typography variant='subtitle2' className={classes.stepSubtitle}>
              PAYMENT
            </Typography>
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
            <Typography variant='subtitle1' className={classes.menuItemText}>
              Help
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.mainContainer} justify='center'>
        <Grid
          container
          md={8}
          className={classes.infoContainer}
          spacing={1}
          justify='center'
        >
          <Grid item md={4} container justify='center' spacing={2}>
            <Grid item md={3} container alignItems='center'>
              <img src='infosection-image-1.png' className={classes.imgFluid} />
            </Grid>
            <Grid item md={9} container alignItems='center'>
              <Typography
                variant='subtitle1'
                className={classes.infoContainerTitle}
              >
                Travellers rate us excellent
              </Typography>
              <Typography
                variant='subtitle2'
                className={classes.infoContainerSubtitle}
              >
                4.9/5 Average (5000 reviews)
              </Typography>
            </Grid>
          </Grid>
          <Grid item md={4} container justify='center' spacing={2}>
            <Grid item md={3} container alignItems='center'>
              <img src='infosection-image-2.png' className={classes.imgFluid} />
            </Grid>
            <Grid item md={9} container alignItems='center'>
              <Typography
                variant='subtitle1'
                className={classes.infoContainerTitle}
              >
                Best drivers in Rome
              </Typography>
              <Typography
                variant='subtitle2'
                className={classes.infoContainerSubtitle}
              >
                We handpick the friendliest, professional, english-speaking
                drivers
              </Typography>
            </Grid>
          </Grid>
          <Grid item md={4} container justify='center' spacing={2}>
            <Grid item md={3} container alignItems='center'>
              <img src='infosection-image-3.png' className={classes.imgFluid} />
            </Grid>
            <Grid item md={9} container alignItems='center'>
              <Typography
                variant='subtitle1'
                className={classes.infoContainerTitle}
              >
                Always on time
              </Typography>
              <Typography
                variant='subtitle2'
                className={classes.infoContainerSubtitle}
              >
                Our drivers monitor the flights in case of delays
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container md={8} spacing={2}>
          <Grid item md={7} container>
            <Card className={classes.bookingDetailsCard}>
              <CardContent>
                <Grid item md={12} className={classes.bookingDetailsTitleGrid}>
                  <Typography
                    variant='h5'
                    className={classes.bookingDetailsTitle}
                  >
                    Booking Details
                  </Typography>
                </Grid>
                <Grid item md={12} className={classes.inputGrid}>
                  <Typography variant='h6' className={classes.inputLabel}>
                    Flight number
                  </Typography>
                  <TextField
                    id='flightNumber'
                    required
                    variant='outlined'
                    className={classes.inputTextField}
                    onChange={updateField}
                    inputProps={{
                      style: {
                        height: '5px',
                      },
                    }}
                  />
                </Grid>

                <Grid item md={12} className={classes.inputGrid}>
                  <Typography variant='h6' className={classes.inputLabel}>
                    Your full name
                  </Typography>
                  <TextField
                    required
                    id='fullName'
                    variant='outlined'
                    className={classes.inputTextField}
                    onChange={updateField}
                    inputProps={{
                      style: {
                        height: '5px',
                      },
                    }}
                  />
                </Grid>

                <Grid item md={12} className={classes.inputGrid}>
                  <Typography variant='h6' className={classes.inputLabel}>
                    Mobile Phone Number
                  </Typography>
                  <TextField
                    required
                    id='phoneNumber'
                    variant='outlined'
                    className={classes.inputTextField}
                    type='number'
                    onChange={updateField}
                    inputProps={{
                      style: {
                        height: '5px',
                      },
                    }}
                  />
                </Grid>

                <Grid item md={12} className={classes.inputGrid}>
                  <Typography variant='h6' className={classes.inputLabel}>
                    Email
                  </Typography>
                  <TextField
                    required
                    id='email'
                    variant='outlined'
                    className={classes.inputTextField}
                    type='email'
                    onChange={updateField}
                    inputProps={{
                      style: {
                        height: '5px',
                      },
                    }}
                  />
                </Grid>

                <Grid item md={12} className={classes.checkboxGrid}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedA}
                        onChange={handleChange}
                        name='checkedA'
                      />
                    }
                    label='I agree to receive status updates via sms & email'
                  />
                </Grid>
                <hr style={{ marginBottom: '20px' }} />

                <Grid item md={12} className={classes.checkboxGrid}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleChange}
                        name='checkedB'
                      />
                    }
                    label='Add child seats'
                  />
                  {state.checkedB ? (
                    <>
                      <Grid item md={12} style={{ margin: 20 }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            width: '100%',
                            margin: 'auto',
                          }}
                        >
                          <Grid alignItems='center' md={4}>
                            <Typography variant='subtitle1'>
                              Infant Carrier
                            </Typography>
                            <Typography
                              variant='paragraph'
                              color='textSecondary'
                              style={{ fontSize: 14 }}
                            >
                              0-6 months
                            </Typography>
                          </Grid>

                          <Grid container alignItems='center' md={6}>
                            <RemoveIcon
                              onClick={(e) => setInfant(infant - 1)}
                              style={{
                                fontSize: '20px',
                                color: '#707070',
                                cursor: 'pointer',
                                marginRight: 20,
                              }}
                            />

                            {infant}

                            <AddIcon
                              onClick={(e) => setInfant(infant + 1)}
                              style={{
                                fontSize: '20px',
                                color: '#707070',
                                cursor: 'pointer',
                                marginLeft: 20,
                              }}
                            />
                          </Grid>
                        </div>
                      </Grid>
                      <Grid item md={12} style={{ margin: 20 }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            width: '100%',
                            margin: 'auto',
                          }}
                        >
                          <Grid alignItems='center' md={4}>
                            <Typography variant='subtitle1'>
                              Child seat
                            </Typography>
                            <Typography
                              variant='paragraph'
                              color='textSecondary'
                              style={{ fontSize: 14 }}
                            >
                              6 months - 3 years
                            </Typography>
                          </Grid>

                          <Grid container alignItems='center' md={6}>
                            <RemoveIcon
                              onClick={(e) => setChild(child - 1)}
                              style={{
                                fontSize: '20px',
                                color: '#707070',
                                cursor: 'pointer',
                                marginRight: 20,
                              }}
                            />

                            {child}

                            <AddIcon
                              onClick={(e) => setChild(child + 1)}
                              style={{
                                fontSize: '20px',
                                color: '#707070',
                                cursor: 'pointer',
                                marginLeft: 20,
                              }}
                            />
                          </Grid>
                        </div>
                      </Grid>
                      <Grid item md={12} style={{ margin: 20 }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            width: '100%',
                            margin: 'auto',
                          }}
                        >
                          <Grid alignItems='center' md={4}>
                            <Typography variant='subtitle1'>Booster</Typography>
                            <Typography
                              variant='paragraph'
                              color='textSecondary'
                              style={{ fontSize: 14 }}
                            >
                              3-12 years
                            </Typography>
                          </Grid>

                          <Grid container alignItems='center' md={6}>
                            <RemoveIcon
                              onClick={(e) => setBooster(booster - 1)}
                              style={{
                                fontSize: '20px',
                                color: '#707070',
                                cursor: 'pointer',
                                marginRight: 20,
                              }}
                            />

                            {booster}

                            <AddIcon
                              onClick={(e) => setBooster(booster + 1)}
                              style={{
                                fontSize: '20px',
                                color: '#707070',
                                cursor: 'pointer',
                                marginLeft: 20,
                              }}
                            />
                          </Grid>
                        </div>
                      </Grid>
                    </>
                  ) : null}
                </Grid>

                <Grid item md={12} className={classes.checkboxGrid}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedC}
                        onChange={handleChange}
                        name='checkedC'
                      />
                    }
                    label='Add notes for the driver'
                  />
                  {state.checkedC ? (
                    <Grid item md={12} style={{ margin: 20 }}>
                      <TextareaAutosize
                        rowsMin={4}
                        style={{
                          width: '100%',
                          padding: 10,
                          borderRadius: 4,
                          borderColor: 'black',
                        }}
                        placeholder='Anything you want to tell the driver'
                        onChange={(e) => setAddedNote(e.target.value)}
                        name='addedNote'
                        value={addedNote}
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedBulkyLuggage}
                            onChange={handleChange}
                            name='checkedBulkyLuggage'
                          />
                        }
                        label='Bulky luggage'
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedWheelchairAccess}
                            onChange={handleChange}
                            name='checkedWheelchairAccess'
                          />
                        }
                        label='Wheelchair Accessible Vehicle'
                      />
                    </Grid>
                  ) : null}
                </Grid>
              </CardContent>
              <CardActions>
                <Grid container justify='center'>
                  <Grid item md={12}>
                    <Button
                      onClick={submit}
                      size='small'
                      className={classes._continueButton}
                      variant='outlined'
                    >
                      Continue
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
          <Grid item md={5} container>
            <Grid style={{ position: 'relative', paddingBottom: '20px' }} item md={12}>
              <Card className={classes.root}>
                <div>
                  <CardContent>
                    <Grid container>
                      <Grid item md={12}>
                        <Typography
                          variant='h6'
                          className={classes.orderSummaryTitle}
                        >
                          Order summary
                        </Typography>
                      </Grid>
                      <Grid item md={12} container spacing={2}>
                        <Grid item md={4}>
                          <Typography
                            variant='subtitle2'
                            className={classes.orderSummaryDateText}
                          >
                            {month_name(new Date(flightData.selectedDate))}
                          </Typography>
                        </Grid>
                        <Grid item md={4}>
                          <Typography
                            variant='subtitle2'
                            className={classes.orderSummaryHourText}
                          >
                            {toHHMMSS(new Date(flightData.selectedDate))}
                          </Typography>
                        </Grid>
                        <Grid item md={4} container justify='flex-end'>
                          <a href='#' className={classes.editButton}>
                            Edit
                          </a>
                        </Grid>
                        <Grid item md={8}>
                          <div style={{ display: 'flex' }}>
                            <RadioButtonUncheckedIcon
                              style={{ color: '#d9cd1b' }}
                            />
                            <div>
                              <Typography
                                variant='h6'
                                style={{
                                  marginLeft: '12px',
                                  fontSize: '16px',
                                  color: 'black',
                                  fontWeight: 'bold',
                                }}
                              >
                                { pickupTitle }
                              </Typography>
                              <Typography
                                variant='h6'
                                style={{
                                  marginLeft: '12px',
                                  fontSize: '14px',
                                  color: 'gray',
                                  fontWeight: 'bold',
                                }}
                              >
                                { pickupAddress }
                              </Typography>
                            </div>
                          </div>
                          {/* <p
                            style={{
                              borderLeft: "1px solid",
                              height: "147px",
                              top: "116px",
                              left: "27px",
                              color: "#d9cd1b",
                              position: "absolute",
                            }}
                          ></p> */}
                          <div style={{ display: 'flex', marginTop: '55px' }}>
                            <FiberManualRecordIcon
                              style={{ color: '#d9cd1b' }}
                            />
                            <div>
                              <Typography
                                variant='h6'
                                style={{
                                  marginLeft: '12px',
                                  fontSize: '16px',
                                  color: 'black',
                                  fontWeight: 'bold',
                                }}
                              >
                                { destTitle }
                              </Typography>
                              <Typography
                                variant='h6'
                                style={{
                                  marginLeft: '12px',
                                  fontSize: '14px',
                                  color: 'gray',
                                  fontWeight: 'bold',
                                }}
                              >
                                { destAddress }
                              </Typography>

                              <div
                                style={{
                                  display: 'flex',
                                  marginLeft: '10px',
                                  marginTop: '10px',
                                }}
                              >
                                <div>
                                  <DirectionsCarOutlinedIcon
                                    style={{ color: 'gray' }}
                                  />
                                </div>
                                <span style={{ marginLeft: '10px' }}>
                                  {getCarsFromPassengerNumber(flightData.passengers)}
                                </span>
                                <div style={{ marginLeft: '30px' }}>
                                  <PersonOutlineOutlinedIcon
                                    style={{ color: 'gray' }}
                                  />
                                </div>
                                <span style={{ marginLeft: '10px' }}>
                                  {flightData.passengers}
                                </span>
                                <div style={{ marginLeft: '30px' }}>
                                  <LocalMallOutlinedIcon
                                    style={{ color: 'gray' }}
                                  />
                                </div>
                                <span style={{ marginLeft: '10px' }}>
                                  {flightData.luggages}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item md={4} container justify='flex-end'>
                          <Typography
                            variant='h6'
                            style={{
                              marginLeft: '12px',
                              fontSize: '18px',
                              color: 'gray',
                              fontWeight: 'bold',
                            }}
                          >
                            $51
                          </Typography>
                        </Grid>
                        <Grid item md={12}>
                          <hr />
                        </Grid>
                        <Grid item md={8}>
                            <p>Total price Taxes & fees included</p>
                          </Grid>
                        <Grid item md={4} container justify='flex-end'>
                          <Typography
                            variant='h6'
                            style={{
                              marginLeft: '12px',
                              fontSize: '35px',
                              color: '#d9cd1b',
                              fontWeight: 'bold',
                            }}
                          >
                            $51
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </div>
              </Card>
            </Grid>
            <Grid item md={12}>
              <Card style={{ height: '100%' }} className={classes.root}>
                <CardContent>
                  <Grid container style={{ justifyContent: 'center' }} spacing={2}>
                    <Grid item md={12}>
                      <Typography
                        variant='h6'
                        className={classes.orderSummaryTitle}
                      >
                        Route
                      </Typography>
                    </Grid>
                    <Grid item md={12} container spacing={2}>
                      <MapContainer />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Transfer;
