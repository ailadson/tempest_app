# Getting Started

1. Run `npm install`
2. Run `./node_modules/.bin/webpack` to build the bundle js file
3. Run `node db/reset.js` to initialize the database
4. Run `node server.js` to start server. Opens on port 3000.
  * Visit `http://localhost:3000/` to browse the site.
  * Run `npm run e2e` to run end-to-end testing with nightwatchjs.

Use the following user credentials to log into and peruse the site.

Email Address | Password | Account Type
--------------|----------|-------------
doc1@test.com |   p1     |  Doctor
doc2@test.com |   p2     |  Doctor
pat1@test.com |   p1     |  Patient
pat2@test.com |   p2     |  Patient
pat3@test.com |   p3     |  Patient

# Tempus Code Walkthrough

### Libraries and Configurations

* **package.json** - Our `package.json` lists all of our dependencies. We are using `babel` to transpile our ES6, JSX, and SCSS code. We are using the `express` framework along with some middleware, but to make the server development a little easier. And finally, we are bring in several `react` modules, which we'll use as our client framework.

* **webpack.config.js** - The `webpack.config.js` just specifies that we are creating a `bundle.js` file in our `public/javascripts` directory. One thing that I want to point out is that I'm also bundling SCSS with the ES6/JSX `bundle.js` file. I really enjoy this as it allows me to import the specific CSS I need for a particular react module. This makes the CSS a lot more maintainable, in my opinion.

* **nightwatchjs.conf.js** - This is my first time using nightwatchjs, so I admittedly ripped this file from an online tutorial. I added one line to the top (`require('./db/reset')`) that simply resets the database.

### The Server

* **server.js** - This is the file that starts the server. It's really simple, but I'll point out three things.
  1. I'm using some middleware between lines 14-17. These allow me to use cookies for login purposes and the parse request body data. It also sets up the static directory.
  2. On line 24, I am using a router that was defined in another file. This catches any request to the api.
  3. On line 26, I match any path that didn't get caught by the router and return the `views/index.ejs` file. The reason is so that the React-Router's `BrowserHistory` works.

* **RESTful API** - All data is created, modified, or destroyed from a RESTful api. This code lives in `routes.js`. It's pretty standard; I use the common HTTP verbs and common url patterns for matching. Everything is name-spaced under `/api/`. I made the assumption that the API would only be used by the app, and so I've implemented a csfr protection to prevent malicious, foreign requests.

* **The Database** - I used a Sqlite3 database, but it's very extendable because I used an ORM called Sequelize. I chose Sqlite3 for speed of development, but because I'm using an ORM, the database could be easily updated to fit new requirements. There are three files in the `db/` directory:
  1. `db_connection.js` - Sets up and interfaces with Sequelize.
  2. `models.js` - defines all the models used in the app.
  3. `reset.js` - resets the database. This is automatically run if you run the test cases.

* **MVC Pattern** - I roughly follow the famous model-view-controller pattern. The models are defined in `db/models.js`. The view is in `views/index.ejs`; it delivers the application root `div`. The controllers are defined `controllers/`:
  1. `SessionController` - handles logging in, logging out, and fetching the current user.
  2. `PatientController` - handles everything that deals with the patient, including updating/saving/deleting appointments and files.
  3. `DoctorController` - a small controller; all it does to return all the doctors

* **Cloud Storage** - I do not make any assumption about the possible file types that could be uploaded. I could have easily put constraints on both the front and backend, but I decided not to in this case. I store the file in Cloudinary and retain a reference to it's url. `cloud_storage.js` interfaces with the Cloundinary API.

### The Frontend

* **React/Redux/Router** - My frontend framework uses React for creating visual interfaces, Redux for managing state, and ReactRouter for synchronizing the url path to current state of React components. There are 5 directories:
  1. `actions` - Application state can only be changed by dispatching an action. All the actions are kept in this folder.
  2. `components` - This is where all the visual elements of application live. Each folder represents are particular component and it's dependencies. `root.jsx` wraps the entire component in the redux `Provider` and ReactRouter's `BrowserHistory`. `app.jsx` defines the major routes and their corresponding components.
  3. `store` - This is where the application state lives, aka the store. The door is a combination of several reducers, each defined in their own file. A reducer specifies how an action effects the state.
  4. `style` - As I mentioned earlier, my scss in bundled together with my js, specifically the components. I find it more manageable to include specific scss files with specific components. So, I house all of my scss in the `frontend` folder.
  5. `util` - There are two main type utility methods I used: API and Routes. API utility methods use AJAX to make API calls to the backend. Route utility methods are authentication wrappers (i.e. make a route require a login)

* **Responsive Design** - The site is designed to be responsive. Below are screenshots at different sizes:

<center>
  Large Screen
  <img src="./docs/screenshot1.png" width="500">
  <br/>
  Medium Screen
  <img src="./docs/screenshot2.png" width="500">
  <br/>
  Small Screen
  <img src="./docs/screenshot3.png" width="500">
</center>

* **User Experience Notes**
  * Doctors can only delete their own appointments
  * Appointments are listed in the following order: PENDING, ACCEPTED, DECLINED, PAST
  * Doctors are altered to which patients they have pending appointments with.
  * Loading screen for file (because it can take a while)  
