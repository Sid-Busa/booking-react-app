import React, { useEffect } from "react";
import { Grid, Typography, Card, CardContent, CardActions, Button, TextField, FormControlLabel, Checkbox, Modal,Dialog,DialogTitle,DialogContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import AdjustIcon from "@material-ui/icons/Adjust";
import MapContainer from "../components/Map/Map";
import { submitBookingDetails } from "../store/actions/flightActions";
import BookingForm from "../components/BookingForm";
import OrderSummary from "../components/OrderSummary";
import Airport from "../assets/plane.svg";
import Rent from "../assets/rent.svg";
import Train from "../assets/train.svg";
import './style.css'
const useStyles = makeStyles((theme) => ({
  imgFluid: {
    maxWidth: "100%",
    height: "auto",
  },
  topBarContainer: {
    height: "90px",
  },
  cabboLogo: {
    maxWidth: "100%",
    height: "60px",
  },
  verticalLine: {
    borderLeft: "2px solid #DBB7EF",
    height: "40px",
  },
  borgoLogo: {
    maxWidth: "100%",
    height: "40px",
  },
  menuItem: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#c0c0c0",
    },
    minWidth: "80px",
    textAlign: "center",
    marginLeft: "10px",
    marginRight: "10px",
    backgroundColor: "#888B8D",
    borderRadius: "20px",
    color: "#fff",
  },
  menuItemText: {
    color: "#fff",
    fontWeight: 600,
  },
  stepSubtitle: {
    fontSize: "8px",
    color: "#B8A6A6",
    fontWeight: 600,
  },
  mainContainer: {
    backgroundColor: "#e3e3e3",
  },
  infoContainer: {
    backgroundColor: "#382f29",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: "8px",
    padding: theme.spacing(2),
  },
  infoContainerTitle: {
    fontSize: "15px",
    color: "#fff",
    lineHeight: 1,
  },
  infoContainerSubtitle: {
    marginTop: theme.spacing(0.5),
    fontSize: "10px",
    color: "#CECECE",
  },
  bookingDetailsCard: {
    borderRadius: "10px",
    width: "100%",
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
    width: "100%",
  },
  inputLabel: {
    fontSize: "15px",
    fontWeight: 600,
    paddingBottom: theme.spacing(1),
  },
  checkboxGrid: {
    paddingBottom: theme.spacing(2),
  },
  continueButton: {
    "&:hover": {
      backgroundColor: "#c0c0c0",
    },
    backgroundColor: "#888B8D",
    width: "100%",
    color: "#fff",
    padding: theme.spacing(2),
  },

  editButton: {
    textDecoration: "none",
    color: "#707070",
  },
  popUp: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    paddingTop:"25px"
  },
}));

