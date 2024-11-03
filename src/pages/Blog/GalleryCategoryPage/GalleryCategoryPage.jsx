import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './GalleryCategoryPage.module.scss';
import { Helmet } from 'react-helmet';

import { URL } from '../../../components/constants';
import Container from '../../../components/Container/Container';
import HeaderBanner from '../../../components/HeaderBanner/HeaderBanner';
import CategoryList from '../../../components/CategoryList/CategoryList';

function GalleryCategoryPage() {
  const { slug } = useParams(); // Get category slug from the URL

  // State for category data
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const perPage = 6; // Number of posts per page
  const [loading, setLoading] = useState(true);

  // Fetch category data by slug
  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${URL}/wp-json/wp/v2/gallery_category?slug=${slug}`);
        const data = await response.json();
        
        // Since fetching by slug returns an array, take the first item
        if (data.length > 0) {
          setCategory(data[0]);
        } else {
          console.error('Category not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching category data:', error);
        setLoading(false);
      }
    };
    fetchCategoryData();
  }, [slug]);

  // Fetch posts for the category
  useEffect(() => {
    if (category?.id) { // Fetch posts only after category data is loaded
      const fetchPosts = async () => {
        const postsUrl = `${URL}/wp-json/wp/v2/gallery?_embed=true&gallery_category=${category.id}&per_page=${perPage}`;
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
    }
  }, [category]);

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
      {loading ? (
        <Container>
          <div>Loading...</div>
        </Container>
      ) : (
        <div className={styles.main}>
          <Container>
            <div className={`${styles.archiveList} row`}>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post.id} className={`${styles.archiveItem} col-sm-4`}>
                    <Link to={`/gallery/${post.slug}`} className={styles.postLink}>
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
                <p>Content coming soon!</p> 
              )}
            </div>
          </Container>
        </div>
      )
      }

    </main>
  );
}

export default GalleryCategoryPage;
