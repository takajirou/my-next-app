import "@/styles/globals.css";
import styles from "@/styles/Footer.module.css";
import type { AppProps } from "next/app";
//タイトルを変えたい時
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>aiueo</title>
            </Head>
            {/* 全体に共通するヘッダーを書く場合はこの上 */}
            <Component {...pageProps} />;{/* 全体に共通するフッター */}
            <footer className={styles.footer}>
                <p>&copy; 2024 MyErbsite. All rights reserved</p>
            </footer>
            ;
        </>
    );
}
