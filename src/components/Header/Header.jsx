import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import Container from "../Container/Container";

import styles from './Header.module.scss';

function Header() {

  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const ToggleClass = () => {
    setNavOpen(!navOpen); 
  };

  const closeNav = () => {
    setNavOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <header className={`${styles.header}`}> 
        <Container>
            <div className={styles.headerInner}>

                <div className={styles.headerLogo}>
                    <Link to="/">
                        <h1 className={styles.logo}>TravelGallery</h1>
                    </Link>
                </div>

                <nav className={`${styles.nav} ${navOpen ? styles.active : ""}`}  aria-label="Main Navigation">
                    <ul className={styles.navList}>
                        <li>
                        <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')} end onClick={closeNav}>
                            Home
                        </NavLink>
                        </li>

                        <li>
                        <NavLink to="/gallery" className={({ isActive }) => `${isActive ? styles.active : ''}`} onClick={closeNav}>
                            Gallery
                        </NavLink>
                        </li>

                        <li>
                        <NavLink to="/gallery-categories" className={({ isActive }) => `${isActive ? styles.active : ''}`} onClick={closeNav}>
                            Visited countries
                        </NavLink>
                        </li>
        
                        <li>
                        <NavLink to="/contact" className={({ isActive }) => `${isActive ? styles.active : ''}`} onClick={closeNav}>
                            Contact
                        </NavLink>
                        </li>
                    </ul>
                </nav>

                {/* Mobile Nav Bar*/}
                <button className={styles.menuButton} aria-label="Toggle Menu" onClick={ToggleClass}>
                    <div className={`${styles.menuIcon} ${navOpen ? styles.menuIconClose : ""}`}>
                        <div className={styles.menuIconMiddle}></div>
                    </div>
                </button>

            </div>
        </Container>
    </header>
  );
}

export default Header;
