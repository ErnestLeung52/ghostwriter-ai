import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';

type Props = {};

const NewPost: React.FC<Props> = (props) => {
	console.log(props);
	return (
		<div>
			<h1>New Post Page</h1>
		</div>
	);
};

export default NewPost;

// getServerSideProps is a special function that runs server side Whenever this particular page is requested in the browser and it provides this page component with any props that it may need to render properly.
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
