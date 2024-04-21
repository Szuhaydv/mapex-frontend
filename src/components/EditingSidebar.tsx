import { useEffect, useState } from "react"

const EditingSidebar = (props: any) => {
  const mapInfo = props.value.mapInfo
  const setMapInfo = props.value.setMapInfo
  const mapToEdit = props.value.mapToEdit

  const tempArray = mapToEdit.tags.map((tag: any, index: any) => {
    return {title: tag, id: index}
  })
  const [hashtags, setHashtags] = useState(tempArray)

  useEffect(() => {
    const temp = {...mapInfo}
    temp.tags = hashtags.map((tag: any) => tag.title)
    setMapInfo(temp)
  },[hashtags])

  const handleURLChange = (e: any) => {
    const temp = {...mapInfo}
    temp.coverImage = e.target.value
    setMapInfo(temp)
  }

  const handleTagAdd = () => {
    if (hashtags.length != 0) {
      if (hashtags[hashtags.length - 1].title === 'hashtag') return
      if (hashtags.length === 4) return
    }
    setHashtags([...hashtags, { id: hashtags.length, title: 'hashtag'}])
  }
  const handleTagEdit = (e: any, index: any) => {
    const tempArray = hashtags.filter((tag: any) => tag.id != hashtags[index].id)
    setHashtags([...tempArray, { title: e.target.value.replace(/[^0-9A-Z]+/gi,""), id: tempArray.length}])
  }
  const noSpace = (e: any) => {
    if (e.keyCode === 32) {
      e.preventDefault()
    }
  }
  const handleTagDelete = (index: any) => {
    const tempArray = hashtags.filter((tag: any) => tag.id != hashtags[index].id)
    setHashtags([...tempArray])
  }


  return (
    <div className="edit-sidebar position-relative p-3">
      <div className="d-flex">
        <h3>Cover Image webURL:</h3>
        <p className="ms-1">(1)</p>
      </div>
      <div className="add-map-input-container w-100 d-flex justify-content-center">
        <input onChange={(e) => handleURLChange(e)} defaultValue={mapToEdit.coverImage} type="text"/>
      </div>
      <div className="d-flex mt-3">
        <h3>Tags (max: 4):</h3>
        <p className="ms-1">(2)</p>
      </div>
      <ul className="add-map-tags d-flex flex-column align-items-center p-0">
        {hashtags.map((tag: any, index: any) => {
          return(
            <li key={tag.id} className="d-flex position-relative">
              <input onChange={(e) => handleTagEdit(e, index)} onKeyDown={(e) => noSpace(e)} type="text" defaultValue={`#${tag.title}`}/>
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

export default EditingSidebar