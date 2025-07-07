# idp-admin-dashboard

## overview

- idp-admin-dashboard

## backend-server
x
https://github.com/hirokazu-kobayashi-koba-hiro/idp-server

## Getting Started

rename env-template to .env

and set AUTH_SECRET

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

debug
```shell
http://localhost:3000/invitation/?invitation_id=123&invitation_tenant_id=123

http://localhost:3000/invitation/?invitation_id=41614722-b8d6-46d1-811c-2c084848c3d2&invitation_tenant_id=67e7eae6-62b0-4500-9eff-87459f63fc66
```

### Libraries

- FW
  - Next.js
- Authentication
  - Auth.js
- State Management
  - TanStack Query

#### Next Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
