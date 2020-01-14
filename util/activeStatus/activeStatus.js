const User = require('../../models/User');

// 10 minute interval
const intervalTime = 1000 * 60 * 10;

setInterval(async () => {
  const activeUsers = await User.find({ isActive: true });
  const allActiveUserPromise = activeUsers.map(activeUser => {
    return User.findByIdAndUpdate(activeUser._id, { isActive: false });
  });
  Promise.all(allActiveUserPromise);
}, intervalTime);
