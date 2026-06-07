## Track My Day

Track My Day is a personal activity tracking app built with Next.js. It lets a user log what they did across the day, assign each activity to a category, and review trends through charts and summaries over 1, 3, or 7 days.

## What It Does

- Secure sign up and login with NextAuth credentials
- Email verification for new accounts through Resend and JWT links
- MongoDB-backed storage for users, categories, and daily activity logs
- Date-based activity entry with half-hour time slots
- Category management from the profile page
- Activity analytics with bar charts and stacked charts
- Activity filtering by category and by time range

## Tech Stack

- Next.js 15 with the App Router
- React 19
- NextAuth v5
- MongoDB and Mongoose
- Resend for verification emails
- Recharts for analytics
- react-select and react-datepicker for UI controls

## Project Structure

- `app/` - App Router pages and API routes
- `Components/` - Shared UI components such as the header, date display, and time grid
- `Contexts/` - Global state for activity and category data
- `hooks/` - Session and route guard helpers
- `lib/` - Database services and Mongoose models
- `utils/` - Shared client and server helpers

## Main Pages

- `/` - Main dashboard for selecting a date and editing activities
- `/login` - Login form
- `/signup` - Account creation form
- `/verify` - Email verification landing page
- `/profile` - Profile and category management
- `/myactivities` - Activity analytics and charts

## API Routes

- `POST /api/user/signup` - Create a new user and send a verification email
- `POST /api/verify` - Verify a user from the email token
- `GET /api/user/[userId]` - Fetch the user email and category list
- `POST /api/activity` - Save categorized activity entries
- `GET /api/activity/[userId]/[date]?days=1|3|7` - Fetch daily or multi-day activity data
- `GET /api/category/[userId]` - Fetch the category list for a user
- `GET /api/auth/*` - NextAuth session and credential handling

## Data Model

- `User` stores email, hashed password, verification state, category list, and a reference to the user activity document
- `Activity` stores daily entries grouped by date, with each time slot holding a category and a free-text activity value

## Environment Variables

The codebase uses the following environment variables:

- `APP_URL` - Base URL used to build verification links and internal API requests
- `DB_URI_` - MongoDB connection string
- `JWT_SECRET` - Secret used to sign and verify email verification tokens
- `RESEND_API` - Resend API key for sending verification emails

Create a `.env.local` file in the project root with values like:

```env
APP_URL=http://localhost:3000
DB_URI_=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
RESEND_API=your_resend_api_key
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.



