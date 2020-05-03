import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  large: {
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function UserAvatar({ showAvatar, isAvatarImage, srcImage, Name, cssClass }) {
  const classes = useStyles();
  if (!showAvatar) return '';

  console.log('cssClass', cssClass);
  const css = !cssClass ? classes.large : cssClass;
  console.log('css', css);
  const avatar = isAvatarImage ? <Avatar alt={Name} src={srcImage} className={css} /> : <Avatar className={css}>{GetAvatarName(Name)}</Avatar>;

  return avatar;
}

function GetAvatarName(name) {
  if (!name) return null;
  if (name.length == 2) return name;
  // get First Char of every word in string
  var matches = name.match(/\b(\w)/g);
  if (matches.length === 1) return matches[0].toUpperCase();
  const lastIndex = matches.length - 1;
  return matches[0].toUpperCase() + matches[lastIndex].toUpperCase();
}
