import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    maxWidth: 155,
    maxHeight: 215,
  },
  CardContent: { padding: 12 },
  eventTitle: {
    fontWeight: 700,
    fontSize: 14,
    color: theme.palette.primary.main,
  },
  hostBy: {
    fontFamily: 'Roboto',
    'font-style': 'italic',
    fontSize: 14,
  },
  eventDate: {
    fontSize: 10,
    fontWeight: '800',
  },
  eventLink: {
    textDecoration: 'none',
  },
}));
