import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withStyles, Grid, Typography } from "@material-ui/core";
import BookingForm from "../../components/BookingForm";
import { Style } from "./HomePage.style";
import HomePageHeader from "../../layout/HomePageHeader";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import Airport from "../../assets/plane.svg";
import Rent from "../../assets/rent.svg";
import Train from "../../assets/train.svg";
import Port from "../../assets/port.svg";
import { submitFlightData } from "../../store/actions/flightActions";
import imgOverView1 from "../../assets/imgOverView1.jpg";
import imgOverView2 from "../../assets/imgOverView2.jpg";
import imgOverView3 from "../../assets/imgOverView3.jpg";
import imgOverView4 from "../../assets/imgOverView4.jpg";
import imgOverView5 from "../../assets/imgOverView5.jpg";
import imgOverView6 from "../../assets/imgOverView6.jpg";
import imgOverView7 from "../../assets/imgOverView7.jpg";

class HomePage extends Component {
  state = {
    TripDetails: {
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
    },
  };

  handleDateChange = (date) => {
    const TripDetails = this.state.TripDetails;
    TripDetails["SelectedDate"] = date;
    this.setState({
      TripDetails,
    });
  };

  handleTimeChange = (time) => {
    const TripDetails = this.state.TripDetails;
    TripDetails["Time"] = time;
    this.setState({
      TripDetails,
    });
  };

  handlePassengerChange = (e) => {
    const TripDetails = this.state.TripDetails;
    TripDetails["Passengers"] = TripDetails.Passengers - 1;
    this.setState({ TripDetails });
  };

  handleLuggagesChange = (e) => {
    const TripDetails = this.state.TripDetails;
    TripDetails["Luggages"] = TripDetails.Luggages - 1;
    this.setState({ TripDetails });
  };

  handlePassengerAdd = () => {
    const TripDetails = this.state.TripDetails;
    TripDetails["Passengers"] = TripDetails.Passengers + 1;
    this.setState({ TripDetails });
  };

  handleLuggagesAdd = (e) => {
    const TripDetails = this.state.TripDetails;
    TripDetails["Luggages"] = TripDetails.Luggages + 1;
    this.setState({ TripDetails });
  };

  submitData = () => {
    // let data = {
    //   pickupLocation,
    //   pickupDestination,
    //   selectedDate,
    //   passengers,
    //   luggages,
    // };
    // console.log(data);
    // dispatch(submitFlightData(data));
    localStorage.setItem("details", JSON.stringify(this.state.TripDetails));
    localStorage.setItem("allDetails", JSON.stringify([{ id: Math.random(), ...this.state.TripDetails }]));
    this.props.history.push("transfer");
  };

  fetchLocationIcon = (location) => {
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

  handlePlaceFromChange = (Address) => {
    const TripDetails = this.state.TripDetails;
    TripDetails["From"] = Address;
    TripDetails["FromLatitude"] = null;
    TripDetails["FromLongitude"] = null;
    this.setState({
      TripDetails,
    });
  };

  handlePlaceFromSelect = (selected) => {
    const TripDetails = this.state.TripDetails;
    TripDetails["From"] = selected;
    this.setState({ isGeocoding: true, TripDetails });
    geocodeByAddress(selected)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        let TripDetails = this.state.TripDetails;
        TripDetails["FromLatitude"] = lat;
        TripDetails["FromLongitude"] = lng;
        this.setState({
          TripDetails,
          isGeocoding: false,
        });
      })
      .catch((error) => console.error("Error", error));
  };

  handlePlaceToChange = (Address) => {
    const TripDetails = this.state.TripDetails;
    TripDetails["To"] = Address;
    TripDetails["ToLatitude"] = null;
    TripDetails["ToLongitude"] = null;
    this.setState({
      TripDetails,
    });
  };

  handlePlaceToSelect = (selected) => {
    const TripDetails = this.state.TripDetails;
    TripDetails["To"] = selected;
    this.setState({ isGeocoding: true, TripDetails });
    geocodeByAddress(selected)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        let TripDetails = this.state.TripDetails;
        TripDetails["ToLatitude"] = lat;
        TripDetails["ToLongitude"] = lng;
        this.setState({
          TripDetails,
          isGeocoding: false,
        });
      })
      .catch((error) => console.error("Error", error));
  };
  render() {
    const { classes } = this.props;
    const { From, To, SelectedDate, Passengers, Luggages, Time } = this.state.TripDetails;
    return (
      <>
        <HomePageHeader />
        <Grid container justify="center" alignItems="center" className={classes.mainContainer}>
          <Grid item xs={12} className={classes.owlTheme} margin={10}>
            <div class="item" className={classes.imgContainer}>
               <img className={classes.owlImage} src={imgOverView7} alt="Scenery" />
            </div>
          </Grid>
          <Grid item xs={9} container style={{position:'absolute',top:"30%"}}>
            <Grid item sm={12} md={7} >
              <Typography variant="h4" className={classes.mainContainerTitle} style={{justifyContent:'center'}}>
                Your transfer service in Puglia, between Borgo Egnazia and the main hubs.
              </Typography>
              <Typography variant="h3" className={classes.mainContainerSubTitle}>
                Ride in safety and style!
              </Typography>
            </Grid>
            <Grid item sm={12} md={5} >
            <BookingForm
              handlePlaceFromChange={this.handlePlaceFromChange}
              handlePlaceFromSelect={this.handlePlaceFromSelect}
              handlePlaceToChange={this.handlePlaceToChange}
              handlePlaceToSelect={this.handlePlaceToSelect}
              from={From}
              to={To}
              time={Time}
              fetchLocationIcon={this.fetchLocationIcon}
              selectedDate={SelectedDate}
              handleDateChange={this.handleDateChange}
              handleTimeChange={this.handleTimeChange}
              passengers={Passengers}
              luggages={Luggages}
              handlePassengerChange={this.handlePassengerChange}
              handleLuggagesChange={this.handleLuggagesChange}
              handlePassengerAdd={this.handlePassengerAdd}
              handleLuggagesAdd={this.handleLuggagesAdd}
              submitData={this.submitData}
            />
          </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(Style)(HomePage);
