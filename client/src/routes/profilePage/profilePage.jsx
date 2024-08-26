import List from '../../components/list/List'
import './profilePage.scss'
import Chat from '../../components/chat/Chat'
import apiRequest from "../../lib/apiRequest"
import { Await, useNavigate, useLoaderData, useLocation } from 'react-router-dom'
import { Suspense, useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'


function ProfilePage() {
  const data = useLoaderData();

  const chats = data.chatResponse?.data;
  const posts = data.postResponse?.data;

  // console.log(chats);  
  // console.log(posts);
  const { updateUser, currentUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const location = useLocation();
  const { receiverId, receiverName } = location.state || {};

  const chatInitiatedRef = useRef(false);

  useEffect(() => {
    if (receiverId && location.state && !chatInitiatedRef.current) {
      chatInitiatedRef.current = true;
      console.log('Location State:', location.state);
      startNewChat(receiverId, receiverName);
    }
  }, [receiverId, receiverName]);


  const startNewChat = async (receiverId, receiverName) => {
    try {
      const existingChat = chats.find(c => c.receiver.id === receiverId);
      if (existingChat) {
        console.log('Chat already exists with receiverId:', receiverId);
        navigate('/profile', { state: { chatId: existingChat.id, receiverName } });
        return;
      }

      console.log('Starting new chat with receiverId:', receiverId);
      const res = await apiRequest.post('/chats', { receiverId });
      const newChat = res.data;

      console.log('New Chat:', newChat);
      navigate('/profile', { state: { chatId: newChat.id, receiverName } });
    } catch (err) {
      console.log('Failed to start chat', err);
    }
  };


  const handleLogout = async () => {
    try {
      await apiRequest.post('/auth/logout')
      updateUser(null)
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='profilePage'>
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>Avatar: <img src={currentUser.avatar || "noavatar.jpg"} alt="" /></span>
            <span>Username:<b>{currentUser.username}</b></span>
            <span>E-mail: <b>{currentUser.email}</b></span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My list</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>

          <Suspense fallback={<p>Loading</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={
                <p>Error loading posts!</p>
              }
            >
              {(postResponse) => <List posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>

          <div className="title">
            <h1>Saved List</h1>
          </div>

          <Suspense fallback={<p>Loading</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={
                <p>Error loading posts!</p>
              }
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">

          <Suspense fallback={<p>Loading</p>}>
            <Await
              resolve={data.chatResponse}
              errorElement={
                <p>Error loading chats!</p>
              }
            >
              {(chatResponse) =>
                <Chat chats={chatResponse.data} chatId={location.state?.chatId} />}
            </Await>
          </Suspense>

        </div>
      </div>
    </div>
  )
}

export default ProfilePage