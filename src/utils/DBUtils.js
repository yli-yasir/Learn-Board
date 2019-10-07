import db from "../stitch";
import { BSON } from "mongodb-stitch-browser-sdk";
import { params as appParams, getSearchParams } from "./URLUtils";
import {getUserId} from '../stitch';

// if term is provided then it will replace q 
// if not then the value of q is the value from the params
// options are the mongodb stitch query options, you can see their documenation for 
// details
export async function searchPosts(queryString,term,options,continueFrom) {
  let { q, postType,by } = getSearchParams(
    queryString,
    appParams.q.PARAM_NAME,
    appParams.postType.PARAM_NAME,
    appParams.by.PARAM_NAME
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

  if (by){
    filter.authorStitchUserId=by
  }

  if (continueFrom){
    filter._id={$lt:continueFrom}
  }

  console.log('search filter:')
  console.log(filter)
  const queryResults = await db
    .collection("posts")
    .find(filter,options)
    .asArray();

  return queryResults;
}


export async function likePost(postId){
  const updateResult = await db.collection("posts").updateOne({_id: new BSON.ObjectID(postId)},{$push:{likes:getUserId()}});
  return updateResult.modifiedCount ===1;

}

export async function unlikePost(postId){
    const updateResult = await db.collection("posts").updateOne({_id: new BSON.ObjectID(postId)},{$pull:{likes:getUserId()}});
    console.log(`updated ${updateResult.modifiedCount} documents`);
    return updateResult.modifiedCount ===1;

}

export async function deletePost(postId){
    const deleteResult = await db.collection("posts").deleteOne({_id: new BSON.ObjectID(postId)});
    console.log(`deleted ${deleteResult.deletedCount} documents`);
    return deleteResult.deletedCount ===1;

}