import { config, collection, singleton, fields } from "@keystatic/core"
import { ProductCategory } from "@medusajs/medusa"

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
      "Store Config": ["settings", "homepage"],
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

        SEO: fields.object(
          {
            siteName: fields.text({ label: "Site Name" }),
            siteTitle: fields.text({ label: "Site Title" }),
            description: fields.text({ label: "Description" }),
            favicon: fields.image({
              label: "Favicon",
              directory: "public/assets",
              publicPath: "/assets/",
            }),
          },
          {
            label: "SEO",
            description: "The address of the user",
            layout: [6, 6, 12, 12],
          }
        ),

        header: fields.object(
          {
            topBar: fields.conditional(
              // First, we define a checkbox to drive the yes/no condition
              fields.checkbox({ label: "Enable Topbar", defaultValue: false }),
              // Then, we provide a set of fields for both the `true` and `false` scenarios
              {
                true: fields.object(
                  {
                    description: fields.text({ label: "Title" }),
                    buttonText: fields.text({ label: "Button Text" }),
                    buttonLink: fields.url({ label: "Link" }),
                  },
                  {
                    label: "Topbar Contents",
                    layout: [12, 6, 6],
                  }
                ),
                // Empty fields are useful to show... no fields!
                false: fields.empty(),
              }
            ),
            navigationMenu: fields.array(
              fields.object({
                id: fields.empty(),
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
            CTA: fields.text({ label: "Call to Action Phone No." }),
          },
          {
            label: "Header",
            description: "Header Settings",
          }
        ),

        footer: fields.object(
          {
            title: fields.text({ label: "Footer title" }),
            description: fields.text({ label: "Description", multiline: true }),
            socials: fields.array(
              fields.object(
                {
                  icon: fields.image({
                    label: "Icon",
                    directory: "public/assets",
                    publicPath: "/assets/",
                  }),
                  name: fields.text({ label: "Name" }),
                  href: fields.url({ label: "Link" }),
                },
                {
                  label: "Socials List",
                  layout: [12, 6, 6],
                }
              ),
              {
                label: "Social Links",
                itemLabel: (props) => props.fields.name.value,
              }
            ),
          },
          {
            label: "Footer",
            description: "Footer Settings",
            layout: [12, 12, 12],
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
        homePageCategories: fields.object({
          title: fields.text({
            label: "Section Title",
          }),
          items: fields.array(
            fields.object(
              {
                name: fields.text({
                  label: "Name",
                  description: "The name of category",
                }),
                href: fields.url({
                  label: "Link",
                  description: "The address of category",
                }),
                icon: fields.image({
                  label: "Icon",
                  directory: "public/assets/images",
                  publicPath: "/assets/images/",
                }),
              },
              {
                label: "Add Category Item",
                layout: [6, 6, 12],
              }
            ),
            {
              label: "Section Items",
              itemLabel: (props) => props.fields.name.value,
            }
          ),
        }, {
          label: "Home Page Category Section"
        }),
      },
    }),
  },
})
