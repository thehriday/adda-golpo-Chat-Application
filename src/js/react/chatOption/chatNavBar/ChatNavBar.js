import React from 'react';

import './ChatNavBar.scss';

export default function ChatNavBar(props) {
  return (
    <React.Fragment>
      <nav className="ChatNavBar">
        <a href={`/user/${props.targetUser.username}`}>
          <img src={props.targetUser.photoLink} alt={props.targetUser.name} />
        </a>
        <div className="info">
          <a href={`/user/${props.targetUser.username}`}>
            {props.targetUser.name}
          </a>
          <p>Active</p>
        </div>
      </nav>
      <hr style={{ margin: 0 }} />
    </React.Fragment>
  );
}
