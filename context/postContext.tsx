import React, { ReactNode, useCallback, useReducer, useState } from 'react';
import { BlogPostData } from '../types';

type PostContextType = {
	posts?: BlogPostData[];
	setPostsFromSSR?: (postsFromSSR: BlogPostData[]) => void;
	getPosts?: (params: { lastPostDate?: Date | String; getNewerPosts?: Boolean }) => Promise<void>;
	noMorePosts?: Boolean;
	deletePost?: (postId: string) => void;
};

const PostsContext = React.createContext<PostContextType>({});

export default PostsContext;

type Action = {
	type: 'addPosts' | 'deletePost';
	postId?: string;
	posts?: BlogPostData[];
};

const postsReducer = (state: BlogPostData[], action: Action): BlogPostData[] => {
	switch (action.type) {
		case 'addPosts': {
			const newPosts = [...state];
			action.posts.forEach((post) => {
				const exists = newPosts.find((p) => p._id === post._id);
				if (!exists) {
					newPosts.push(post);
				}
			});
			return newPosts;
		}

		case 'deletePost': {
			const newPosts = state.filter(post => post._id !== action.postId)
			return newPosts;
		}

		default:
			return state;
	}
};

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [posts, dispatch] = useReducer(postsReducer, []);
	const [noMorePosts, setNoMorePosts] = useState<Boolean>(false);

	const deletePost = useCallback((postId: string) => {
		dispatch({
			type: 'deletePost',
			postId,
		});
	}, []);

	const setPostsFromSSR = useCallback((postsFromSSR = []) => {
		dispatch({
			type: 'addPosts',
			posts: postsFromSSR,
		});
	}, []);

	const getPosts = useCallback(async ({ lastPostDate, getNewerPosts = false }) => {
		const result = await fetch('/api/getPosts', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({ lastPostDate, getNewerPosts }),
		});

		const json = await result.json();
		const postsResult = json.posts || [];

		if (postsResult.length < 5) {
			setNoMorePosts(true);
		}

		dispatch({
			type: 'addPosts',
			posts: postsResult,
		});
	}, []);

	return (
		<PostsContext.Provider value={{ posts, setPostsFromSSR, getPosts, noMorePosts, deletePost }}>
			{children}
		</PostsContext.Provider>
	);
};
