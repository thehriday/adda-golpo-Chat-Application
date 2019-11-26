require('./scssImport');

if (
  location.pathname.replace(/\//g, '') === 'signup' ||
  location.pathname.indexOf('reset_password/token') !== -1
) {
  require('./passwordValidation');
}

if (location.pathname === '/') {
  require('./authHomePage');
  require('./react');
}
