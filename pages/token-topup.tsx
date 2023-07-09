import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import AppLayout from '../components/AppLayout/AppLayout';
import { PageProps } from '../types';

type Props = {};
// type PageProps = {
// 	children: React.ReactNode;
// };

const TokenTopup = (props: Props) => {
	return <div>token-topup</div>;
};

export default TokenTopup;

// Only pages that have a getLayout function defined will be wrapped with the layout
TokenTopup.getLayout = function getLayout(page: JSX.Element, pageProps: PageProps) {
	// console.log('new', 3);
	return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
	getServerSideProps: async (ctx) => {
		// The context (ctx) parameter is the context object for the getServerSideProps function.
		// You can use this to access request-specific parameters.
		return {
			props: {
				test: 'this is a test',
			},
		};
	},
});
