import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.section}>
                        <h3>Amish Connection</h3>
                        <p>Handcrafted in the heart of Amish country.</p>
                    </div>
                    <div className={styles.section}>
                        <h4>Support</h4>
                        <p>Help Center</p>
                        <p>Returns</p>
                        <p>Warranty</p>
                    </div>
                    <div className={styles.section}>
                        <h4>Legal</h4>
                        <p>Privacy Policy</p>
                        <p>Terms of Service</p>
                    </div>
                </div>
                <div className={styles.copyright}>
                    &copy; {new Date().getFullYear()} Amish Connection. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
