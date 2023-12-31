import '../styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { DM_Sans, DM_Serif_Display } from '@next/font/google';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { PostsProvider } from '../context/postContext';
import Head from 'next/head';
config.autoAddCss = false;

const dmSans = DM_Sans({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
	variable: '--font-dm-sans',
});

const dmSerifDisplay = DM_Sans({
	weight: ['400'],
	subsets: ['latin'],
	variable: '--font-dm-serif',
});

function MyApp({ Component, pageProps }) {
	// If a particular page doesn't have a get layout function associated with it, we just simply returning the page itself.
	// console.log('myapp', 1);
	const getLayout = Component.getLayout || ((page: JSX.Element) => page);

	return (
		<>
			<Head>
				<title>GhostWriter AI</title>
				<link rel='icon' href='/appLogo.png' />
			</Head>
			<UserProvider>
				<PostsProvider>
					<main className={`${dmSans.variable} ${dmSerifDisplay.variable} font-body`}>
						{getLayout(<Component {...pageProps} />, pageProps)}
					</main>
				</PostsProvider>
			</UserProvider>
		</>
	);
}

export default MyApp;
