import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { BlogPostResponse, PromptData } from '../../types';

export default async function handler(
	req: NextApiRequest & { body: PromptData },
	res: NextApiResponse<BlogPostResponse>
): Promise<void> {
	const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });

	const openai = new OpenAIApi(config);

	const { topic, keywords } = req.body;

	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		// risky level of how much it will deviate from the prompt
		temperature: 0,
		max_tokens: 3600,
		prompt: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}.
    The content should be formatted in SEO-friendly HTML.
    The response must also include appropriate HTML title and meta description content.
    The return format must be stringified JSON in the following format:
    {
      "postContent": post content,
      "title": title content,
      "metaDescription": meta description content
    }
    `,
	});

	res.status(200).json({ post: JSON.parse(response.data.choices[0]?.text.split('\n').join('')) });
}
