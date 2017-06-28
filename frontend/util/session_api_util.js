export const login = (user, type) => (
  $.ajax({
    method: 'POST',
    url: `/api/login?type=${type}`,
    data: user
  })
);

export const logout = () => (
  $.ajax({
    method: 'DELETE',
    url: '/api/login'
  })
);
