import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import AppLayout from '../../components/AppLayout/AppLayout';

// post/new generate topics with OPENAI API

type Props = {
	children: React.ReactNode;
};
type PageWithLayout<T> = T & { getLayout?: (page: JSX.Element, pageProps?: any) => JSX.Element };
type PageProps = {
	children: React.ReactNode;
};

const NewPost: PageWithLayout<React.FC<Props>> = (props) => {
	// console.log('new', 5);
	return (
		<div>
			<h1>b. New Post Page</h1>
			<div>{props.children}</div>
		</div>
	);
};
export default NewPost;

// Only pages that have a getLayout function defined will be wrapped with the layout
NewPost.getLayout = function getLayout(page: JSX.Element, pageProps: PageProps) {
	// console.log('new', 3);
	return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
	getServerSideProps: async (ctx) => {
		// The context (ctx) parameter is the context object for the getServerSideProps function.
		// You can use this to access request-specific parameters.
		return {
			props: {
				test: 'test from new post',
			},
		};
	},
});
