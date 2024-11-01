import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Archive.module.scss';
import { Helmet } from 'react-helmet';

import { URL } from '../../../components/constants';
import Container from '../../../components/Container/Container';
import HeaderBanner from '../../../components/HeaderBanner/HeaderBanner';
import CategoryList from '../../../components/CategoryList/CategoryList';

function Archive() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [options, setOptions] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const perPage = 6;
  const optionsUrl = `${URL}/wp-json/mytheme/v1/options`;
  
  useEffect(() => {
    const fetchOptionsData = async () => {
      try {
        const response = await fetch(optionsUrl);
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error('Error fetching options data:', error);
      }
    };
    fetchOptionsData();
  }, []);

  const fetchPosts = async () => {
    const postsUrl = `${URL}/wp-json/wp/v2/gallery?_embed=true&page=${page}&per_page=${perPage}`;
    try {
      const response = await fetch(postsUrl);
      const data = await response.json();
      
      // Map to include ACF fields if present
      const enrichedPosts = data.map(post => ({
        ...post,
        gallerySmallImage: post.acf?.gallery_small_image || '', // Access ACF fields
        galleryDate: post.acf?.gallery_date || ''
      }));

      setPosts((prevPosts) => (page === 1 ? enrichedPosts : [...prevPosts, ...enrichedPosts]));
      setHasMore(data.length === perPage);
    } catch (error) {
      console.error('Error fetching gallery posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const loadMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <main className={`${styles.archive}`}>
      <Helmet>
          <title>My Gallery Collection | My Travel Blog</title>
          <meta name="description" content="Explore the world from my perspective." />
      </Helmet>

      <HeaderBanner
        image={options?.gallery_cover_image}
        title={options?.gallery_title}
        onImageLoad={() => setImageLoaded(true)}
      />

      <Container>
        <CategoryList />
      </Container>

  
        <div className={`${styles.main} ${styles.fadeIn}`}>
          <Container>
            <div
              className={styles.headerDesc}
              dangerouslySetInnerHTML={{ __html: options?.gallery_text || 'Loading description...' }}
            />

            <div className={`${styles.archiveList} row`}>
              {posts.map((post) => (
                <div key={post.id} className={`${styles.archiveItem} col-sm-4`}>
                  <Link to={`/gallery/${post.id}`} className={styles.postLink}>
                    <div className={styles.postImageWrapper}>
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
                    </div>
                    <h2 className={styles.archiveItemTitle}>{post.title.rendered}</h2>
                    {post.galleryDate && <p className={styles.galleryDate}>{post.galleryDate}</p>}
                    <p
                      className={styles.postExcerpt}
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                  </Link>
                </div>
              ))}
            </div>

            {hasMore && (
              <div className={styles.loadMore}>
                <button onClick={loadMorePosts} disabled={!hasMore} className="btn">
                  {hasMore ? 'Load More' : 'No More Posts'}
                </button>
              </div>
            )}
          </Container>
        </div>
      
    </main>
  );
}

export default Archive;
