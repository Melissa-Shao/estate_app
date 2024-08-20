import './homePage.scss';
import SearchBar from '../../components/searchBar/SearchBar';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

function HomePage() {
  const { currentUser } = useContext(AuthContext)

  console.log(currentUser)

  return (
    <div className='homePage'>
      <div className="textContainer">
        <div className="wrapper">
          <h1 className='title'>
            Unlock Your Dream Home with Smile Estate
          </h1>
          <h4>
            Discover the perfect place to call home. At Smile Estate, we make finding real estate simple, seamless, and tailored to your needs. Start your journey today!
          </h4>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200+</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  )
}

export default HomePage