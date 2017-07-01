var doctor = { name : 'Henry Jenkins', emailAddress : 'doc1@test.com', password : 'p1' };
var patient = {
  name : 'Anthony Ladson',
  firstName : 'Anthony',
  lastName : 'Ladson',
  emailAddress : 'pat1@test.com',
  password : 'p1',
  mailingAddress : '123 Main St. Chicago, IL',
  phone : '1-111-1111',
  dob : 'Jan 18, 1991'
};

function createAppointment(browser, date, time, purpose) {
  browser
    .click('.patient-view-buttons button:first-child')
    .pause(500)
    .setValue('#appointment-form-date', date)
    .setValue('#appointment-form-time', time)
    .setValue('#appointment-form-time', browser.Keys.UP_ARROW)
    .assert.value('#appointment-form-doc', `${doctor.name} (you)`)
    .setValue('#appointment-form-purpose', purpose)
    .click('#appointment-form-submit')
    .pause(1000)
}

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
      .setValue('input.doctor-search-bar', "antho")
      .click('.aside-patients a:first-child')
      .pause(1000)
  },

  "The patient’s personal details are displayed" : function(browser) {
    browser
      .assert.containsText('.patient-view-container h1', patient.name)
      .assert.containsText('.patient-view-info', patient.dob)
      .assert.containsText('.patient-view-info', patient.mailingAddress)
      .assert.containsText('.patient-view-info', patient.emailAddress)
      .end()
  },

  "Doctor can schedule new appointments with the patient" : function(browser) {
    createAppointment(browser, '02-18-2018', '10:05', 'I want to check up on you.');
    browser
      .click('#Appointments-drop-down footer:last-child')
      .assert.containsText('.appointment-panel div:nth-child(2)', `Scheduled: ${new Date('2018-02-18 ' + '10:05').toDateString()}`)
      .assert.containsText('.appointment-panel div:nth-child(3)', `With: Dr. ${doctor.name}`)
      .assert.containsText('.appointment-panel div:nth-child(4)', "Reason: I want to check up on you.")
      .assert.containsText('.appointment-panel button:first-child', "Accept")
      .assert.containsText('.appointment-panel button:last-child', "Decline")
      .end()
  },

  "Any past, future, and pending appointments with the patient are displayed" : function(browser) {
    let nthPanelSelector = function(n) {
      return `#Appointments-drop-down .drop-down-panel-container:nth-child(${n})`;
    };

    createAppointment(browser, '02-18-2019', '10:05', 'Purpose 1 - decline');
    createAppointment(browser, '10-18-2020', '05:35', 'Purpose 2 - accept');
    browser
      .click('#Appointments-drop-down footer:last-child')
      .pause(500)
      .click(`${nthPanelSelector(3)} button:first-child`)
      .pause(500)
      .click(`${nthPanelSelector(2)} button:last-child`)
      .pause(500)
      .setValue('.form-container textarea', "Decline Reason")
      .click('.form-container button:last-child')
      .pause(500)

    browser
      .assert.containsText(
        `${nthPanelSelector(1)} .appointment-panel span`,
        `Accept or Decline`
      )
      .assert.containsText(
        `${nthPanelSelector(1)} .appointment-panel div:nth-child(2)`,
        `Scheduled: ${new Date('02-18-2018 ' + '10:05').toDateString()}`
      )
      .assert.containsText(
        `${nthPanelSelector(1)} .appointment-panel div:nth-child(3)`,
        `With: Dr. ${doctor.name}`
      )
      .assert.containsText(
        `${nthPanelSelector(1)} .appointment-panel div:nth-child(4)`,
        'Reason: I want to check up on you.'
      )

    browser
      .assert.containsText(
        `${nthPanelSelector(2)} .appointment-panel span`,
        `Upcoming!`
      )
      .assert.containsText(
        `${nthPanelSelector(2)} .appointment-panel div:nth-child(2)`,
        `Scheduled: ${new Date('10-18-2020 ' + '05:35').toDateString()}`
      )
      .assert.containsText(
        `${nthPanelSelector(2)} .appointment-panel div:nth-child(3)`,
        `With: Dr. ${doctor.name}`
      )
      .assert.containsText(
        `${nthPanelSelector(2)} .appointment-panel div:nth-child(4)`,
        'Reason: Purpose 2 - accept'
      )

      browser
        .assert.containsText(
          `${nthPanelSelector(3)} .appointment-panel span`,
          `Declined`
        )
        .assert.containsText(
          `${nthPanelSelector(3)} .appointment-panel div:nth-child(2)`,
          `Scheduled: ${new Date('02-18-2019 ' + '10:05').toDateString()}`
        )
        .assert.containsText(
          `${nthPanelSelector(3)} .appointment-panel div:nth-child(3)`,
          `With: Dr. ${doctor.name}`
        )
        .assert.containsText(
          `${nthPanelSelector(3)} .appointment-panel div:nth-child(4)`,
          `Reason: Purpose 1 - decline`
        )

      browser.end()
  }
};
