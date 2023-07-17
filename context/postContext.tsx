import React, { ReactNode, useCallback, useState } from 'react';
import { BlogPostData } from '../types';

type PostContextType = {
	posts?: BlogPostData[];
	setPostsFromSSR?: (postsFromSSR: BlogPostData[]) => void;
};

const PostsContext = React.createContext<PostContextType>({});

export default PostsContext;

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [posts, setPosts] = useState<BlogPostData[]>([]);

	const setPostsFromSSR = useCallback((postsFromSSR = []) => {
		// console.log('posts from SSRRRR: ', postsFromSSR);
		setPosts(postsFromSSR);
	}, []);

	return <PostsContext.Provider value={{ posts, setPostsFromSSR }}>{children}</PostsContext.Provider>;
};
