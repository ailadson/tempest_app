module.exports = {
  'Patient Login' : function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text]', 'pat1@test.com')
      .setValue('input[type=password]', 'p1')
      .click('input[type=submit]')
      .pause(1000)
      .assert.containsText('.patient-view-container h1', 'Anthony Ladson')
      .end();
  }
};
