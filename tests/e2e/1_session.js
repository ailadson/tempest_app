var doctor = { emailAddress : 'doc1@test.com', password : 'p1' };
var patient = { emailAddress : 'pat1@test.com', password : 'p1' };
var faker = { emailAddress : 'fake@test.com', password : 'blah' };

module.exports = {
  'Patient Login' : function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 1000)
      .assert.containsText('.login-msg', 'Patient Portal')
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
      .assert.containsText('.login-msg', 'Doctor Portal')
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
