# E-mail only authentication

## Contents:

1. [Theory](#theory)
1. [Server Actions](#server-actions)
1. [Tech Stack](#tech-stack)
1. [File Structure Setup](#file-structure-setup)
1. [Login and Registration Flow](#login-and-registration-flow)
1. [Database](#database)
1. [User Update Functionality](#user-update-functionality)
1. [Future Improvements](#future-improvements)

## Theory

When a user logs in or registers, they receive a unique **_"magic link"_** via email. Clicking this link verifies their identity and automatically logs them into the site, without needing to remember a password ✌.

## Server Actions

In this project, I implemented email-only authentication using server actions to handle magic link requests. When a user attempts to log in, the server generates a unique link and emails it to the user. Once clicked, this link verifies the user and logs them in.

The same logic could be implemented using API routes; the only difference would be in how the client-side calls it. For server actions, the call is direct, while with API routes, the client would make a request to the specified endpoint.

## Tech Stack

This project uses the following technologies:

- Next.js (^14.2.16)
- Typescript (^5)
- React hook form
- ShadCN
- Jose (For JWT Tokens)
- MongoDB (with Mongoose)
- Nodemailer
- Server only
- Zod

You can create a new Next.js project using the following command

```bash
npx create-next-app@latest
```

To add ShadCN, use:

```bash
npx shadcn@latest init
```

Then, install the remaining dependencies:

```bash
npm i react-hook-form jose mongoose nodemailer server-only zod
npm i -D @types/nodemailer
```

## File Structure Setup

1. Copy the contents of the `/app/auth` directory from this repository into your project's `/app/auth` directory.
2. Add the following items at the root of your project:
   - `middleware.ts` file
   - `/types` directory
   - `/features/auth` directory
3. Create a `/lib` directory and add two files: `constants.ts` and `index.ts`. Copy the code below into each respective file:

```typescript
/* /lib/constants.ts */
export const profileServerUrl = "/profile/server";
export const registerUrl = "/auth/register";
export const loginUrl = "/auth/login";

/* /lib/index.ts */
export * from "constants.ts"
```

Finally, add the following environment variables in your project.

```typescript
JWT_SECRET = "" // openssl rand -base64 32
DATABASE_URL = ""

MAIL_PASS = ""
MAIL = ""
MAIL_SERVICE = ""
```

## Login and Registration Flow

The `login` and `register` components are located inside the `/app/auth` directory. When a user registers or logs in, the appropriate server action is triggered to perform the `login` or `register` process. After the action completes, the system sends an email with a token link, allowing the user to complete their login by verifying their identity.

- **Server Actions**: Located in `/features/auth/actions`, these handle the core logic for login and registration.
- **Email Sending**: The `sendMail` function, found in `/features/auth/lib`, sends the token link to the user's email.

Upon clicking the login link in the email, the user is directed to a verification page. This page validates the token from the email link, and if successful, logs the user into the application.

## Database

Our implementation uses MongoDB as the database, but this can be adapted to other databases as needed. When connecting to the database, ensure that all server actions establish a valid connection before executing queries or mutations.

- **User Model**: Our `userModel` includes a username and email. These details are also stored in the JWT to retrieve user information on the client side. If additional fields are necessary, update the user model and JWT contents accordingly to accommodate them.

## User Update Functionality

The user update flow is straightforward. After a user updates their account, a new JWT token is generated with the updated fields, replacing the previous token to reflect the latest changes in the application.

## Future Improvements

To enhance security and data integrity, consider implementing these improvements:

- **Email Change Verification**: When a user updates their email, check that the new email isn’t already registered. After updating, prompt the user to re-login using their new email. This step confirms the user’s identity as the owner of the updated email and ensures the validity of the provided address.
