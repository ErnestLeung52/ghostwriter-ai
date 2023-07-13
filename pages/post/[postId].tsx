import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import AppLayout from '../../components/AppLayout/AppLayout';
import { PageProps, PageWithLayout } from '../../types';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { getAppProps } from '../../utils/getAppProps';

const Post: PageWithLayout<React.FC<PageProps>> = (props) => {
	// console.log(props);
	return (
		<div className='overflow-auto h-full'>
			<div className='max-w-screen-sm mx-auto'>
				<div className='text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm'>SEO Title and Meta Description</div>
				<div className='p-4 my-2 border border-stone-200 rounded-md'>
					<div className='text-blue-600 text-2xl font-bold'>{props.title}</div>
					<div className='mt-2'>{props.metaDescription}</div>
				</div>

				<div className='text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm'>Keywords</div>
				<div className='flex flex-wrap pt-2 gap-1'>
					{props.keywords.split(',').map((keyword, i) => (
						<div key={i} className='p-2 rounded-full bg-slate-800 text-white'>
							<FontAwesomeIcon icon={faHashtag} />
							{keyword}
						</div>
					))}
				</div>

				<div className='text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm'>Blog postdid</div>

				<div dangerouslySetInnerHTML={{ __html: props.postContent || '' }} />
			</div>
		</div>
	);
};

export default Post;

Post.getLayout = function getLayout(page: JSX.Element, pageProps: PageProps) {
	// console.log('new', 3);
	return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
	getServerSideProps: async (ctx) => {
		// Session 23

		const props = await getAppProps(ctx);

		const userSession = await getSession(ctx.req, ctx.res);
		const client = await clientPromise;
		const db = client.db('GhostWriterAI');

		const user = await db.collection('users').findOne({ auth0Id: userSession.user.sub });

		if (Array.isArray(ctx.params.postId)) {
			throw new Error('postId must be a string');
		}

		const post = await db.collection('posts').findOne({
			_id: new ObjectId(ctx.params.postId),
			userId: user._id,
		});

		if (!post) {
			return {
				redirect: {
					destination: '/posts/new',
					permanent: false,
				},
			};
		}

		return {
			props: {
				postContent: post.postContent,
				title: post.title,
				metaDescription: post.metaDescription,
				keywords: post.keywords,
				...props,
			},
		};
	},
});
