# Documentation Hub 

Documentation Hub  is a dynamic, MongoDB-powered documentation platform that empowers you to create, manage, and share technical docs and code snippets with clarity and ease. Built for collaboration, bDoci helps you organize ideas, inspire innovation, and streamline your documentation workflow.

## Features

- 🌟 Elegant web interface for browsing and searching documentation
- 📝 Create, edit, and manage docs with code snippets (admin access)
- 🔍 Powerful search and filtering for quick access
- 🌗 Light/Dark theme toggle for comfortable reading
- 🗂️ Code highlighting and easy copy-to-clipboard
- 🛡️ Admin authentication for secure doc creation
- 📦 RESTful endpoints for health checks and status
- 🚀 Ready for deployment on Vercel or any Node.js environment

## Getting Started

### Prerequisites

- Node.js 18.x
- MongoDB database (local or cloud)
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Bimbok/documentationHub.git
   cd documentationHub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the root directory:
     ```
     MONGODB_URI=your_mongodb_connection_string
     ADMIN_USERNAME=your_admin_username
     ADMIN_PASSWORD=your_admin_password
     NODE_ENV=development
     ```

4. **Run the app:**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`.

### Admin Access

- Visit `/admin` to log in and create new documentation.
- Use the credentials set in your `.env` file.

## Deployment

bDoci is ready for Vercel deployment. See `vercel.json` for configuration.  
To deploy elsewhere, ensure your environment variables are set and run with Node.js.

## Project Structure

- `app.js` – Main server and routes
- `views/` – EJS templates for UI
- `public/` – Static assets (logo, CSS, etc.)
- `package.json` – Dependencies and scripts

## License

ISC

---

Craft, share, and inspire with bDoci – your launchpad for organized, collaborative documentation!
