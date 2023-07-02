import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Food from './Food/Food';
import useStyles from './styles';

const Foods = ({ setCurrentId }) => {
  const foods = useSelector((state) => state.foods);
  const classes = useStyles();

  return (
    !foods.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {foods.map((food) => (
          <Grid key={food._id} item xs={12} sm={6} md={6}>
            <Food food={food} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Foods;