import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNotificationStore } from "../../lib/notificationStore";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if (currentUser) {
    fetch();
  }

  return (
    <nav>
      <div className="left">
        <Link href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>Smile Estate</span>
        </Link>
        <Link href="/">Home</Link>
        <Link href="/">About</Link>
        <Link href="/">Contact</Link>
        <Link href="/">Agents</Link>
      </div>
      <div className="right">
        {currentUser ? (<div className="user">
          <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
          <span>{currentUser.username}</span>
          <Link to="/profile" className="profile">
            {number > 0 && <div className="notification">{number}</div>}
            <span>Profile</span>
          </Link>
        </div>) : (
          <><a href="/login">Sign in</a>
            <a href="/register" className="register"><span className="signup-text">Sign up</span></a></>)}
        <div className="menuIcon">
          <img src="/menu.png" alt="" onClick={() => setOpen((prev) => !prev)} />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link href="/">Home</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          <Link href="/">Agents</Link>
          <Link href="/">Sign in</Link>
          <Link href="/">Sign up</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;