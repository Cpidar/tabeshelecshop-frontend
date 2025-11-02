import { CollectionConfig } from "payload"

export const Gallery: CollectionConfig = {
  slug: "galleries",
  admin: {
    useAsTitle: "name",
    group: "Website",
  },
  access: {
    create: () => true,
    read: () => true,
  },
  upload: {
    staticDir: "public",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        position: "centre",
      },
      {
        name: "tablet",
        width: 1024,
        height: undefined,
        position: "centre",
      },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
    pasteURL: {
      allowList: [
        {
          protocol: "http",
          hostname: "localhost",
        },
        {
          protocol: "https",
          hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
        },
        {
          protocol: "https",
          hostname: "medusa-server-testing.s3.amazonaws.com",
        },
        {
          protocol: "https",
          hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
        },
      ],
    },
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "text",
      label: "Gallery Description",
      type: "textarea",
      required: true,
    },

    {
      name: "images",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      required: true,
    },
  ],
}
