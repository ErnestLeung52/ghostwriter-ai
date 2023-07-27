import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { Logo } from '../Logo/index';
import { PageProps } from '../../types';
import { useContext, useEffect } from 'react';
import PostsContext from '../../context/postContext';
import { useRouter } from 'next/router';

const AppLayout: React.FC<PageProps> = ({ children, availableTokens, posts: postsFromSSR, postId, postCreated }) => {
	const { user } = useUser();
	const router = useRouter();

	const { setPostsFromSSR, posts, getPosts, noMorePosts } = useContext(PostsContext);

	useEffect(() => {
		setPostsFromSSR(postsFromSSR);

		if (postId) {
			const exists = postsFromSSR.find((post) => post._id === postId);
			if (!exists) {
				getPosts({ getNewerPosts: true, lastPostDate: postCreated });
			}
		}
	}, [postsFromSSR, setPostsFromSSR, postId, postCreated, getPosts]);

	return (
		<div className='grid grid-cols-[300px_1fr] h-screen max-h-screen'>
			<div className='flex flex-col overflow-hidden text-white'>
				<div className='bg-[#23133b] px-2'>
					<div className='px-2'>
						<Logo />
					</div>

					<div className='border-b-[1px] border-b-[#b895ff]/30'></div>

					<div className='flex flex-row w-full justify-center px-2 mt-5 text-center'>
						<div className='flex-grow py-2 rounded-l-full w-[100px] backdrop-blur bg-white/50'>
							<FontAwesomeIcon icon={faCoins} className='text-yellow-400' />
							<span className='pl-1'> {availableTokens} Tokens</span>
						</div>
						<button
							onClick={() => router.push('/token-topup')}
							className='flex-grow py-2 rounded-r-full border-l-0 w-[100px] bg-[#7b4adf] hover:bg-[#b895ff]'
						>
							Top-up
						</button>
					</div>

					<div className='px-2'>
						<Link href='/post/new' className='btn mt-6'>
							Create Blog
						</Link>
					</div>
				</div>

				<div className='py-4 px-4 flex-1 overflow-auto bg-gradient-to-b from-[#23133b] to-[#29124d]'>
					{posts.map((post) => (
						<Link
							href={`/post/${post._id}`}
							key={post._id}
							className={`py-1 border border-white/0 block text-ellipsis overflow-hidden whitespace-nowrap my-1 px-2 bg-white/10 cursor-pointer rounded-md 
							${postId === post._id ? 'bg-white/20 border-white' : ''}`}
						>
							{post.topic}
						</Link>
					))}

					{!noMorePosts && (
						<div
							onClick={() => {
								getPosts({ lastPostDate: posts[posts.length - 1].created });
							}}
							className='hover:underline text-sm text-slate-400 text-center cursor-pointer mt-4'
						>
							Load more posts
						</div>
					)}
				</div>

				<div className='bg-[#553CF8] flex items-center gap-2 border-t border-t-[#b895ff]/50 h-20 px-2'>
					{!!user ? (
						<>
							<div className='min-w-[50px]'>
								<Image
									src={user.picture}
									alt={user.name}
									height={50}
									width={50}
									className='rounded-full'
								/>
							</div>
							<div className='flex-1'>
								<div className='font-bold'>{user.email}</div>
								<Link className='text-sm' href='/api/auth/logout'>
									Logout
								</Link>
							</div>
						</>
					) : (
						<Link href='/api/auth/login'>Login</Link>
					)}
				</div>
			</div>
			{children}
		</div>
	);
};

export default AppLayout;
