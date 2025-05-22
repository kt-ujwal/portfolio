import React from 'react';
import '../stylesheets/carousel.css';

function Carousel() {
  const logos = [
    'python',
    'aws',
    'java',
    'springboot',
    'netcore',
    'csharp',
    'javascript',
    'typescript',
    'react',
    'angular',
    'docker',
    'postgres',
    'kubernetes',
    'kafka',
    'mongodb',
    'graphql',
  ];

  return (
    <div className="carousel-wrapper">
      <h2 className="carousel-title vt323-regular">Technologies I use</h2>

      <div className="logo-strip">
        {[...logos, ...logos].map((name, idx) => (
          <picture key={idx}>
            <source
              srcSet={`../../assets/gallery/${name}.webp`}
              type="image/webp"
            />
            <img
              src={`../../assets/gallery/${name}.png`}
              alt={name}
              className="tech-logo"
            />
          </picture>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
