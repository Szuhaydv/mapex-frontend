import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer id="#footer" className="d-flex">
      <div className="logo-container d-flex flex-column">
        <img src="https://cdn-icons-png.flaticon.com/128/3192/3192970.png" alt="Logo image" />
        <h2>Mapex</h2>
        <p>© 2024 Szuhay Dávid. All rights reserved.</p>
      </div>
      <div className="footer-navigation d-flex justify-content-evenly">
        <div className="home-navigation">
          <a href="#home">Home</a>
          <a href="#popular-pinmaps">Popular Pinmaps</a>
          <a href="#blog-contact">Blog Intro / Contact</a>
          <a href="#pricing">Pricing</a>
          <a href="#footer">Footer</a>
        </div>
        <div className="site-navigation">
          <Link to='/explore'>Explore</Link>
          <Link to='/blog'>Blog</Link>
          <Link to='/mymaps'>My Maps</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer