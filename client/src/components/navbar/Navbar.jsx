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
        <Link to="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>Smile Estate</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
        <Link to="/">Agents</Link>
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
          <><Link to="/login" className="sign-in-button" onClick={() => console.log('Sign in clicked')}>Sign in</Link>
            <Link to="/register" className="register"><span className="signup-text">Sign up</span></Link></>)}
        <div className="menuIcon">
          <img src="/menu.png" alt="" onClick={() => setOpen((prev) => !prev)} />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/" onClick={() => setOpen(false)}>About</Link>
          <Link to="/" onClick={() => setOpen(false)}>Contact</Link>
          <Link to="/" onClick={() => setOpen(false)}>Agents</Link>
          <Link to="/login" onClick={() => setOpen(false)}>Sign in</Link>
          <Link to="/register" onClick={() => setOpen(false)}>Sign up</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;