import React from 'react';

import './SingleChat.scss';

export default function SingleChat(props) {
  return (
    <div className="SingleChat">
      <a href={`/user/${props.message.sender.username}`}>
        <img
          src={props.message.sender.photoLink}
          alt={props.message.sender.name}
        />
      </a>
      <div className="message">
        <a href={`/user/${props.message.sender.username}`}>
          {props.message.sender.name}
        </a>
        <p>{props.message.messageBody}</p>
      </div>
    </div>
  );
}
