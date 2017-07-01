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
  beforeEach : function(browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 1000)
      .click('.alt-login-link')
      .pause(500)
      .setValue('input[type=text]', doctor.emailAddress)
      .setValue('input[type=password]', doctor.password)
      .click('input[type=submit]')
      .pause(1000)
  },

  'Doctors see a listing of patients in the system' : function (browser) {
    browser
      .assert.containsText('.aside-patients', patients[0].name)
      .assert.containsText('.aside-patients', patients[1].name)
      .assert.containsText('.aside-patients', patients[2].name)
      .end();
  },

  'Doctors can also search for patients by name' : function (browser) {
    browser.setValue('input.doctor-search-bar', "antho");
    browser.expect.element('.aside-patients').text.to.contain(patients[0].name);
    browser.expect.element('.aside-patients').text.to.not.contain(patients[1].name);
    browser.expect.element('.aside-patients').text.to.not.contain(patients[2].name);
    browser.clearValue('input.doctor-search-bar');
    browser.setValue('input.doctor-search-bar', " ");
    browser.expect.element('.aside-patients ul li:nth-child(1)').text.to.contain(patients[0].name);
    browser.expect.element('.aside-patients ul li:nth-child(2)').text.to.contain(patients[1].name);
    browser.expect.element('.aside-patients ul li:nth-child(3)').text.to.contain(patients[2].name);
    browser.end();
  }
};
