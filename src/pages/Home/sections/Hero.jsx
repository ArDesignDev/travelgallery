import Container from '../../../components/Container/Container';
import ButtonLink from '../../../components/ButtonLink/ButtonLink';
import styles from '../Home.module.scss';

const Hero = ({ video, subtitle, title, buttonText }) => {
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
