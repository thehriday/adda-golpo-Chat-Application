// friendListOption

const friendTab = document.querySelector('#nav-friends-tab');
const chatListTab = document.querySelector('#nav-chatList-tab');

const friendTabContent = document.querySelector('#nav-friends');
const chatListTabContent = document.querySelector('#nav-chatList');

friendTab.addEventListener('click', e => {
  localStorage.setItem('chatState', 'friendsList');
});

chatListTab.addEventListener('click', e => {
  localStorage.setItem('chatState', 'chatList');
});

// check every time at homepage
if (localStorage.getItem('chatState') === 'chatList') {
  friendTab.classList.remove('active');
  chatListTab.classList.add('active');

  friendTabContent.classList.remove('show', 'active');
  chatListTabContent.classList.add('show', 'active');
} else {
  chatListTab.classList.remove('active');
  friendTab.classList.add('active');

  chatListTabContent.classList.remove('show', 'active');
  friendTabContent.classList.add('show', 'active');
}
