import { useRef } from "react"

const Blog = () => {
  const postRefs = useRef<any>([])
  const addToPosts = (el: HTMLLIElement) => {
    if (el && !postRefs.current.includes(el)) {
      postRefs.current.push(el)
    }
  }
  let currentSelected = 0
  const leftArrow = useRef<any>(null)
  const rightArrow = useRef<any>(null)
  const rightClick = () => {
    if (rightArrow.current.style.opacity === '0') return;
    if (currentSelected < postRefs.current.length - 3) {
      postRefs.current[currentSelected].classList.remove('first-li')
      postRefs.current[currentSelected].style.left = '-31%'
      postRefs.current[currentSelected + 1].classList.add('first-li')
      postRefs.current[currentSelected + 1].style.left = '0%'
      postRefs.current[currentSelected + 2].style.left = '39%'
      postRefs.current[currentSelected + 3].style.left = '70%'
    } else if (currentSelected === postRefs.current.length - 3) {
      postRefs.current[currentSelected + 1].style.left = '31%'
    } else if (currentSelected === postRefs.current.length - 2) {
      postRefs.current[currentSelected + 1].style.left = '62%'
    }
    postRefs.current[currentSelected].classList.remove('first-li')
    postRefs.current[currentSelected + 1].classList.add('first-li')
    currentSelected += 1
    if (currentSelected === postRefs.current.length - 1) {
      rightArrow.current.style.opacity = '0'
      rightArrow.current.style.cursor = 'default'
    } 
    if (currentSelected != 0) {
      leftArrow.current.style.opacity = '1'
      leftArrow.current.style.cursor = 'pointer'
    }

  }
  const leftClick = () => {
    if (leftArrow.current.style.opacity === '0') return;
    if (currentSelected <= postRefs.current.length - 3) {
      postRefs.current[currentSelected].style.left = '39%'
      postRefs.current[currentSelected + 1].style.left = '70%'
      postRefs.current[currentSelected + 2].style.left = '101%'
      postRefs.current[currentSelected - 1].style.left = '0%'
    } else if (currentSelected === postRefs.current.length - 1) {
      postRefs.current[currentSelected].style.left = '70%'
    } else if (currentSelected === postRefs.current.length - 2) {
      postRefs.current[currentSelected].style.left = '39%'
    }
    postRefs.current[currentSelected].classList.remove('first-li')
    postRefs.current[currentSelected - 1].classList.add('first-li')
    currentSelected -= 1
    if (currentSelected === 0) {
      leftArrow.current.style.opacity = '0'
      leftArrow.current.style.cursor = 'default'
    }
    if (currentSelected != postRefs.current.length - 3) {
      rightArrow.current.style.opacity = '1'
      rightArrow.current.style.cursor = 'pointer'
    }
  }
  return (
    <div className="blog-page">
      <section className="blog">
          <h1>Best from the blog</h1>
          <div className="bloglist-container">
            <ul>
              <li style={{left: '0%'}} ref={addToPosts} className="first-li">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/The_Leaning_Tower_of_Pisa_SB.jpeg/1200px-The_Leaning_Tower_of_Pisa_SB.jpeg" alt="" />
                <div className="post-title">
                  <h3>Leaning Tower 1</h3>
                </div>
              </li>
              <li style={{left: '39%'}} ref={addToPosts}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/The_Leaning_Tower_of_Pisa_SB.jpeg/1200px-The_Leaning_Tower_of_Pisa_SB.jpeg" alt="" />
                <div className="post-title">
                  <h3>Leaning Tower 2</h3>
                </div>
              </li>
              <li style={{left: '70%'}} ref={addToPosts}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/The_Leaning_Tower_of_Pisa_SB.jpeg/1200px-The_Leaning_Tower_of_Pisa_SB.jpeg" alt="" />
                <div className="post-title">
                  <h3>Leaning Tower 3</h3>
                </div>
              </li>
              <li style={{left: '101%'}} ref={addToPosts}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/The_Leaning_Tower_of_Pisa_SB.jpeg/1200px-The_Leaning_Tower_of_Pisa_SB.jpeg" alt="" />
                <div className="post-title">
                  <h3>Leaning Tower 4</h3>
                </div>
              </li>
              <li style={{left: '101%'}} ref={addToPosts}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/The_Leaning_Tower_of_Pisa_SB.jpeg/1200px-The_Leaning_Tower_of_Pisa_SB.jpeg" alt="" />
                <div className="post-title">
                  <h3>Leaning Tower 5</h3>
                </div>
              </li>
              <li style={{left: '101%'}} ref={addToPosts}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/The_Leaning_Tower_of_Pisa_SB.jpeg/1200px-The_Leaning_Tower_of_Pisa_SB.jpeg" alt="" />
                <div className="post-title">
                  <h3>Leaning Tower 6</h3>
                </div>
              </li>
              <li style={{left: '101%'}} ref={addToPosts}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/The_Leaning_Tower_of_Pisa_SB.jpeg/1200px-The_Leaning_Tower_of_Pisa_SB.jpeg" alt="" />
                <div className="post-title">
                  <h3>Leaning Tower 7</h3>
                </div>
              </li>
              <li style={{left: '101%'}} ref={addToPosts}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/The_Leaning_Tower_of_Pisa_SB.jpeg/1200px-The_Leaning_Tower_of_Pisa_SB.jpeg" alt="" />
                <div className="post-title">
                  <h3>Leaning Tower 8</h3>
                </div>
              </li>
              <li style={{left: '101%'}} ref={addToPosts}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/The_Leaning_Tower_of_Pisa_SB.jpeg/1200px-The_Leaning_Tower_of_Pisa_SB.jpeg" alt="" />
                <div className="post-title">
                  <h3>Leaning Tower 9</h3>
                </div>
              </li>
            </ul>
            <div className="blog-control position-absolute">
              <i ref={leftArrow} style={{ opacity: '0', cursor: 'default' }} onClick={() => leftClick()} className="bi bi-arrow-left-circle h3"></i>
              <i ref={rightArrow} style={{ cursor: 'pointer' }} onClick={() => rightClick()} className="bi bi-arrow-right-circle h3"></i>
            </div>
          </div>
          <p className="post-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero mollitia saepe necessitatibus veritatis id quam porro excepturi accusamus et sunt sit placeat, vel deserunt, voluptates voluptatem eaque, totam dicta ratione!</p>
        </section>
    </div>
  )
}

export default Blog