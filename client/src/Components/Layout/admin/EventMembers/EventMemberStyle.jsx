import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
export default makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  memberItem: {
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);',
    marginBottom: 18,
    backgroundColor: grey[200],
  },
  avatarSmall: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: 16,
    fontWeight: 900,
  },
}));
