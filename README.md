# Utaite Wiki Discussions Archive

A modern web app designed to archive, browse, and explore community discussions from the old Utaite Wiki. This project currently serves as a read-only archive, allowing users to navigate through historic threads, posts, polls, and user activities.

## 🚀 Tech Stack

This project is built with **Next.js 16** and **React 19**:

- **Framework:** [Next.js 16](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [Shadcn/ui](https://ui.shadcn.com/) (built on [Radix UI](https://www.radix-ui.com/))
- **Icons:** [Lucide React](https://lucide.dev/)
- **Database:** [Turso](https://turso.tech/) (LibSQL)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest) (React Query)
- **Package Manager:** [pnpm](https://pnpm.io/)

## ✨ Features

- **Interactive Dashboard:** comprehensive overview of the archive, featuring statistics on threads, posts, active users, and popular artists.
- **Forum Navigation:** Browse discussions organized by forums and sub-forums.
- **Thread Viewer:** Read full discussion threads with rich text content, author details, and timestamps.
- **User Profiles:** Explore user activity, contribution stats, and history.
- **Polls:** View historical poll results associated with threads.
- **Artist Tracking:** Insights into the most discussed artists within the community.
- **Search:** Functionality to search across threads and posts.
- **Responsive Design:** Fully optimized for mobile and desktop devices.

## 🛠️ Getting Started

### Prerequisites

- **Node.js**: Version 20 or higher is recommended.
- **pnpm**: This project uses pnpm for dependency management.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/arknokiseki/utaite-wiki-forum-archive.git
    cd utaite-wiki-forum-archive
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory. You will need credentials for your Turso database.
    ```bash
    cp .env.example .env
    ```
    
    Add the following variables to your `.env` file:
    ```env
    TURSO_DATABASE_URL=libsql://your-database-url.turso.io
    TURSO_AUTH_TOKEN=your-auth-token
    ```

4.  **Run the Development Server:**
    ```bash
    pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure


```

├── app/                # Next.js App Router pages and API routes
│   ├── api/            # Backend API endpoints (stats, forums, threads, etc.)
│   ├── artists/        # Artist listing pages
│   ├── forums/         # Forum navigation pages
│   ├── threads/        # Individual thread pages
│   └── users/          # User profile pages
├── components/         # React components
│   ├── dashboard/      # Dashboard-specific widgets (stats, charts)
│   ├── layout/         # Global layout (Header, Sidebar, Footer)
│   ├── shared/         # Reusable utility components
│   └── ui/             # Shadcn UI primitives
├── hooks/              # Custom React hooks (React Query wrappers)
├── lib/                # Utility functions and database configuration
│   └── queries/        # SQL queries split by domain
├── types/              # TypeScript interface definitions
└── public/             # Static assets

```

## 📜 Scripts

- `pnpm dev`: Starts the development server.
- `pnpm build`: Builds the application for production.
- `pnpm start`: Starts the production server.
- `pnpm lint`: Runs ESLint to catch code issues.
- `pnpm format`: Formats code using Prettier.

## 🤝 Contributing

Contributions are welcome! Please ensure that you lint and format your code before submitting a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

The application code is licensed under [Prosperity Public License 3.0.0](https://prosperitylicense.com/versions/3.0.0). The archive content is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).