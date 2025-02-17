import { useEffect, useState } from "react"
import { getArticleMetrics } from "../../request/article-request"
import { AxiosResponse } from "axios"
import { ArticleMetrics } from "../../types/article-type"
import LoadingSpinner from "../loader"

const DashboardStats = () => {
    const [articleMetricsLoadinng, setArticleMetricsLoading]= useState(false)
    const [metricsData, setMetricsData] = useState<ArticleMetrics>(null)

    const fetchArticleMterics = async () => {
        setArticleMetricsLoading(true)
        const response = await getArticleMetrics()

        const axioResponse = response as AxiosResponse<ArticleMetrics, any>
        if (axioResponse.status === 200) {
            setMetricsData(axioResponse.data)
        }

        setArticleMetricsLoading(false)
    }

    useEffect(() => {
        fetchArticleMterics().then()
    }, [])

    return (
        <>
            <div className="font-outfit mini:pl-6 mini:border-l border-gray-400">
                <div className=" text-xl mb-9">Aticles summary</div>
                <div className="flex flex-col gap-y-4">

                    { articleMetricsLoadinng ?
                        <div className="py-7 flex justify-center">
                            <LoadingSpinner className={{scale : "70%"}} loading={true}/>
                        </div> : 

                        <div className="flex flex-col gap-y-4">
                            <div className="flex items-center justify-between">
                                <p className="font-normal">Total no of articles</p>
                                <p className="text-lg mini:text-xl">{metricsData?.article_count}</p>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <p className="font-normal">Published articles</p>
                                <p className="text-lg mini:text-xl">{metricsData?.published}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="font-normal">Scheduled articles</p>
                                <p className="text-lg mini:text-xl">{metricsData?.scheduled}</p>
                            </div>
                            <div className="flex items-center justify-between border-b border-gray-400 mb-4 pb-3">
                                <p className="font-normal">Drafts</p>
                                <p className="text-lg mini:text-xl">{metricsData?.draft}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="font-normal">Blog</p>
                                <p className="text-lg mini:text-xl">{metricsData?.blog_count}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="font-normal">Research insight</p>
                                <p className="text-lg mini:text-xl">{metricsData?.research_count}</p>
                            </div>
                        </div>

                    }
                </div>
            </div>
        </>
    )
}

export default DashboardStats