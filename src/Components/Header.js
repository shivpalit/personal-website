import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import Particles from "react-tsparticles";
import Fade from "react-reveal";
import chatbotStyles from './Chatbot/Chatbot.module.css';

class Header extends Component {

  render() {
    if (!this.props.data) return null;

    const linkedin = this.props.data.linkedin;
    const github = this.props.data.github;
    const name = this.props.data.name;
    const description = this.props.data.description;

    return (
      <header id="home" className="header-bg">

        <ParticlesBg color="#384fff" num={400} type="cobweb" bg={true}/>

        <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
            Show navigation
          </a>
          <a className="mobile-btn" href="#home" title="Hide navigation">
            Hide navigation
          </a>

          <ul id="nav" className="nav">
            <li className="current">
              <a className="smoothscroll" href="#home">
                Home
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#about">
                About
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#resume">
                Resume
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#portfolio">
                Works
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#contact">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className="row banner">
          <div className="banner-text">
            <Fade bottom>
              <h1 className="responsive-headline">{name}</h1>
            </Fade>
            <Fade bottom duration={1200}>
              <h3>{description}.</h3>
            </Fade>
            <hr />
            <Fade bottom duration={2000}>
              <ul className="social">
                <a href={linkedin} target="_blank" className="button btn project-btn" style={{width: '175px'}}>
                  <i className="fa fa-linkedin"></i>LinkedIn
                </a>
                <a href={github} target="_blank" className="button btn github-btn" style={{width: '175px'}}>
                  <i className="fa fa-github"></i>Github
                </a>
              </ul>
            </Fade>
            <Fade bottom duration={2000}>
              <ul>
              <a 
                className={`button btn ${chatbotStyles['assistant-button']}`}
                data-tooltip="Coming Soon!"
                onClick={this.props.setChatMinimized}
              >
                Assistant
              </a>
              </ul>
            </Fade>
          </div>
        </div>

        <p className="scrolldown">
          <a className="smoothscroll" href="#about">
            <i className="icon-down-circle"></i>
          </a>
        </p>
      </header>
    );
  }
}

export default Header;
