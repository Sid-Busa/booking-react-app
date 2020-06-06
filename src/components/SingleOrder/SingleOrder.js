import React from "react";
import { withStyles, Typography, Grid } from "@material-ui/core";
import moment from "moment";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CloseIcon from "@material-ui/icons/Close";
import { getCarsFromPassengerNumber } from "../../helpers/car";
import { Style } from "./SingleOrder.style";

const SingleOrder = ({ classes, id, date, time, passengers, from, to, luggages, handleOpen, deleteData, payment }) => {
  let placeTitle = (place) => {
    return place.substring(0, place.indexOf(","));

    // let word = place.split(" ")[0];
    // word = word.split("");
    // if (word.indexOf(",") === word.length - 1) {
    //   return word.slice(0, -1).join("");
    // } else {
    //   return word.join("");
    // }
  };

  let placeRest = (place) => {
    return place.substring(place.indexOf(",") + 1);
  };

  let placeCount = (place) => {
    return place.split(" ");
  };

  let detailIcon = getCarsFromPassengerNumber(passengers);
  console.log(detailIcon);
  return (
    <Grid container spacing={2} className={classes.endBorder}>
      <Grid item md={8}>
        <Typography variant="subtitle2" className={classes.orderSummaryDateText}>
          {moment(date).format("dddd, MMMM Do YYYY")} at {moment(time).format("HH:mm")}
        </Typography>
      </Grid>
      <Grid item md={4} container justify="flex-end">
        <a className={classes.editButton} onClick={handleOpen}>
          Edit
        </a>
        {payment && <CloseIcon onClick={() => deleteData(id)} style={{ fontSize: 19, marginLeft: 10, cursor: "pointer" }} />}
      </Grid>
      <Grid item md={8} style={{ position: "relative" }}>
        <div
          style={
            placeCount(placeRest(from)).length >= 10
              ? { marginBottom: "55px", minHeight: 172, display: "flex" }
              : { marginBottom: "55px", minHeight: 72, display: "flex" }
          }
        >
          <RadioButtonUncheckedIcon style={{ color: "#d9cd1b" }} />
          <div>
            <Typography
              variant="h6"
              style={{
                marginLeft: "12px",
                fontSize: "16px",
                color: "black",
                fontWeight: "bold",
              }}
            >
              {placeTitle(from)}
            </Typography>
            <Typography
              variant="h6"
              style={{
                marginLeft: "12px",
                fontSize: "14px",
                color: "gray",
                fontWeight: "bold",
              }}
            >
              {placeRest(from)}
            </Typography>
          </div>
        </div>
        <p
          style={
            placeCount(placeRest(from)).length >= 10
              ? {
                  borderLeft: "1px solid",
                  height: "212px",
                  top: "14px",
                  left: "20px",
                  color: "#d9cd1b",
                  position: "absolute",
                }
              : placeCount(placeRest(from)).length >= 5 || placeCount(placeTitle(from)).length >= 5
              ? {
                  borderLeft: "1px solid",
                  height: "135px",
                  top: "14px",
                  left: "20px",
                  color: "#d9cd1b",
                  position: "absolute",
                }
              : { borderLeft: "1px solid", height: "125px", top: "13px", left: "20px", color: "#d9cd1b", position: "absolute" }
          }
        ></p>
        <div style={{ display: "flex" }}>
          <FiberManualRecordIcon style={{ color: "#d9cd1b" }} />
          <div>
            <Typography
              variant="h6"
              style={{
                marginLeft: "12px",
                fontSize: "16px",
                color: "black",
                fontWeight: "bold",
              }}
            >
              {placeTitle(to)}
            </Typography>
            <Typography
              variant="h6"
              style={{
                marginLeft: "12px",
                fontSize: "14px",
                color: "gray",
                fontWeight: "bold",
              }}
            >
              {placeRest(to)}
            </Typography>

            <div
              style={{
                display: "flex",
                marginLeft: "10px",
                marginTop: "10px",
                alignItems: "center",
              }}
            >
              {typeof detailIcon === "string" ? (
                <span style={{ marginLeft: "10px" }}>{detailIcon}</span>
              ) : (
                detailIcon.map((detail) => (
                  <div style={{ display: "flex", alignItems: "center", marginRight: "30px" }}>
                    <img
                      src={detail.icon}
                      style={
                        detail.name === "Van"
                          ? { width: 30, marginTop: -10 }
                          : detail.name === "Minivan"
                          ? { width: 30, marginTop: -6 }
                          : { width: 50 }
                      }
                      alt="Icon"
                    />
                    <span style={{ marginLeft: 10 }}>{detail.count}</span>
                  </div>
                ))
              )}
              <div>
                <PersonOutlineOutlinedIcon style={{ color: "gray" }} />
              </div>
              <span style={{ marginLeft: "10px" }}>{passengers}</span>
              <div style={{ marginLeft: "30px" }}>
                <LocalMallOutlinedIcon style={{ color: "gray" }} />
              </div>
              <span style={{ marginLeft: "10px" }}>{luggages}</span>
            </div>
          </div>
        </div>
      </Grid>
      <Grid item md={4} container justify="flex-end">
        <Typography
          variant="h6"
          style={{
            marginLeft: "12px",
            fontSize: "18px",
            color: "gray",
            fontWeight: "bold",
          }}
        >
          $51
        </Typography>
      </Grid>
      <Grid item md={12}>
        <hr />
      </Grid>
    </Grid>
  );
};

export default withStyles(Style)(SingleOrder);
