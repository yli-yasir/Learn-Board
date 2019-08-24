import {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential
} from "mongodb-stitch-browser-sdk";

const client = Stitch.initializeDefaultAppClient("learnboard-ksqnz");

const db = client
  .getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
  .db("main");


if(!client.auth.isLoggedIn){
client.auth
  .loginWithCredential(new AnonymousCredential())
  .then(() => {
    console.log("Logged in as anon");
  })
  .catch(err => {
    console.error(err);
  });
}
else{
  console.log('already logged in as ' + client.auth.user.id)
}
  export default db; 
