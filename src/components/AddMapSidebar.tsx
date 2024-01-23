import { useEffect, useRef, useState } from "react"

const AddMapSidebar = (props) => {
  const mapInfo = props.value.mapInfo
  const setMapInfo = props.value.setMapInfo
  const [addMapTags, setAddMapTags] = useState([])
  const handleTagAdd = () => {
    if (addMapTags.length != 0) {
      if (addMapTags[addMapTags.length - 1].name === 'hashtag') return
      if (addMapTags.length === 4) return
    }
    setAddMapTags([...addMapTags, { id: addMapTags.length, name: 'hashtag'}])
  }
  const noSpace = (e) => {
    if (e.keyCode === 32) {
      e.preventDefault()
    }
  }
  
  const handleTagEdit = (e, index) => {
    const tempArray = addMapTags.filter((tag) => tag.id != addMapTags[index].id)
    setAddMapTags([...tempArray, { name: e.target.value.replace(/[^0-9A-Z]+/gi,""), id: tempArray.length}])
  }
  const handleTagDelete = (index) => {
    const tempArray = addMapTags.filter((tag) => tag.id != addMapTags[index].id)
    setAddMapTags([...tempArray])
  }
  const handleURLChange = (e) => {
    const temp = {...mapInfo}
    temp.coverImage = e.target.value
    setMapInfo(temp)
  }
  useEffect(() => {
    const temp = {...mapInfo}
    const tempArray = addMapTags.filter((tag) => tag.name != 'hashtag').map((tag) => tag.name)
    temp.tags = tempArray
    setMapInfo(temp)
  }, [addMapTags])

  return (
    <div className="add-map-sidebar position-relative p-3">
      <div className="d-flex">
        <h3>Cover Image webURL:</h3>
        <p className="ms-1">(1)</p>
      </div>
      <div className="add-map-input-container w-100 d-flex justify-content-center">
        <input onChange={(e) => handleURLChange(e)} type="text"/>
      </div>
      <div className="d-flex mt-3">
        <h3>Tags (max: 4):</h3>
        <p className="ms-1">(2)</p>
      </div>
      <ul className="add-map-tags d-flex flex-column align-items-center p-0">
        {addMapTags.map((tag, index) => {
          return(
            <li key={tag.id} className="d-flex position-relative">
              <input onChange={(e) => handleTagEdit(e, index)} onKeyDown={(e) => noSpace(e)} type="text" defaultValue={`#${tag.name}`}/>
              <i onClick={() => handleTagDelete(index)} className="bi bi-dash-square-dotted position-absolute"></i>
            </li>
          )
        })}
        <li onClick={() => handleTagAdd()} className="d-flex justify-content-center">Add <i className="bi bi-plus-square-dotted ms-2"></i></li>
      </ul>
      <p className="position-absolute para-1"><b>Note (1):</b> As of now we are unable to store uploaded images. Please use a url copied from the web!</p>
      <p className="position-absolute para-2"><b>Note (2):</b> Change default hashtag value before adding new ones!</p>
    </div>
  )
}

export default AddMapSidebar