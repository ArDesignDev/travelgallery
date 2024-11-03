import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import styles from '../Home.module.scss';
import Container from '../../../components/Container/Container';

import { URL } from '../../../components/constants';

function Favourites({title, subtitle, description}) {

  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const galleryApiUrl = `${URL}/wp-json/wp/v2/gallery?per_page=4&_embed=true&gallery_category=45`;

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await fetch(galleryApiUrl);
        const data = await response.json();

        // Map to include ACF fields if present
        const enrichedGalleryItems = data.map(item => ({
          ...item,
          gallerySmallImage: item.acf?.gallery_small_image || '', // Safely access ACF fields
          galleryDate: item.acf?.gallery_date || ''
        }));

        setGalleryItems(enrichedGalleryItems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching gallery items:', error);
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <section className={styles.favourites}>
      <Container mini>
        <div className={styles.favouritesHeader}>
          <h3>{subtitle}</h3>
          <h2>{title}</h2>
          <div className={styles.favouritesDesc} dangerouslySetInnerHTML={{ __html: description }} />
        </div>

        <div className={`${styles.galleryList} row`}>
          {galleryItems.map((item) => (
            <div key={item.id} className={`${styles.galleryItem} col-sm-6`}>
              {item.gallerySmallImage ? (
                <figure className={styles.galleryImg}>
                  <Link to={`/gallery/${item.slug}`}>
                    <img src={item.gallerySmallImage} alt={item.title.rendered} />
                  </Link>
                </figure>
              ) : (
                item._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                  <figure className={styles.galleryImg}>
                    <Link to={`/gallery/${item.slug}`}>
                      <img src={item._embedded['wp:featuredmedia'][0].source_url} alt={item.title.rendered} />
                    </Link>
                  </figure>
                )
              )}
              <h3>{item.title.rendered}</h3>
              {item.galleryDate && <p className={styles.galleryDate}>{item.galleryDate}</p>}
              <div dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }} className={styles.excerpt} />
              {/*<Link to={`/gallery/${item.id}`} className="btn">See More</Link> */}
            </div>
          ))}
        </div>

        <Link to="/gallery" className={`btn ${styles.btnAll}`}>See All Galleries</Link>
      </Container>
    </section>
  );
}

export default Favourites;
