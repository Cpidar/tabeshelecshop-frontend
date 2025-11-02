// import { type NextRequest } from 'next/server'
// import jwt from 'jsonwebtoken';

// export function GET(request: NextRequest) {
//     const searchParams = request.nextUrl.searchParams
//     const token = searchParams.get('token')
//     console.log(token)
//     if (!token) return new Response('Missing token', { status: 400 })

//     try {
//         // Verify Medusa JWT
//         const decoded = jwt.verify(token, process.env.MEDUSA_JWT_SECRET) as { email: string; /* other claims */ };

//         // Find user by email (synced)
//         const user = await payload.find({
//             collection: 'users',
//             where: { email: { equals: decoded.email } },
//             depth: 0,
//         }).docs[0];

//         if (!user) return res.status(401).send('User not found');

//         // Log in and set session cookie
//         await loginToJWT({
//             req,
//             res,
//             collection: payload.collections['users'],
//             user,
//         });

//         // Redirect to dashboard
//         res.redirect('/admin');
//     } catch (error) {
//         res.status(401).send('Invalid token');
//     }
// });
//     },}