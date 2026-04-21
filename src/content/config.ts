import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Adams Summit Partners'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const deals = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    location: z.string(),
    assetClass: z.string(),
    units: z.union([z.number(), z.string()]).optional(),
    status: z.enum(['Active', 'Exited', 'Coming Soon', 'Sample']),
    acquiredDate: z.coerce.date().optional(),
    heroImage: z.string(),
    summary: z.string(),
    order: z.number().default(100),
    featured: z.boolean().default(false),
  }),
});

const team = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    photo: z.string().optional(),
    order: z.number().default(100),
  }),
});

export const collections = { blog, deals, team };
