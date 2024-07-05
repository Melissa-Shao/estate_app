import Slider from '../../components/slider/Slider'
import Map from '../../components/map/Map'
import './singlepage.scss'
import { useNavigate, useLoaderData } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import apiReuest from '../../lib/apiRequest'
import DOMPurify from 'dompurify'

function SinglePage() {
  const post = useLoaderData();
  console.log(post)
  const [saved, setSaved] = useState(post.isSaved)
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSave = async () => {
    setSaved((prev) => !prev)
    if (!currentUser) {
      navigate('/login')
    }

    try {
      await apiReuest.post('/users/save', { postId: post.id })
    } catch (err) {
      console.log(err)
      setSaved((prev) => !prev)
    }
  }
  return (
    <div className='singlePage'>
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div className="bottom" dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.PostDetail.desc)
            }}>
            </div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {
                  post.PostDetail.utilities === "owner" ? <p>Owner is responsive</p> : <p>Utilities included</p>
                }
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {
                  post.PostDetail.pet === "allowed" ? <p>Pets allowed</p> : <p>No pets allowed</p>
                }
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income Property</span>
                <p>{post.PostDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes
          </p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.PostDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places
          </p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{post.PostDetail.school > 999
                  ? post.PostDetail.school / 1000 + "km"
                  : post.PostDetail.school + "m"}{" "} away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/bus.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.PostDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Resaurant</span>
                <p>{post.PostDetail.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button>
              <img src=" /chat.png" alt="" />
              Send a message
            </button>
            <button onClick={handleSave} style={{ backgroundColor: saved ? "#fece51" : 'white' }}>
              <img src=" /save.png" alt="" />
              {saved ? "Place saved" : 'Save the Place'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePage