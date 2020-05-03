import React from 'react';
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Grid,
  Typography,
  Avatar,
  TextField,
  InputBase,
  FormControl,
  InputLabel,
  IconButton,
  ListItemSecondaryAction,
  ListItemIcon,
  Paper,
} from '@material-ui/core';
import UserAvatar from '../../Common/Header/UserAvatar';
import { makeStyles, withStyles, fade } from '@material-ui/core/styles';
import { CheckCircle } from '@material-ui/icons';
import { orange, grey } from '@material-ui/core/colors';
import clsx from 'clsx';

// const EventMemberStyle = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     maxWidth: 752,
//   },
//   demo: {
//     backgroundColor: theme.palette.background.paper,
//   },
//   title: {
//     margin: theme.spacing(4, 0, 2),
//   },
//   codeText: {
//     borderRadius: 8,
//   },
// }));

// const CodeTextField = makeStyles((theme) => ({
//   input: {
//     borderRadius: 4,
//     position: 'relative',
//   },
// }))(InputBase);

const CssTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 35,
      height: 30,
      width: '100%',
      maxWidth: 150,
      backgroundColor: '#ffffff',
      '&.Mui-focused fieldset': {
        borderColor: orange[200],
      },
    },
  },
})(TextField);

/*

*/

const EventMemberStyle = makeStyles((theme) => ({
  lit: {
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);',
    marginBottom: 18,
    backgroundColor: grey[200],
  },
}));
export default ({ eventMembers }) => {
  const classes = EventMemberStyle();
  //   if (!eventMembers)
  //     return (
  //       <Typography component="h6" variant="body1">
  //         There is no any members in this events
  //       </Typography>
  //     );
  //   const userEvents = eventMembers.map((member, index) => {
  //     const statusColor = member.attendance_status ? classes.Finised : classes.open;

  //     return (
  //       <div>
  //         <ListItem key={index} alignItems="flex-start">
  //           <ListItemAvatar>
  //             <UserAvatar showAvatar={true} Name={member.user_name} cssClass={classes.small} />
  //           </ListItemAvatar>
  //           <ListItemText
  //             primary={event.title}
  //             secondary={
  //               <React.Fragment>
  //                 <Typography component="div" variant="body2" className={classes.inline} color="textPrimary">
  //                   DateTime
  //                   {' — '} {new Date(event.event_date).toLocaleDateString()} {event.event_time}
  //                 </Typography>
  //                 <Typography component="div" variant="body2" color="textPrimary">
  //                   Event Code {' — '} {event.code}
  //                 </Typography>
  //                 <Typography component="div" variant="body2" color="textPrimary" className={classes.statusEvent}>
  //                   Event Status {' — '}
  //                   <Avatar component="span" className={clsx(classes.small, statusColor)}>
  //                     s
  //                   </Avatar>
  //                   {event.event_status}
  //                 </Typography>
  //               </React.Fragment>
  //             }
  //           />
  //         </ListItem>
  //         <Divider variant="fullWidth" component="li" />
  //       </div>
  //     );
  //   });

  return (
    <Grid container>
      <List>
        <ListItem className={classes.lit}>
          <ListItemAvatar>
            <UserAvatar showAvatar={true} Name={'member.user_name'} cssClass="hj" />
          </ListItemAvatar>
          <ListItemText primary="Single-line item" />

          <CssTextField variant="outlined" id="custom-css-outlined-input" />

          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <CheckCircle />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem className={classes.lit}>
          <ListItemAvatar>
            <UserAvatar showAvatar={true} Name={'member.user_name'} cssClass="hj" />
          </ListItemAvatar>
          <ListItemText primary="Single-line item" />

          <CssTextField variant="outlined" id="custom-css-outlined-input" />

          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <CheckCircle />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem className={classes.lit}>
          <ListItemAvatar>
            <UserAvatar showAvatar={true} Name={'member.user_name'} cssClass="hj" />
          </ListItemAvatar>
          <ListItemText primary="Single-line item" />

          <CssTextField variant="outlined" id="custom-css-outlined-input" />

          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <CheckCircle />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Grid>
  );
};
