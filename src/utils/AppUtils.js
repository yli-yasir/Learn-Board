/*This function should contain any procedures you need to do 
to initialize the application */
//returns Promise
export function init(){
    /*If we aren't logged in, then login as anon.
    else if already logged in, resolve the promise.*/
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
            " - " + 
            client.auth.user.profile.email
        );
        return Promise.resolve();
      }
}