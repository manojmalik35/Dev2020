import React, { Component } from 'react';
import Profile from "./Profile";
import MenuList from "./MenuList";
import axios from "axios";

class UserView extends Component {
    state = {
        cMenu: "Suggestions",
        list: []
    }

    changeMenu = async (nMenu) => {
        //get followers of current user
        let obj = await axios.get("/api/v1/users/fr/b20f7599-ed78-4068-9019-c43981107f42");
        let follArr = [];
        if (nMenu === "Followers") {
            follArr = obj.data.followers.filter(follower => {
                return follower.is_pending === 0;
            });
        } else if (nMenu === "Requests") {
            follArr = obj.data.followers.filter(follower => {
                return follower.is_pending === 1;
            });
        }

        this.setState({
            cMenu: nMenu,
            list: follArr
        })
    }

    render() {
        return (
            <div className="userView">
                <Profile changeMenu={this.changeMenu}></Profile>
                <MenuList list={this.state.list} cMenu={this.state.cMenu}></MenuList>
            </div>

        );
    }
}

export default UserView;