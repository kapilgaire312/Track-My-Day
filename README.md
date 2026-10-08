# Track My Day

Track My Day is a small personal time-tracking app built with Next.js. It
helps you record what you did throughout the day, organize activities into
categories, and review simple patterns over time.

The product is intentionally lightweight: it is not a task manager or a
calendar. It is a place to make a quick record of how your day actually went.

## Features

- Public landing page explaining the product
- Email/password account creation and login
- Email verification before the first login
- Verification links that expire after 24 hours
- Half-hour activity slots grouped into six collapsible four-hour sections
- Automatic opening of the section matching the user's local time
- Automatic activity categorization using a zero-shot classifier
- User-defined categories with add, edit, and delete support
- Reclassification when a category is renamed or removed
- Date navigation for reviewing previous days
- Activity summaries and charts for today, three days, or seven days
- Filtering analytics by category

## How classification works

When an activity is saved, the server classifies it against the user's current
category list. The classifier uses
`Xenova/nli-deberta-v3-small` through
`@huggingface/transformers` and runs with the quantized `q8` model.

The model is downloaded and cached on first use. The first classification on a
new machine or deployment may therefore take longer than later classifications.
The deployment environment must allow the server to download and temporarily
store the model files.

## Tech stack

- Next.js 15 App Router
- React 19
- NextAuth v5 credentials authentication
- MongoDB with Mongoose
- Resend for verification emails
- JWT verification tokens
- Hugging Face Transformers.js and ONNX Runtime
- Recharts for analytics
- `react-select` and `react-datepicker` for controls
- Tailwind CSS

## Project structure

```text
app/
  api/                 API route handlers
  login/               Login page and form
  myactivities/        Activity analytics
  profile/             Profile and category management
  signup/              Account creation
  verify/              Email verification page
Components/            Shared UI components
Contexts/              Activity and category client state
hooks/                 Session and route helpers
lib/
  classifier/          Activity classification
  models/              Mongoose models
  services/            Server-only database services
utils/                 Shared activity and category helpers
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Landing page for signed-out users; activity dashboard for signed-in users |
| `/login` | Sign in with email and password |
| `/signup` | Create an account and request verification email |
| `/verify` | Complete email verification |
| `/profile` | View profile and manage categories |
| `/myactivities` | Review activity charts and summaries |

## API routes

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/api/user/signup` | Create a user and send a verification email |
| `POST` | `/api/user/login` | Validate credentials and verification status |
| `POST` | `/api/verify` | Verify an account from a JWT token |
| `POST` | `/api/activity` | Save and classify activity entries |
| `GET` | `/api/activity/[userId]/[date]?days=1\|3\|7` | Read activity data |
| `GET` | `/api/category/[userId]` | Read a user's categories |
| `PUT` | `/api/category/[userId]` | Validate, save, and apply category changes |
| `GET/POST` | `/api/auth/*` | NextAuth session endpoints |

All database access stays on the server. Activity and category APIs verify the
authenticated user before changing data.

## Data model

### User

Stores the email address, bcrypt password hash, verification state, category
list, verification timestamp, and a reference to the user's activity document.

### Activity

Stores a user's daily records. Each day contains half-hour entries with:

- `value` - what the user did
- `category` - the selected or automatically predicted category
- `isSelected` - temporary UI selection state

## Requirements

- Node.js 18.18 or newer
- npm
- MongoDB Atlas or a local MongoDB server
- A Resend account and verified sender address for email delivery

## Local setup

Install dependencies from the project directory:

```bash
cd my-app
npm install
```

Create `.env.local` in `my-app/`:

```env
APP_URL=http://localhost:3000
AUTH_SECRET=replace_with_a_long_random_secret
DB_URI_=mongodb+srv://username:password@cluster.mongodb.net/day-tracker
JWT_SECRET=replace_with_a_long_random_secret
RESEND_API=re_your_resend_api_key
```

`DB_URI_` intentionally includes the trailing underscore. The application reads
that exact variable name.

For local MongoDB, the value can instead be:

```env
DB_URI_=mongodb://127.0.0.1:27017/day-tracker
```

Make sure MongoDB is running before using the application.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

```bash
npm run dev      # Start Next.js with Turbopack
npm run lint     # Run ESLint through Next.js
npm run build    # Create a production build
npm run start    # Start the production server
```

## Deployment checklist

1. Set all environment variables in the hosting provider.
2. Set `APP_URL` to the deployed HTTPS URL without relying on localhost.
3. Add the deployment host to MongoDB Atlas Network Access.
4. Use a production MongoDB connection string in `DB_URI_`.
5. Configure a verified Resend sender domain/address.
6. Confirm the deployment can download the classifier model on its first use.
7. Run `npm run build` before deploying.

Never commit `.env.local` or expose database, JWT, Auth.js, or Resend secrets.

## Current limitations

- The classifier's first use downloads a large model and can be slow.
- Analytics depend on activity data already saved for the selected period.
- Email delivery depends on Resend configuration and sender-domain verification.
- The application is designed for personal tracking rather than multi-user
  collaboration or shared workspaces.
