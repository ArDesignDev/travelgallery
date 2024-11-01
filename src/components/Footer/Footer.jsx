import styles from './Footer.module.scss';
import { Link, NavLink } from "react-router-dom";
import { LiaGlobeAmericasSolid, LiaInstagram, LiaEnvelope } from "react-icons/lia";

import Container from '../Container/Container';

function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerContent}>
          <div className={`row`}>

            <div className={`col-sm-4`}>
              <div className={styles.footerLogo}>
                <h3>MyTravelGallery</h3>
                <p>A collection of snapshots from my journeys around the world, capturing landscapes, cultures, and unforgettable experiences. Each photo tells a story—explore and be inspired.</p>
              </div>
            </div>

            <div className={`${styles.footerContact} col-sm-4`}>
              <h3>Connect</h3>
              <p>You can contact me for fun or for colaboration</p>
              <ul className={styles.footerContactList}>
                <li><Link to="mailto:arencof@gmail"><LiaEnvelope /> arencof@gmail</Link></li>
                <li><Link to="https://aljosarencof.com/" target="_blank" rel="noopener noreferrer"><LiaGlobeAmericasSolid /> aljosarencof.com</Link></li>
                <li><Link to="https://webplussolution.com/" target="_blank" rel="noopener noreferrer"><LiaGlobeAmericasSolid /> webplussolution.com </Link></li>
                <li><Link to="https://www.instagram.com/mytravelgallery/" target="_blank" rel="noopener noreferrer"><LiaInstagram /> Instagram</Link></li>
              </ul>
            </div>
          
            <div className={`col-sm-4`}>
              <div className={styles.footerNav}>
                <h3>Menu</h3>
                     <ul className={styles.navList}>
                        <li>
                        <NavLink to="/" >
                            Home
                        </NavLink>
                        </li>

                        <li>
                        <NavLink to="/gallery">
                            Gallery
                        </NavLink>
                        </li>

                        <li>
                        <NavLink to="/gallery-categories">
                            Visited countries
                        </NavLink>
                        </li>
        
                        <li>
                        <NavLink to="/contact">
                            Contact
                        </NavLink>
                        </li>
                    </ul>
              </div>
            </div>

        
        
          </div>
        </div>
        <div className={styles.footerBottom}>
          <div className="row">
            <div className="col-sm-6">
              <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>
            </div>
            <div className={`${styles.footerInfo} col-sm-6`}>
              <p className={styles.webLink}> <Link to="https://aljosarencof.com/" traget="_blank" aria-label="Send an email to arencof@gmail.com">aljosarencof.com</Link> </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer