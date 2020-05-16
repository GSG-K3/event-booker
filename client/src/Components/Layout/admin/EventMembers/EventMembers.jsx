import React, { useState } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  ListItemSecondaryAction,
  Button,
} from '@material-ui/core';
import UserAvatar from '../../../Common/Header/UserAvatar';
import { makeStyles, withStyles, fade } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { CheckCircle } from '@material-ui/icons';

import CodeTextField from './CodeTextField';
import EventMemberStyle from './EventMemberStyle';

export default ({
  gid,
  attendance_status,
  user_name,
  code,
  onClick,
  showCodeField,
  isAdmin,
}) => {
  const classes = EventMemberStyle();
  const [userCode, setCode] = useState(code);
  const codeHandleChange = (event) => {
    setCode(event.target.value);
  };

  const enableBtn = isAdmin ? true : attendance_status;

  return (
    <ListItem className={classes.memberItem}>
      <ListItemAvatar>
        <UserAvatar
          showAvatar={true}
          Name={user_name}
          cssClass={classes.avatarSmall}
        />
      </ListItemAvatar>
      <ListItemText primary={user_name} className={classes.nameText} />
      {showCodeField ? (
        <CodeTextField
          variant="outlined"
          id={user_name}
          value={userCode}
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
          onClick={() => onClick(userCode, gid)}
          disabled={enableBtn}
        >
          <CheckCircle />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
