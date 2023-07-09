import VerseLogo from '../assets/VerseLogo.png';

import styles from './Footer.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerAll}>
                <div className={styles.footerContent}>
                    <img src={VerseLogo} alt="Logo do Verse" />
                    <div>
                        <p className={styles.letras}>Verse Roleplay © 2023</p>
                        <p className={styles.letras}>Não somos afiliados a Rockstar Games</p>
                    </div>

                </div>
                <p className={styles.letras}>Desenvolvido por: cardozo1</p>
            </div>

        </footer>
    );
}