import {client,emailPassClient} from '../stitch';
//INTERFACE, DO NOT CHANGE THE WHAT, BUT CHANGE THE HOW.

//returns promise
export async function register(email,password){
 return await emailPassClient.registerWithEmail(email,password);
}

//returns promise
export function login(username,password){
}

export function logout(){
}
//returns boolean
export function isLoggedIn(){
    return (
      client.auth.user && 
      client.auth.user.loggedInProviderType !== AnonymousAuthProvider.TYPE)
}

//returns string 
export function getLoggedInUserEmail(){
  return client.auth.user.profile.email ? client.auth.user.profile.email : 'no-email';
}

//return promise
export async function resetPassword(tokenData,newPassword){
  console.log("attempting to reset password");
  await emailPassClient.resetPassword(tokenData.token, tokenData.tokenId, newPassword);
  console.log("successfully reset password");
}

export async function resendAccountConfirmationEmail(email){
  await emailPassClient.resendConfirmationEmail(email);
}

export function getLoggedInUserId(){
  return client.auth.user ? client.auth.user.id : 'no-id';
}

