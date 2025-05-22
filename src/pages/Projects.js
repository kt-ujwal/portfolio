import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiArrowUpCircle } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import Header from '../component/Header';
import '../stylesheets/projects.css';

function Projects() {
  const navigate        = useNavigate();
  const { state }       = useLocation();

  const [entering,      setEntering]      = useState(
    !(state?.fromList || state?.fromAbout || state?.fromNav)
  );
  const [leavingAbout,  setLeavingAbout]  = useState(false);  // top→down
  const [leavingToList, setLeavingToList] = useState(false);  // bottom→up

  useEffect(() => {
    if (!entering) return;
    const id = setTimeout(() => setEntering(false), 450);
    return () => clearTimeout(id);
  }, [entering]);

  const goToList = () => {
    setLeavingToList(true);
    setTimeout(
      () => navigate('/projects/list', { state:{ fromHero:true } }),
      450                         /* matche .proj-up */
    );
  };

  const backToAbout = () => {
    setLeavingAbout(true);
    setTimeout(() => navigate('/about'), 600);  // matche .proj-down
  };

  return (
    <>
     <Helmet>
        <title>Ujwal Kaluvakolanu Thyagarajan</title>
        <link rel="canonical" href="https://ujwalkaluvakolanuthyagarajan.com/" />
      </Helmet>
      <Header />

      {entering      && <div className="proj-up"   />}
      {leavingToList && <div className="proj-up"   />}
      {leavingAbout  && <div className="proj-down" />}

      <section
        className="projects-hero"
        /* WebP first, PNG fallback */
        style={{
          backgroundImage: `image-set(
            url('./assets/brick wall.webp') type('image/webp'),
            url('./assets/brick wall.png')  type('image/png')
          )`,
        }}
      >
        <div className="blob">
        <picture>
            <source
              srcSet="/assets/rainy ujwal gif.webp"
              type="image/webp"
            />
          <img
            src="/assets/rainy ujwal gif.gif"
            alt="pixel Ujwal coding in the rain"
            className="hero-gif"
          />
          </picture>
          <div className="blob-inner">
            <p className="hero-tag vt323-regular">
              Explore&nbsp;Ujwal’s&nbsp;tech&nbsp;adventures!
            </p>

            <div className="hero-buttons">
              <button onClick={goToList} className="primary-button">
                View&nbsp;Projects
              </button>

              <a
                href="mailto:ujwal.kct@gmail.com"
                className="primary-button secondary"
              >
                Get&nbsp;in&nbsp;Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      <button
        className="up-arrow"
        onClick={backToAbout}
        aria-label="Back to About"
      >
        <FiArrowUpCircle />
      </button>
    </>
  );
}

export default Projects;
