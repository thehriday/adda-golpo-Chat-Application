require('./scssImport');

require('./passwordValidation');

require('./authHomePage');

// react part

if (location.pathname === '/') {
  require('./react/authHomePage');
}
