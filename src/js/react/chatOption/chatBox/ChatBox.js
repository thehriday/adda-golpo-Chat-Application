import React from 'react';

import './ChatBox.scss';

import SingleChat from './singleChat/SingleChat';

const message = {
  sender: {
    name: 'Md Hridoy',
    username: 'mshridoy',
    photoLink:
      'https://res.cloudinary.com/dd1yyqwwy/image/upload/v1574792794/qa2ueqseztsd9ct1pztr.jpg'
  },
  messageBody: 'How are you'
};

export default function ChatBox() {
  return (
    <div className="ChatBox">
      <SingleChat message={message} />
    </div>
  );
}
