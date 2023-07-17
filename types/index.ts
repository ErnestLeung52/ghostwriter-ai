type Auth0User = {
	email: string;
	email_verified: boolean;
	family_name: string;
	given_name: string;
	locale: string;
	name: string;
	nickname: string;
	picture: string;
	sid: string;
	sub: string;
	updated_at: string;
};

type GetAppProps = {
	availableTokens: number;
	posts: BlogPostData[];
	postId: string | null;
	postCreated: string;
};

export type PageProps = {
	user: Auth0User;
	children: React.ReactNode;
} & BlogPostData &
	GetAppProps;

export type PageWithLayout<T> = T & { getLayout?: (page: JSX.Element, pageProps?: PageProps) => JSX.Element };

export type PromptData = { topic: string; keywords: string };

export type BlogPostData = {
	postContent: string;
	title: string;
	metaDescription: string;
	topic: string;
	keywords: string;
	userId: string;
	created: Date;
	availableTokens: number;
	_id: string;
};

export type GeneratePostAPIResponse = {
	postId?: string;
	error?: string;
};
