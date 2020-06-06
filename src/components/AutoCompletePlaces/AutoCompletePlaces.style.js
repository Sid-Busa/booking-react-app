export const Style = (theme) => ({
  eventField: {
    //  margin: "12px 0 0",
    width: "100%",
    "& div": {
      height: "48px",
    },
    "& fieldset": {
      border: 0,
      padding: 0,
      "& legend": {
        width: "100%",
      },
    },
    "& input": {
      //   color: theme.palette.primary.dark,
      //   fontSize: 15,
    },
  },
  dropDownContainer: {
    position: "absolute",
    backgroundColor: "#fff !important",
    zIndex: 999,
    width:"93%",  
    // boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  suggestion: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width:"93%"
    // "& img": {
    //   width: "50px",
    //   height: "50px",
    // },
  },
  suggestionText: {
    fontSize: "12px",
    width: "90%",
    padding:5
  },
});
