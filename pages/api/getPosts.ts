import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import { BlogPostData } from '../../types';

export default withApiAuthRequired(async function handler(
	req: NextApiRequest & { body: Date },
	res: NextApiResponse<{ posts: BlogPostData[] }>
): Promise<void> {
	try {
		const {
			user: { sub },
		} = await getSession(req, res);

		const client = await clientPromise;
		const db = client.db('GhostWriterAI');

		const userProfile = await db.collection('users').findOne({ auth0Id: sub });

		const { lastPostDate } = req.body;

		const posts = await db
			.collection('posts')
			.find({ userId: userProfile._id, created: { $lt: new Date(lastPostDate) } })
			.limit(5)
			.sort({ created: -1 })
			.toArray();

		res.status(200).json({ posts });
		return;
	} catch (error) {
		console.log(error);
	}
});
