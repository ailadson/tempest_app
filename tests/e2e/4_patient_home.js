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
    .click('#appointment-form-doc option:nth-child(2)')
    .setValue('#appointment-form-purpose', purpose)
    .click('#appointment-form-submit')
    .pause(2000)
}

let nthPanelSelector = function(n) {
  return `#Appointments-drop-down .drop-down-panel-container:nth-child(${n})`;
};

module.exports = {
  beforeEach : function(browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text]', patient.emailAddress)
      .setValue('input[type=password]', patient.password)
      .click('input[type=submit]')
      .pause(1000)
  },

  "Patient's details are displayed" : function (browser) {
    browser
      .assert.containsText('.patient-view-container h1', patient.name)
      .assert.containsText('.patient-view-info', patient.dob)
      .assert.containsText('.patient-view-info', patient.mailingAddress)
      .assert.containsText('.patient-view-info', patient.emailAddress)
      .end()
  },

  'Patient can see their past, future, and pending appointments:' : function (browser) {
    browser
      .click('#Appointments-drop-down footer:last-child')
      .pause(1000)

    browser
      .assert.containsText(
        `${nthPanelSelector(1)} .appointment-panel span`,
        `Pending`
      )
      .assert.containsText(
        `${nthPanelSelector(1)} .appointment-panel div:nth-child(2)`,
        `Scheduled: ${new Date('02-18-2018 ' + '10:05').toDateString()}`
      )
      .assert.containsText(
        `${nthPanelSelector(1)} .appointment-panel div:nth-child(3)`,
        `With: Dr. Henry Jenkins`
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
        `With: Dr. Henry Jenkins`
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
        `With: Dr. Henry Jenkins`
      )
      .assert.containsText(
        `${nthPanelSelector(3)} .appointment-panel div:nth-child(4)`,
        `Reason: Purpose 1 - decline`
      )
      .end()
  },

  'Patients can submit new appointment requests.' : function (browser) {
    createAppointment(browser, '12-30-2019', '01:35', 'Lets check in');
    browser
      .click('#Appointments-drop-down footer:last-child')
      .pause(1000)
      .assert.containsText(
        `${nthPanelSelector(2)} .appointment-panel div:nth-child(2)`,
        `Scheduled: ${new Date('12-30-2019 ' + '01:35').toDateString()}`)
      .assert.containsText(
        `${nthPanelSelector(2)} .appointment-panel div:nth-child(3)`,
        `With: Dr. Henry Jenkins`
      )
      .assert.containsText(`${nthPanelSelector(2)} .appointment-panel div:nth-child(4)`, "Reason: Lets check in")
      .assert.containsText(`${nthPanelSelector(2)} .appointment-panel button:first-child`, "Cancel")
      .end()
  },

  'Patients can cancel future appointments.' : function (browser) {
    browser
      .click('#Appointments-drop-down footer:last-child')
      .pause(1000)
      .assert.elementPresent(`${nthPanelSelector(4)} .appointment-panel`)
      .click(`${nthPanelSelector(1)} .appointment-panel:first-child button`)
      .pause(500)
      .assert.elementNotPresent(`${nthPanelSelector(4)} .appointment-panel`)
      .end()
  }
}
