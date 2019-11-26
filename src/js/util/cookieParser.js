const cookieParser = () => {
  const cookieObject = {};
  const cookieString = document.cookie;
  cookieString
    .split(';')
    .forEach(
      singleCookie =>
        (cookieObject[singleCookie.split('=')[0].trim()] = singleCookie
          .split('=')[1]
          .trim())
    );
  return cookieObject;
};

export default cookieParser;
