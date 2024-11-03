import React, { useEffect } from 'react';
import Container from '../../../components/Container/Container';
import ButtonLink from '../../../components/ButtonLink/ButtonLink';
import styles from '../Home.module.scss';

const Hero = ({ video, subtitle, title, buttonText }) => {
  useEffect(() => {
    // Calculate viewport height and set --vh CSS variable
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    // Initial setting of --vh
    setVh();

    // Update --vh on resize
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <div className={styles.hero}>
      {video && (
        <figure className={styles.heroVideoContainer}>
          <video 
            autoPlay 
            loop 
            muted 
            src={video}
            playsInline 
            className={styles.heroVideo}
          ></video>
        </figure>
      )}
      <div className={styles.heroText}>
        <Container>
          <p>{subtitle}</p>
          <h1>{title}</h1>
          {buttonText && (
            <ButtonLink
              href="/gallery"
              className={styles.heroButton}
              ariaLabel="My CV"
            >
              {buttonText}
            </ButtonLink>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Hero;
