import { orange } from '@material-ui/core/colors/';
export default (theme) => ({
  loginLink: {
    color: orange[500],
    'text-decoration': 'none',
    '&:hover': { color: theme.palette.primary.main },
  },
  signUpBtn: {
    'border-radius': '25px',
    width: '184px',
    height: '37px',
  },
  content: {
    padding: '33px 0 33px 20px;',
    width: '100%',
    maxWidth: 290,
  },
  textError: {
    marginLeft: 32,
  },
  errorTitle: {
    width: '100%',
  },
  gutterBottom: {
    paddingTop: 12,
  },
  PasswordText: {
    width: 215,
  },
});