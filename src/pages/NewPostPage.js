import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import {Language} from '@material-ui/icons';
import {languages} from '../values/strings/english';
import FormPage from '../pages/abstract/FormPage';
import db from "../mongodb";

import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme)=>({
  formControl:{
    marginTop:theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  langaugeChip:{
    margin: theme.spacing(1)
  }
})
)

function NewPostPage(){


const [postType,setPostType] = React.useState('offer');
const [topic, setTopic] = React.useState('');
const [selectedLanguage,setSelectedLanguage]= React.useState('English')
const [addedLanguages,setAddedLanguages] = React.useState([]);
const [shortDescription, setShortDescription] = React.useState('');
const [description, setDescription] = React.useState('');
const [city,setCity] = React.useState('Lefkoşa');


let doPost = () => {
    console.log('initing user login')
    // db.collection('learns').insertOne({email, password})
    console.log('posted')
}

let handlePostTypeChange = (event)=>{
    setPostType(event.target.value)
}
let handleTopicChange= (event)=> {
    setTopic(event.target.value)
}

let handleShortDescriptionChange = (event) => {
    setShortDescription(event.target.value)
}

let handleDescriptionChange = (event) => {
    setDescription(event.target.value)
}

let handleCityChange= (event)=>{
    setCity(event.target.value);
}

let handleSelectedLanguageChange= (event)=>{
    let targetLanguage = event.target.value
    if (! addedLanguages.includes(targetLanguage)){
    setAddedLanguages([...addedLanguages,targetLanguage])
    }
    setSelectedLanguage(event.target.value);
    
}

let handleDeleteAddedLanguage = (targetLanguage,e) =>{
    setAddedLanguages(addedLanguages.filter((language)=> language!=targetLanguage));
}

const classes = useStyles();


const cities = ['Lefkoşa','Girne','Mağusa','Lefke','Güzelyurt'];

return   (

<FormPage>

<FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Type:</FormLabel>
        <RadioGroup
    aria-label="type"
    name="type"
    value={postType}
    onChange={handlePostTypeChange}
    row={true}
  >
    <FormControlLabel value="offer" control={<Radio/>} label="Offer" />
    <FormControlLabel value="request" control={<Radio />} label="Request" />
  </RadioGroup>
      </FormControl>
    


 <TextField
id="topic"
label="Topic"
variant="outlined"
value={topic}
onChange={handleTopicChange}
margin="normal"
/>

<TextField
id="shortDescription"
label="Short Description"
variant="outlined"
value={shortDescription}
onChange= {handleShortDescriptionChange}
margin="normal"
multiline={true}
/>

<TextField
id="description"
label="Description"
variant="outlined"
value={description}
onChange= {handleDescriptionChange}
margin="normal"
multiline={true}
/>

<FormControl className={classes.formControl}>
        <InputLabel htmlFor="cities">City</InputLabel>
        <Select
          value={city}
          onChange={handleCityChange}
          inputProps={{
            id: 'cities',
          }}
        >


    {cities.map((city)=><MenuItem value={city}>{city}</MenuItem>)}

        </Select>
      </FormControl>


      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="languages">Add Language</InputLabel>
        <Select
          value={selectedLanguage}
          onChange={handleSelectedLanguageChange}
          inputProps={{
            id: 'languages',
          }}
        >


    {languages.map((language)=><MenuItem value={language}>{language}</MenuItem>)}

        </Select>
      </FormControl>

    <Box border={1} borderRadius={16} minHeight={100} padding={1}>
    {addedLanguages.map((language)=><Chip className={classes.langaugeChip} icon={<Language/>} label={language} onDelete={(e) => handleDeleteAddedLanguage(language, e)} />
)}
    </Box>

    <Box mt={2} clone>
<Button variant="contained" color="primary" onClick={doPost}>
    Post
</Button>
</Box>

    </FormPage>


);

}

export default NewPostPage;