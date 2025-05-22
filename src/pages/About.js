import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  FiArrowUpCircle,
  FiDownload,
  FiCpu,
  FiFolder,
} from 'react-icons/fi';

import Header   from '../component/Header';
import Carousel from '../component/Carousel';
import '../stylesheets/about.css';

function FloatingArrow({ onClick }) {
  return createPortal(
    <button className="up-arrow" onClick={onClick} aria-label="Up / back">
      <FiArrowUpCircle />
    </button>,
    document.body
  );
}

function About() {
  const [showStack, setShowStack]   = useState(false);    // tech-stack toggle
  const [leavingHome, setLeavingHome] = useState(false);  // slide-down to Home
  const [leavingProjects, setLeavingProjects] = useState(false);
  const navigate = useNavigate();

  const stackWrapperRef = useRef(null);

  useEffect(() => {
    if (showStack && stackWrapperRef.current) {
      const y = stackWrapperRef.current.offsetTop - 16;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [showStack]);

  const goProjects = () => {
    setLeavingProjects(true);
    setTimeout(
      () => navigate('/projects', { state:{ fromAbout:true } }),
      450           /* match .about-up animation */
    );
  };

  const handleArrow = () => {
    if (showStack) {
      setShowStack(false);           // collapse carousel
    } else {
      setLeavingHome(true);          // slide back to Home
      setTimeout(() => navigate('/'), 450);
    }
  };

  return (
    <>
     <Helmet>
        <title>Ujwal Kaluvakolanu Thyagarajan</title>
        <link rel="canonical" href="https://ujwalkaluvakolanuthyagarajan.com/" />
      </Helmet>
      <Header />

      {/* slide-down panel when leaving to Home */}
      {leavingHome && <div className="about-down" />}

      <section
        className="introduction flex-with-center"
        style={{
          /* WebP first, PNG fallback */
          backgroundImage: `image-set(
            url('./assets/office1.webp') type('image/webp'),
            url('./assets/office1.png')  type('image/png')
          )`,
          backgroundPosition: 'bottom center',
        }}
      >
        <div className="about-container">
        <picture>
            <source
              srcSet="/assets/ujwal office redone.webp"
              type="image/webp"
            />
          <img
            className="about-gif"
            src="/assets/ujwal office redone.gif"
            alt="pixel Ujwal"
          />
          </picture>

          <div className="typewriter vt323-regular font-bold">
            <p>Hi there 👋, I’m <strong>Ujwal Kaluvakolanu Thyagarajan</strong>,</p>
            <p>a software engineer and AI researcher wrapping up my M.S. in Computer Science (4.0 GPA) at UC Davis.</p>
            <p>Previously, I spent three years at Deloitte building scalable systems using AWS, Python, Java, and C#.</p>
            <p>Currently, I work at the VIDi lab on full-stack development, generative AI, and explainable AI—where research meets real-world impact.</p>
            <p>I enjoy architecting low-latency, large-scale systems that simplify complex workflows and enhance user experience.</p>
            <p>When I’m not coding, you’ll find me sketching system designs, exploring new hobbies, or brewing coffee-fueled ideas ☕️.</p>
          </div>

          <div className="about-buttons font-bold">
            <a
              className="about-btn"
              href="/assets/Ujwal_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiDownload /> Resume
            </a>

            <button
              className="about-btn font-bold"
              onClick={() => setShowStack(p => !p)}
            >
              <FiCpu style={{ transform: 'scaleX(-1)' }} /> Tech Stack
            </button>

            <Link className="about-btn" onClick={goProjects}>
              <FiFolder /> Projects
            </Link>
          </div>
        </div>
      </section>

      {showStack && (
        <div ref={stackWrapperRef} className="stack-wrapper">
          <Carousel />
        </div>
      )}

      <FloatingArrow onClick={handleArrow} />

      {leavingProjects && <div className="about-up" />}
    </>
  );
}

export default About;
