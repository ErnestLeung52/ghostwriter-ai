import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import AppLayout from '../components/AppLayout/AppLayout';
import { PageProps } from '../types';
import { getAppProps } from '../utils/getAppProps';

type Props = {};

const TokenTopup = (props: Props) => {
	const handleAddTokenClick = async () => {
		const result = await fetch(`/api/addTokens`, {
			method: 'POST',
		});

		const json = await result.json();
		window.location.href = json.session.url;
	};

	return (
		<div>
			<h1>token-topup</h1>
			<button className='btn' onClick={handleAddTokenClick}>
				Add tokens
			</button>
		</div>
	);
};

export default TokenTopup;

// Only pages that have a getLayout function defined will be wrapped with the layout
TokenTopup.getLayout = function getLayout(page: JSX.Element, pageProps: PageProps) {
	// console.log('new', 3);
	return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
	async getServerSideProps(ctx) {
		const props = await getAppProps(ctx);
		return {
			props,
		};
	},
});
