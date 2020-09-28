import React from 'react';

function MenuList(props) {
    let { list, cMenu } = props;
    return (
      <div className="menu-list">
        <h1>{cMenu}</h1>
        {
          list.map(follower => {
            return (
              <div>
                <img src={follower.p_img_url} alt="profile-img" />
                <div>{follower.username}</div>
              </div>
            )
          })
        }
      </div>
    )
  }

  export default MenuList;