import React,{useState,useEffect} from 'react';
import MyContext from './context/MyContext';
import MapBox from './components/Mapbox/Mapbox';
import Overlay from './components/overlay/Overlay';
import "./css/style.css";
import Login from './components/Login/Login';
function App() {
  
  const [direction,setDirection] = useState(null);
  const [prevIdStart,setPrevIdStart] = useState([]);
  const [geoLoc,setGeoLoc]  = useState(null);
  const [_id,_setId] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [isLogin,setIsLogin] = useState(false);

  useEffect(() => {
    if(JSON.parse(sessionStorage.getItem('isLogin'))) {
      setIsLogin(true);
    }
    fetch('http://localhost:8080/')
    .then(res => res.json())
    .then (result => {
      setGeoLoc({
        type:"FeatureCollection",
        features: result.features
      })
    })
  },[])
  useEffect(() => {
    let t = setInterval(() => {
      let t = sessionStorage.getItem('coords');
      if(t) {
        console.log(t);
        setCoordinates(JSON.parse(t));
        sessionStorage.removeItem('coords');
      }
      
    })
    return function clear () {
      clearInterval(t);
    }
  },[])
  return (
    <MyContext.Provider value={{
      prevIdStart:prevIdStart,
      setPrevIdStart:setPrevIdStart,
      direction:direction,
      setDirection:setDirection,
      geoLoc:geoLoc,
      setGeoLoc:setGeoLoc,
      _id:_id,
      _setId:_setId,
      coordinates:coordinates,
      setCoordinates:setCoordinates
    }}>
      {(geoLoc && isLogin)?
      <div className="App">
        
        {(_id)?<Overlay _id={_id}/>:null}
        {(!_id && coordinates.length === 2)?<Overlay coordinate={coordinates}/>:null}
        <MapBox/>
      </div>:<Login/>}
    </MyContext.Provider>
  );
}

export default App;
