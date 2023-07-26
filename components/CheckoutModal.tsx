import React from 'react';

type Props = {
	openModal: Boolean;
	setOpenModal: (value: boolean) => void;
	handleAddTokenClick: () => Promise<void>;
};

const CheckoutModal: React.FC<Props> = ({ openModal, setOpenModal, handleAddTokenClick }) => {
	return (
		<>
			{openModal && (
				<div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
					<div className='w-[600px] flex flex-col rounded-md bg-white '>
						<div className='px-4 py-2 flex justify-between flex-col opacity-100'>
							<button
								onClick={() => setOpenModal(false)}
								className='bg-slate-300 text-white self-end rounded-full w-6 h-6'
							>
								X
							</button>

							<div className='text-center px-4'>
								<div className='text-3xl text-[#7b4adf]/90 font-bold'>Stripe Checkout Portal</div>
								<p className='text-sm'>
									When you click &apos;Proceed to Checkout&apos;, you will be redirected to our secure
									payment portal powered by Stripe. As this is a <strong>test payment link</strong>,
									you can freely use fictitious information to explore the app and checkout process.
								</p>
								<p className='text-xs text-slate-500'>
									Stripe handles all data security during the transaction, ensuring your
								</p>
							</div>

							<button className='btn mt-4' onClick={handleAddTokenClick}>
								Proceed to Stripe
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default CheckoutModal;
