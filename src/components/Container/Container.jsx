import styles from './Container.module.scss';

const Container = ({ children, wide, mini }) => {

  return (
    <div className={`${styles.container} ${wide ? styles.wide : ""} ${mini ? styles.mini : ""}`}>
      {children}
    </div>
  );
};

export default Container;