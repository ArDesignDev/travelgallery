// HeaderBanner.js
import React, { useState } from 'react';
import styles from './HeaderBanner.module.scss';

function HeaderBanner({ image, title, description, onImageLoad }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    if (onImageLoad) onImageLoad(); // Notify parent component
  };

  return (
    <div className={`${styles.header} ${imageLoaded ? styles.fadeIn : styles.hidden}`}>
      <figure className={styles.headerImageWrapper}>
        {image && (
          <img
            className={styles.headerImage}
            src={image}
            alt={title || 'Banner'}
            onLoad={handleImageLoad}
          />
        )}
      </figure>
      <div className={styles.headerContent}>
        <h1 className={styles.headerTitle}>{title || ''}</h1>
        {description && (
          <div
            className={styles.headerDesc}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>
    </div>
  );
}

export default HeaderBanner;
