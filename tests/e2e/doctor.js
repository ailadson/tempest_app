var doctor = { emailAddress : 'doc1@test.com', password : 'p1' };
var patients = [
  {
    name : 'Anthony Ladson',
    emailAddress : 'pat1@test.com',
    password : 'p1'
  },{
    name : 'Marsha Thompson',
    emailAddress : 'pat2@test.com',
    password : 'p2'
  },{
    name : 'Supta Jinswi',
    emailAddress : 'pat3@test.com',
    password : 'p3'
  }
];

module.exports = {
  'Patient Login' : function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text]', patient.emailAddress)
      .setValue('input[type=password]', patient.password)
      .click('input[type=submit]')
      .pause(1000)
      .assert.containsText('.patient-view-container h1', 'Anthony Ladson')
      .end();
  },

  'Doctor Login' : function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 1000)
      .click('.alt-login-link')
      .pause(500)
      .setValue('input[type=text]', doctor.emailAddress)
      .setValue('input[type=password]', doctor.password)
      .click('input[type=submit]')
      .pause(1000)
      .assert.containsText('.aside-welcome', 'Welcome, Dr. Jenkins')
      .end();
  },

  'Doctor Cannot Login To Patient Portal' : function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text]', doctor.emailAddress)
      .setValue('input[type=password]', doctor.password)
      .click('input[type=submit]')
      .pause(1000)
      .assert.containsText('.login-errors', 'Incorrect Username or Password')
      .end();
  },

  'Patient Cannot Login To Doctor Portal' : function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 1000)
      .click('.alt-login-link')
      .pause(500)
      .setValue('input[type=text]', patient.emailAddress)
      .setValue('input[type=password]', patient.password)
      .click('input[type=submit]')
      .pause(1000)
      .assert.containsText('.login-errors', 'Incorrect Username or Password')
      .end();
  }
};
