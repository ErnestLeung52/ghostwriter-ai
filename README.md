# GhostWriterAI

GhostWriterAI is an innovative application powered by React, Next.js, Tailwind, MongoDB, Auth0, OpenAI, and Stripe. The project aims to provide a seamless experience for users to generate content. Users can purchase tokens via Stripe and these tokens can be utilized to generate posts.

## Setup

To set up the project, follow these steps:

1. Clone the repository to your local machine.
2. Run `npm install` to install the necessary dependencies.
3. Start the development server with `npm run dev`.

You'll also need to set up environment variables for the project. Create a .env.local file in the root directory and add the following:

```
OPENAI_API_KEY=
AUTH0_SECRET=
AUTH0_BASE_URL=
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
MONGODB_URI=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

## Stripe Payment Webhook Test

To set up a dummy payment link with Stripe, follow these steps:

1. Register a Stripe account and enable Developers mode
2. Secret Key is provided in the API keys tab
3. Download the latest Stripe CLI and login Stripe via CLI ``stripe login``
4. Visit the Webhooks tab -> Add an endpoint -> Test in a local environment
5. Forward events to the webhook via CLI ``stripe listen --forward-to localhost:[your-localhost-port]/webhook``
6. Webhook signing secret will be provided in the CLI and use ths secret in the .env.local file

# Future Iterations

Looking ahead, we are planning to expand the functionality of GhostWriterAI. My planned enhancements include:

-   Cover letter generation functionality.

Stay tuned for future updates and enhancements!
