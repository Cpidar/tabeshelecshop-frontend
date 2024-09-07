import { config, collection, singleton, fields } from "@keystatic/core"
import { ProductCategory } from "@medusajs/medusa"

let categoryies: ProductCategory[] = []
const getCategories = async (parentCategoryHandle: string) => {
  const parentCategoryId = await fetch(
    `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/product-categories?handle=${parentCategoryHandle}`
  )
    .then((res) => res.json())
    .then((res) => res.product_categories[0])
    .then((res) => res.id)

  await fetch(
    `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/product-categories?parent_category_id=${parentCategoryId}`
  )
    .then((res) => res.json())
    .then((res) => (categoryies = res.product_categories))
}

console.log(categoryies)

getCategories("main")

export default config({
  // storage: {
  //   kind: 'github',
  //   repo: 'Cpidar/keystatic-test-repo',
  // },
  ui: {
    brand: {
      name: "Dev: Next.js (app)",
    },
    navigation: {
      Contents: ["singlefileposts"],
      "Store Config": ["settings", "menu", "homepage"],
    },
  },
  storage: {
    kind: "local",
  },
  collections: {
    singlefileposts: collection({
      label: "Posts",
      path: "public/content/posts/*/",
      slugField: "slug",
      format: { contentField: "content" },
      schema: {
        title: fields.text({ label: "Title" }),
        slug: fields.text({ label: "Slug" }),
        content: fields.markdoc({
          label: "Content",
        }),
      },
    }),
  },
  singletons: {
    settings: singleton({
      label: "Settings",
      path: "public/content/store-config/setting",
      schema: {
        logo: fields.image({ label: "Logo" }),
        topBar: fields.conditional(
          // First, we define a checkbox to drive the yes/no condition
          fields.checkbox({ label: "Enable Topbar", defaultValue: false }),
          // Then, we provide a set of fields for both the `true` and `false` scenarios
          {
            true: fields.object({
              description: fields.text({ label: "Title" }),
              buttonText: fields.text({ label: "Button Text" }),
              buttonLink: fields.url({ label: "Link" }),
            }),
            // Empty fields are useful to show... no fields!
            false: fields.empty(),
          }
        ),
      },
    }),
    homepage: singleton({
      label: "HomePage",
      path: "public/content/store-config/homepage",
      schema: {
        homePageHeroSlider: fields.array(
          fields.object({
            image: fields.image({
              label: "Backgroun Image",
              directory: "public/assets/images",
              publicPath: "/assets/images/",
            }),
            title: fields.text({ label: "Title" }),
            subtitle: fields.text({ label: "Subtitle" }),
            buttonText: fields.text({ label: "Button Text" }),
            buttonLink: fields.url({ label: "Link" }),
          }),
          {
            label: "Home Page Hero Slider (Left Hero)",
            itemLabel: (props) => props.fields.title.value,
          }
        ),
        homePageHeroRight: fields.object(
          {
            image: fields.image({
              label: "Backgroun Image",
              directory: "public/assets/images",
              publicPath: "/assets/images/",
            }),
            title: fields.text({ label: "Title" }),
            subtitle: fields.text({ label: "Subtitle" }),
            buttonText: fields.text({ label: "Button Text" }),
            buttonLink: fields.url({ label: "Link" }),
          },
          {
            label: "Home Page Right Hero",
            layout: [12, 6, 6, 6, 6],
          }
        ),
        homePageCategories: fields.array(
          fields.object({
            name: fields.select({
              label: "Role",
              description: "The person's role at the company",
              options: [
                { label: "Test", value: "test" },
                ...categoryies.map((c) => ({ label: c.name, value: c.handle })),
              ],
              defaultValue: categoryies[0]?.handle || "test",
            }),
            icon: fields.image({
              label: "Icon",
              directory: "public/assets/images",
              publicPath: "/assets/images/",
            }),
          }),
          {
            label: "Home Page Category Section",
            itemLabel: (props) => props.fields.name.value,
          }
        ),
      },
    }),
    menu: singleton({
      label: "Menu",
      path: "public/content/store-config/menu",
      schema: {
        navigationMenu: fields.array(
          fields.object({
            name: fields.text({ label: "Name" }),
            href: fields.url({ label: "Link" }),
            type: fields.select({
              label: "Type",
              description: "The person's role at the company",
              options: [
                { label: "None", value: "none" },
                { label: "Mega Menu", value: "megaMenu" },
                { label: "Dropdown", value: "dropdown" },
              ],
              defaultValue: "none",
            }),
          }),
          {
            label: "Navigation Menu Items",
            itemLabel: (props) => props.fields.name.value,
          }
        ),
        footerMenu01: fields.array(
          fields.object({
            name: fields.text({ label: "Name" }),
            href: fields.url({ label: "Link" }),
          }),
          {
            label: "Footer Menu No.1",
            itemLabel: (props) => props.fields.name.value,
          }
        ),
        footerMenu02: fields.array(
          fields.object({
            name: fields.text({ label: "Name" }),
            href: fields.url({ label: "Link" }),
          }),
          {
            label: "Footer Menu No.2",
            itemLabel: (props) => props.fields.name.value,
          }
        ),
      },
    }),
  },
})
