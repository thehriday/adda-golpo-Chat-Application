// friendListOption

const friendTab = document.querySelector('#nav-friends-tab');

const friendTabContent = document.querySelector('#nav-friends');
const chatListTabContent = document.querySelector('#nav-chatList');

friendTab.addEventListener('click', e => {
  localStorage.setItem('chatState', 'friendsList');
});

// check every time at homepage
if (localStorage.getItem('chatState') === 'chatList') {
  friendTab.classList.remove('active');

  friendTabContent.classList.remove('show', 'active');
} else {
  friendTab.classList.add('active');

  friendTabContent.classList.add('show', 'active');
}
