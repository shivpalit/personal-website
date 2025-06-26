import React, { Component } from "react";
import Fade from "react-reveal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const cardStyle = {
  height: '350px',  // Increased fixed height to accommodate all elements
  width: '275px',
  margin: '10px auto',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: 'white',
  position: 'relative',  // For absolute positioning of children
  borderRadius: '10px'
};

const imageStyle = {
  width: '200px',
  height: '175px',
  objectFit: 'cover',
  objectPosition: 'top center',
  position: 'absolute',
  left: '50%',  // Position left edge at center
  transform: 'translateX(-50%)',  // Shift back by half width
  top: '20px',  // Fixed distance from top
  borderRadius: '10px'
};

const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const titleStyle = {
  position: 'absolute',
  top: '200px',
  width: '90%',
  textAlign: 'center',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  left: '50%',
  transform: 'translateX(-50%)'
};

const descriptionStyle = {
  position: 'absolute',
  top: '230px',
  width: '90%',
  textAlign: 'center',
  fontSize: '1.0rem',
  maxHeight: '150px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 5,
  WebkitBoxOrient: 'vertical',
  left: '50%',
  transform: 'translateX(-50%)',
  lineHeight: '1.5'
};

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    // Fetch GitHub repos when component mounts
    const apiUrl = process.env.NODE_ENV === 'production'
      ? '/api/gh-repos'
      : 'http://localhost:80/api/gh-repos';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'shivpalit' })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          repos: data.repos,
          loading: false
        });
      })
      .catch(error => {
        console.error('Error fetching repos:', error);
        this.setState({
          error: 'Failed to load repositories',
          loading: false
        });
      });
  }

  render() {
    const { repos, loading, error } = this.state;

    if (loading) return <div>Loading repositories...</div>;
    if (error) return <div>{error}</div>;

    const projects = repos.map((repo, index) => {
      const projectImage = `images/portfolio/${repo.name}.jpg`;
      const fallbackImage = `images/portfolio/github.jpg`;
    
      return (
        <div key={index} className="columns portfolio-item">
          <div className="item-wrap" style={cardStyle}>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit', width: '100%', height: '100%' }}
            >
              <img
                alt={repo.clean_name}
                src={projectImage}
                style={imageStyle}
                onError={e => {
                  // prevent infinite loop if fallback also fails
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallbackImage;
                }}
              />
              <div style={titleStyle}>{repo.clean_name}</div>
              <div style={descriptionStyle}>
                {repo.description || 'No description available'}
              </div>
            </a>
          </div>
        </div>
      );
    });

    return (
      <section id="portfolio">
        <Fade left duration={1000} distance="40px">
          <div className="row">
            <div className="twelve columns collapsed">
              <h1>Check out some of my work on GitHub</h1>
              
              <div style={{ padding: '20px 40px' }}>
                <Slider {...carouselSettings}>
                  {projects}
                </Slider>
              </div>
            </div>
          </div>
        </Fade>
      </section>
    );
  }
}

export default Portfolio;
