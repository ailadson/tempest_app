##TODO

* only upload PDFs

# Tempus App Walkthrough

I'll do an overview of all the files and directories, explaining how they fit into the big picture.

## package.json and webpack.config.js

Run `npm install`, then `./node_modules/.bin/webpack`

Our `package.json` lists all of our dependencies. We are using babel to transpile our ES6, JSX, and SCSS code. We can also see that we are using the `express` framework along with some middleware. And finally, we are bring in several `react` modules. The `webpack.config.js` just specifies that we are creating a `bundle.js` file in our `public/javascripts` directory.

## server.js

To start the server, run `node server.js`. I want to point out three things.

1. I'm using some middleware between lines 14-17. These allow me to use cookies for login purposes and the parse request body data. It also sets up the static directory.
2. On line 24, I am using a router that was defined in another file.
3. On line 26, I match any path that didn't get caught by the router and return the `views/index.ejs` file. The reason is so that the React router `BrowserHistory` works.

## public/ and views/

The `public` directory really only has the `bundle.js` file. The `views` directory has the root of the application. There's the `div` that React will hook on to, as well as a few scripts/links.

## routes.js

This file is the router. For the sake of controlling complexity, I went with the MVC pattern. The router determines which controller and action should process the request. Pretty standard. I should mention that the router only handle request made to `/api/*` paths. The html is given by line 26 in `server.js`.

## controllers/

This is the directory where all of the controllers live. There are three controllers.

1. `SessionController` - handles logging in and logging out.
2. `PatientController` - handles everything that deals with the patient, including updating/saving/deleting appointments and files.
3. `DoctorController` - a small controller, all it does to return all the doctors

The controller rely on two modules:

1. `db/util.js` - This file provides utility methods that modify the data.
2. `cloud_storage.js` - Files are saved to Cloudinary and displayed with iframes. The modules interfaces with the cloudinary api.

## frontend

This is where all the client JS code lives. It eventually becomes the `bundle.js` file. I'm using `react`, `react-router`, and `redux`. I think I named my directories appropriately. All the actions are int eh `actions/` directory; same for the `store`.

### main.jsx and components/root.jsx

### app.jsx

### Containers
