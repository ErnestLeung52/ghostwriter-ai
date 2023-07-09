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

export type PageProps = {
	test: string;
	user: Auth0User;
	children: React.ReactNode;
};
