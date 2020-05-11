import { orange } from '@material-ui/core/colors';
export default (theme) => ({
  list: {
    width: 270,
  },
  iconStyle: {
    width: 40,
  },
  root: { fontSize: 38 },
  link: {
    color: orange[500],
    'text-decoration': 'none',
    '&:hover': { color: theme.palette.primary.main },
  },
});
