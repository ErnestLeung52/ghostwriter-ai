import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import AppLayout from '../components/AppLayout/AppLayout';
import { PageProps } from '../types';
import { getAppProps } from '../utils/getAppProps';

type Props = {};

const Success = (props: Props) => {
	return (
		<div>
			<h1>Thank you for your purchase!</h1>
		</div>
	);
};

export default Success;

// Only pages that have a getLayout function defined will be wrapped with the layout
Success.getLayout = function getLayout(page: JSX.Element, pageProps: PageProps) {
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
