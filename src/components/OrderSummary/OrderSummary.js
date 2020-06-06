import React from "react";
import { withStyles, Card, CardContent, Grid, Typography, Button } from "@material-ui/core";
import { Style } from "./OriderSummary.style";
import SingleOrder from "../SingleOrder";

const OrderSummary = ({ classes, allDetails, payment, handleOpen, deleteData }) => {
  return (
    <Card className={classes.root}>
      <div>
        <CardContent>
          <Grid container>
            <Grid item md={12}>
              <Typography variant="h6" className={classes.orderSummaryTitle}>
                Order summary
              </Typography>
            </Grid>
            <Grid item md={12} container spacing={2}>
              {allDetails &&
                allDetails.map((details) => (
                  <SingleOrder
                    id={details.id}
                    deleteData={deleteData}
                    date={details.SelectedDate}
                    time={details.Time}
                    passengers={details.Passengers}
                    from={details.From}
                    to={details.To}
                    luggages={details.Luggages}
                    handleOpen={handleOpen}
                    payment={payment}
                  />
                ))}

              {payment ? (
                <>
                  <Grid item md={6}>
                    <Button size="small" className={classes.continueButton} onClick={handleOpen}>
                      Add extra transfer
                    </Button>
                  </Grid>
                  <Grid item md={1}></Grid>
                  <Grid item md={5} container justify="flex-end">
                    <div style={{ display: "flex", alignItems: "center", marginTop: "-15px" }}>
                      <div>
                        <p>Total price Taxes & fees included</p>
                      </div>
                      <Typography
                        variant="h6"
                        style={{
                          marginLeft: "12px",
                          marginTop: "5px",
                          fontSize: "35px",
                          color: "#d9cd1b",
                          fontWeight: "bold",
                        }}
                      >
                        ${51 * allDetails.length}
                      </Typography>
                    </div>
                  </Grid>{" "}
                </>
              ) : (
                <>
                  <Grid item md={8}>
                    <p>Total price Taxes & fees included</p>
                  </Grid>
                  <Grid item md={4} container justify="flex-end">
                    <Typography
                      variant="h6"
                      style={{
                        marginLeft: "12px",
                        fontSize: "35px",
                        color: "#d9cd1b",
                        fontWeight: "bold",
                      }}
                    >
                      ${51 * allDetails.length}
                    </Typography>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </div>
    </Card>
  );
};

export default withStyles(Style)(OrderSummary);
