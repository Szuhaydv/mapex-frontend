import axios from "axios"
import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import Spinner from "../components/Spinner"

const Explore = (props: LoadingInterface) => {
  const loading = props.value.loading
  const setLoading = props.value.setLoading
  const [exploreMaps, setExploreMaps] = useState([])
  const [hashtags, setHashtags] = useState<string[]>([])
  const [filteredExploreMaps, setFilteredExploreMaps] = useState([])
  const searchbarRef = useRef<HTMLInputElement>(null)
  const hashtagRefs = useRef<HTMLParagraphElement[]>([])
  const addToHashtagRefs = (e: HTMLParagraphElement) => {
    if (e && !hashtagRefs.current.includes(e)) {
      hashtagRefs.current.push(e)
    }
  }
  const pinsRef = useRef<HTMLHeadingElement>(null)
  const likesRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    setLoading(true)
    axios
      .get('https://mapex-backend.onrender.com/api/explore')
        .then((res) => {
          setExploreMaps(res.data.data)
          setFilteredExploreMaps(res.data.data)
          let tempArray: string[] = []
          res.data.data.forEach((map: MapInterface) => {
            if (map.tags) {
              map.tags.forEach((tag: string) => {
                tempArray = [...tempArray, tag]
              })
            }
          })
          const finalArray: string[] = [...new Set(tempArray)]
          setHashtags(finalArray)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }
  const handleSearch = () => {
    if (searchbarRef.current != null) {
      const filterFunction = (map: MapInterface) => {
        if (searchbarRef.current) {
          map.title.toLowerCase().includes(searchbarRef.current.value.toLowerCase())
        }
      }
      const tempArray = exploreMaps.filter(filterFunction)
      setFilteredExploreMaps(tempArray)
      searchbarRef.current.value = "" 
    }
  }
  const handleReset = () => {
    setFilteredExploreMaps(exploreMaps)
  }
  const [selectedTag, setSelectedTag] = useState(-1)
  const selectTag = (index: number) => {
    if (index === selectedTag) {
      hashtagRefs.current[index].classList.remove('selected-tag')
      setSelectedTag(-1)
      return
    }
    if (selectedTag != -1) {
      hashtagRefs.current[selectedTag].classList.remove('selected-tag')
    }
    hashtagRefs.current[index].classList.add('selected-tag')
    setSelectedTag(index)
  }
  const [pinsLikesUntouched, setPinsLikesUntouched] = useState([true, true])
  const likesInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (likesRef.current) {
      likesRef.current.innerText = e.target.value
      setPinsLikesUntouched([pinsLikesUntouched[0], false])
    }
  }
  const pinsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (pinsRef.current) {
      pinsRef.current.innerText = e.target.value
      setPinsLikesUntouched([false, pinsLikesUntouched[1]])
    }
  }
  // const filterOptions = (map: any) => {
    
  //       (pinsLikesUntouched[0] ? true : map.landmarks.length > +pinsRef.current.innterText) &&
  //       (pinsLikesUntouched[1] ? true : map.numberOfLikes > +likesRef.current.innerText) &&
  //       (selectedTag != -1 ? map.tags.includes(hashtags[selectedTag]) : true)


  // }
  const handleFilteredSearch = () => {
    const tempArray = exploreMaps.filter((map: MapInterface) => {
      if (likesRef.current && pinsRef.current && map.numberOfLikes && map.tags) {
        return (pinsLikesUntouched[0] ? true : map.landmarks.length >= +pinsRef.current.innerHTML) &&
        (pinsLikesUntouched[1] ? true : map.numberOfLikes >= +likesRef.current.innerHTML) &&
        (selectedTag != -1 ? map.tags.includes(hashtags[selectedTag]) : true)
      }
    })
    setFilteredExploreMaps(tempArray)
  }
  return (
    <div className="explore-page">
      <div className="explore-sidebar position-relative">
        <div className="mymaps-sidebar-1"></div>
        <div className="mymaps-sidebar-2"></div>
        <div className="mymaps-sidebar-3"></div>
        <div className="explore-tags">
          <h3 className="actual-h3">Tags:</h3>
          <div className="hashtags">
            {hashtags.map((tag, index) => {
              return(
                <p ref={addToHashtagRefs} onClick={() => selectTag(index)} key={index} >#{tag}</p>
              )
            })}
          </div>
        </div>
        <div className="slider-container">
          <div className="d-flex">
            <h3 className="me-3 mb-3 actual-h3">Number of pins:</h3>
            <h3 ref={pinsRef}>5</h3>
          </div>
          <input onChange={(e) => pinsInputChange(e)} className="explore-slider mt-2" type="range" min="1" max="10" defaultValue="5"/>
        </div>
        <div className="slider-container">
          <div className="d-flex">
            <h3 className="me-3 mb-3 actual-h3">Number of likes:</h3>
            <h3 ref={likesRef}>10</h3>
          </div>
          <input onChange={(e) => likesInputChange(e)} className="explore-slider mt-2" type="range" min="1" max="20" defaultValue="10"/>
        </div>
        <button onClick={() => handleFilteredSearch()} className="explore-search start-50 btn btn-primary position-absolute">Search</button>
        </div>
      <div className="explore-content">
        <div className="input-container position-relative">
          <input ref={searchbarRef} onKeyDown={(e) => handleKeyDown(e)} onClick={(e) => console.log(e.target)} type="text" placeholder="Search" />
          <div className="search-icon"><i onClick={() => handleSearch()} className="bi bi-search h2 position-absolute"></i></div>
        </div>
        {loading ? 
          <Spinner/> :
          <ul className="explore-trending">
            {filteredExploreMaps.length === 0 ?
              <li className="outlier-li">
                <button onClick={() => handleReset()} className="btn btn-danger back-button"><i className="bi bi-arrow-counterclockwise"></i> Reset</button>
              </li> :
              filteredExploreMaps.map((map: MapInterface) => {
                if (map.tags) {
                  return(
                    <li key={map._id}>
                      <Link to={`/explore/${map._id}`} state={{map}}>
                        <img src={map.coverImage} alt="Map cover image" />
                        <div className='explore-map-info'>
                          <h3>{map.title}</h3>
                          <div className="tags">
                            {map.tags.map((tag: string, index: number) => {
                              return(
                                <p key={index}>#{tag}</p>
                              )
                            })}
                          </div>
                        </div>
                      </Link>
                    </li>
                  )
                }
              })
            }
          </ul>
        }
      </div>
    </div>
  )
}

export default Explore