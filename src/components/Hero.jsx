import React from 'react'
import './Hero.css'

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">Jane Doe</span>
          </h1>
          <h2 className="hero-subtitle">UX Designer</h2>
          <p className="hero-description">
            I create user-centered digital experiences that are both beautiful and functional.
            Passionate about solving complex problems through thoughtful design.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-secondary">Get In Touch</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
