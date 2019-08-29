import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from '@material-ui/core/CardMedia';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { StarRounded,Language,School,More } from "@material-ui/icons";
import Chip from "@material-ui/core/Chip"
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import test from '../assets/test.svg';
import { flexbox } from "@material-ui/system";


const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'row'
  },
  media: {
    width:"100px",
  },
});

function SearchResultCard(props) {
  const classes = useStyles();

  let languages = '';
  if (props.languages){
    languages =  props.languages.map(language=>(
      <Box m={1} clone>
      <Chip icon={<Language />} label={language} />
    </Box>) )
  }

  return (
    <Card className={classes.card}>
      <CardMedia
      className={classes.media}
      image={test}
      title="a cat"
      component="img"/>
      <CardContent>
          <Chip color="primary" icon={<School />} label={props.topic} />
          <Typography variant="body2">{props.shortDescription}</Typography>
      </CardContent>
    </Card>
  );
}

export default SearchResultCard;
