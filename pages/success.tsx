import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import AppLayout from '../components/AppLayout/AppLayout';
import { PageProps } from '../types';
import { getAppProps } from '../utils/getAppProps';
import Confetti from 'react-confetti';
import { useEffect, useRef, useState } from 'react';

type Props = {};

const Success = (props: Props) => {
	const [height, setHeight] = useState(null);
	const [width, setWidth] = useState(null);

	useEffect(() => {
		setHeight(window.innerHeight);
		setWidth(window.innerWidth);
	}, []);

	return (
		<div className='flex flex-col justify-center items-center bg-slate-900'>
			<h1 className='text-white'>Thank you for your purchase!</h1>
			<p className='text-slate-500 text-xs'>Although it is a mocked payment, I still appreciate it.</p>
			<Confetti numberOfPieces={80} width={width} height={height} />
		</div>
	);
};

export default Success;

// Only pages that have a getLayout function defined will be wrapped with the layout
Success.getLayout = function getLayout(page: JSX.Element, pageProps: PageProps) {
	// console.log('new', 3);
	return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
	async getServerSideProps(ctx) {
		const props = await getAppProps(ctx);
		return {
			props,
		};
	},
});
