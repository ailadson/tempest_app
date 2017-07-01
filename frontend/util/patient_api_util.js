export const fetchPatients = (success, error) => (
  $.ajax({
    method: 'GET',
    url: `/api/patients`,
    dataType: 'json',
    data: { _csrf : window.csfr },
    success,
    error
  })
);

export const createAppointment = (data, success, error) => {
  data._csrf = window.csfr;
  $.ajax({
    method: 'POST',
    url: `/api/patients/appointment`,
    dataType: 'json',
    data,
    success,
    error
  })
};

export const deleteAppointment = (data, success, error) => {
  data._csrf = window.csfr;
  $.ajax({
    method: 'DELETE',
    url: `/api/patients/appointment`,
    dataType: 'json',
    data,
    success,
    error
  })
};

export const updateAppointment = (data, success, error) => {
  data._csrf = window.csfr;
  $.ajax({
    method: 'PATCH',
    url: `/api/patients/appointment`,
    dataType: 'json',
    data,
    success,
    error
  })
};

export const createFile = (data, success, error) => {
  data._csrf = window.csfr;
  $.ajax({
    method: 'POST',
    url: `/api/patients/file`,
    dataType: 'json',
    data,
    success,
    error
  })
};


export const deleteFile = (data, success, error) => {
  data._csrf = window.csfr;
  $.ajax({
    method: 'DELETE',
    url: `/api/patients/file`,
    dataType: 'json',
    data,
    success,
    error
  })
};
