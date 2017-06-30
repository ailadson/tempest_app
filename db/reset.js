var models = require('./models');

models.Doctor.sync({force: true}).then(() => {
  console.log('Doctor Table created!');
  models.Doctor.create({
    firstName : 'Henry',
    lastName : 'Jenkins',
    emailAddress : 'doc1@test.com',
    password : 'p1'
  });
  models.Doctor.create({
    firstName : 'Gwinnet',
    lastName : 'Brown',
    emailAddress : 'doc2@test.com',
    password : 'p2'
  });
});

models.Patient.sync({force: true}).then(() => {
  console.log('Patient Table created!');
  models.Patient.create({
    firstName : 'Anthony',
    lastName : 'Ladson',
    emailAddress : 'pat1@test.com',
    password : 'p1',
    mailingAddress : '123 Main St. Chicago, IL',
    phone : '1-111-1111',
    dob : 'Jan 18, 1991'
  });

  models.Patient.create({
    firstName : 'Marsha',
    lastName : 'Thompson',
    emailAddress : 'pat2@test.com',
    password : 'p2',
    mailingAddress : '456 Normal St. Chicago, IL',
    phone : '1-222-3333',
    dob : 'Mar 11, 1955'
  });

  models.Patient.create({
    firstName : 'Supta',
    lastName : 'Jinswi',
    emailAddress : 'pat3@test.com',
    password : 'p3',
    mailingAddress : '789 Normal St. Chicago, IL',
    phone : '4-444-4444',
    dob : 'Dec 04, 1929'
  });
});

models.Appointment.sync({force: true}).then(() => {
  console.log('Appointment Table created!');
});

models.File.sync({force: true}).then(() => {
  console.log('File Table created!');
});
