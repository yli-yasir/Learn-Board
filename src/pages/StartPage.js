import React from 'react';
import Autosuggest from 'react-autosuggest';

function StartPage() {
    const [suggestions,setSuggestions]= React.useState([]);
    const [inputValue,setInputValue]= React.useState('');
    
    const mSuggestions = ['python','pycharm','java','lisp','learn to play','period',
'youtube','people interest','react'];

    const getSuggestions = (term) =>{
      var regex = new RegExp('\\b'+term.value.trim(),'i');
      console.log(regex)
      return mSuggestions.filter((e)=>{
        return regex.test(e)
      });
    };

    const getSuggestionValue = (suggestion)=> {
      console.log(suggestion);
      return suggestion;
    }; 

    const renderSuggestion = (suggestion) => (
      <div>
        {suggestion}
      </div>
      );

      const onInputChange = (e,{newValue}) =>{
        
        setInputValue(newValue);
      }
      
      const onSuggestionsRequest = (value) =>{
        setSuggestions(getSuggestions(value))
      };

      const onSuggestionsClear = ()=>{
        setSuggestions([])
      }


      const inputProps = {
        placeholder: 'Type a programming language',
        value: inputValue,
        onChange: onInputChange
      };      

    return (<Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested= {onSuggestionsRequest}
      onSuggestionsClearRequested = {onSuggestionsClear}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion = {renderSuggestion}
      inputProps={inputProps}
    />)
    ;
  }

export default StartPage;