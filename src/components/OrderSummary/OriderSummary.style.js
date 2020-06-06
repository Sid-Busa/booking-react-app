export const Style = (theme) => ({
  orderSummaryTitle: {
    fontWeight: 600,
  },

  editButton: {
    textDecoration: "none",
    color: "#707070",
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
});
