export const login = (user, type, success, error) => (
  $.ajax({
    method: 'POST',
    url: `/api/login`,
    data: user,
    dataType: 'json',
    success,
    error
  })
);

export const logout = () => (
  $.ajax({
    method: 'DELETE',
    url: '/api/login'
  })
);
