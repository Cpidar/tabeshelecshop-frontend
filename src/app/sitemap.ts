import { getCollectionsList, getProductsList, listCategories } from '@/lib/data';

export const dynamic = 'force-dynamic'
export const revalidate = 0

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zackproser.com';

export default async function sitemap() {
    const {
        response: { products },
    } = await getProductsList({
        pageParam: 0,
        queryParams: { limit: 9999 },
        countryCode: 'ir'
    })

    const categories = await listCategories()
    const { collections } = await getCollectionsList()

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        // {
        //     url: `${baseUrl}/about`,
        //     lastModified: new Date(),
        //     changeFrequency: 'yearly',
        //     priority: 0.8,
        // },
        ...products.map(p => ({
            url: `${baseUrl}/ir/products/${p.handle}`,
            lastModified: p.updated_at,
            changeFrequency: 'daily',
            priority: 0.5
        })),
        ...categories.map(c => ({
            url: `${baseUrl}/ir/cotegories/${c.handle}`,
            lastModified: c.updated_at,
            changeFrequency: 'weekly',
            priority: 0.5
        })),
        ...collections.map(c => ({
            url: `${baseUrl}/ir/cotegories/${c.handle}`,
            lastModified: c.updated_at,
            changeFrequency: 'weekly',
            priority: 0.5
        }))
    ];
}

