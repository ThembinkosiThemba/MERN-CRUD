import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createFood, updateFood } from '../../actions/foods';

const Form = ({ currentId, setCurrentId }) => {
  const [foodData, setFoodData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const food = useSelector((state) => (currentId ? state.foods.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (food) setFoodData(food);
  }, [food]);

  const clear = () => {
    setCurrentId(0);
    setFoodData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createFood(foodData));
      clear();
    } else {
      dispatch(updateFood(currentId, foodData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${food.title}"` : 'Creating Food Item'}</Typography>
        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={foodData.creator} onChange={(e) => setFoodData({ ...foodData, creator: e.target.value })} />
        <TextField name="title" variant="outlined" label="Title" fullWidth value={foodData.title} onChange={(e) => setFoodData({ ...foodData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline minRows={4} value={foodData.message} onChange={(e) => setFoodData({ ...foodData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={foodData.tags} onChange={(e) => setFoodData({ ...foodData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setFoodData({ ...foodData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="outlined" color="secondary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;