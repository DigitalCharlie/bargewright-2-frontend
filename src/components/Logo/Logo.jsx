import styles from './Logo.module.css';

export default function Logo() {
return (
  <div className={styles.logo}>
	  <div className={styles.small}>The</div>
	  <div className={styles.big}>Bargewright</div>
	  <div className={styles.small}>Inn</div>
  </div>
);
}