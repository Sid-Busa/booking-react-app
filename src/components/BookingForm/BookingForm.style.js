export const Style = (theme) => ({
  bookTransferCard: {
    borderRadius: "4px",
    padding: theme.spacing(2),
    position:"relative",
    boxShadow:"0px 0px 6px white",
    top:"-40px",
    ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
      position:"relative",
      top:"0px"
    }
  },
  bookTransferCardTitle: {
    color: "#A327C8",
    fontWeight: 600,
  },
  inputsContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    border: "1px solid #9C9C9C",
    borderRadius: "5px",
    padding: theme.spacing(1),
  },
  countersContainer: {
    marginTop: theme.spacing(2),
  },
  counterContainer: {
    border: "1px solid #9C9C9C",
    borderRadius: "5px",
    padding: theme.spacing(1),
  },
  suggestionsContainer: {
    position: "absolute",
    zIndex: 200,
    backgroundColor: "#fff",
    width: 230,
    border: "2px solid #e4e4e4",
  },
  suggestion: {
    "&:hover": {
      backgroundColor: "#e4e4e4",
    },
    backgroundColor: "#fff",
    padding: "5px",
    margin: "5px",
    // '&:nth-child(odd)': {
    //   backgroundColor: '#c0c0c0',
    // },
  },
  googlePlacesInput: {
    border: "0",
    outline: "none",
    padding: "7px",
    margin: "5px 0",
    width: "100%",
  },
  suggestionText: {
    fontSize: "12px",
    width: "80%",
  },
  suggestionContent: {
    display: "flex",
    alignItems: "center",
  },
  bookBtn: {
    "&:hover": {
      backgroundColor: "#DEB887",
    },
    width: "100%",
    paddingTop: "10px",
    paddingBottom: "10px",
    backgroundColor: "#F4A460",
  },
  modal: {
    width: 300,
    position: "relative",
  },
  close: {
    position: "absolute",
    right: "20px",
    top: "20px",
    cursor: "pointer",
  },
  iconForCheck1 : {
    ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
      position:"absolute",
      top:"17px",
      left:'2px',

    }
  },
  iconForCheck2 : {
    color:"#888888",
    ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
      position:"absolute",
      top:"14px",
      left:'-4px',
    }
  },
  arrowDot:{
    position:'absolute',
    top:'120px',
    left:'42px',
    color:"#888888",
    ['@media (max-width:1500px)']: { // eslint-disable-line no-useless-computed-key
      position:"absolute",
      top:"120px",
      left:'42px',
    },
    ['@media (max-width:1000px)']: { // eslint-disable-line no-useless-computed-key
      position:"absolute",
      top:"120px",
      left:'37px',
    },
    ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
      position:"absolute",
      top:"117px",
      left:'35px',
    }
  },
  arrowDownArrow:{
    position:'absolute',
    top:'132px',
    left:'42px',
    color:"#888888",
    ['@media (max-width:1500px)']: { // eslint-disable-line no-useless-computed-key
      position:"absolute",
      top:"131px",
      left:'42px',
    },
    ['@media (max-width:1000px)']: { // eslint-disable-line no-useless-computed-key
      position:"absolute",
      top:"131px",
      left:'37px',
    },
    ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
      position:"absolute",
      top:"131px",
      left:'35px',
    },
  }

});
