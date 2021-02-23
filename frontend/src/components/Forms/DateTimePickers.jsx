import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const DateTimePickers = (props) => {
  const classes = useStyles();
  const [selectedDatetime, setSelectedDatetime] = useState(Date.today);
  return (
    <form>
      <TextField
        id="datetime-local"
        type="datetime-local"
        onChange={props.onChange}
        className={classes.textField}
        value={selectedDatetime}
      />
      </form>
  );
}

export default DateTimePickers;
