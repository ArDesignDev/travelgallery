import styles from '../Home.module.scss';
import Container from '../../../components/Container/Container';

function About({title, image, description}) {
  return (
    <section className={styles.about} id='aboutUs'>
      <Container mini>
        <div className="row row-a-center">
            <div className="col-sm-5">
                <img className={styles.aboutImage} src={image} alt="About Us" />
            </div>
            <div className="col-sm-7">
                <div className={styles.aboutContent}>
                    <h2>{title}</h2>
                    <div className={styles.aboutDesc} dangerouslySetInnerHTML={{ __html: description }} />
                </div>
            </div>
        </div>
      </Container>
    </section>
  )
}

export default About