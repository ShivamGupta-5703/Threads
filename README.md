<div align="center">
  <br />
    <a href="#" target="_blank">
      <img src="https://github.com/ShivamGupta-5703/Threads/assets/134150130/07d3115c-5e28-46c7-8624-a484cb43fe0f" alt="Project Banner">
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logoColor=white&logo=mongodb&color=47A248" alt="mongodb" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Clerk-black?style=for-the-badge&logoColor=white&logo=clerk&color=6C47FF" alt="clerk" />
    <img src="https://img.shields.io/badge/-Shadcn_UI-black?style=for-the-badge&logoColor=white&logo=shadcnui&color=000000" alt="shadcnui" />
    <img src="https://img.shields.io/badge/-Zod-black?style=for-the-badge&logoColor=white&logo=zod&color=3E67B1" alt="zod" />
    <img src="https://img.shields.io/badge/-Typescript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
  </div>

  <h3 align="center">A full stack Threads Clone</h3>
</div>

## <a name="introduction">🤖 Introduction</a>

A full stack Threads clone using Next.js 14+ with  user interaction to community management, technical implementation, and various features, including nested deep comments, notifications, real-time-search, and more.  

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- MongoDB
- Shadcn UI
- TailwindCSS
- Clerk
- Webhooks
- Serverless APIs
- React Hook Form
- Zod
- TypeScript

## <a name="features">🔋 Features</a>

👉 1. **Authentication**: Authentication using Clerk for email, password, and social logins (Google and GitHub) with a comprehensive profile management system.

👉 2. **Visually Appealing Home Page**: A visually appealing home page showcasing the latest threads for an engaging user experience.

👉 3. **Create Thread Page**: A dedicated page for users to create threads, fostering community engagement

👉 4. **Commenting Feature**: A commenting feature to facilitate discussions within threads.

👉 5. **Nested Commenting**: Commenting system with nested threads, providing a structured conversation flow.

👉 6. **User Search with Pagination**: A user search feature with pagination for easy exploration and discovery of other users.

👉 7. **Activity Page**: Display notifications on the activity page when someone comments on a user's thread, enhancing user engagement.

👉 8. **Profile Page**: User profile pages for showcasing information and enabling modification of profile settings.

👉 9. **Create and Invite to Communities**: Allow users to create new communities and invite others using customizable template emails.

👉 10. **Community Member Management**: A user-friendly interface to manage community members, allowing role changes and removals.

👉 11. **Admin-Specific Community Threads**: Enable admins to create threads specifically for their community.

👉 12. **Community Search with Pagination**: A community search feature with pagination for exploring different communities.

👉 13. **Community Profiles**: Display community profiles showcasing threads and members for a comprehensive overview.

👉 14. **Blazing-Fast Performance**: Optimal performance and instantaneous page switching for a seamless user experience.

👉 15. **Server Side Rendering**: Utilize Next.js with Server Side Rendering for enhanced performance and SEO benefits.

👉 16. **MongoDB with Complex Schemas**: Handle complex schemas and multiple data populations using MongoDB.

👉 17. **File Uploads with UploadThing**: File uploads using UploadThing for a seamless media sharing experience.

👉 18. **Real-Time Events Listening**: Real-time events listening with webhooks to keep users updated.

👉 19. **Middleware, API Actions, and Authorization**: Utilize middleware, API actions, and authorization for robust application security.

👉 20. **Next.js Layout Route Groups**: New Next.js layout route groups for efficient routing

👉 21. **Data Validation with Zod**: Data integrity with data validation using Zod

👉 22. **Form Management with React Hook Form**: Efficient management of forms with React Hook Form for a streamlined user input experience.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
https://github.com/ShivamGupta-5703/Threads.git
cd threads
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
MONGODB_URL=
CLERK_SECRET_KEY=
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
NEXT_CLERK_WEBHOOK_SECRET=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
```

Replace the placeholder values with your actual credentials. You can obtain these credentials by signing up for the corresponding websites on [MongoDB](https://www.mongodb.com/), [Clerk](https://clerk.com/), and [Uploadthing](https://uploadthing.com/). 

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
