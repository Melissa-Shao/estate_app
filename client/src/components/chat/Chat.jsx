import './chat.scss'
import { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

function Chat({ chats }) {
  const [chat, setChat] = useState(false)
  // console.log(chats)
  const { currentUser } = useContext(AuthContext);

  return (
    <div className='chat'>
      <div className="messages">
        <h1>Messages</h1>
        {
          chats?.map(chat => (

            <div className="message" key={chat.id} style={{ backgroundColor: chat.seenBy.includes(currentUser.id) ? "white" : "#fecd514e" }}>
              <img src={chat.receiver.avatar || "/profile.jpg"} alt="" />
              <span>{chat.receiver.username}</span>
              <p>{chat.lastMessage}</p>
            </div>

          ))}
      </div>

      {chat && (<div className="chatBox">
        <div className="top">
          <div className="user">
            <img src="/profile.jpg" alt="" />
            John Doe
          </div>
          <span className='close' onClick={() => setChat(null)}>X</span>
        </div>
        <div className="center">
          <div className="chatMessage own">
            <p>Lorem ipsum dolor sit amet.</p>
            <span>1 hour ago</span>
          </div>
          <div className="chatMessage">
            <p>Lorem ipsum dolor sit amet.</p>
            <span>1 hour ago</span>
          </div>
          <div className="chatMessage own">
            <p>Lorem ipsum dolor sit amet.</p>
            <span>1 hour ago</span>
          </div>
          <div className="chatMessage">
            <p>Lorem ipsum dolor sit amet.</p>
            <span>1 hour ago</span>
          </div>
          <div className="chatMessage own">
            <p>Lorem ipsum dolor sit amet.</p>
            <span>1 hour ago</span>
          </div>
          <div className="chatMessage">
            <p>Lorem ipsum dolor sit amet.</p>
            <span>1 hour ago</span>
          </div>
          <div className="chatMessage own">
            <p>Lorem ipsum dolor sit amet.</p>
            <span>1 hour ago</span>
          </div>
        </div>
        <div className="bottom">
          <textarea></textarea>
          <button>Send</button>
        </div>
      </div>)}
    </div>
  )
}

export default Chat