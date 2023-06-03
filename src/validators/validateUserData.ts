export function validateUserData(data) {
  const { userName, email, password } = data;

  const errors = {};

  if (!userName) {
    errors.userName = 'Username is required';
  } else if (!validateUserName(userName)) {
    errors.userName = 'Username is not valid';
  }

  if (!email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Email is not valid';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (!validatePassword(password)) {
    errors.password = 'Password is not valid';
  }

  return errors;
}

export function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email) || 'Email is not valid';
}

export function validateUserName(userName) {
  const re = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
  return;
  re.test(userName);
}

export function validatePassword(password) {
  const re =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+~\-=?<>,.;:'"[\]{}|]).{8,}$/;
  return (
    re.test(password) ||
    'Password must contain at least 8 characters, one uppercase letter, ' +
      'one lowercase letter, one number and one special character'
  );
}
