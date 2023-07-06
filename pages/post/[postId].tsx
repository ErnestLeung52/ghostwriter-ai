import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";

type Props = {};

const Post = (props: Props) => {
	return <div>Post</div>;
};

export default Post;


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
