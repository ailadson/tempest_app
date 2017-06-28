export const fetchDoctors = (success, error) => (
  $.ajax({
    method: 'GET',
    url: `/api/doctors`,
    dataType: 'json',
    success,
    error
  })
);
