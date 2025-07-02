import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import { buildConfig } from 'payload'
import { Settings } from './Globals/Settings/config'
import { Media } from './collections/media'
import { Users } from './collections/Users'
import { fileURLToPath } from 'url'
import path from 'path'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { Header } from './modules/header/config'
import { Footer } from './modules/footer/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const siteName = 'Verum Digital'
export const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'http://localhost:3000'
export const emailSettings = {
  colors: {
    primary: '#f1c204',
    secondary: '#b7860b',
    tertiary: '#003366',
    textPrimary: '#222222',
    textSecondary: '#333333',
  },
}
export default buildConfig({
  // email: nodemailerAdapter({
  //   defaultFromAddress: process.env.SMTP_ADMIN_USER as string,
  //   defaultFromName: process.env.SMTP_ADMIN_NAME as string,
  //   transportOptions: {
  //     host: process.env.SMTP_ADMIN_HOST,
  //     port: 587,
  //     auth: {
  //       user: process.env.SMTP_ADMIN_USER,
  //       pass: process.env.SMTP_ADMIN_PASS,
  //     },
  //   },
  // }),
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [
    // Faqs,
    // Gallery,
    Pages,
    Posts,
    Media,
    Categories,
    Users,
    // // Ecommerce
    // Products,
    // Orders,
    // Discounts,
    // Carts,
    // ProductCategories,
    // ProductImages,
    // Shipping,
    // // Subscriptions
    // Subscriptions,
    // SubscriptionOrders,
    // Plans,
  ],
  globals: [Settings, Header, Footer],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    }
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
})