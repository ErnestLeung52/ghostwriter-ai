import { getSession } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// Retrieve currently logged in users ID from Auth0

	const { user } = await getSession(req, res);

	// MongoDB upsert: insert + udpate
	const client = await clientPromise;
	const db = client.db('GhostWriterAI');

	const userProfile = await db.collection('users').updateOne(
		{
			auth0Id: user.sub,
		},
		{
			$inc: {
				availableTokens: 10,
			},
			$setOnInsert: {
				auth0Id: user.sub,
			},
		},
		{
			upsert: true,
		}
	);

	// res.status(200).json({ name: 'John Doe' });
}
