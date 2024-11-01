import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './GalleryCategoryPage.module.scss';
import { Helmet } from 'react-helmet';

import { URL } from '../../../components/constants';
import Container from '../../../components/Container/Container';
import HeaderBanner from '../../../components/HeaderBanner/HeaderBanner';
import CategoryList from '../../../components/CategoryList/CategoryList';

function GalleryCategoryPage() {
  const { categoryId } = useParams(); // Get category ID from the URL

  // State for category data
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const perPage = 6; // Number of posts per page

  // Fetch category data
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch(`${URL}/wp-json/wp/v2/gallery_category/${categoryId}`);
        const data = await response.json();
        setCategory(data);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };
    fetchCategoryData();
  }, [categoryId]);

  // Fetch posts for the category
  useEffect(() => {
    const fetchPosts = async () => {
      const postsUrl = `${URL}/wp-json/wp/v2/gallery?_embed=true&gallery_category=${categoryId}&per_page=${perPage}`;
      try {
        const response = await fetch(postsUrl);
        const data = await response.json();
        
        // Map to include ACF fields if present
        const enrichedPosts = data.map(post => ({
          ...post,
          gallerySmallImage: post.acf?.gallery_small_image || '', // Access ACF fields
          galleryDate: post.acf?.gallery_date || ''
        }));

        setPosts(enrichedPosts);
      } catch (error) {
        console.error('Error fetching gallery posts:', error);
      }
    };
    fetchPosts();
  }, [categoryId]);

  return (
    <main className={styles.galleryCategory}>
      
      {category && (
      <Helmet>
          <title>{category?.name} | My Travel Blog</title>
          <meta name="description" content="Explore the world from my perspective." />
      </Helmet>
      )}

      <HeaderBanner
        image={category?.gallery_category_image}
        title={category?.name}
      />

      <Container>
        <CategoryList />
      </Container>

      {/* Main content showing posts in category */}
      <div className={styles.main}>
        <Container>
          <div className={`${styles.archiveList} row`}>
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className={`${styles.archiveItem} col-sm-4`}>
                  <Link to={`/gallery/${post.id}`} className={styles.postLink}>
                    <figure className={styles.postImage}>
                      {post.gallerySmallImage ? (
                        <img src={post.gallerySmallImage} alt={post.title.rendered} />
                      ) : (
                        post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                          <img
                            src={post._embedded['wp:featuredmedia'][0].source_url}
                            alt={post.title.rendered}
                          />
                        )
                      )}
                    </figure>
                    <h2 className={styles.archiveItemTitle}>{post.title.rendered}</h2>
                    {post.galleryDate && <p className={styles.galleryDate}>{post.galleryDate}</p>}
                    <p
                      className={styles.postExcerpt}
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                  </Link>
                </div>
              ))
            ) : (
              <p>No posts available in this category.</p> 
            )}
          </div>
        </Container>
      </div>
    </main>
  );
}

export default GalleryCategoryPage;
