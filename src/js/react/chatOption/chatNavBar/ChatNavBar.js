import React from 'react';

import './ChatNavBar.scss';

export default function ChatNavBar() {
  return (
    <React.Fragment>
      <nav className="ChatNavBar">
        <a href={`user/username`}>
          <img
            src="https://res.cloudinary.com/dd1yyqwwy/image/upload/v1574792794/qa2ueqseztsd9ct1pztr.jpg"
            alt="name"
          />
        </a>
        <div className="info">
          <a href={`user/username`}>Shahriar Hridoy</a>
          <p>Active</p>
        </div>
      </nav>
      <hr style={{ margin: 0 }} />
    </React.Fragment>
  );
}
