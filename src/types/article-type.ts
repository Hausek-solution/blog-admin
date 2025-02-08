export type ArticleResponseType = {
    "title": string,
    "content": string,
    "featured_image": string,
    "status": "draft" | "published" | "scheduled",
    "published_at": string | null,
    "tags": Tags[],
    "categories": "blog" | "research",
    "is_featured": boolean,
    "id": number,
    "slug": string,
    "created_at": string,
    "updated_at": string
    
}

type Tags = {
    "name": string
}

export type Categories = "blog" | "research"

export type RecentArticles = {
    "id": number,
    "title": string,
    "slug": string,
    "published_at": string | null,
    "featured_image": string,
    "updated_at": string | null,
    "categories": "research" | "blog",
    "is_featured": boolean
}