import { useEffect, useState, useRef } from "react"
import mapboxgl from "mapbox-gl"

const AddMapLandmarks = (props) => {
  const map2 = props.value.map2
  const mapContainer2 = props.value.mapContainer2
  const myCurrentLandmarks = props.value.myCurrentLandmarks
  const mapInfo = props.value.mapInfo
  const setMapInfo = props.value.setMapInfo
  const isCanceling = props.value.isCanceling
  const setToDelete = props.value.setToDelete

  const [newMapLandmarks, setNewMapLandmarks] = useState([])
  const [refNewMapLandmarks, setRefNewMapLandmarks] = useState([])
  const [colorName, setColorName] = useState("rgb(73,99,242)")

  useEffect(() => {
    if (myCurrentLandmarks.length != 0) {
      myCurrentLandmarks.forEach((landmark) => {
        landmark.remove()
      })
    }
  }, [])

  useEffect(() => {
    const tempArray = []
    // can be optimized by removing only the changed marker
    if (refNewMapLandmarks.length != 0) {
      refNewMapLandmarks.forEach((landmark) => {
        landmark.remove()
      })
    }
    newMapLandmarks.forEach((landmark) => {
      if (landmark.title != "Title" && landmark.lng != "lng" && landmark.lat != "lat") {
        const temp = new mapboxgl.Marker({ scale: '1', offset: [10.5,-10], color: `${colorName}` })
          .setLngLat([landmark.lng,landmark.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25}).setText(landmark.title))
          .addTo(map2.current)
          .addClassName('background-icon')
        tempArray.push(temp)
      }
    })
    setRefNewMapLandmarks(tempArray)
    setToDelete(tempArray)
    const tempInfo = {...mapInfo}
    tempInfo.color = colorName
    tempInfo.landmarks = newMapLandmarks
      .filter((landmark) => landmark.title != "Title" && landmark.lng != "lng" && landmark.lat != "lat")
      .map((landmark) => {
        return {
          title: landmark.title,
          longitude: landmark.lng,
          latitude: landmark.lat
        }
      })
    setMapInfo(tempInfo)

  }, [newMapLandmarks, colorName])
  
  useEffect(() => {
    refNewMapLandmarks.forEach((landmark) => {
      landmark.remove()
    })
  }, [isCanceling])

  let selectingCoordinates = false
  const selectCoordinates = (index) => {
    if (map2.current != null) {
      map2.current.on('click', (e) => {
        if (selectingCoordinates === true) {
          const changedMap = newMapLandmarks.slice(index, index + 1)
          changedMap[0].lng = e.lngLat.lng
          changedMap[0].lat = e.lngLat.lat
          changedMap[0].id = index
          changedMap[0].title = newMapLandmarks[index].title
          const tempArray1 = newMapLandmarks.slice(0,index)
          const tempArray2 = newMapLandmarks.slice(index + 1, newMapLandmarks.length)
          setNewMapLandmarks([...tempArray1, ...changedMap, ...tempArray2])
          selectingCoordinates = false
        }
      })
      map2.current.on('mousemove', () => {
        if (selectingCoordinates === true) {
          map2.current.getCanvas().style.cursor = "crosshair"
        } else if (selectingCoordinates === false) {
          map2.current.getCanvas().style.cursor = ""
        }
      })
    }
  }



  const handleNewMapAdd = () => {
    if (newMapLandmarks.length != 0) {
      const lastItem = newMapLandmarks[newMapLandmarks.length-1]
      if (lastItem.title === "Title" || lastItem.lng === "lng" || lastItem.lat === "lat") return
    }
    setNewMapLandmarks([...newMapLandmarks, { id: newMapLandmarks.length, title: "Title", lng: "lng", lat: "lat"}])
  }
  const handleTitleChange = (e, index) => {
    const tempArray1 = newMapLandmarks.slice(0, index)
    const tempArray2 = newMapLandmarks.slice(index+1, newMapLandmarks.length)
    let changedMap = newMapLandmarks.slice(index, index+1)
    changedMap[0].title = e.target.value
    setNewMapLandmarks([...tempArray1, ...changedMap, ...tempArray2])
  }
  const coordinatesSelectionMode = (index) => {
    selectingCoordinates = true
    selectCoordinates(index)
  }

  return (
    <div className="add-map-landmarks d-flex flex-column">
      <h3>Select marker color:</h3>
      <div className="w-100 my-3 d-flex justify-content-evenly color-sample-container">
        <div onClick={() => setColorName("rgb(217,216,88)")} className="color-sample sample-1"></div>
        <div onClick={() => setColorName("rgb(229,90,84)")} className="color-sample sample-2"></div>
        <div onClick={() => setColorName("rgb(234,155,82)")} className="color-sample sample-3"></div>
        <div onClick={() => setColorName("rgb(97,119,148)")} className="color-sample sample-4"></div>
        <div onClick={() => setColorName("rgb(114,84,227)")} className="color-sample sample-5"></div>
        <div onClick={() => setColorName("rgb(220,90,138)")} className="color-sample sample-6"></div>
        <div onClick={() => setColorName("rgb(73,99,242)")} className="color-sample sample-7"></div>
        <div onClick={() => setColorName("rgb(99,192,126)")} className="color-sample sample-8"></div>
      </div>
      <h2>– LANDMARKS –</h2>
      <ul className="add-map-landmark-list">
        {newMapLandmarks.map((landmark, index) => {
          return(
          <li key={landmark.id} className="d-flex">
            <i className="bi bi-geo-alt-fill h5"></i>
            <input onChange={(e) => handleTitleChange(e, index)} type="text" defaultValue={landmark.title}/>
            <i onClick={() => coordinatesSelectionMode(index)} className="bi bi-globe h5 mx-2"></i>
            <div>[{landmark.lng}, {landmark.lat}]</div>
          </li>
          )
          })
        }
      </ul>
      <button onClick={() => handleNewMapAdd()} className="position-absolute btn btn-primary">Add</button>
      <p className="note position-absolute"><b>Note:</b> To select coordinates, click the globe icon, then a point on the map</p>
    </div>
  )
}

export default AddMapLandmarks