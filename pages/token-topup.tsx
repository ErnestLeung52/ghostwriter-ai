import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import AppLayout from '../components/AppLayout/AppLayout';
import { PageProps } from '../types';
import { getAppProps } from '../utils/getAppProps';
import CheckoutModal from '../components/CheckoutModal';
import { useState } from 'react';

type Props = {};

const TokenTopup = (props: Props) => {
	const [openModal, setOpenModal] = useState<Boolean>(true);

	const handleAddTokenClick = async () => {
		const result = await fetch(`/api/addTokens`, {
			method: 'POST',
		});

		const json = await result.json();
		window.location.href = json.session.url;
	};

	return (
		<>
			<div className='flex flex-col text-white justify-center items-center bg-[#23133b]'>
				<div className='mx-24'>
					<div className='text-center text-[#b895ff] font-bold text-3xl pb-3'>Token Top-up</div>
					<ol className='list-disc font-light text-slate-300 pl-4 text-md'>
						<li>
							<u>Purchase Tokens</u>: For each token you purchase, you can generate one post.
						</li>
						<li>
							<u>Purchase Limitations</u>: To ensure the smooth functioning of our service and the fair
							allocation of resources, users can only purchase 10 tokens at a time.
						</li>
						<li>
							<u>Token Pricing</u>: Each token is priced at $1. A minimum of 10 tokens must be purchased
							per order. The more you buy, the more posts you can generate.
						</li>
						<li>
							<u>Using Tokens</u>: After purchase, tokens will be added to your account balance. Each time
							you generate a post, one token will be deducted from your balance.
						</li>
						<li>
							<u>Token Validity</u>: Tokens don&apos;t expire. You can use them to generate posts anytime.
						</li>
					</ol>
					<div className='mx-12 mt-12'>
						<button className='btn' onClick={() => setOpenModal(true)}>
							Purchase 10 Tokens
						</button>
					</div>
				</div>
			</div>
					<CheckoutModal
						openModal={openModal}
						setOpenModal={setOpenModal}
						handleAddTokenClick={handleAddTokenClick}
					/>
		</>
	);
};

export default TokenTopup;

// Only pages that have a getLayout function defined will be wrapped with the layout
TokenTopup.getLayout = function getLayout(page: JSX.Element, pageProps: PageProps) {
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
