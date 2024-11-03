import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './SinglePost.module.scss';
import { Helmet } from 'react-helmet';

import Container from '../../../components/Container/Container';
import { URL } from '../../../components/constants';
import HeaderBanner from '../../../components/HeaderBanner/HeaderBanner';

function SinglePost() {
  const { slug } = useParams(); // Fetch slug from URL
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Modify the URL to fetch by slug
  const postUrl = `${URL}/wp-json/wp/v2/gallery?slug=${slug}&_embed=true`;

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(postUrl);
        const data = await response.json();

        // Since fetching by slug returns an array, take the first item
        if (data.length > 0) {
          setPostData(data[0]);
        } else {
          console.error('Post not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post data:', error);
        setLoading(false);
      }
    };

    fetchPostData();
  }, [slug]);

  return (
    <article className={`${styles.singlePost}`}>
        {!loading && postData && (
          <Helmet>
            <title>{postData.title?.rendered} | My Travel Blog</title>
            <meta name="description" content={postData.acf?.gallery_description || "Explore the world from my perspective."} />
          </Helmet>
        )}

      <HeaderBanner
        image={postData?._embedded?.['wp:featuredmedia']?.[0]?.source_url}
        title={postData?.title?.rendered || ''}
      />

      <div className={`${styles.main} singlePost`}>
        <Container>
          {/* Display Date 
          {postData?.acf?.gallery_date && (
            <p className={styles.date}>Date: {postData.acf.gallery_date}</p>
          )}*/}

          {/* Display Custom Description Field */}
          {postData?.acf?.gallery_description && (
            <div className={styles.customDesc} dangerouslySetInnerHTML={{ __html: postData.acf.gallery_description }} />
          )}

          {/* Display Full Content */}
          <div dangerouslySetInnerHTML={{ __html: postData?.content?.rendered }} />
        </Container>
      </div>
      
    </article>
  );
}

export default SinglePost;
