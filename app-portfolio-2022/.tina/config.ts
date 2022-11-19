import { defineConfig } from 'tinacms';

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.TINA_HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main';

const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? '';
const token = process.env.TINA_TOKEN ?? '';

console.log('NEXT_PUBLIC_TINA_CLIENT_ID', clientId.slice(0, 2));
console.log('TINA_TOKEN', token.slice(0, 2));

export default defineConfig({
  branch,
  clientId, // Get this from tina.io
  token, // Get this from tina.io
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'page',
        label: 'Pages',
        path: 'content/pages',
        fields: [
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
            templates: [
              {
                name: 'ContactItem',
                label: 'Contact Link',
                fields: [
                  { name: 'link', type: 'string', label: 'Link Url' },
                  { name: 'label', type: 'string', label: 'Label' },
                  {
                    name: 'icon',
                    type: 'string',
                    label: 'Icon',
                    options: [
                      { label: 'CodePen', value: 'codepen' },
                      { label: 'Codesandbox', value: 'codesandbox' },
                      { label: 'Github', value: 'github' },
                      { label: 'Instagram', value: 'instagram' },
                      { label: 'LinkedIn', value: 'linkedin' },
                      { label: 'ObservableHQ', value: 'observable' },
                      { label: 'Stackoverflow', value: 'stackoverflow' },
                      { label: 'Link', value: 'link-skewed' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        ui: {
          router: ({ document }) => `/${document._sys.filename}`,
        },
      },
      {
        name: 'post',
        label: 'Posts',
        path: 'content/posts',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            list: true,
            description: 'a tag should be machine-readable',
          },
          {
            type: 'datetime',
            name: 'datePublish',
            label: 'Published Date',
            required: true,
            ui: {
              dateFormat: 'YYYY-MM-DD',
              defaultItem: () => new Date(),
            },
          },
        ],
        ui: {
          router: ({ document }) => `/posts/${document._sys.filename}`,
        },
      },
      {
        name: 'work',
        label: 'Works',
        path: 'content/works',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title(English)',
          },
          {
            type: 'string',
            name: 'titleKr',
            label: 'Title(Korean)',
          },
          {
            type: 'string',
            name: 'url',
            label: 'Url',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
            templates: [
              {
                name: 'Video',
                label: 'Video',
                fields: [
                  { type: 'string', name: 'url', label: 'Video Url(Vimeo)' },
                ],
              },
              {
                name: 'MockPhone',
                label: 'Mobile Screenshot',
                fields: [{ type: 'image', name: 'image', label: 'image' }],
              },
              {
                name: 'MockWindow',
                label: 'Desktop Screenshot',
                fields: [{ type: 'image', name: 'image', label: 'image' }],
              },
            ],
          },
        ],
        ui: {
          router: ({ document }) => `/works/${document._sys.filename}`,
        },
      },
    ],
  },
});
