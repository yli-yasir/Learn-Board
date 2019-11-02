import {
  Stitch,
  RemoteMongoClient,
  UserPasswordAuthProviderClient
} from "mongodb-stitch-browser-sdk";

export const client = Stitch.initializeDefaultAppClient("learnboard-ksqnz");

const db = client
  .getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
  .db("main");

export const emailPassClient = client.auth
.getProviderClient(UserPasswordAuthProviderClient.factory);

export default db;
