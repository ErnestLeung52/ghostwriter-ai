import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import AppLayout from '../../components/AppLayout/AppLayout';
import { BlogPostResponse, PageProps, PromptData } from '../../types';
import { useState } from 'react';

// post/new generate topics with OPENAI API

// type Props = {
// 	test: string;
// 	user: any;
// 	children: React.ReactNode;
// };
// type PageProps = {
// 	children: React.ReactNode;
// };
type PageWithLayout<T> = T & { getLayout?: (page: JSX.Element, pageProps?: PageProps) => JSX.Element };

const NewPost: PageWithLayout<React.FC<PageProps>> = (props) => {
	// console.log('new', 5);

	const [postContent, setPostContent] = useState<string>('');
	const [formData, setFormData] = useState<PromptData>({ topic: '', keywords: '' });

	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handlePostGenSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const response = await fetch('/api/generatePost', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(formData),
		});

		const json: BlogPostResponse = await response.json();

		setPostContent(json.post.postContent);
	};

	return (
		<div>
			<form onSubmit={handlePostGenSubmit}>
				<div>
					<label>
						<strong>Generate a blog post on the topic of:</strong>
					</label>
					<textarea
						className='resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm'
						name='topic'
						value={formData.topic}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label>
						<strong>Targeting the following keywords:</strong>
					</label>
					<textarea
						className='resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm'
						name='keywords'
						value={formData.keywords}
						onChange={handleInputChange}
					/>
				</div>

				<button type='submit' className='btn'>
					Generate
				</button>
			</form>

			<div className='max-w-screen-sm p-10' dangerouslySetInnerHTML={{ __html: postContent }} />
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
