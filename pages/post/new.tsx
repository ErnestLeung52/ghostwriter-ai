import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import AppLayout from '../../components/AppLayout/AppLayout';
import { GeneratePostAPIResponse, PageProps, PageWithLayout, PromptData } from '../../types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAppProps } from '../../utils/getAppProps';

// post/new generate topics with OPENAI API
const NewPost: PageWithLayout<React.FC<PageProps>> = (props) => {
	// console.log('new', 5);
	const router = useRouter();
	const [formData, setFormData] = useState<PromptData>({ topic: '', keywords: '' });

	const [loadingData, setLoadingData] = useState(false);
	const [seconds, setSeconds] = useState(0);

	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handlePostGenSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoadingData(true);

		try {
			const response = await fetch('/api/generatePost_gpt3-5-turbo', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			const json: GeneratePostAPIResponse = await response.json();

			// console.log('RESULT:', json);

			if (json.error || !json.postId) {
				console.error(json.error);
				return;
			} else {
				router.push(`/post/${json.postId}`);
			}
		} catch (error) {
			setLoadingData(false);
		}
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			setSeconds((seconds) => seconds + 1);
		}, 1000);

		return () => clearInterval(intervalId); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
	}, [loadingData]);

	return (
		<div className='h-full overflow-hidden bg-slate-900'>
			{!!loadingData && (
				<div className='flex h-full w-full flex-col justify-center items-center'>
					<div role='status'>
						<svg
							aria-hidden='true'
							className='w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-slate-700 fill-[#7b4adf]'
							viewBox='0 0 100 101'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
								fill='currentColor'
							/>
							<path
								d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
								fill='currentFill'
							/>
						</svg>
					</div>

					<h6 className='text-[#7b4adf] text-xl animate-pulse'>Generating...[{seconds}]</h6>
					<p className='text-slate-500 text-xs'>
						OpenAI is currently sprinkling some AI magic and revving its brain engines to craft your blog
						post. Hang tight!
					</p>
				</div>
			)}

			{!loadingData && (
				<div className='w-full h-full flex flex-col overflow-auto'>
					<form
						onSubmit={handlePostGenSubmit}
						className='m-auto w-full max-w-screen-sm backdrop-blur bg-[#7b4adf] p-4 rounded-md shadow-sm text-white'
					>
						<div>
							<label>
								<strong>Blog Post Topic:</strong>
							</label>
							<textarea
								className='resize-none bg-[#B194ED] bg-opacity-40 w-full block my-1 px-4 pt-1 rounded-md text-white'
								name='topic'
								value={formData.topic}
								onChange={handleInputChange}
								maxLength={100}
							/>
						</div>

						<div className='mt-6'>
							<label>
								<strong>Targeting the following keywords:</strong>
							</label>
							<textarea
								className='resize-none bg-[#B194ED] bg-opacity-40 w-full block my-1 px-4 pt-1 rounded-md'
								name='keywords'
								value={formData.keywords}
								onChange={handleInputChange}
								maxLength={80}
							/>
							<small className='block mb-2'>*Separate keywords with coma</small>
						</div>

						<div className='mt-8'>
							<button
								type='submit'
								className='btn bg-[#5e35b2]'
								disabled={!formData.topic.trim() || !formData.keywords.trim()}
							>
								Generate
							</button>
						</div>
					</form>
				</div>
			)}
			{/* <div className='max-w-screen-sm p-10' dangerouslySetInnerHTML={{ __html: postContent }} /> */}
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
	async getServerSideProps(ctx) {
		const props = await getAppProps(ctx);

		if (!props.availableTokens) {
			return {
				redirect: {
					destination: '/token-topup',
					permanent: false,
				},
			};
		}

		return {
			props,
		};
	},
});
