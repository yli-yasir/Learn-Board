//TODO 

CREATE A UNIQUE INDEX ON THE EMAIL FIELD OF THE USERS COLLECTION
3-finish post details page (text formatting,show author contact info) 20th 
4-styling 20th
5- code refactor 21st
6- language support 22nd
7- testing 23rd

3-make a profile page for users

 


Collections 

* posts

* users

Posts Schema

`topic` : String (min 3 max 60 chars)

`shortDescription` : String ( min 15 char max 200 chars)

`description` : String (max 800 chars)

`languages` : [String] (has to be in our list of languages)

`postType` :  String ('request' | 'offer')

`authorEmail` : String (email of author,determines the owner role in stitch rules
by comparing to the runtime value of the active user, not readable by people without the owner role)

`authorName`: String (name of author,this is to show a name without having to issue a second query)

`authorStitchUserId`: ObjectId (value of _id of r,this is readable by all, it will be used to make a link to the authors profile page)

`city` : String

<!-- `likes` : int (default 0 ) -->

'icon': String

Users Schema

`_id` : ObjectId

`stitchUserId`: String (stitch user id, might get out of sync with _id in case account is deleted then recreated. and this matters because, you need to validate that the authorPageId for a post is indeed the id of the user via %%user.data.id and that won't work if they are out of sync

in other words, when a user creates a post you need a way to check if they are
posting as themselves or not, check the _id field against the %%user.id is not a good way since they might not be equal in case the stitch user was 
deleted then recreated ( they wont be in sync) mean while this field stays up to date with the stitch id as its always equal to the current stich id and validated)

`email`:String (email,unqiue) (has to be filtered out when read by users)

`name` : ( String)

`bio`: String

`contact` : String


### Rules for `posts` collection:

* Can be read by anyone

* Can only be written to by non-anon who have a document in the `users` collection.

* Can only be edited by owners. Owners are determined by comparing the current email with the email in the `by` field.

### Rules for `users` collection:

* Can only be read and written to by their owners.
owners are determined by comparing the current user mail to the email stored in the `id` field.

## --------------------------------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
