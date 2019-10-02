import {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential,
  AnonymousAuthProvider,
  UserPasswordAuthProviderClient

} from "mongodb-stitch-browser-sdk";

export const client = Stitch.initializeDefaultAppClient("learnboard-ksqnz");

const db = client
  .getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
  .db("main");

export default db;

export function initialLogin() {
  if (!client.auth.isLoggedIn) {
    return client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(() => {
        console.log("Logged in as anon");
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    console.log(
      "already logged in as " +
        client.auth.user.id +
        " - " +
        client.auth.user.loggedInProviderType +
        " - " + client.auth.user.profile.email
    );
    return Promise.resolve();
  }
}

export function isAnon() {
  return client.auth.user.loggedInProviderType === AnonymousAuthProvider.TYPE;
}

export function getUserEmail(){
  return client.auth.user.profile.email ? client.auth.user.profile.email : 'guest';
}

export function getUserId(){
  return client.auth.user.id;
}

export function resendConfirmationEmail(){
  return client.auth.res
}

export const emailPassClient = client.auth
.getProviderClient(UserPasswordAuthProviderClient.factory);