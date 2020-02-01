module.exports.getUserRegx = function (word) {
  var wordArry = word.split('')
  var regExText = ''
  for (i = 0; i < wordArry.length; i++) {
    let gcTextArr = Object.assign([], wordArry)
    gcTextArr[i] = '[a-z]'
    regExText += gcTextArr.join('') + '|'
  }
  let regEx = new RegExp(regExText.slice(0, -1))
  return regEx
}
