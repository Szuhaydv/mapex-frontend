import { useState, useEffect, useRef } from "react"
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl' 
import axios from "axios";

const PopularPinmaps = () => {
  const mapContainer = useRef<any>(null)
  const map: any = useRef(null)

  const [popularMaps, setPopularMaps] = useState<any>([])
  const [currentLandmarks, setCurrentLandmarks] = useState<any>([])


  useEffect(() => {
    axios
      .get('http://localhost:5656/api/topthree', { withCredentials: true })
      .then((res) => {
        setPopularMaps(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  
  const mapRefs = useRef<any>([])
  const addMapRef = (el: any) => {
    if(el && !mapRefs.current.includes(el)) {
      mapRefs.current.push(el)
    }
  }

  useEffect(() => {
    if (map.current) return
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
    if (map.current === null){
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [10, 7.0799],
        zoom: 1,
        minZoom: 1,
        projection: {
          name: 'mercator'
        }
      });
    }
  }, []);
  const [selectedMap, setSelectedMap] = useState(-1)
  const selectMap = (mapNumber: any) => {
    if (mapNumber == selectedMap) return;
    if (selectedMap != -1) {
      mapRefs.current[selectedMap].classList.remove('selected-card')
    }
    mapRefs.current[mapNumber].classList.add('selected-card')
    setSelectedMap(mapNumber)
  }
  const selectLandmarks = (mapNumber: any) => {
    if (currentLandmarks) {
      currentLandmarks.forEach((landmark: any) => {
        landmark.remove()
      })
    }
    
    setCurrentLandmarks([])
    const tempArray: any[] = []
    const markerOptions: any = { scale: '0' }
    popularMaps[mapNumber].landmarks.forEach((landmark: any) => {
      const temp = new mapboxgl.Marker(markerOptions)
        .setLngLat([landmark.longitude,landmark.latitude])
        .setPopup(new mapboxgl.Popup({ offset: 25}).setText(landmark.title))
        .addTo(map.current)
        //@ts-ignore
        .addClassName('background-icon')
      temp.getElement().style.backgroundImage = `url('${landmark.icon}')`
      tempArray.push(temp)
    })
    setCurrentLandmarks(tempArray)
  }
  

  return (
    <div className='popular-pinmaps d-flex' id="popular-pinmaps">
        <section className="list-container position-relative">
            <div className="popular-trending position-absolute">
              <button className="me-5">THIS WEEK</button>
              <button>ALL TIME</button>
            </div>
            <img className='blob' src="src/assets/blob.svg" alt="blog background" />
            <ul className="position-absolute">
              {popularMaps.map((map: any, index: any) => {
                return(
                  <li ref={addMapRef} onClick={() => {
                    selectMap(index)
                    selectLandmarks(index)}
                    } key={map._id}>
                    <div className="img-container">
                      <img src={map.coverImage} alt="cover image for list item" className="cover-img"/>
                    </div>
                    <div className="title-author">
                      <h3>{map.title}</h3>
                      <div className="tags">
                        {map.tags.map((tag: any, index: any) => {
                          return(
                            <p key={index}>#{tag}</p>
                          )
                        })}
                      </div>
                      <p className="author">by {map.author}</p>
                    </div>
                    <div className="likes">
                      <img src="src/assets/heart.svg" alt="heart icon" />
                      <p className="likes-number">{map.numberOfLikes}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
        </section>
        <section className="example-maps">
          <div ref={mapContainer} className="map-container"></div>
          <div className="white-line"></div>
          <h2 className="popular-pinmaps-text">POPULAR PINMAPS</h2>
        </section>
    </div>
  )
}

export default PopularPinmaps