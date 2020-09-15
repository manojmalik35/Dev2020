import React, { Component } from 'react';
import axios from "axios";

class ProfileDetails extends Component {
    state = {
        src: "",
        email: "",
        username: "",
        posts: "",
        followers: "",
        following: ""
    }

    componentDidMount(){
        axios.get("/api/v1/users/3c6c3389-5070-4147-af01-0aff43350248").then(res=>{
            let { username, email_id, p_img_url } = res.data.user;
            this.setState({
                src : p_img_url,
                email : email_id,
                username : username
            })
        })
    }

    render() {
        let { src, email, username, posts, followers, following } = this.state;
        return (
            <div className="profile-details">
                <div className="profile-subpart">
                    <h1>PROFILE</h1>
                    <img src={src} alt="profile-img" />
                    <div className="email">{email}</div>
                    <div className="username">{username}</div>
                </div>

                <div className="profile-stats">
                    <div className="div post">
                        <p>{posts}</p>
                        <div> posts</div>
                    </div>

                    <div className="div followers">
                        <p>{followers}</p>
                        <div> followers</div>
                    </div>

                    <div className="div following">
                        <p>{following}</p>
                        <div> following</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileDetails;
