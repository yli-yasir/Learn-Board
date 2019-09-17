import db from "../stitch";
import { BSON } from "mongodb-stitch-browser-sdk";
import { params as appParams, getSearchParams } from "./URLUtils";


// if term is provided then it will replace q 
// if not then the value of q is the value from the params
export async function searchPosts(queryString,term,limit,projection) {
  let { q, postType } = getSearchParams(
    queryString,
    appParams.q.PARAM_NAME,
    appParams.postType.PARAM_NAME
  );

  //if a term is provided then it will override the value of q in the params
  if (term){
    q = term;
  }

  //Build a filter accordingly, and use it to execute the query.
  let filter = {};

  //If there is a specified query i.e. search term
  if (q) {
    //get a list of words of the query
    const searchWords = q
      .split(" ")
      .filter(word => word !== "")
      .map(word => word.trim());

    //construst a pattern to use in the regular expression
    let pattern = "";
    searchWords.forEach(word => {
      pattern += `(?=.*\\b${word}.*\\b)`;
    });
    pattern += ".+";

    //make a regex
    const regex = new BSON.BSONRegExp(pattern, "i");
    filter.topic = regex;
  }

  // If there is a postType,and that type isn't 'all' we consider it.
  // ( no need to consider postType if we are looking for everything)
  if (postType && postType !== appParams.postType.ALL) {
    filter.postType = postType;
  }

  //build the query options
  const options = {};

  if (limit){
    options.limit = limit;
  }

  if (projection){
    options.projection = projection
  }

  const queryResults = await db
    .collection("posts")
    .find(filter,options)
    .asArray();

  return queryResults;
}


