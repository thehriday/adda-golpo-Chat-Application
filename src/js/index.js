require('./scssImport');

require('./userActiveStatus');

if (
  location.pathname.replace(/\//g, '') === 'signup' ||
  location.pathname.indexOf('reset_password/token') !== -1
) {
  require('./passwordValidation');
}

if (location.pathname === '/') {
  require('./authHomePage');
  // import react part
  require('./react');
}

// user profile js import
if (location.pathname.split('/')[1] === 'user') {
  require('./userProfile');
}
