import React, { ReactNode, useCallback, useState } from 'react';
import { BlogPostData } from '../types';

type PostContextType = {
	posts?: BlogPostData[];
	setPostsFromSSR?: (postsFromSSR: BlogPostData[]) => void;
	getPosts?: (params: { lastPostDate?: Date }) => Promise<void>;
	noMorePosts?: Boolean;
};

const PostsContext = React.createContext<PostContextType>({});

export default PostsContext;

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [posts, setPosts] = useState<BlogPostData[]>([]);
	const [noMorePosts, setNoMorePosts] = useState<Boolean>(false);

	const setPostsFromSSR = useCallback((postsFromSSR = []) => {
		setPosts((value) => {
			const newPosts = [...value];
			postsFromSSR.forEach((post) => {
				const exists = newPosts.find((p) => p._id === post._id);
				if (!exists) {
					newPosts.push(post);
				}
			});
			return newPosts;
		});
	}, []);

	const getPosts = useCallback(async ({ lastPostDate }) => {
		const result = await fetch('/api/getPosts', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({ lastPostDate }),
		});

		const json = await result.json();
		const postsResult = json.posts || [];

		if (postsResult.length < 5) {
			setNoMorePosts(true);
		}

		setPosts((value) => {
			const newPosts = [...value];
			postsResult.forEach((post) => {
				const exists = newPosts.find((p) => p._id === post._id);
				if (!exists) {
					newPosts.push(post);
				}
			});
			return newPosts;
		});
	}, []);

	return (
		<PostsContext.Provider value={{ posts, setPostsFromSSR, getPosts, noMorePosts }}>
			{children}
		</PostsContext.Provider>
	);
};
