import { useEffect, useRef } from "react";

const BlogContact = () => {
  const copyText = useRef<any>(null)
  const successMessage = useRef<any>(null)
  const copyTextfunction = () => {
    navigator.clipboard.writeText(copyText.current.innerText)
    successMessage.current.style.animation = 'disappear 2s forwards'
  }
  const handleAnimationEnd = () => {
    successMessage.current.style.animation = 'none'
  }
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  }, []);
  const postRefs = useRef<any>([])
  const addToPosts = (el: any) => {
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
    <div className="blog-contact" id="blog-contact">
        <div className="divider position-absolute"></div>
        <section className="blog">
          <h1>Best from the blog</h1>
          <div className="bloglist-container">
            <ul>
              <li style={{left: '0%'}} ref={addToPosts} className="first-li">
                <img src="https://www.familyadventureproject.org/wp-content/uploads/2012/12/IMG_5116.jpg" alt="" />
                <div className="post-title">
                  <h3>Europe's beauty</h3>
                </div>
              </li>
              <li style={{left: '39%'}} ref={addToPosts}>
                <img src="https://www.celebritycruises.com/blog/content/uploads/2022/01/famous-landmarks-in-paris-arc-de-triomphe-hero.jpg" alt="" />
                <div className="post-title">
                  <h3>Hidden Locations</h3>
                </div>
              </li>
              <li style={{left: '70%'}} ref={addToPosts}>
                <img src="https://hips.hearstapps.com/elledecor/assets/16/25/american-landmarks-mount-rushmore_1.jpg" alt="" />
                <div className="post-title">
                  <h3>Exploring history</h3>
                </div>
              </li>
              <li style={{left: '101%'}} ref={addToPosts}>
                <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/453150473.jpg?k=af2b803c6c7ec968294f630af37d64bfbf36ee5d570ca0979c50333388ed7919&o=&hp=1" alt="" />
                <div className="post-title">
                  <h3>Luxury Hotels</h3>
                </div>
              </li>
              <li style={{left: '101%'}} ref={addToPosts}>
                <img src="https://www.familyadventureproject.org/wp-content/uploads/2012/12/IMG_5116.jpg" alt="" />
                <div className="post-title">
                  <h3>Sample 5</h3>
                </div>
              </li>
              <li style={{left: '101%'}} ref={addToPosts}>
                <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/453150473.jpg?k=af2b803c6c7ec968294f630af37d64bfbf36ee5d570ca0979c50333388ed7919&o=&hp=1" alt="" />
                <div className="post-title">
                  <h3>Sample 6</h3>
                </div>
              </li>
              <li style={{left: '101%'}} ref={addToPosts}>
                <img src="https://hips.hearstapps.com/elledecor/assets/16/25/american-landmarks-mount-rushmore_1.jpg" alt="" />
                <div className="post-title">
                  <h3>Sample 7</h3>
                </div>
              </li>
              <li style={{left: '101%'}} ref={addToPosts}>
                <img src="https://www.celebritycruises.com/blog/content/uploads/2022/01/famous-landmarks-in-paris-arc-de-triomphe-hero.jpg" alt="" />
                <div className="post-title">
                  <h3>Sample 8</h3>
                </div>
              </li>
              <li style={{left: '101%'}} ref={addToPosts}>
                <img src="https://www.familyadventureproject.org/wp-content/uploads/2012/12/IMG_5116.jpg" alt="" />
                <div className="post-title">
                  <h3>Sample 9</h3>
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
        <section className="contact-form">
            <h1>Contact</h1>
            <form>
              <p>You can contact us through email and <br /> we will get back to you in 24 hours</p>
              <div onAnimationEnd={handleAnimationEnd} onClick={() => copyTextfunction()} className="email position-relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                </svg>
                <p ref={copyText}>xezamewebsite@gmail.com</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-copy" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                </svg>
                <div ref={successMessage} className="copy-success-message position-absolute">Copied!</div>
              </div>
              <p className="grey-text">– OR DIRECTLY –</p>
              <input className="name-input" type="text" placeholder="Name"/>
              <input className="email-input" type="email" placeholder="E-mail"/>
              <textarea onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
          e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
        }} ref={textAreaRef} className="text-input" placeholder="Message"></textarea>
              <button onClick={(e) => e.preventDefault()} className="contact-button">Submit</button>
            </form>
            
        </section>
    </div>
  )
}

export default BlogContact