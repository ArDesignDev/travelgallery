import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import { URL } from '../../components/constants';
import Hero from './sections/Hero';
import About from './sections/About';
import Favourites from './sections/Favourites';
import GalleryCategories from './sections/GalleryCategories';

function Home() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const pageID = 500;

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch(`${URL}/wp-json/wp/v2/pages/${pageID}?_embed=true`);
        const data = await response.json();
        setPageData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching page data:', error);
        setLoading(false);
      }
    };

    fetchPageData();
  }, []);

  return (
    <main className={`${styles.home}`}>
        <Hero
          video={pageData?.acf?.hero_video}
          subtitle={pageData?.acf?.hero_subtitle}
          title={pageData?.acf?.hero_title}
          buttonText={pageData?.acf?.hero_button_text}
        />
      {!loading && pageData?.acf?.about_me && (
        <About 
          title={pageData.acf.about_me.title}
          image={pageData.acf.about_me.image}
          description={pageData.acf.about_me.description}
        />
      )}
      {!loading && pageData?.acf?.my_favourite && (
        <Favourites 
          title={pageData.acf.my_favourite.title}
          subtitle={pageData.acf.my_favourite.subtitle}
          description={pageData.acf.my_favourite.description}
        />
      )}
      {!loading && pageData?.acf?.categories && (
        <GalleryCategories 
          title={pageData.acf.categories.title}
          description={pageData.acf.categories.description}
        />
      )}
    </main>
  );
}

export default Home;
