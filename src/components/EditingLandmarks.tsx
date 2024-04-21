import { useState, useEffect, useRef, MutableRefObject } from "react"
import mapboxgl from "mapbox-gl";

interface EditingLandmarksProps {
  value: {
    mapToEdit: MapInterface;
    map2: MutableRefObject<mapboxgl.Map | null>;
    isCanceling: boolean;
    mapInfo: MapInterface | null;
    setMapInfo: React.Dispatch<React.SetStateAction<MapInterface | null>>
    setToDeleteEdit: React.Dispatch<React.SetStateAction<mapboxgl.Marker[]>>
  }
}

const EditingLandmarks = (props: EditingLandmarksProps) => {
  const mapInfo = props.value.mapInfo
  const setMapInfo = props.value.setMapInfo
  const mapToEdit = props.value.mapToEdit
  const map2 = props.value.map2
  const isCanceling = props.value.isCanceling
  const setToDeleteEdit = props.value.setToDeleteEdit


  const tempArray = mapToEdit.landmarks.map((landmark, index) => {
    return {title: landmark.title, id: index, lng: landmark
      .longitude, lat: landmark.latitude}
  })
  const [editMapLandmarks, setEditMapLandmarks] = useState<LandmarkInterface[]>([])
  const [refEditMapLandmarks, setRefEditMapLandmarks] = useState<mapboxgl.Marker[]>([])

  const [colorName, setColorName] = useState(mapToEdit.markerColor || "rgb(73,99,242)")
  
  useEffect(() => {
    setEditMapLandmarks(tempArray)
  }, [])

  // Intentional (mapbox weird behaviour - expects number but works with string only)
  const markerOptions: any = {}
  if (mapToEdit.subscription === 'admin') {
    markerOptions.scale = '0'
  } else {
    markerOptions.offset = [10.5,-10]
    markerOptions.color = colorName
    markerOptions.scale = "1"
  }


  useEffect(() => {
    const tempLandmarkArray: mapboxgl.Marker[] = []
  //   // can be optimized by removing only the changed marker ?
    if (refEditMapLandmarks.length != 0) {
      refEditMapLandmarks.forEach((landmark: mapboxgl.Marker) => {
        landmark.remove()
      })
      setRefEditMapLandmarks([])

    }
    editMapLandmarks.forEach((landmark: LandmarkInterface) => {
      if (landmark.longitude && landmark.latitude && map2.current) {
        if (landmark.title != "Title" && landmark.longitude != -1 && landmark.latitude != -1) {
          const temp = new mapboxgl.Marker(markerOptions)
            .setLngLat([landmark.longitude,landmark.latitude])
            .setPopup(new mapboxgl.Popup({ offset: 25}).setText(landmark.title))
            .addTo(map2.current)
            //@ts-ignore
            .addClassName('background-icon')
          tempLandmarkArray.push(temp)
        }
      }
    })
    setRefEditMapLandmarks(tempLandmarkArray)
    setToDeleteEdit(tempLandmarkArray)
    if (mapInfo) {
      const tempInfo = {...mapInfo}
      tempInfo.markerColor 
      = colorName
      tempInfo.landmarks
       = editMapLandmarks
        .filter((landmark: LandmarkInterface) => landmark.title != "Title" && landmark.longitude != -1 && landmark.latitude != -1)
        .map((landmark: LandmarkInterface) => {
          return {
            title: landmark.title,
            longitude: landmark.longitude,
            latitude: landmark.latitude
          }
        })
      setMapInfo(tempInfo)
    }
  }, [editMapLandmarks, colorName])


  useEffect(() => {
    refEditMapLandmarks.forEach((landmark: mapboxgl.Marker) => {
      landmark.remove()
    })
  }, [isCanceling])

  const handleNewMapAdd = () => {
    if (editMapLandmarks.length != 0) {
      const lastItem = editMapLandmarks[editMapLandmarks.length-1]
      if (lastItem.title === "Title" || lastItem.longitude === -1 || lastItem.latitude === -1) return
    }
    setEditMapLandmarks([...editMapLandmarks, { id: editMapLandmarks.length, title: "Title", longitude: -1, latitude: -1}])
  }
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const tempArray1 = editMapLandmarks.slice(0, index)
    const tempArray2 = editMapLandmarks.slice(index+1, editMapLandmarks.length)
    let changedMap = editMapLandmarks.slice(index, index+1)
    changedMap[0].title = e.target.value
    setEditMapLandmarks([...tempArray1, ...changedMap, ...tempArray2])
  }


  let selectingCoordinates = false
  const selectCoordinates = (index: number) => {
    if (map2.current != null) {
      map2.current.on('click', (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
        if (selectingCoordinates === true) {
          const changedMap = {...editMapLandmarks[index]}
          changedMap.longitude = e.lngLat.lng
          changedMap.latitude = e.lngLat.lat
          changedMap.id = index
          const tempArray1 = [...editMapLandmarks.slice(0,index)]
          const tempArray2 = [...editMapLandmarks.slice(index + 1, editMapLandmarks.length)]
          selectingCoordinates = false
          setEditMapLandmarks([...tempArray1, changedMap, ...tempArray2])
        }
      })
      map2.current.on('mousemove', () => {
        if (map2.current) {
          if (selectingCoordinates === true) {
            map2.current.getCanvas().style.cursor = "crosshair"
          } else if (selectingCoordinates === false) {
            map2.current.getCanvas().style.cursor = ""
          }
        }
      })
    }
  }


  const coordinatesSelectionMode = (index: number) => {
    selectingCoordinates = true
    selectCoordinates(index)
  }



  const colorSampleRefs = useRef<HTMLDivElement[]>([])
  const addToColorSampleRefs = (e: HTMLDivElement) => {
    if (e && !colorSampleRefs.current.includes(e)) {
      colorSampleRefs.current.push(e)
    }
  }

  const [lastColorSelected, setLastColorSelected] = useState(-1)
  const handleColorSelection = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, colorCode: string, index: number) => {
    const target = e.target as HTMLDivElement
    target.innerHTML = `<i class="bi bi-check h3"></i>`
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
        {editMapLandmarks.map((landmark, index) => {
          return(
          <li key={landmark.id} className="d-flex">
            {mapToEdit.subscription === 'admin' ? 
              <img src={landmark.icon} alt="Landmark icon" />
              :
              <i className="bi bi-geo-alt-fill h5"></i>
            }
            <input onChange={(e) => handleTitleChange(e, index)} type="text" defaultValue={landmark.title}/>
            <i onClick={() => coordinatesSelectionMode(index)} className="bi bi-globe h5 mx-2"></i>
            <div>[{landmark.longitude}, {landmark.latitude}]</div>
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