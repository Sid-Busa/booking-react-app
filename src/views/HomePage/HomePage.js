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
import PermPhoneMsgOutlinedIcon from '@material-ui/icons/PermPhoneMsgOutlined';
import AirplanemodeActiveOutlinedIcon from '@material-ui/icons/AirplanemodeActiveOutlined';
import CommuteOutlinedIcon from '@material-ui/icons/CommuteOutlined';
import { submitFlightData } from "../../store/actions/flightActions";
import mainImage from "../../assets/mainImage.png";
import '../style.css';
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
    isLoding : false,
    selectedFrom:false,
    selectedTo :false
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
    this.setState({
      isLoding: true
    })
    setTimeout(() => {
      this.setState({
        isLoding: false
      })
      localStorage.setItem("details", JSON.stringify(this.state.TripDetails));
      localStorage.setItem("allDetails", JSON.stringify([{ id: Math.random(), ...this.state.TripDetails }]));
      this.props.history.push("transfer");
    },1000)
  };

  fetchLocationIcon = (location) => {
    let locationIcon;
    const locationArr = location.split(" ").map((loc) => loc.toLowerCase());

    if (locationArr.indexOf("airport") > -1) {
      locationIcon = <img src={Airport} alt="icon" style={{ width: "100%" }} />;
    } else if (locationArr.indexOf("point_of_interest") > -1) {
      locationIcon = <img src={Train} alt="icon" style={{ width: "100%" }} />;
    } else {
      locationIcon = <img src={Rent} alt="icon" style={{ width: "100%" }} />;
    }
    return <div style={{ width: "20px", height: "20px", marginRight: "10px" }} >{locationIcon}</div>;
  };

  fetchLocationIcon1 = (location) => {
    let locationIcon;
    const locationArr = location.split(" ").map((loc) => loc.toLowerCase());

    if (locationArr.indexOf("airport") > -1) {
      locationIcon = <img src={Airport} alt="icon" className={this.props.classes.imageSize} />;
    } else if (locationArr.indexOf("point_of_interest") > -1) {
      locationIcon = <img src={Train} alt="icon" className={this.props.classes.imageSize} />;
    } else {
      locationIcon = <img src={Rent} alt="icon" className={this.props.classes.imageSize}/>;
    }
    return <div  className={this.props.classes.IconFirst} >{locationIcon}</div>;
  };

  fetchLocationIcon2 = (location) => {
    let locationIcon;
    const locationArr = location.split(" ").map((loc) => loc.toLowerCase());

    if (locationArr.indexOf("airport") > -1) {
      locationIcon = <img src={Airport} alt="icon" className={this.props.classes.imageSize}/>;
    } else if (locationArr.indexOf("point_of_interest") > -1) {
      locationIcon = <img src={Train} alt="icon" className={this.props.classes.imageSize}/>;
    } else {
      locationIcon = <img src={Rent} alt="icon" className={this.props.classes.imageSize}/>;
    }
    return <div className={this.props.classes.IconSecond}>{locationIcon}</div>;
  };
  
  handlePlaceFromChange = (Address) => {
    const TripDetails = this.state.TripDetails;
    TripDetails["From"] = Address;
    TripDetails["FromLatitude"] = null;
    TripDetails["FromLongitude"] = null;
    this.setState({
      TripDetails,
      selectedFrom:true
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
          selectedTo:true,
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
               <img className={classes.owlImage} src={mainImage} alt="Scenery" />
            </div>
          </Grid>
          <Grid item xs={9} container  style={{position:'absolute',top:"20%"}}>
            <Grid item sm={12} md={7} className={classes.animatedText} >
              <Typography variant="h4" className={classes.mainContainerTitle} style={{justifyContent:'center'}}>
                Your transfer service in Puglia, between Borgo Egnazia and the main hubs.
              </Typography>
              <Typography variant="h3" className={classes.mainContainerSubTitle}>
                Ride in safety and style! 
              </Typography>
              <span>
                <CommuteOutlinedIcon style={{fontSize:'40px',backgroundColor:'white',padding:10,borderRadius:"50%",margin:"0px 40px"}} className={classes.headerIcon} />
              </span>
              <span>
                  <PermPhoneMsgOutlinedIcon style={{fontSize:'40px',fontWeight:'100px',backgroundColor:'white',padding:10,borderRadius:"50%",margin:"0px 40px"}}  className={classes.headerIcon} />
              </span>
              <span>
                <AirplanemodeActiveOutlinedIcon style={{fontSize:'40px',backgroundColor:'white',padding:10,borderRadius:"50%",margin:"0px 40px"}} className={classes.headerIcon} />
              </span>

            </Grid>
            <Grid item sm={12} md={5} >
            <BookingForm
              handlePlaceFromChange={this.handlePlaceFromChange}
              handlePlaceFromSelect={this.handlePlaceFromSelect}
              handlePlaceToChange={this.handlePlaceToChange}
              handlePlaceToSelect={this.handlePlaceToSelect}
              fetchLocationIcon1 = {this.fetchLocationIcon1}
              fetchLocationIcon2= {this.fetchLocationIcon2}
              selectedFrom = {this.state.selectedFrom}
              selectedTo={this.state.selectedTo}
              TripDetails={this.state.TripDetails}
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
              loader={this.state.isLoding}
            />
          </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(Style)(HomePage);
