import { config, fields, collection, component } from '@keystatic/core';
import { formatDate } from './utils';

export default config({
  ui: {
    brand: { name: 'sungryeol blog and portfolio' },
  },
  storage: { kind: 'local' },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'slug',
      // previewUrl: '/preview/start?branch={branch}&to=/posts/{slug}'
      previewUrl: '/posts/{slug}',
      path: '/src/content/posts/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.text({ label: 'Title' }),
        slug: fields.text({ label: 'slug' }),
        visible: fields.checkbox({ label: 'visible', defaultValue: true }),
        publishedAt: fields.datetime({
          label: 'Published Time (UTC)',
          defaultValue: formatDate(new Date(), 'YYYY-MM-DDTHH:MM', {
            utc: true,
          }),
        }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            // path
            directory: 'public/posts',
            // url
            publicPath: '/posts/',
          },
          tables: true,
        }),
        tags: fields.array(
          fields.relationship({
            label: 'Tag',
            collection: 'tags',
            validation: { isRequired: true },
          }),
          {
            label: 'Tag',
            itemLabel: (props) => props.value ?? 'select a tag',
          }
        ),
      },
    }),
    tags: collection({
      label: 'Tags',
      slugField: 'value',
      path: '/src/content/tags/*',
      schema: {
        label: fields.text({ label: 'Label' }),
        value: fields.text({ label: 'Value' }),
      },
    }),
    works: collection({
      label: 'Works',
      slugField: 'slug',
      previewUrl: '/works/{slug}',
      path: '/src/content/works/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.text({ label: 'Title' }),
        titleKr: fields.text({ label: 'Title (한국어)' }),
        slug: fields.text({ label: 'Slug' }),
        visible: fields.checkbox({ label: 'visible', defaultValue: true }),
        publishedAt: fields.date({
          label: 'Published Date (UTC)',
          defaultValue: formatDate(new Date(), 'YYYY-MM-DDTHH:MM', {
            utc: true,
          }),
        }),
        publishedAtType: fields.select({
          label: 'Published Date Type',
          options: [
            { label: 'No Disclose', value: 'no-disclose' },
            { label: 'Year, Month', value: 'year-month' },
            { label: 'Year Only', value: 'year' },
          ],
          defaultValue: 'year-month',
        }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/works',
            publicPath: '/works/',
          },
          tables: true,
        }),
        urls: fields.array(
          fields.url({ label: 'URL', validation: { isRequired: true } }),
          { label: 'URLs', itemLabel: (props) => props.value ?? 'empty url' }
        ),
        tags: fields.array(
          fields.relationship({
            label: 'Tag',
            collection: 'tags',
            validation: { isRequired: true },
          }),
          {
            label: 'Tag',
            itemLabel: (props) => props.value ?? 'select a tag',
          }
        ),
        videos: fields.array(
          fields.url({ label: 'URL', validation: { isRequired: true } }),
          {
            label: 'Video URLs',
            itemLabel: (props) => props.value ?? 'empty url',
          }
        ),
      },
    }),
  },
  singletons: {
    contact: collection({
      label: 'Contact',
      // @ts-ignore
      path: '/src/content/contact',
      previewUrl: '/contact',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
          tables: true,
        }),
        // urls: fields.array(
        //   fields.url({ label: 'URL', validation: { isRequired: true } }),
        //   {
        //     label: 'URLs',
        //     itemLabel: (props) => props.value ?? 'empty url',
        //   }
        // ),
      },
    }),
  },
});
