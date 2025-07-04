import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import { buildConfig, PayloadRequest } from 'payload'
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
import { Carts } from './collections/Ecommerce/Carts'
import { Discounts } from './collections/Ecommerce/Discounts'
import { Orders } from './collections/Ecommerce/Orders'
import { Plans } from './collections/Ecommerce/Plans'
import { ProductCategories } from './collections/Ecommerce/ProductCategories'
import { ProductImages } from './collections/Ecommerce/ProductImages'
import { Products } from './collections/Ecommerce/Products'
import { Shipping } from './collections/Ecommerce/Shipping'
import { SubscriptionOrders } from './collections/Ecommerce/SubscriptionOrders'
import { Subscriptions } from './collections/Ecommerce/Subscriptions'
import { Faqs } from './collections/Faqs'
import { Gallery } from './collections/Gallery'
import { getServerSideURL } from './utils/getURL'
import { plugins } from './plugins'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const siteName = 'Verum Digital'
export const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'http://localhost:8000'
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
  admin: {
    components: {
      graphics: {
        Logo: './components/Logo/Logo#Logo',
        Icon: './components/Favicon',
      },
      Nav: './components/AdminNav#DefaultNav',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [
    Faqs,
    Gallery,
    Pages,
    Posts,
    Media,
    Categories,
    Users,
    // Ecommerce
    Products,
    Orders,
    Discounts,
    Carts,
    ProductCategories,
    ProductImages,
    Shipping,
    // Subscriptions
    Subscriptions,
    SubscriptionOrders,
    Plans,
  ],
  globals: [Settings, Header, Footer],
  plugins: [...plugins],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    }
  }),
  cors: [getServerSideURL()].filter(Boolean),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})