export const fetchDoctors = (success, error) => (
  $.ajax({
    method: 'GET',
    url: `/api/doctors`,
    dataType: 'json',
    data: { _csrf : window.csfr },
    success,
    error
  })
);
