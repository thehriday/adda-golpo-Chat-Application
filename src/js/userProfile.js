const uploadProfilePictureInput = document.querySelector(
  '.userProfile #uploadProfilePicture'
);

const saveProfilePictureButtons = document.querySelector(
  '.userProfile .upload-profile-picture-buttons'
);

const cancelPhotoUpload = document.querySelector(
  '.userProfile .upload-profile-picture-buttons .cancelButton'
);

const searchUserProfilePicture = document.querySelector(
  '.userProfile .searchUserProfilePicture img'
);

const profilePicture = document.querySelector(
  '.userProfile .searchUserProfilePicture.sameUser'
);

const uploadPhotoLabel = document.querySelector(
  '.userProfile .searchUserProfilePicture.sameUser .uploadPhotoLabel'
);

const fileReader = new FileReader();
const photoType = ['image/gif', 'image/jpeg', 'image/png'];
const heightPhotoSize = 1024 * 1024 * 5;

uploadProfilePictureInput &&
  uploadProfilePictureInput.addEventListener('change', e => {
    const [photo] = e.target.files;

    if (!photoType.includes(photo.type)) {
      return alert('Please select a photo!');
    }

    if (photo.size > heightPhotoSize) {
      return alert('Photo size have to be less then 5MB');
    }

    saveProfilePictureButtons.style.display = '';

    fileReader.readAsDataURL(photo);
  });

fileReader.onload = e => {
  searchUserProfilePicture.src = e.target.result;
};

cancelPhotoUpload &&
  cancelPhotoUpload.addEventListener('click', e => {
    location.reload();
  });

profilePicture &&
  profilePicture.addEventListener('mouseenter', e => {
    uploadPhotoLabel.style.display = '';
  });

profilePicture &&
  profilePicture.addEventListener('mouseleave', e => {
    uploadPhotoLabel.style.display = 'none';
  });
