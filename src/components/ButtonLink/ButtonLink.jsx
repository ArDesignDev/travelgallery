import styles from './ButtonLink.module.scss';

const ButtonLink = ({ href, children, icon: Icon, className = '', ariaLabel }) => {
    return (
      <a
        href={href}
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={`${styles.buttonLink} ${className}`}
      >
        {children} {Icon && <Icon />}
      </a>
    );
  };
  
export default ButtonLink;