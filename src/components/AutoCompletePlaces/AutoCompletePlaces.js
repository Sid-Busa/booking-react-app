import React from "react";
import { withStyles, TextField, Typography } from "@material-ui/core";
import PlacesAutocomplete from "react-places-autocomplete";
import Spinner from "../../assets/spinner.svg";
import { Style } from "./AutoCompletePlaces.style";

const AutoCompletePlaces = ({ classes, address, handlePlaceChange, handlePlaceSelect, fetchLocationIcon }) => {
  return (
    <div>
      <PlacesAutocomplete value={address} onChange={handlePlaceChange} onSelect={handlePlaceSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextField
              {...getInputProps({
                placeholder: "From (airport, port, address)",
              })}
              id="location"
              fullWidth
              className={classes.eventField}
              variant="outlined"
              InputLabelProps={{
                classes: {
                  root: classes.eventLabel,
                },
              }}
            />
            <>
              <div className={classes.dropDownContainer} style={suggestions.length ? { border: "2px solid #e4e4e4" } : null}>
                {loading && <img src={Spinner} alt="icon" height="40px" />}
                {suggestions &&
                  suggestions.map((suggestion) => {
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          style,
                        })}
                      >
                        <Typography className={classes.suggestion} style={suggestions.length ? { padding: 4 } : null}>
                          {fetchLocationIcon(suggestion.description)}
                          <span className={classes.suggestionText}>{suggestion.description}</span>
                        </Typography>
                      </div>
                    );
                  })}
              </div>
            </>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default withStyles(Style)(AutoCompletePlaces);
