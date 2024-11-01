import React, { useEffect, useState } from 'react';
import styles from './Contact.module.scss';
import { URL } from '../../components/constants';

import HeaderBanner from "../../components/HeaderBanner/HeaderBanner";
import ContactForm from "../../components/ContactForm/ContactForm";

function Contact() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const pageID = 1245; // ID of the contact page

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
    <main className={styles.contact}>
 
        <HeaderBanner
          title={pageData?.acf?.contact_title || ""}
          description={pageData?.acf?.contact_description || ""}
        />
  
      <div className={styles.contactInner}>
        <div className={styles.contactForm}>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}

export default Contact;
