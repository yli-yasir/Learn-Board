import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { StarRounded } from "@material-ui/icons";
import { Chip } from "@material-ui/core";
import { Language } from "@material-ui/icons";
import {School} from "@material-ui/icons"


function ResultCard() {
  return (
    <Card raised="true">
      <CardContent>
        <Typography display="inline" variant="h5" gutterBottom>
          Alex Smith
        </Typography>

        <Box display="inline" ml={2}>
          <StarRounded color="primary" />
          <StarRounded color="primary" />
        </Box>

        <Box mt={1}>
          <Box mr={1} clone>
            <Chip icon={<Language />} label="English" />
          </Box>

          <Box mr={1} clone>
            <Chip icon={<Language />} label="French" />
          </Box>

          <Box mr={1} clone>
            <Chip icon={<Language />} label="Arabic" />
          </Box>
        </Box>

        <Box mt={3}>
        <Chip color="primary" icon={<School />} label="Python" />
        </Box>

          <Typography variant="subtitle1">
            I teach data structures and algorithms in python, I also dabble into
            object oriented programming
          </Typography>

          <Box mt={3}>
        <Chip color="primary" icon={<School />} label="Music" />
        </Box>

          <Typography variant="subtitle1">
            I teach the piano and koto
          </Typography>

      </CardContent>
    </Card>
  );
}

export default ResultCard;
