import React from 'react';

function ProfileMenu(props) {
    let { changeMenu } = props;
    return (
        <div className="profile-menu">
            <div className="suggestions" onClick={() => { changeMenu("Suggestions") }}>Suggestions</div>

            <div className="followers" onClick={() => { changeMenu("Followers") }}>Followers</div>

            <div className="following" onClick={() => { changeMenu("Following") }}>Following</div>

            <div className="requests" onClick={() => { changeMenu("Requests") }}>Requests</div>
        </div>
    )
}

export default ProfileMenu;