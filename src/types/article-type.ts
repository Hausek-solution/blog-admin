import { number } from "zod"

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

export type AllArticles = {
    total: number,
    articles: ArticleResponseType[]
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
    "is_featured": boolean,
    "status": "draft" | "published" | "scheduled",

}
export type ArticleMetrics = {
    "article_count": number,
    "published": number,
    "draft": number,
    "scheduled": number,
    "blog_count": number,
    "research_count": number
}