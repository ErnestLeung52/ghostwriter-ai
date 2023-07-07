import { UserProvider } from '@auth0/nextjs-auth0/client';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	// If a particular page doesn't have a get layout function associated with it, we just simply returning the page itself.
	// console.log('myapp', 1);
	const getLayout = Component.getLayout || ((page: JSX.Element) => page);

	return <UserProvider>{getLayout(<Component {...pageProps} />, pageProps)}</UserProvider>;
}

export default MyApp;
