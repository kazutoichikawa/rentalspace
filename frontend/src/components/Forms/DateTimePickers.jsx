import React,{ useState } from 'react';
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

const DateTimePickers = () => {
  const classes = useStyles();
  const [selectedDatetime, handleDateChange] = useState(Date.today);

  return (
    <form>
      <TextField
        id="datetime-local"
        type="datetime-local"
        value={selectedDatetime}
        onChange={e => handleDateChange(e.target.value)}
        className={classes.textField}
      />
      </form>
  );
}

export default DateTimePickers;
