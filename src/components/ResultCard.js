import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { StarRounded,Language,School,More } from "@material-ui/icons";
import Chip from "@material-ui/core/Chip"
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

function ResultCard(props) {

  let languages = '';
  if (props.languages){
    languages =  props.languages.map(language=>(
      <Box m={1} clone>
      <Chip icon={<Language />} label={language} />
    </Box>) )
  }

  return (
    <Card style={{ height: props.height, width: props.width }}>
      <CardContent>
        <Box mb={1}>
          <Chip color="primary" icon={<School />} label={props.subject} />
        </Box>

        <Divider />

        <Box my={1}>
          <StarRounded color="primary" />
          <StarRounded color="primary" />
          <StarRounded color="primary" />
          <StarRounded color="primary" />
          <StarRounded color="primary" />
        </Box>

        <Divider />

        <Box my={1}>
          {languages
              }
        </Box>

        <Divider />

        <Box my={1}>
          {props.shortDescription}
        </Box>

        <Divider />

        <Box display="flex" flexDirection="row-reverse" my={1}>
        <Button variant="contained" size="small" color="primary" m={1}>
          More &nbsp;
          <More/>
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ResultCard;
