import React from 'react';
import moment from 'moment';

import './SingleChat.scss';

export default function SingleChat(props) {
  return (
    <div className="SingleChat">
      <a href={`/user/${props.singleMessage.sender.username}`}>
        <div className="user-photo">
          <img
            src={props.singleMessage.sender.photoLink}
            alt={props.singleMessage.sender.name}
          />
        </div>
      </a>
      <div className="message">
        <div style={{ display: 'flex' }}>
          <a href={`/user/${props.singleMessage.sender.username}`}>
            {props.userId === props.singleMessage.sender._id
              ? 'Me'
              : props.singleMessage.sender.name}
          </a>
          {props.singleMessage.createdAt && (
            <small
              style={{ margin: 0, marginLeft: 7 }}
              class="form-text text-muted"
            >
              {moment(new Date(props.singleMessage.createdAt)).format('lll')}
            </small>
          )}
        </div>
        <p>{props.singleMessage.messageBody}</p>
      </div>
    </div>
  );
}
