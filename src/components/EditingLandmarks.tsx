import { useState, useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"

const EditingLandmarks = (props: any) => {
  const mapInfo = props.value.mapInfo
  const setMapInfo = props.value.setMapInfo
  const mapToEdit = props.value.mapToEdit
  const map2 = props.value.map2
  const isCanceling = props.value.isCanceling
  const setToDeleteEdit = props.value.setToDeleteEdit

  const tempArray = mapToEdit.landmarks.map((landmark: any, index: number) => {
    return {title: landmark.title, id: index, lng: landmark.longitude, lat: landmark.latitude}
  })
  const [editMapLandmarks, setEditMapLandmarks] = useState<any>([])
  const [refEditMapLandmarks, setRefEditMapLandmarks] = useState([])

  const [colorName, setColorName] = useState(mapToEdit.markerColor || "rgb(73,99,242)")
  
  useEffect(() => {
    setEditMapLandmarks(tempArray)
  }, [])

  const markerOptions: any = {}
  if (mapToEdit.subscription === 'admin') {
    markerOptions.scale = '0'
  } else {
    markerOptions.offset = [10.5,-10]
    markerOptions.color = colorName
    markerOptions.scale = "1"
  }

  useEffect(() => {
    const tempLandmarkArray: any = []
  //   // can be optimized by removing only the changed marker ?
    if (refEditMapLandmarks.length != 0) {
      refEditMapLandmarks.forEach((landmark: any) => {
        landmark.remove()
      })
      setRefEditMapLandmarks([])
    }
    editMapLandmarks.forEach((landmark: any) => {
      if (landmark.title != "Title" && landmark.lng != "lng" && landmark.lat != "lat") {
        const temp = new mapboxgl.Marker(markerOptions)
          .setLngLat([landmark.lng,landmark.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25}).setText(landmark.title))
          .addTo(map2.current)
          //@ts-ignore
          .addClassName('background-icon')
        tempLandmarkArray.push(temp)
      }
    })
    setRefEditMapLandmarks(tempLandmarkArray)
    setToDeleteEdit(tempLandmarkArray)
    const tempInfo = {...mapInfo}
    tempInfo.markerColor = colorName
    tempInfo.landmarks = editMapLandmarks
      .filter((landmark: any) => landmark.title != "Title" && landmark.lng != "lng" && landmark.lat != "lat")
      .map((landmark: any) => {
        return {
          title: landmark.title,
          longitude: landmark.lng,
          latitude: landmark.lat
        }
      })
    setMapInfo(tempInfo)

  }, [editMapLandmarks, colorName])

  useEffect(() => {
    refEditMapLandmarks.forEach((landmark: any) => {
      landmark.remove()
    })
  }, [isCanceling])

  const handleNewMapAdd = () => {
    if (editMapLandmarks.length != 0) {
      const lastItem: any = editMapLandmarks[editMapLandmarks.length-1]
      if (lastItem.title === "Title" || lastItem.lng === "lng" || lastItem.lat === "lat") return
    }
    setEditMapLandmarks([...editMapLandmarks, { id: editMapLandmarks.length, title: "Title", lng: "lng", lat: "lat"}])
  }
  const handleTitleChange = (e: any, index: any) => {
    const tempArray1 = editMapLandmarks.slice(0, index)
    const tempArray2 = editMapLandmarks.slice(index+1, editMapLandmarks.length)
    let changedMap = editMapLandmarks.slice(index, index+1)
    changedMap[0].title = e.target.value
    setEditMapLandmarks([...tempArray1, ...changedMap, ...tempArray2])
  }

  let selectingCoordinates = false
  const selectCoordinates = (index: any) => {
    if (map2.current != null) {
      map2.current.on('click', (e: any) => {
        if (selectingCoordinates === true) {
          const changedMap = {...editMapLandmarks[index]}
          changedMap.lng = e.lngLat.lng
          changedMap.lat = e.lngLat.lat
          changedMap.id = index
          const tempArray1 = [...editMapLandmarks.slice(0,index)]
          const tempArray2 = [...editMapLandmarks.slice(index + 1, editMapLandmarks.length)]
          selectingCoordinates = false
          setEditMapLandmarks([...tempArray1, changedMap, ...tempArray2])
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

  const coordinatesSelectionMode = (index: any) => {
    selectingCoordinates = true
    selectCoordinates(index)
  }

  const colorSampleRefs = useRef<any>([])
  const addToColorSampleRefs = (e: any) => {
    if (e && !colorSampleRefs.current.includes(e)) {
      colorSampleRefs.current.push(e)
    }
  }
  const [lastColorSelected, setLastColorSelected] = useState(-1)
  const handleColorSelection = (e: any, colorCode: any, index: number) => {
    e.target.innerHTML = `<i class="bi bi-check h3"></i>`
    if (lastColorSelected != -1) {
      colorSampleRefs.current[lastColorSelected].innerHTML = ""
    }
    setLastColorSelected(index)
    setColorName(colorCode)
  }

  return (
    <div className="add-map-landmarks d-flex flex-column">
      {mapToEdit.subscription === 'admin' ?
      <></>
      :
      <>
        <h3>Select marker color:</h3>
        <div className="w-100 my-3 d-flex justify-content-evenly color-sample-container">
          <div ref={addToColorSampleRefs} onClick={(e) => handleColorSelection(e, "rgb(217,216,88)", 0)} className="d-flex align-items-center color-sample sample-1"></div>
          <div ref={addToColorSampleRefs} onClick={(e) => handleColorSelection(e, "rgb(229,90,84)", 1)} className="d-flex align-items-center color-sample sample-2"></div>
          <div ref={addToColorSampleRefs} onClick={(e) => handleColorSelection(e, "rgb(234,155,82)", 2)} className="d-flex align-items-center color-sample sample-3"></div>
          <div ref={addToColorSampleRefs} onClick={(e) => handleColorSelection(e, "rgb(97,119,148)", 3)} className="d-flex align-items-center color-sample sample-4"></div>
          <div ref={addToColorSampleRefs} onClick={(e) => handleColorSelection(e, "rgb(114,84,227)", 4)} className="d-flex align-items-center color-sample sample-5"></div>
          <div ref={addToColorSampleRefs} onClick={(e) => handleColorSelection(e, "rgb(220,90,138)", 5)} className="d-flex align-items-center color-sample sample-6"></div>
          <div ref={addToColorSampleRefs} onClick={(e) => handleColorSelection(e, "rgb(73,99,242)", 6)} className="d-flex align-items-center color-sample sample-7"></div>
          <div ref={addToColorSampleRefs} onClick={(e) => handleColorSelection(e, "rgb(99,192,126)", 7)} className="d-flex align-items-center color-sample sample-8"></div>
        </div>
      </>
      }
      <h2>– LANDMARKS –</h2>
      <ul className="add-map-landmark-list">
        {editMapLandmarks.map((landmark: any, index: any) => {
          return(
          <li key={landmark.id} className="d-flex">
            {mapToEdit.subscription === 'admin' ? 
              <img src={landmark.icon} alt="Landmark icon" />
              :
              <i className="bi bi-geo-alt-fill h5"></i>
            }
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

export default EditingLandmarks