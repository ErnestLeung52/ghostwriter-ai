import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { GeneratePostAPIResponse, PromptData } from '../../types';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import clientPromise from '../../lib/mongodb';

export default withApiAuthRequired(async function handler(
	req: NextApiRequest & { body: PromptData },
	res: NextApiResponse<GeneratePostAPIResponse>
): Promise<void> {
	const { user } = await getSession(req, res);

	const client = await clientPromise;
	const db = client.db('GhostWriterAI');

	const userProfile = await db.collection('users').findOne({ auth0Id: user.sub });

	if (!userProfile?.availableTokens) {
		res.status(403).json({ error: 'You have no available tokens' });
		return;
	}

	const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });

	const openai = new OpenAIApi(config);

	const { topic, keywords } = req.body;

	if (!topic || !keywords || topic.length > 100 || keywords.length > 80) {
		res.status(422).json({ error: 'Missing topic or keywords' });
		return;
	}

	const postContentResponse = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		temperature: 0,
		messages: [
			{ role: 'system', content: 'You are a blog post generator' },
			{
				role: 'user',
				content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}.
	      The response blog post should be formatted in SEO-friendly HTML,
	      limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, ul, ol, li, i'`,
			},
		],
	});

	const postContent = postContentResponse.data.choices[0]?.message?.content || '';

	const titleResponse = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		temperature: 0,
		messages: [
			{ role: 'system', content: 'You are a blog post generator' },
			{
				role: 'user',
				content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}.
	      The content should be formatted in SEO-friendly HTML,
	      limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, ul, ol, li, i'`,
			},
			{ role: 'assistant', content: postContent },
			{ role: 'user', content: 'Generate appropriate title tag text for the above blog post' },
		],
	});

	const metaDescriptionResponse = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		temperature: 0,
		messages: [
			{ role: 'system', content: 'You are a blog post generator' },
			{
				role: 'user',
				content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}.
	      The response should be formatted in SEO-friendly HTML,
	      limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, ul, ol, li, i'`,
			},
			{ role: 'assistant', content: postContent },
			{ role: 'user', content: 'Generate SEO-friendly meta description for the above blog post' },
		],
	});

	const title = titleResponse.data.choices[0]?.message?.content || '';
	const metaDescription = metaDescriptionResponse.data.choices[0]?.message?.content || '';

	await db.collection('users').updateOne({ auth0Id: user.sub }, { $inc: { availableTokens: -1 } });

	const postResult = {
		post: { postContent, title, metaDescription, topic, keywords, userId: userProfile._id, created: new Date() },
	};

	const post = await db.collection('posts').insertOne(postResult.post);

	res.status(200).json({ postId: post.insertedId });
});
