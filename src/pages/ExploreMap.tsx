import { useEffect, useState, useRef } from "react"
import { useLocation } from "react-router-dom"
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl' 

const ExploreMap = (props) => {
  const {state} = useLocation()
  const {map} = state
  const mapContainer2 = useRef(null)
  const map2 = useRef(null)
  const [lng, setLng] = useState(10)
  const [lat, setLat] = useState(7.0799)
  const [zoom, setZoom] = useState(1.1)
  
  useEffect(() => {
      if (map2.current) return
      mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
      map2.current = new mapboxgl.Map({
        container: mapContainer2.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom,
        minZoom: 1,
      });
      map.landmarks.forEach((landmark) => {
        const temp = new mapboxgl.Marker({ scale: '0' })
          .setLngLat([landmark.longitude,landmark.latitude])
          .setPopup(new mapboxgl.Popup({ offset: 25}).setText(landmark.title))
          .addTo(map2.current)
          .addClassName('background-icon')
        temp.getElement().style.backgroundImage = `url('${landmark.icon}')`
      })
  }, []);
  
  return (
    <div className="explore-page">
      <div className="explore-sidebar position-relative">
        <div className="mymaps-sidebar-1"></div>
        <div className="mymaps-sidebar-2"></div>
        <div className="mymaps-sidebar-3"></div>
        <div className="explore-tags">
          <h3 className="actual-h3">Tags:</h3>
          <div className="hashtags">
            {map.tags.map((tag, index) => {
              return(
                <p key={index} >#{tag}</p>
              )
            })}
          </div>
        </div>
        <div className="slider-container">
          <div className="d-flex">
            <h3 className="me-3 mb-3 actual-h3">Number of pins:</h3>
            <h3>{map.landmarks.length}</h3>
          </div>
        </div>
        <div className="slider-container">
          <div className="d-flex">
            <h3 className="me-3 mb-3 actual-h3">Number of likes:</h3>
            <h3>{map.numberOfLikes}</h3>
          </div>
        </div>
        <div className="slider-container">
          <h3 className="me-3 mb-3 actual-h3">Cover image:</h3>
          <div className="d-flex w-100 justify-content-center mt-5">
            <img src={map.coverImage} alt="Cover image for map" />
          </div>
        </div>
      </div>
      <div className="my-map">
        <div className="titlebar">
          <h2>{map.title}</h2>
        </div>
        <div className="map-details">
          <div ref={mapContainer2} className="mapcontainer2"></div> 
          <div className="info-landmarks position-relative">
            <h2>– LANDMARKS –</h2>
            <ul className="landmarks-list d-flex flex-column">
              {map.landmarks.map((landmark) => {
                return(
                  <li key={landmark.title}>
                    <img src={landmark.icon} alt="" />
                    {landmark.title}
                  </li>
                )
              })}
            </ul>
          </div>          
        </div>
      </div>
    </div>
  )
}

export default ExploreMap