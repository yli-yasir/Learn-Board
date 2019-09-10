import {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential,
  AnonymousAuthProvider,
  BSON
} from "mongodb-stitch-browser-sdk";

export const client = Stitch.initializeDefaultAppClient("learnboard-ksqnz");
const db = client
  .getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
  .db("main");

export default db;

export function login() {
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

export function getEmail(){
  return client.auth.user.profile.email ? client.auth.user.profile.email : 'guest';
}

