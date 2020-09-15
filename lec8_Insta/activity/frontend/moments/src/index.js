import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import React, { Component } from 'react';

import ProfileDetails from "./components/user/ProfileDetails";
import axios from 'axios';

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

function Profile(props) {
  return (
    <div className="profile">
      <ProfileDetails></ProfileDetails>
      <ProfileMenu changeMenu={props.changeMenu}></ProfileMenu>
    </div>
  )
}

function MenuList(props) {
  let { list, cMenu} = props;
  return (
    <div className="menu-list">
      {/* <h1>{cMenu}</h1> */}
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

function App() {
  return (
    <React.Fragment>
      <div className="app">
        <UserView></UserView>
        <div className="postView">PostView</div>
      </div>
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
