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

# Future Iterations

Looking ahead, we are planning to expand the functionality of GhostWriterAI. My planned enhancements include:

-   Cover letter generation functionality.

Stay tuned for future updates and enhancements!
