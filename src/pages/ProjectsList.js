import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../component/Header';
import projectsdata from '../data/projectsdata';
import { FaGithub } from 'react-icons/fa';
import { FiLock, FiArrowUpCircle } from 'react-icons/fi';

import '../stylesheets/projects.css';

function ProjectsList() {
  const navigate  = useNavigate();
  const { state } = useLocation();

  const [entering, setEntering] = useState(!state?.fromHero);
  const [leaving,  setLeaving]  = useState(false);

  useEffect(() => {
    if (!entering) return;
    const id = setTimeout(() => setEntering(false), 450);
    return () => clearTimeout(id);
  }, [entering]);

  const backToProjectsHero = () => {
    setLeaving(true);
    setTimeout(
      () => navigate('/projects', { state:{ fromList:true } }),
      450
    );
  };

  return (
    <>
     <Helmet>
        <title>Ujwal Kaluvakolanu Thyagarajan</title>
        <link rel="canonical" href="https://ujwalkaluvakolanuthyagarajan.com/" />
      </Helmet>
      <Header />

      {entering && <div className="proj-up"   />}
      {leaving  && <div className="list-down" />}

      <div id="projects-grid" className="projects-grid board-bg">
        {!entering && projectsdata.map((p, idx) => (
          <div
            key={idx}
            className="note-card"
            title={p.openSource ? 'Open-source' : 'Closed-source'}
          >
            <div className="project-card">
              <picture>
                <source srcSet={p.imageWebp} type="image/webp" />
                <img src={p.image} alt={p.title} />
              </picture>

              <div className="project-info">
                <h3>{p.title}</h3>
                <p>{p.description}</p>

                <div className="overlay-buttons">
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn demo-btn"
                    >
                      Demo
                    </a>
                  )}

                  {p.openSource && p.repo ? (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn github-btn"
                      aria-label="GitHub repository"
                    >
                      <FaGithub />
                    </a>
                  ) : (
                    <span className="action-btn icon-btn disabled">
                      <FiLock />
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
         <picture>
            <source
              srcSet="/assets/ujwalwow.webp"
              type="image/webp"
            />
        <img
          className="project-gif"
          src="/assets/ujwalwow.gif"
          alt="pixel Ujwal wow"
        />
        </picture>
      </div>

      <button
        className="up-arrow"
        onClick={backToProjectsHero}
        aria-label="Back"
      >
        <FiArrowUpCircle />
      </button>
    </>
  );
}

export default ProjectsList;
