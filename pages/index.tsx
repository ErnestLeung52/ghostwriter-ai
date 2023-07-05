import Link from 'next/link';

type Props = {};

const Home = (props: Props) => {
	return (
		<div>
			<h1>Next.js + MongoDB</h1>
			<div>
				<Link href='/api/auth/login'>Login</Link>
			</div>
		</div>
	);
};

export default Home;
