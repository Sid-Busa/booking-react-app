import React from "react";
import { withStyles, Card, CardContent, CardActions, Button, Grid, Typography, FormControl } from "@material-ui/core";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CloseIcon from "@material-ui/icons/Close";
import DateFnsUtils from "@date-io/date-fns";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CircularProgress from '@material-ui/core/CircularProgress';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";
import { Style } from "./BookingForm.style";
import AutoCompletePlaces from "../AutoCompletePlaces";

const BookingForm = ({
  classes,
  handlePlaceFromChange,
  handlePlaceFromSelect,
  handlePlaceToChange,
  handlePlaceToSelect,
  from,
  to,
  fetchLocationIcon,
  selectedDate,
  handleDateChange,
  passengers,
  luggages,
  submitData,
  handleLuggagesChange,
  handlePassengerChange,
  handlePassengerAdd,
  handleLuggagesAdd,
  time,
  handleTimeChange,
  customForm,
  details,
  loader,
  handleClose,
}) => {
  passengers = passengers || 0;
  luggages = luggages || 0;
  return (
    <Card className={`${classes.bookTransferCard} ${customForm === "editForm" || customForm === "extraTransfer" ? classes.modal : null}`} >
      <CardContent>
        {customForm === "editForm" || customForm === "extraTransfer" ? <CloseIcon className={classes.close} onClick={handleClose} /> : null}
        <Grid container justify="center">
        
          <Grid item>
            <Typography variant="h6" className={classes.bookTransferCardTitle}>
              {customForm === "editForm" ? "Edit transfer" : customForm === "extraTransfer" ? "Add Extra Transfer" : "Book a transfer"}
            </Typography>
          </Grid>
          <Grid item container justify="center" className={classes.inputsContainer}>
            <FormControl className={classes.formControl} style={{ width: "100%" }}>
              <Grid container>
                <Grid item md={1} container alignItems="center" justify="center">
                  <RadioButtonUncheckedIcon style={{ fontSize: "10px" }} className={classes.iconForCheck1}/>
                </Grid>
                <Grid item md={11} container alignItems="center">
                  <AutoCompletePlaces
                    handlePlaceChange={handlePlaceFromChange}
                    handlePlaceSelect={handlePlaceFromSelect}
                    address={from}
                    fetchLocationIcon={fetchLocationIcon}
                  />
                </Grid>
              </Grid>
            </FormControl>
            <FormControl className={classes.formControl} style={{ width: "100%" }}>
              <Grid container>
                <Grid item md={1} container alignItems="center" justify="center">
                  <LocationOnOutlinedIcon style={{ fontSize: "20px" }} className={classes.iconForCheck2}/>
                </Grid>
                <Grid item md={11} container alignItems="center">
                  <AutoCompletePlaces
                    handlePlaceChange={handlePlaceToChange}
                    handlePlaceSelect={handlePlaceToSelect}
                    address={to}
                    fetchLocationIcon={fetchLocationIcon}
                  />
                </Grid>
              </Grid>
            </FormControl>
          </Grid>
          <MoreVertIcon  className={classes.arrowDot}  />
          <KeyboardArrowDownIcon className={classes.arrowDownArrow}/>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around" spacing={1}>
              <Grid item md={6}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Pickup Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
              <Grid item md={6}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Time"
                  ampm={false}
                  value={time}
                  onChange={handleTimeChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
          <Grid container className={classes.countersContainer} spacing={2}>
            <Grid item md={6}>
              <Typography variant="subtitle2">Passengers</Typography>
              <Grid container alignItems="center" className={classes.counterContainer}>
                <Grid item md={4} container alignItems="center" justify="center">
                  <RemoveIcon
                    onClick={handlePassengerChange}
                    style={{
                      fontSize: "20px",
                      color: "#707070",
                      cursor: "pointer",
                    }}
                  />
                </Grid>
                <Grid item md={4} container alignItems="center" justify="center">
                  {passengers < 0 ? 0 : passengers}
                </Grid>
                <Grid item md={4} container alignItems="center" justify="center">
                  <AddIcon
                    onClick={handlePassengerAdd}
                    style={{
                      fontSize: "20px",
                      color: "#707070",
                      cursor: "pointer",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6}>
              <Typography variant="subtitle2">Luggages</Typography>
              <Grid container alignItems="center" className={classes.counterContainer}>
                <Grid item md={4} container alignItems="center" justify="center">
                  <RemoveIcon
                    onClick={handleLuggagesChange}
                    style={{
                      fontSize: "20px",
                      color: "#707070",
                      cursor: "pointer",
                    }}
                  />
                </Grid>
                <Grid item md={4} container alignItems="center" justify="center">
                  {luggages < 0 ? 0 : luggages}
                </Grid>
                <Grid item md={4} container alignItems="center" justify="center">
                  <AddIcon
                    onClick={handleLuggagesAdd}
                    style={{
                      fontSize: "20px",
                      color: "#707070",
                      cursor: "pointer",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container justify="center">
          <Grid item md={12}>
            <Button onClick={submitData} className={classes.bookBtn}>
              {loader ? <CircularProgress style={{color:'white'}} disableShrink /> : customForm === "editForm" ? "Submit" : customForm === "editTransfer" ? "Submit" : "Book Now"}
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default withStyles(Style)(BookingForm);
