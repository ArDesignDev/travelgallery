// components/CategoryList/CategoryList.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './CategoryList.module.scss';
import { URL } from '../constants';

function CategoryList() {
  const { categoryId } = useParams(); // Get category ID from the URL
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${URL}/wp-json/wp/v2/gallery_category`);
        const data = await response.json();
        setCategories(data.filter((category) => category.id !== 45)); // Filter out specific category
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className={styles.categoryListWrapper}>
      <div className={styles.categoryList}>
        <ul className={styles.categoryLinks}>
          {categories.map((category) => (
            <li
              key={category.id}
              className={`${styles.categoryItem} ${parseInt(categoryId) === category.id ? styles.active : ''}`}
            >
              <Link to={`/gallery-category/${category.id}`} className={styles.categoryLink}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoryList;
