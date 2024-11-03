import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import '../slick.scss';

// constants
import { URL } from '../../../components/constants';

import styles from '../Home.module.scss';
import Container from '../../../components/Container/Container';
import { NextArrow, PrevArrow } from './CustomArrow';

function GalleryCategories({ title, description }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${URL}/wp-json/wp/v2/gallery_category?_embed=true`);
        const data = await response.json();
        
        // Filter out category with ID 45 (Favourite)
        const filteredCategories = data.filter(category => category.id !== 45);
        
        setCategories(filteredCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    draggable: true,
    arrows: true,   
    swipeToSlide: true,
    touchThreshold: 10,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />, 
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '30px',
        }
      },
    ]
  };

  return (
    <section className={styles.categories}>

        <Container>
          <h2>{title}</h2>
          <div className={styles.categoriesDesc} dangerouslySetInnerHTML={{ __html: description }} />
        </Container>

        <Slider key={categories.length} {...settings} className={styles.categoryList}>
          {categories.map((category) => (
            <div key={category.id} className={styles.categoryItem}>
              <Link to={`/gallery-category/${category.slug}`} className={styles.categoryLink}>
               {(category.gallery_category_image_small || category.gallery_category_image) && (
                    <figure className={styles.categoryImage}>
                      <img 
                        src={category.gallery_category_image_small || category.gallery_category_image} 
                        alt={category.name} 
                      />
                    </figure>
                  )}
                <h3 className={styles.categoryTitle}>{category.name}</h3>
                {/* Optionally display category description 
                <p>{category.description}</p>
                */}
              </Link>
            </div>
          ))}
        </Slider>
      
    </section>
  );
}

export default GalleryCategories;
