if (
  location.pathname.replace(/\//g, '') === 'signup' ||
  location.pathname.indexOf('reset_password/token') !== -1
) {
  const password = document.querySelector('#password') as HTMLInputElement;
  const confirmPassword = document.querySelector(
    '#confirm-password'
  ) as HTMLInputElement;

  const validation = () => {
    if (password.value === confirmPassword.value) {
      confirmPassword.setCustomValidity('');
    } else {
      confirmPassword.setCustomValidity(
        "Password Don't Match with Confirm Password"
      );
    }
  };
  password.addEventListener('input', validation);
  confirmPassword.addEventListener('input', validation);
}