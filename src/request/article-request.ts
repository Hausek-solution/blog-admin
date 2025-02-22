import { AxiosResponse } from "axios"
import { axiosInstance } from "../context/axios-context"
import { AllArticles, ArticleMetrics, ArticleResponseType, Categories, CreateArticle, RecentArticles, Tags, UpdateArticle } from "../types/article-type"

export const getArticleMetrics = async () : Promise<AxiosResponse<ArticleMetrics, any> | string> => {
    try {
        const axiosResponse = await axiosInstance.get(`articles/metrics`)
        return axiosResponse
    } catch (e) {
        return ""
    }
}

export const getRecentArticles = async (limit: number) : Promise<AxiosResponse<RecentArticles[], any> | undefined> => {
    const response = axiosInstance.get(`articles/recent_articles?limit=${limit}`)
    return response
}

export const getRecentUpdated = async (limit: number) : Promise<AxiosResponse<RecentArticles[], any> | undefined> => {
    const response = axiosInstance.get(`articles/recently_updated?limit=${limit}`)
    return response
}

export const getArticlesBasedOnCategories = async (limit: number, category: Categories, skip: number) : Promise<AxiosResponse<RecentArticles[], any> | undefined> => {
    const response = axiosInstance.get(`articles/categories/${category}?limit=${limit}&skip=${skip}`)
    return response
}

export const getArticlebySlug = async (slug: string) : Promise<AxiosResponse<ArticleResponseType, any> | undefined> => {
    const response = axiosInstance.get(`articles/${slug}`)
    return response
}

export const getRelatedArticles = async (article_id: number, limit: number) : Promise<AxiosResponse<RecentArticles[], any> | undefined> => {
    const response = axiosInstance.get(`articles/${article_id}/related_article?limit=${limit}`)
    return response
}

export const getFeaturedArticles = async () : Promise<AxiosResponse<RecentArticles[], any> | undefined> => {
    const response = axiosInstance.get(`articles/featured_article`)
    return response
}


export const getAllArticles = async (limit: number, skip: number) : Promise<AxiosResponse<AllArticles, any> | undefined> => {
    const response = axiosInstance.get(`articles/all?limit=${limit}&skip=${skip}`)
    return response
}


export const getArticleByStatus = async (status: "draft" | "published" | "scheduled") : Promise<AxiosResponse<ArticleResponseType[], any> | undefined> => {
    const response = axiosInstance.get(`admin/get_article_by_status?status=${status}`)
    return response
}

export const createAnArticle = async (data: CreateArticle) : Promise<AxiosResponse<ArticleResponseType, any> | string> => {
    try {
        const response = axiosInstance.post('/articles/', data)
        return response
    } catch (e) {
        console.log(e)
    }
}

export const updateAnArticle = async (data: UpdateArticle) : Promise<AxiosResponse<ArticleResponseType, any> | string> => {
    try {
        const response = axiosInstance.put(`/articles/${data.article_id}`, data.data)
        return response
    } catch (e) {
        console.log(e)
    }
}

export const deleteAnArticle = async (article_id: number) : Promise<AxiosResponse<any, any> | string> => {
    try {
        const response = axiosInstance.delete(`/articles/${article_id}`)
        return response
    } catch (e) {
        console.log(e)
    }
}

export const getAllTags = async () : Promise<AxiosResponse<Tags[], any> | undefined> => {
    const response = axiosInstance.get(`articles/tags/all`)
    return response
}