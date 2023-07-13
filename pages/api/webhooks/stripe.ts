// Setup web hook endpoint to allow an external entity to call this endpoint, because Next.js out of the box is on lockdown with its endpoints. So there's no external entities can request or post to an API endpoints within our project unless we set it up to allow that.

// set up our endpoint to allow external entities to call our web hook within Next.js

import Cors from 'micro-cors';
import StripeInit from 'stripe';
import verifyStripe from '@webdeveducation/next-verify-stripe';
import clientPromise from '../../../lib/mongodb';

const cors = Cors({
	allowMethods: ['POST', 'HEAD'],
});

export const config = {
	api: {
		bodyParser: false,
	},
};

const stripe = new StripeInit(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2022-11-15',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const handler = async (req, res) => {
	if (req.method === 'POST') {
		let event;
		try {
			event = await verifyStripe({
				req,
				stripe,
				endpointSecret,
			});
		} catch (error) {
			console.log(error);
		}

		switch (event.type) {
			case 'payment_intent.succeeded': {
				// MongoDB upsert: insert + udpate
				const client = await clientPromise;
				const db = client.db('GhostWriterAI');

				const paymentIntent = event.data.object;
				const auth0Id = paymentIntent.metadata.sub;

				const userProfile = await db.collection('users').updateOne(
					{
						auth0Id,
					},
					{
						$inc: {
							availableTokens: 10,
						},
						$setOnInsert: {
							auth0Id,
						},
					},
					{
						upsert: true,
					}
				);
			}

			default:
				console.log(`Unhandled event type ${event.type}`);
		}

		res.status(200).json({ received: true });
	}
};

export default cors(handler);
