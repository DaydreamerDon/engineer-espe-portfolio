import type { CollectionSlug, Field, GlobalConfig } from 'payload'

import type { PortfolioIconName, PortfolioPluginOptions } from './types'

const iconOptions: Array<{ label: string; value: PortfolioIconName }> = [
  { label: 'Award', value: 'award' },
  { label: 'Badge Check', value: 'badge-check' },
  { label: 'Blocks', value: 'blocks' },
  { label: 'Clipboard Check', value: 'clipboard-check' },
  { label: 'Drafting Compass', value: 'drafting-compass' },
  { label: 'File Chart', value: 'file-chart-column' },
  { label: 'Hard Hat', value: 'hard-hat' },
  { label: 'Shield Check', value: 'shield-check' },
]

const imageUpload = (name: string, label: string, relationTo: string): Field => ({
  name,
  type: 'upload',
  admin: {
    description: 'Use a high-resolution landscape image with descriptive alternative text.',
  },
  filterOptions: {
    mimeType: {
      contains: 'image',
    },
  },
  label,
  relationTo: relationTo as CollectionSlug,
})

export const createPortfolioGlobal = ({
  mediaCollection,
  previewURL,
}: PortfolioPluginOptions): GlobalConfig => ({
  slug: 'portfolio',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    description: 'Edit the content shown on the public one-page portfolio.',
    group: 'Portfolio',
    hideAPIURL: false,
    ...(previewURL
      ? {
          livePreview: { url: previewURL },
          preview: () => previewURL,
        }
      : {}),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identity',
          fields: [
            {
              name: 'identity',
              type: 'group',
              fields: [
                { name: 'monogram', type: 'text', required: true },
                { name: 'fullName', type: 'text', required: true },
                { name: 'profession', type: 'text', required: true },
                { name: 'email', type: 'email', required: true },
                { name: 'location', type: 'text', required: true },
                { name: 'availability', type: 'text', required: true },
                {
                  name: 'resume',
                  type: 'upload',
                  admin: {
                    description: 'Optional PDF. The download action stays hidden until set.',
                  },
                  filterOptions: { mimeType: { equals: 'application/pdf' } },
                  relationTo: mediaCollection as CollectionSlug,
                },
                { name: 'resumeLabel', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Hero & Projects',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', required: true },
                { name: 'headline', type: 'textarea', required: true },
                { name: 'description', type: 'textarea', required: true },
                { name: 'primaryActionLabel', type: 'text', required: true },
                { name: 'secondaryActionLabel', type: 'text', required: true },
                imageUpload('image', 'Hero image', mediaCollection),
                {
                  name: 'currentProject',
                  type: 'group',
                  fields: [
                    { name: 'category', type: 'text', required: true },
                    { name: 'title', type: 'text', required: true },
                    { name: 'role', type: 'text', required: true },
                    { name: 'period', type: 'text', required: true },
                  ],
                },
              ],
            },
            {
              name: 'projects',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', required: true },
                {
                  name: 'featured',
                  type: 'group',
                  fields: [
                    { name: 'category', type: 'text', required: true },
                    { name: 'title', type: 'textarea', required: true },
                    { name: 'description', type: 'textarea', required: true },
                    { name: 'period', type: 'text', required: true },
                    imageUpload('image', 'Featured project image', mediaCollection),
                    {
                      name: 'tags',
                      type: 'array',
                      fields: [{ name: 'label', type: 'text', required: true }],
                      maxRows: 6,
                    },
                  ],
                },
                {
                  name: 'additional',
                  type: 'group',
                  fields: [
                    { name: 'code', type: 'text', required: true },
                    { name: 'category', type: 'text', required: true },
                    { name: 'title', type: 'textarea', required: true },
                    { name: 'description', type: 'textarea', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Experience',
          fields: [
            {
              name: 'experience',
              type: 'group',
              fields: [
                { name: 'heading', type: 'textarea', required: true },
                {
                  name: 'entries',
                  type: 'array',
                  fields: [
                    {
                      name: 'kind',
                      type: 'select',
                      defaultValue: 'role',
                      options: [
                        { label: 'Professional role', value: 'role' },
                        { label: 'Education', value: 'education' },
                      ],
                      required: true,
                    },
                    { name: 'dateRange', type: 'textarea', required: true },
                    { name: 'title', type: 'text', required: true },
                    { name: 'company', type: 'text', required: true },
                    { name: 'summary', type: 'textarea' },
                  ],
                  minRows: 1,
                },
              ],
            },
            {
              name: 'capabilities',
              type: 'group',
              fields: [
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    { name: 'icon', type: 'select', options: iconOptions, required: true },
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'text', required: true },
                  ],
                  maxRows: 6,
                  minRows: 1,
                },
                {
                  name: 'tools',
                  type: 'array',
                  fields: [{ name: 'label', type: 'text', required: true }],
                  maxRows: 12,
                },
                { name: 'exposure', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          label: 'Training',
          fields: [
            {
              name: 'training',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', required: true },
                {
                  name: 'groups',
                  type: 'array',
                  fields: [
                    {
                      name: 'style',
                      type: 'select',
                      options: [
                        { label: 'Navy', value: 'navy' },
                        { label: 'Paper', value: 'paper' },
                        { label: 'Pale blue', value: 'pale' },
                      ],
                      required: true,
                    },
                    { name: 'icon', type: 'select', options: iconOptions, required: true },
                    { name: 'eyebrow', type: 'text', required: true },
                    { name: 'title', type: 'text', required: true },
                    { name: 'count', type: 'text' },
                    {
                      name: 'items',
                      type: 'array',
                      fields: [{ name: 'label', type: 'text', required: true }],
                      maxRows: 8,
                      minRows: 1,
                    },
                  ],
                  maxRows: 3,
                  minRows: 1,
                },
              ],
            },
          ],
        },
        {
          label: 'Contact & SEO',
          fields: [
            {
              name: 'contact',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', required: true },
                { name: 'heading', type: 'text', required: true },
                { name: 'subheading', type: 'text', required: true },
                { name: 'footerMotto', type: 'text', required: true },
              ],
            },
            {
              name: 'seo',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                imageUpload('image', 'Social sharing image', mediaCollection),
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'seedVersion',
      type: 'number',
      admin: {
        hidden: true,
      },
    },
  ],
  label: 'Portfolio',
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    max: 50,
  },
})
