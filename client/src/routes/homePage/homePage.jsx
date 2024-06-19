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
            Find Real Estate & Get Your Dream Place
          </h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur deleniti repudiandae distinctio corporis ullam nulla eius, officiis reiciendis. Debitis ea in animi, sapiente veniam beatae odit enim dignissimos dolorem necessitatibus!
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Lorem, ipsum.</h2>
            </div>
            <div className="box">
              <h1>100+</h1>
              <h2>Lorem, ipsum.</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Lorem, ipsum.</h2>
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