function Payment() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
  });

  let pickupTitle = "";
  let pickupAddress = "";
  let destTitle = "";
  let destAddress = "";
  const [IsOpen, setIsOpen] = React.useState(false);

  const [IsExtraOpen, setIsExtraOpen] = React.useState(false);
  const [isGeocoding, setIsGeocoding] = React.useState(false);
  const [isSecGeocoding, setIsSecGeocoding] = React.useState(false);

  const [data, setData] = React.useState({});

  const [TripDetails, setTripDetails] = React.useState({
    From: "",
    To: "Borgo Egnazia, Strada Comunale Egnazia, Savelletri, Fasano, BR, Italy",
    FromLongitude: null,
    FromLatitude: null,
    ToLongitude: 17.3963591,
    ToLatitude: 40.8752544,
    SelectedDate: new Date(),
    Time: new Date(),
    Passengers: 0,
    Luggages: 0,
  });

  const [AllTripDetails, setAllTripDetails] = React.useState([]);

  useEffect(() => {
    let allDetails = JSON.parse(localStorage.getItem("allDetails"));
    setTimeout(() => {
      setAllTripDetails(allDetails);
    }, 500);
  }, [AllTripDetails]);

  console.log(AllTripDetails);

  const handleDateChange = (date) => {
    setTripDetails({
      ...TripDetails,
      SelectedDate: date,
    });
  };

  const handleTimeChange = (time) => {
    setTripDetails({
      ...TripDetails,
      Time: time,
    });
  };

  const handlePassengerChange = (e) => {
    setTripDetails({ ...TripDetails, Passengers: TripDetails.Passengers - 1 });
  };

  const handleLuggagesChange = (e) => {
    setTripDetails({ ...TripDetails, Luggages: TripDetails.Luggages - 1 });
  };

  const handlePassengerAdd = () => {
    setTripDetails({ ...TripDetails, Passengers: TripDetails.Passengers + 1 });
  };

  const handleLuggagesAdd = (e) => {
    setTripDetails({ ...TripDetails, Luggages: TripDetails.Luggages + 1 });
  };

  const handlePlaceFromChange = (Address) => {
    setTripDetails({ ...TripDetails, From: Address, FromLatitude: null, FromLongitude: null });
  };

  const handlePlaceFromSelect = (selected) => {
    TripDetails["From"] = selected;
    setTripDetails(TripDetails);
    setIsGeocoding(true);
    geocodeByAddress(selected)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setTripDetails({
          ...TripDetails,
          FromLatitude: lat,
          FromLongitude: lng,
          // isGeocoding: false,
        });
        setIsGeocoding(false);
      })
      .catch((error) => console.error("Error", error));
  };

  const handlePlaceToChange = (Address) => {
    setTripDetails({ ...TripDetails, To: Address, ToLatitude: null, ToLongitude: null });
  };

  const handlePlaceToSelect = (selected) => {
    TripDetails["To"] = selected;
    setTripDetails(TripDetails);
    geocodeByAddress(selected)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setTripDetails({
          ...TripDetails,
          ToLatitude: lat,
          ToLongitude: lng,
        });
        setIsSecGeocoding(false);
      })
      .catch((error) => console.error("Error", error));
  };

  const submitData = () => {
    // let allDetails = JSON.parse(localStorage.getItem("allDetails"));
    let addDetails = [...AllTripDetails, { id: Math.random(), ...TripDetails }];
    localStorage.setItem("allDetails", JSON.stringify(addDetails));
    setIsExtraOpen(null);
  };

  const deleteData = (id) => {
    // let allDetails = JSON.parse(localStorage.getItem("allDetails"));
    let finalDetails = AllTripDetails.filter((details) => details.id !== id);
    localStorage.setItem("allDetails", JSON.stringify(finalDetails));
  };

  const flightData = useSelector(({ flight }) => {
    if (flight.flightData.pickupLocation) {
      pickupTitle = flight.flightData.pickupLocation.structured_formatting.main_text;
      pickupAddress = flight.flightData.pickupLocation.structured_formatting.secondary_text;
    }

    if (flight.flightData.pickupDestination) {
      destTitle = flight.flightData.pickupDestination.structured_formatting.main_text;
      destAddress = flight.flightData.pickupDestination.structured_formatting.secondary_text;
    }
    return flight.flightData;
  });

  const handleExtraOpen = () => {
    setIsExtraOpen(true);
  };

  const handleExtraClose = () => {
    setIsExtraOpen(false);
  };

  const handleOpen = () => {
    console.log("clicked");
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const bookingData = useSelector(({ flight }) => {
    return flight.bookingData;
  });

  React.useEffect(() => {
    console.log(flightData);
  }, []);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  var month_name = function (dt) {
    let mlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let dList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return dt.getDate() + " " + mlist[dt.getMonth()] + "," + dList[dt.getDay() - 1];
  };

  const toHHMMSS = (date) => {
    return date.getHours() + ":" + date.getMinutes();
  };

  const updateField = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const submit = () => {
    dispatch(submitBookingDetails(data));
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  let details = JSON.parse(localStorage.getItem("details"));
  let allDetails = JSON.parse(localStorage.getItem("allDetails"));

  const fetchLocationIcon = (location) => {
    console.log(location);
    let locationIcon;
    const locationArr = location.split(" ").map((loc) => loc.toLowerCase());
    console.log(locationArr);

    if (locationArr.indexOf("airport") > -1) {
      locationIcon = <img src={Airport} alt="icon" style={{ width: "100%" }} />;
    } else if (locationArr.indexOf("point_of_interest") > -1) {
      locationIcon = <img src={Train} alt="icon" style={{ width: "100%" }} />;
    } else {
      locationIcon = <img src={Rent} alt="icon" style={{ width: "100%" }} />;
    }
    return <div style={{ width: "20px", height: "20px", marginRight: "10px" }}>{locationIcon}</div>;
  };
  console.log(TripDetails);
  return (
    <Grid container className={classes.topBarContainer} justify="center">
      <Grid container item md={10} spacing={2}>
        <Grid item md={4} container justify="center" direction="row">
          <Grid item md={5} container alignItems="center" justify="center">
            <img src="cabbo-logo.png" className={classes.cabboLogo} />
          </Grid>
          <Grid item md={2} container alignItems="center" justify="center">
            <div className={classes.verticalLine}></div>
          </Grid>
          <Grid item md={5} container alignItems="center" justify="center">
            <img src="logo-be.png" className={classes.borgoLogo} />
          </Grid>
        </Grid>
        <Grid item md={4} container justify="flex-end" alignItems="center">
          <Grid item md={2} style={{ textAlign: "center" }}>
            <CheckCircleIcon style={{ color: "#888B8D" }} />
            <Typography variant="subtitle2" className={classes.stepSubtitle}>
              QUOTE
            </Typography>
          </Grid>
          <Grid item md={2} container justify="center">
            <img src="step-arrow.png" className={classes.imgFluid} />
          </Grid>
          <Grid item md={2} style={{ textAlign: "center" }}>
            <CheckCircleIcon style={{ color: "#888B8D" }} />
            <Typography variant="subtitle2" className={classes.stepSubtitle}>
              TRANSFER
            </Typography>
          </Grid>
          <Grid item md={2} container justify="center">
            <img src="step-arrow.png" className={classes.imgFluid} />
          </Grid>
          <Grid item md={2} style={{ textAlign: "center" }}>
            <AdjustIcon style={{ color: "#888B8D" }} />
            <Typography variant="subtitle2" className={classes.stepSubtitle}>
              PAYMENT
            </Typography>
          </Grid>
        </Grid>
        <Grid item md={4} container justify="center" alignItems="center" spacing={2}>
          <Grid item className={classes.menuItem}>
            <Typography variant="subtitle1" className={classes.menuItemText}>
              Help
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.mainContainer} justify="center">
        <Grid container md={8} className={classes.infoContainer} spacing={1} justify="center">
          <Grid item md={4} container justify="center" spacing={2}>
            <Grid item md={3} container alignItems="center">
              <img src="infosection-image-1.png" className={classes.imgFluid} />
            </Grid>
            <Grid item md={9} container alignItems="center">
              <Typography variant="subtitle1" className={classes.infoContainerTitle}>
                Travellers rate us excellent
              </Typography>
              <Typography variant="subtitle2" className={classes.infoContainerSubtitle}>
                4.9/5 Average (5000 reviews)
              </Typography>
            </Grid>
          </Grid>
          <Grid item md={4} container justify="center" spacing={2}>
            <Grid item md={3} container alignItems="center">
              <img src="infosection-image-2.png" className={classes.imgFluid} />
            </Grid>
            <Grid item md={9} container alignItems="center">
              <Typography variant="subtitle1" className={classes.infoContainerTitle}>
                Best drivers in Rome
              </Typography>
              <Typography variant="subtitle2" className={classes.infoContainerSubtitle}>
                We handpick the friendliest, professional, english-speaking drivers
              </Typography>
            </Grid>
          </Grid>
          <Grid item md={4} container justify="center" spacing={2}>
            <Grid item md={3} container alignItems="center">
              <img src="infosection-image-3.png" className={classes.imgFluid} />
            </Grid>
            <Grid item md={9} container alignItems="center">
              <Typography variant="subtitle1" className={classes.infoContainerTitle}>
                Always on time
              </Typography>
              <Typography variant="subtitle2" className={classes.infoContainerSubtitle}>
                Our drivers monitor the flights in case of delays
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container md={8} spacing={2} alignItems="flex-start">
          <Grid item md={6} container>
            <OrderSummary details={details} handleOpen={handleExtraOpen} payment={true} allDetails={allDetails} deleteData={deleteData} />
            <Dialog 
              open={IsExtraOpen}
              onClose={handleExtraClose} 
              contentStyle={{maxWidth: 362}}
              
            >
              <div className={classes.popUp} onClose={handleClose} >
                <BookingForm 
                  width={100}
                  customForm="extraTransfer"
                  details={details}
                  handleClose={handleExtraClose}
                  handlePlaceFromChange={handlePlaceFromChange}
                  handlePlaceFromSelect={handlePlaceFromSelect}
                  handlePlaceToChange={handlePlaceToChange}
                  handlePlaceToSelect={handlePlaceToSelect}
                  from={TripDetails.From}
                  to={TripDetails.To}
                  time={TripDetails.Time}
                  fetchLocationIcon={fetchLocationIcon}
                  selectedDate={TripDetails.SelectedDate}
                  handleDateChange={handleDateChange}
                  handleTimeChange={handleTimeChange}
                  passengers={TripDetails.Passengers}
                  luggages={TripDetails.Luggages}
                  handlePassengerChange={handlePassengerChange}
                  handleLuggagesChange={handleLuggagesChange}
                  handlePassengerAdd={handlePassengerAdd}
                  handleLuggagesAdd={handleLuggagesAdd}
                  submitData={submitData}
                />
              </div>
            </Dialog>
          </Grid>
          <Grid item md={6} container>
            <Grid style={{ position: "relative", paddingBottom: "20px" }} item md={12}>
              <Card className={classes.root}>
                <CardContent>
                  <Grid container>
                    <Grid item md={12} container spacing={2}>
                      <Grid item md={8}>
                        <Typography variant="h6" className={classes.orderSummaryHourText}>
                          Name: {bookingData.fullName || "James James"}
                        </Typography>
                        <Typography variant="h7" className={classes.orderSummaryHourText}>
                          Phone Number: {bookingData.phoneNumber || "+1233232"}
                        </Typography>
                        <br />
                        <Typography variant="h7" className={classes.orderSummaryHourText}>
                          Email: {bookingData.email || "james@gmail.com"}
                        </Typography>
                      </Grid>
                      <Grid item md={4} container justify="flex-end">
                        <a href="#" className={classes.editButton}>
                          Edit
                        </a>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={12}>
              <Card className={classes.root}>
                <CardContent>
                  <Grid container style={{ justifyContent: "center" }} spacing={2}>
                    <Grid item md={12}>
                      <Typography variant="h6" className={classes.orderSummaryTitle}>
                        Route
                      </Typography>
                    </Grid>
                    <Grid item md={12} container spacing={2}>
                      <MapContainer details={details} />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container>
            <Grid style={{ textAlign: "center" }} item md={12}>
              <Typography
                variant="h6"
                style={{
                  marginTop: "30px",
                  fontSize: "25px",
                  fontWeight: "bold",
                  borderBottom: "1px solid",
                  lineHeight: "0.1rem",
                }}
              >
                <span
                  style={{
                    backgroundColor: "#fcf5f5",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  OR
                </span>
              </Typography>
              <Typography
                variant="h6"
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  marginTop: "20px",
                }}
              >
                PAY NOW
              </Typography>
            </Grid>
            <Grid style={{ paddingBottom: "100px" }} item md={12}>
              <Card style={{ marginLeft: "25%", marginRight: "25%" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    style={{
                      fontWeight: "bold",
                      marginTop: "20px",
                    }}
                  >
                    Payment
                  </Typography>
                  <div style={{ marginTop: "30px" }}>
                    <Typography
                      variant="h7"
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Card Number
                    </Typography>
                    <TextField
                      style={{ marginTop: "10px" }}
                      id="flightNumber"
                      required
                      variant="outlined"
                      className={classes.inputTextField}
                      inputProps={{
                        style: {
                          height: "5px",
                        },
                      }}
                    />
                  </div>
                  <div style={{ marginTop: "30px", display: "flex" }}>
                    <div>
                      <Typography
                        variant="h7"
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        Expiration Date
                      </Typography>
                      <TextField
                        style={{ marginTop: "10px", width: "240px" }}
                        id="flightNumber"
                        required
                        variant="outlined"
                        className={classes.inputTextField}
                        inputProps={{
                          style: {
                            height: "5px",
                          },
                        }}
                      />
                    </div>
                    <div>
                      <Typography
                        variant="h7"
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        CVV
                      </Typography>
                      <TextField
                        style={{ marginTop: "10px", width: "" }}
                        id="flightNumber"
                        required
                        variant="outlined"
                        className={classes.inputTextField}
                        inputProps={{
                          style: {
                            height: "5px",
                          },
                        }}
                      />
                    </div>
                  </div>
                  <br />
                  <Grid item md={12}>
                    <FormControlLabel
                      control={<Checkbox checked={state.checkedB} onChange={handleChange} name="checkedA" />}
                      label="I agree to the Terms And Privacy Policy"
                    />
                  </Grid>
                  <Grid item md={12} className={classes.checkboxGrid}>
                    <a style={{ cursor: "pointer", marginLeft: "30px" }}>Read</a>
                  </Grid>
                  <Button size="small" className={classes.continueButton}>
                    <Typography
                      variant="h5"
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Pay $55 and book
                    </Typography>
                  </Button>
                  <div
                    style={{
                      backgroundColor: "#e9e9e9",
                      marginLeft: "6%",
                      marginRight: "6%",
                      marginTop: "20px",
                      padding: "10px",
                      borderRadius: "20px",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                  >
                    Cancel upto 4 hours before and get a refund{" "}
                    <a
                      style={{
                        fontWeight: "bold",
                        textDecoration: "underline",
                        marginLeft: "10px",
                      }}
                    >
                      details
                    </a>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#e9e9e9",
                      marginLeft: "25%",
                      marginRight: "25%",
                      marginTop: "20px",
                      padding: "10px",
                      borderRadius: "20px",
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                  >
                    Secure Payment By Checkout
                  </div>
                  <div
                    style={{
                      marginLeft: "15%",
                      marginRight: "15%",
                      marginTop: "20px",
                      padding: "10px",
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                  >
                    We accept all major credit and debit cards
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Payment;
