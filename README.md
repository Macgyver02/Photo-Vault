# Photo Vault

A beautiful, secure photo storage application built with React, TypeScript, and Supabase.

## Features

- User authentication (login and registration)
- Secure photo storage with proper access controls
- Photo upload with drag and drop support
- Automatic photo organization by date and event
- Background animation videos for photo viewing
- Admin dashboard for viewing all user photos
- Responsive design for all devices

## Tech Stack

- React with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Supabase for auth, storage, and database
- React Router for navigation
- Zustand for state management

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Connect to Supabase:
   - Create a Supabase account and create a new project
   - Copy your Supabase URL and anon key
   - Create a `.env` file in the root directory based on `.env.example`
   - Add your Supabase credentials to the `.env` file

4. Run the migrations:
   - In your Supabase project, go to the SQL Editor
   - Run the SQL migrations from `supabase/migrations/create_initial_schema.sql`

5. Set up storage:
   - In your Supabase project, go to Storage
   - Create a new bucket named `photos`
   - Set up the appropriate security policies

6. Start the development server:
   ```
   npm run dev
   ```

## Deployment

To deploy the application:

1. Build the application:
   ```
   npm run build
   ```

2. Deploy the build directory to your hosting service of choice.

## License

MIT# Photo-Vault
# Photo-Vault
