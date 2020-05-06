import React, { useState } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  ListItemSecondaryAction,
} from '@material-ui/core';
import UserAvatar from '../../../Common/Header/UserAvatar';
import { makeStyles, withStyles, fade } from '@material-ui/core/styles';
import { CheckCircle } from '@material-ui/icons';

import CodeTextField from './CodeTextField';
import EventMemberStyle from './EventMemberStyle';

export default ({ gid, eventMembers, onClick, showCodeField }) => {
  const { attendance_status, user_name, userCode } = eventMembers;
  const classes = EventMemberStyle();
  const [code, setCode] = useState(userCode);
  const codeHandleChange = (event) => {
    setCode(event.target.value);
  };

  return (
    <ListItem className={classes.memberItem}>
      <ListItemAvatar>
        <UserAvatar
          showAvatar={true}
          Name={eventMembers.user_name}
          cssClass={classes.avatarSmall}
        />
      </ListItemAvatar>
      <ListItemText primary={user_name} />
      {showCodeField ? (
        <CodeTextField
          variant="outlined"
          id="custom-css-outlined-input"
          value={code}
          onChange={codeHandleChange}
          disabled={attendance_status}
        />
      ) : (
        ''
      )}
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="Take Attendance"
          color="secondary"
          onClick={() => onClick(code, gid)}
          disabled={attendance_status}
        >
          <CheckCircle />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
