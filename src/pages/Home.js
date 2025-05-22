import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../component/Header';
import '../stylesheets/home.css';

function Home() {
  const navigate             = useNavigate();
  const [leaving, setLeaving] = useState(false);

  const handleKnowMore = () => {
    setLeaving(true);
    setTimeout(() => navigate('/about'), 450);   // matches panel-up anim
  };

  return (
    <>
    <Helmet>
        <title>Ujwal Kaluvakolanu Thyagarajan</title>
        <link rel="canonical" href="https://ujwalkaluvakolanuthyagarajan.com/" />
      </Helmet>
      <Header />
      {leaving && <div className="panel-up" />}

      <section
        className="introduction flex-with-center"
        /* hero background: WebP first */
        style={{
          backgroundImage: `image-set(
            url('./assets/Home.webp') type('image/webp'),
            url('./assets/Home.jpeg') type('image/jpeg')
          )`,
        }}
      >
        <div>
          <h1 className="vt323-regular">Ujwal</h1>
          <h1 className="vt323-regular">Kaluvakolanu&nbsp;Thyagarajan</h1>

          <div className="intro-content d-flex justify-content-between">
            <p className="font-bold">
              Software&nbsp;Engineer<br />
              Distributed&nbsp;Systems&nbsp;|&nbsp;GenAI&nbsp;|&nbsp;AIML
            </p>

            <div className="home-buttons">
              <a
                href="/assets/Ujwal_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="primary-button resume-btn"
              >
                Resume
              </a>

              <button
                className="primary-button"
                onClick={handleKnowMore}
              >
                Know&nbsp;More
              </button>
            </div>
          </div>

          {/* avatar: WebP first, GIF fallback — .hello-gif class on <img> */}
          <picture>
            <source
              srcSet="/assets/Hello Ujwal GIF.webp"
              type="image/webp"
            />
            <img
              className="hello-gif"
              src="/assets/Hello Ujwal GIF.gif"
              alt="pixel Ujwal waving"
              loading="lazy"
            />
          </picture>
        </div>
      </section>
    </>
  );
}

export default Home;
