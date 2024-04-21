import { useState, useEffect, useRef, MutableRefObject } from "react"
import { Link } from "react-router-dom";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl' 
import axios from "axios";
import Spinner from "../components/Spinner";
import AddMapSidebar from "../components/AddMapSidebar";
import AddMapLandmarks from "../components/AddMapLandmarks";
import EditingSidebar from "../components/EditingSidebar";
import EditingLandmarks from "../components/EditingLandmarks";

const MyMaps = (props: MyMapsProps) => {
  const username: string = props.value.username
  const isLoggedIn = props.value.isLoggedIn
  const loading = props.value.loading
  const setLoading = props.value.setLoading

  const mapContainer2 = useRef<HTMLDivElement>(null)
  const map2: MutableRefObject<mapboxgl.Map | null> = useRef(null)
  const [myMaps, setMyMaps] = useState<MapInterface[]>([])

  const [isAddingMap, setIsAddingMap] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true)
      axios
        .get('https://mapex-backend.onrender.com/api/mymaps', { withCredentials: true, withXSRFToken: true })
        .then((res) => {
          setMyMaps(res.data.data)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
    }
  }, [isAddingMap, isEditing])

  useEffect(() => {
    if (isLoggedIn) {
      if (map2.current) return
      mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
      if (mapContainer2.current) {
        map2.current = new mapboxgl.Map({
          container: mapContainer2.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [10, 7.0799],
          zoom: 1.1,
          minZoom: 1,
      })
      }
    }
  }, [myMaps]);

  const [myCurrentLandmarks, setMyCurrentLandmarks] = useState<mapboxgl.Marker[]>([])
  const [selectedMyMap, setSelectedMyMap] = useState(-1)
  const selectMyMap = (mapNumber: number) => {
    if (mapNumber == selectedMyMap) return;
    setSelectedMyMap(mapNumber)
  }
  const selectMyLandmarks = (mapNumber: number) => {
    if (myCurrentLandmarks) {
      myCurrentLandmarks.forEach((landmark: mapboxgl.Marker) => {
        landmark.remove()
      })
    }
    setMyCurrentLandmarks([])
    const tempArray: mapboxgl.Marker[] = []
    const markerOptions: mapboxgl.MarkerOptions = {}
    if (myMaps[mapNumber].subscription === 'admin') {
      markerOptions.scale = 0
    } else {
      markerOptions.offset = [10.5,-10]
      markerOptions.color = myMaps[mapNumber].markerColor
      markerOptions.scale = 1
    }

    myMaps[mapNumber].landmarks.forEach((landmark: LandmarkInterface) => {
      if (map2.current && landmark.longitude && landmark.latitude) {
        const temp = new mapboxgl.Marker(markerOptions)
          .setLngLat([landmark.longitude,landmark.latitude])
          .setPopup(new mapboxgl.Popup({ offset: 25}).setText(landmark.title))
          .addTo(map2.current)
          //@ts-ignore
          .addClassName('background-icon')
        temp.getElement().style.backgroundImage = `url('${landmark.icon}')`
        tempArray.push(temp)
      }
    })
    setMyCurrentLandmarks(tempArray)
  }
  
  const handleAdd = () => {
    setIsAddingMap(true)
  }

  const [mapInfo, setMapInfo] = useState<MapInterface | null>(null)
  const [isCanceling, setIsCanceling] = useState(false)
  

  useEffect(()=> {
    setIsAddingMap(false)
    setIsEditing(false)
    setSelectedMyMap(-1)
  }, [isCanceling])
  const handleNewMapTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mapInfo) {
      const temp = {...mapInfo}
      temp.title = e.target.value
      setMapInfo(temp)
    }
  }
  const handleEditMapTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mapInfo) {
      const temp = {...mapInfo}
      temp.title = e.target.value
      setMapInfo(temp)
    }
  }
  const [toDelete, setToDelete] = useState<mapboxgl.Marker[]>([])
  const [toDeleteEdit, setToDeleteEdit] = useState([])
  const handleMapSave = () => {
    if (mapInfo) {
      setLoading(true)
      axios
        .post('https://mapex-backend.onrender.com/api/mymaps', mapInfo, { withCredentials: true} )
        .then(() => {
          toDelete.forEach((landmark: mapboxgl.Marker) => {
            landmark.remove()
          })
          setIsAddingMap(false)
          const temp = {...mapInfo, title: "", author: username, coverImage: "", tags: [], landmarks: []}
          setMapInfo(temp)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
    } else {
      alert("Give a name to your map!")
    }
  }
  const mapChangeOnDelete = () => {
    if (myCurrentLandmarks.length != 0) {
      myCurrentLandmarks.forEach((landmark: mapboxgl.Marker) => {
        landmark.remove()
      })
    }
    const tempArray1 = myMaps.slice(0, selectedMyMap)
    const tempArray2 = myMaps.slice(selectedMyMap + 1, myMaps.length)
    setMyMaps([...tempArray1, ...tempArray2])
    setSelectedMyMap(-1)
  }
  const handleMapDelete = () => {
    if (selectedMyMap != -1) {
      setLoading(true)
      axios
        .delete(`https://mapex-backend.onrender.com/api/mymaps/${myMaps[selectedMyMap]._id}`, { withCredentials: true } )
        .then(() => {
          mapChangeOnDelete()
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
    } else {
      alert("Select a map to delete!")
    }
  }
  
  const handleMapEdit = () => {
    if (selectedMyMap != -1) {
      if (myCurrentLandmarks.length != 0) {
        myCurrentLandmarks.forEach((landmark: mapboxgl.Marker) => {
          landmark.remove()
        })
        setMyCurrentLandmarks([])
      }
      setMapInfo(mapToEdit)
      setIsEditing(true)
    }
  }
  const handleMapEditSave = () => {
    if (mapInfo) {
      const updatedMap = {
        title: mapInfo.title,
        author: mapInfo.author,
        coverImage: mapInfo.coverImage,
        tags: mapInfo.tags,
        numberOfLikes: 0,
        landmarks: mapInfo.landmarks,
        subscription: mapInfo.subscription,
        markerColor: mapInfo.markerColor
      }
      setLoading(true)
      axios
        .put(`https://mapex-backend.onrender.com/api/mymaps/${mapInfo._id}`, updatedMap, { withCredentials: true} )
        .then(() => {
          toDeleteEdit.forEach((landmark: mapboxgl.Marker) => {
            landmark.remove()
          })
          setIsEditing(false)
          const temp = {...mapInfo, title: "", author: username, coverImage: "", tags: [], landmarks: []}
          setMapInfo(temp)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
    } else {
      alert("Give a name to your map!")
    }
  }

  // const handleAdd = () => {
  //   if (myMaps[myMaps.length - 1].title === "New Empty Map") return
  //   const newMap = {
  //     title: "New Empty Map",
  //     author: username,
  //     coverImage: "",
  //     tags: [],
  //     publicStatus: false,
  //     numberOfLikes: 0,
  //     landmarks: []
  //   }
  //   if (myCurrentLandmarks) {
  //     myCurrentLandmarks.forEach((landmark) => {
  //       landmark.remove()
  //     })
  //   }
  //   setMyMaps([...myMaps, newMap])
  //   setSelectedMyMap(myMaps.length -1)
  //   setMyCurrentLandmarks([])
  //   setIsEditing(true)
  // }
  // const handleTitleChange = (e) => {
  //   if (e.keyCode === 13 || e.key === "Enter") {
  //     const mapToEdit = myMaps[myMaps.length-1]
  //     mapToEdit.title = e.target.value
  //     setMyMaps([...myMaps.slice(0, -1), mapToEdit])
  //   }
  // }

  const mapToEdit = myMaps[selectedMyMap]
  return (
    <div className="my-maps d-flex">
      <div className="mymaps-sidebar">
        <div className="mymaps-sidebar-1"></div>
        <div className="mymaps-sidebar-2"></div>
        <div className="mymaps-sidebar-3"></div>
        <div className="user-info">
          <i className="bi bi-person-circle h3 ms-3 mt-1"></i>
          <h3 className="d-flex align-items-center justify-content-center">{isLoggedIn ? username : <div><Link to='/login'>Sign in</Link> / <Link to='/register'>Register</Link></div>}</h3>
        </div>
        <div className="map-titles">
          { isAddingMap ? 
              <AddMapSidebar value={{mapInfo, setMapInfo}}/>
              :
                isEditing ?
                <EditingSidebar value={{mapInfo, setMapInfo, mapToEdit}}/>
              :
              <ul>
                {isLoggedIn ? 
                  myMaps.length === 0 ? <h3>Seems empty here...</h3> : myMaps.map((map, index) => {
                    return(
                      <li onClick={() => {
                        selectMyMap(index)
                        selectMyLandmarks(index)
                      }} key={map._id}>
                        {map.title}
                        <div className="bottom-line"></div>
                      </li>
                    )
                  }) :
                  <></>
              }
              </ul>
          }
        </div>
        {isLoggedIn ?
          isAddingMap ?
          <div className="d-flex gap-3">
            <button onClick={() => setIsCanceling(() => !isCanceling)} className="add-map btn btn-danger">Cancel</button>
            <button onClick={() => handleMapSave()} className="add-map btn btn-primary">Save Map</button> 
          </div>
            :
            isEditing ?
            <div className="d-flex gap-3">
              <button onClick={() => setIsCanceling(() => !isCanceling)} className="add-map btn btn-danger">Cancel</button>
              <button onClick={() => handleMapEditSave()} className="add-map btn btn-primary">Save Changes</button>
            </div>
            :
            <button onClick={() => handleAdd()} className="add-map btn btn-primary">Add</button> :
        <></>
        }
      </div>
      <div className="my-map">
        {isLoggedIn ?
        <div className="titlebar">
          { isAddingMap ?
              <input autoFocus onChange={(e) => handleNewMapTitleChange(e)} className="map-title-input" type="text" defaultValue={"New Empty Map"} /> 
              :
              isEditing ?
              <input autoFocus onChange={(e) => handleEditMapTitleChange(e)} className="map-title-input" type="text" defaultValue={mapToEdit.title} /> 
              :
              selectedMyMap === -1 ?
                ""
                :
                <h2>{myMaps[selectedMyMap].title}</h2>
          }
        </div> :
        <></>
        }
          <div className="map-details">
            {isLoggedIn ? 
            <div ref={mapContainer2} className="mapcontainer2"></div> 
            :
            <></>
            }
        {
          isLoggedIn ?
            loading ?
              <Spinner/>
            :
              isAddingMap ?
                  <div className="info-landmarks position-relative">
                    <AddMapLandmarks value={{
                      map2, 
                      mapContainer2, 
                      myCurrentLandmarks, 
                      setMyCurrentLandmarks, 
                      mapInfo, 
                      setMapInfo,
                      isCanceling,
                      setToDelete
                    }}/>
                  </div>          
              :
                isEditing ?
                    <div className="info-landmarks position-relative">
                      <EditingLandmarks value={{mapToEdit, map2, isCanceling, mapInfo, setMapInfo, setToDeleteEdit}}/>
                    </div>
                    :
                
                  <div className="info-landmarks position-relative">
                      {myMaps.length != 0 ?
                    <div>
                      <h2>– DETAILS –</h2>
                      <div className="tags-container">
                        <h4 className="tags-title mt-1"><b>Tags:</b></h4>
                        <div className="hashtags">
                          {selectedMyMap != -1 ? 
                            myMaps[selectedMyMap].tags?.map((tag, index) => {
                              return(
                                <p key={index}>#{tag}</p>
                              )
                            }) :
                              <></>
                          }
                        </div>
                      </div>
                      <div className="marker-number">
                        <h4><b>Number of landmarks:</b></h4>
                        <p>{selectedMyMap != -1 ? myMaps[selectedMyMap].landmarks.length : ""}</p>
                      </div>
                      <div className="cover-image">
                        <h4 className="detail-title"><b>Cover image:</b></h4>
                        {selectedMyMap != -1 ?
                          <img src={myMaps[selectedMyMap].coverImage} alt="Cover image (missing)" /> :
                          <></>
                        }
                      </div>
                      {selectedMyMap != -1 ?
                        myMaps[selectedMyMap].publicStatus ?
                          <div className="public-private">
                            <div className="set-public selected-public-private">Public</div>
                            <div className="set-private">Private</div>
                          </div> : 
                          <div className="public-private">
                            <div className="set-public">Public</div>
                            <div className="set-private selected-public-private">Private</div>
                          </div> :
                        <></>
                      }
                      {selectedMyMap != -1 ?
                        <div className="position-absolute edit-delete-buttons">
                          <button onClick={() => handleMapDelete()} className="btn btn-danger me-2">Delete Map</button>
                          <button onClick={() => handleMapEdit()} className="btn btn-primary">Edit</button>
                        </div>
                        :
                        <></>
                      }
                      </div>
                      :
                      <></>
                    }
                  </div>          
                
          :

              <div className="empty-icon">
                <img src="https://cdn-icons-png.flaticon.com/512/13299/13299262.png?ga=GA1.1.1722074510.1704478935&" alt="Empty icon" />
              </div>
            
        }
        </div>
        </div>
      </div>
  )
}
export default MyMaps