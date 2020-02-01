const validator = require('validator')

const User = require('../models/User')

const cloudinary = require('../util/cloudinary')

const { getUserRegx } = require('./searchTechnology/userSearch')

exports.getSearchUser = (req, res, next) => {
  const { user } = req.query
  let searchResult
  if (!user) {
    return res.render('error/noUserFound', { title: 'No User Found' })
  }
  if (validator.isEmail(user)) {
    searchResult = User.findOne({ email: RegExp(user, 'i') }, ['-password'])
  } else {
    searchResult = User.findOne({ username: RegExp(getUserRegx(user), 'i') }, [
      -'password'
    ])
  }
  searchResult
    .then(searchUser => {
      if (!searchUser) {
        return res.render('error/noUserFound', {
          searchName: user,
          title: 'No User Found'
        })
      }
      const alreadyFriend = req.user.friendList.includes(searchUser._id)
      const sendRequest = req.user.sendRequest.includes(searchUser._id)
      const friendRequest = req.user.friendRequest.includes(searchUser._id)

      res.render('searchUser/searchUser', {
        title: user,
        userId: searchUser._id,
        searchName: user,
        searchUser,
        alreadyFriend,
        sendRequest,
        friendRequest
      })
    })
    .catch(err => {
      next(err)
    })
}

exports.postSendRequest = (req, res, next) => {
  const { searchUser } = req.body
  req.user.sendRequest = [...req.user.sendRequest, searchUser]
  const curentUser = req.user.save()
  const targetUser = User.updateOne(
    { _id: searchUser },
    { $push: { friendRequest: req.user } }
  )
  Promise.all([curentUser, targetUser])
    .then(result => {
      res.redirect('back')
    })
    .catch(err => {
      next(err)
    })
}

exports.postCancelRequest = (req, res, next) => {
  const { searchUser } = req.body

  req.user.sendRequest = req.user.sendRequest.filter(
    requestId => requestId.toString() !== searchUser
  )
  const curentUser = req.user.save()
  const targetUser = User.updateOne(
    { _id: searchUser },
    { $pullAll: { friendRequest: [req.user] } }
  )
  Promise.all([curentUser, targetUser])
    .then(result => {
      res.redirect('back')
    })
    .catch(err => {
      next(err)
    })
}

exports.getFriendrequest = (req, res, next) => {
  User.findOne({ _id: req.user }, ['friendRequest'])
    .populate('friendRequest', ['-password'])
    .then(allRequest => {
      res.render('friendRequest/friendRequest', {
        friendRequest: allRequest.friendRequest
      })
    })
    .catch(err => next(err))
}

exports.postAcceptRequest = (req, res, next) => {
  const { userId } = req.body
  req.user.friendRequest = req.user.friendRequest.filter(
    requestId => requestId.toString() !== userId
  )
  req.user.friendList = [...req.user.friendList, userId]

  const curentUser = req.user.save()
  const targetUser = User.updateOne(
    { _id: userId },
    { $push: { friendList: req.user }, $pullAll: { sendRequest: [req.user] } }
  )
  Promise.all([curentUser, targetUser])
    .then(result => {
      exports.postDeleteRequest(req, res, next)
    })
    .catch(err => {
      next(err)
    })
}

exports.postDeleteRequest = (req, res, next) => {
  const { userId } = req.body

  req.user.friendRequest = req.user.friendRequest.filter(
    requestId => requestId.toString() !== userId
  )
  const curentUser = req.user.save()
  const targetUser = User.updateOne(
    { _id: userId },
    { $pullAll: { sendRequest: [req.user] } }
  )
  Promise.all([curentUser, targetUser])
    .then(result => {
      res.redirect('back')
    })
    .catch(err => {
      next(err)
    })
}

exports.getUserProfile = async (req, res, next) => {
  const { username } = req.params

  const user = await User.findOne({ username })
  if (!user) {
    return res.render('error/404')
  }

  res.render('userProfile/userProfile', {
    title: user.name,
    searchUser: user,
    isSameUser: user._id.toString() === req.user._id.toString()
  })
}

exports.postUploadProfilePicture = (req, res, next) => {
  const photoType = ['image/gif', 'image/jpeg', 'image/png']
  const heightPhotoSize = 1024 * 1024 * 5

  const photo = req.files.updatedProfilePicture

  if (
    !photo ||
    !photoType.includes(photo.mimetype) ||
    photo.size > heightPhotoSize
  ) {
    return res.redirect('back')
  }

  // upload image to cloudinary
  cloudinary.uploader.upload(photo.tempFilePath, function (error, result) {
    if (error) {
      return next(error)
    }
    User.findByIdAndUpdate(req.user._id, { photoLink: result.secure_url })
      .then(updatedResult => {
        const { photoLink } = req.user
        const publicId = photoLink
          .split('/')
          [photoLink.split('/').length - 1].split('.')[0]

        // delete old image
        cloudinary.uploader.destroy(publicId)
        // response back
        res.redirect('back')
      })
      .catch(err => {
        next(err)
      })
  })
}

exports.postEditProfile = async (req, res, next) => {
  const { email, mobile, work, city, about } = req.body
  let isUsedEmail = false
  if (req.user.email !== email) {
    isUsedEmail = await User.findOne({ email })
  }

  if (isUsedEmail) {
    req.flash('error', ['Email has already used'])
    return res.redirect('back')
  }

  User.findByIdAndUpdate(req.user._id, {
    userInfo: { mobile, work, city, about }
  })
    .then(() => {
      return res.redirect('back')
    })
    .catch(err => next(err))
}
