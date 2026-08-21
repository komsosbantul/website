import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/data'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/'], // Block search engines from indexing the admin dashboard
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
