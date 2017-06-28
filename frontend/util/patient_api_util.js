export const fetchPatients = (success, error) => (
  $.ajax({
    method: 'GET',
    url: `/api/patients`,
    dataType: 'json',
    success,
    error
  })
);

export const createAppointment = (data, success, error) => (
  $.ajax({
    method: 'POST',
    url: `/api/patients/appointment`,
    dataType: 'json',
    data,
    success,
    error
  })
);

export const updateAppointment = (data, success, error) => (
  $.ajax({
    method: 'PATCH',
    url: `/api/patients/appointment`,
    dataType: 'json',
    data,
    success,
    error
  })
);

export const createFile = (data, success, error) => (
  $.ajax({
    method: 'POST',
    url: `/api/patients/file`,
    dataType: 'json',
    data,
    success,
    error
  })
);
