export const Style = (theme) => ({
  imgFluid: {
    maxWidth: "100%",
    height: "auto",
  },
  mainContainer: {
    padding: theme.spacing(10),
    // backgroundImage: `url('main-background-image.png')`,
    backgroundSize: "100% 100%",
  },
  mainContainerTitle: {
    color: "#fff",
    fontWeight: 400,
    marginBottom: theme.spacing(2),
    padding:'10px',
    ['@media (max-width:722px)']: { // eslint-disable-line no-useless-computed-key
      fontSize:"20px",
      padding:'5px'
    }
  },
  mainContainerSubTitle: {
    color: "#fff",
    fontWeight: 500,
    padding:'10px',
     ['@media (max-width:722px)']: { // eslint-disable-line no-useless-computed-key
      fontSize:"30px",
      padding:'5px'
    }
  },

  select: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: "100%",
    fontSize: "13px",
    paddingLeft: theme.spacing(1),
    "&:focus": {
      backgroundColor: "transparent!important",
    },
    "&:hover": {
      borderBottom: "none!important",
    },
    "&:before": {
      borderBottom: "none",
    },
    "&:after": {
      borderBottom: "none",
    },
    "&:hover:not($disabled):not($focused):not($error):before": {
      borderBottom: "none",
    },
  },

  boxesContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  boxContainer: {
    width: "600px",
    height: "180px",
    border: "1px solid #707070",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  infoContainer: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(8),
  },
  infoTitle: {
    color: "#8A64B7",
  },
  infoSubtitle: {
    color: "#8A64B7",
  },
  reviewsContainer: {
    backgroundColor: "#EBEBEB",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  trustpilotLogo: {
    width: "153px",
    height: "64px",
    marginBottom: theme.spacing(3),
  },
  reviewBoxContainer: {
    "&:focus": {
      outline: "none!important",
    },
  },
  reviewBox: {
    backgroundColor: "#fff",
    boxShadow: "1px 1px 10px 0px rgba(0,0,0,0.25)",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(2),
  },
  reviewBoxAvatar: {},
  faqContainer: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  faqTitle: {
    marginBottom: theme.spacing(6),
  },
  faqAnswer: {
    padding: theme.spacing(2, 3),
  },
  footer: {
    height: "200px",
    backgroundColor: "#232222",
  },
  owlTheme: {
    position: "absolute",
    zIndex: -1,
    top: 0,
    width: "100%",
    height: "100%",
  },
  owlImage: {
    width: "100%",
    height: "100%",
  },

  imgContainer: {
    height:"100vh",
    width: "100%",
  },
});
