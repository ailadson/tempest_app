export const login = (user, type, success, error) => (
  $.ajax({
    method: 'POST',
    url: `/api/login?type=${type}`,
    data: user,
    dataType: 'json',
    success,
    error
  })
);

export const fetchCurrentUser = (success, error) => (
  $.ajax({
    method: 'GET',
    url: `/api/login/current`,
    dataType: 'json',
    success,
    error
  })
);

export const logout = (success, error) => (
  $.ajax({
    method: 'DELETE',
    url: '/api/login',
    success,
    error
  })
);
