import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './GalleryCategoryList.module.scss';
import { Helmet } from 'react-helmet';

import { URL } from '../../../components/constants';
import Container from '../../../components/Container/Container';
import HeaderBanner from '../../../components/HeaderBanner/HeaderBanner';

function GalleryCategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [headerData, setHeaderData] = useState(null); // State for ACF header data
  const [headerLoaded, setHeaderLoaded] = useState(false); // Track header load state

  // Fetch categories, excluding category with ID 45
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${URL}/wp-json/wp/v2/gallery_category`);
        const data = await response.json();
        const filteredCategories = data.filter(category => category.id !== 45);

        setCategories(filteredCategories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch ACF header data
  useEffect(() => {
    const fetchOptionsData = async () => {
      try {
        const response = await fetch(`${URL}/wp-json/mytheme/v1/options`);
        const data = await response.json();
        setHeaderData(data); // Set the ACF options data to headerData
        setHeaderLoaded(true); // Mark header as loaded
      } catch (error) {
        console.error('Error fetching options data:', error);
      }
    };

    fetchOptionsData();
  }, []);

  return (
    <div className={`${styles.categoryList}`}>

      <Helmet>
          <title>Visited Countries | My Travel Blog</title>
          <meta name="description" content="Explore the world from my perspective." />
      </Helmet>

      <HeaderBanner
        image={headerData?.gallery_cover_image}
        title={headerData?.countries_title || 'Visited Countries'}
      />

      {/* Main content displaying categories */}
      <Container>
        <div className={styles.main}>
          <ul className={`${styles.postList} row`}>
            {categories.map((category) => (
              <li key={category.id} className={`${styles.postItem} col-sm-3`}>
                <Link to={`/gallery-category/${category.slug}`} className={styles.categoryLink}>
                  {/* Display category image if available */}
                  {(category.gallery_category_image_small || category.gallery_category_image) && (
                    <figure className={styles.categoryImage}>
                      <img 
                        src={category.gallery_category_image_small || category.gallery_category_image} 
                        alt={category.name} 
                      />
                    </figure>
                  )}
                  <h2 className={styles.categoryName}>{category.name}</h2>
                  {/*
                  <p className={styles.categoryDescription}>{category.description}</p>
                  */}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}

export default GalleryCategoryList;
