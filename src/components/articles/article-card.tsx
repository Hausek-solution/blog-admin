import { cn } from "../../lib/utils"
import { ArticleResponseType, RecentArticles } from "../../types/article-type"
import { Button } from "../../components/ui/button"
import { Link } from "react-router-dom"
import { ApplicationRoutes } from "../../routes/routes-constant"
import { Dispatch, SetStateAction, useRef, useState } from "react"
import { format } from "date-fns"
import { LucideTrash2 } from "lucide-react"


type ArticleCardProps = {
    data: ArticleResponseType,
    displayLayout: "list" | "grid",
    scheduledBtn: React.MutableRefObject<HTMLDivElement>,
    openDeleteBtn: React.MutableRefObject<HTMLDivElement>,
    setSelectedArticle?: Dispatch<SetStateAction<ArticleResponseType>>,
}

const ArticleCard = ({ data, displayLayout, openDeleteBtn, scheduledBtn, setSelectedArticle}: ArticleCardProps) => {

    return (
        <>
            <div className={cn("border-gray-300 border rounded-lg h-full cursor-pointer",
                {"flex items-center space-x-3": displayLayout === "list"},
                {"": displayLayout === "grid"},
            )}>
                <div className={cn("min-h-56 relative bg-white rounded-tl-lg rounded-tr-lg",
                    {"min-h-40 hidden": displayLayout === "list"}
                )}>
                    <img
                        src={data.featured_image}
                        alt="Photo by Drew Beamer"
                        className={cn("h-56 w-full rounded-md object-cover object-center",
                            {"w-full h-40": displayLayout === "list"},
                            {"w-full": displayLayout === "grid"}
                        )}
                    />
                </div>

                <div className="p-2 px-4 relative">
                    <div className="flex mb-2 justify-between items-center">
                        <p className="font-semibold text-primary text-lg pt-2">{data.title}</p>
                        <div className={cn("px-4 capitalize py-1 rounded-full",
                            {"bg-gray-300": data.status === "draft"},
                            {"bg-blue-500 text-white": data.status === "scheduled"},
                            {"bg-green-500 text-white": data.status === "published"},
                        )}>
                            {data.status}
                        </div>
                    </div>

                    <p className={cn("py-2 font-normal", {"hidden": displayLayout === "grid"})}>{data.short_content.slice(0, data.short_content.lastIndexOf(" ", 140))}...</p>

                    <div className={cn("flex-col gap-y-8 justify-between ipad:flex-row items-center pt-3 border-t py-2", {"border-none": displayLayout === "grid"})}>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-y-2">
                                <div className="flex items-center space-x-2 text-sm">
                                    { data.status === "scheduled" ?
                                            <p className="">To Publish on</p> :
                                            <p className="">Published</p>
                                    }
                                    <p className="text-sm text-gray-500">{data.published_at ? format(data.published_at, "do MMMM yyyy 'by' h:mma"): ""}</p>
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                    <p className="">Created on</p>
                                    <p className="text-sm text-gray-500">{data.created_at ? format(data.created_at, "do MMMM yyyy 'at' h:mma"): ""}</p>
                                </div>

                                <div className="flex items-center space-x-2 text-sm">
                                    <p className="">Last updated</p>
                                    <p className="text-sm text-gray-500">{data.updated_at ? format(data.updated_at, "do MMMM yyyy 'at' h:mma"): ""}</p>
                                </div>
                            </div>

                            <p className="font-raleway font-semibold capitalize text-gray-400">{data.categories}</p>

                        </div>
                        
                        <div className="flex items-center justify-between mt-5">
                            
                            <div className="flex items-center space-x-2">
                                { data.status === "draft" &&
                                    <div className="flex items-center space-x-2">
                                        <Link to={`${ApplicationRoutes.PRE_UPDATE}/${data.slug}`} className="text-base text-secondary font-medium">Continue editing</Link>
                                        <Link to={`${ApplicationRoutes.ALL_ARTICLES}/${data.slug}`} className="text-base text-secondary font-medium border-r pr-2 border-gray-400">View</Link>
                                    </div>
                                }
                                { data.status === "published" &&
                                    <div className="flex items-center space-x-2">
                                        <Link to={`${ApplicationRoutes.ALL_ARTICLES}/${data.slug}`} className="text-base text-secondary font-medium border-r pr-2 border-gray-400">View</Link>
                                        <Link to={`${ApplicationRoutes.PRE_UPDATE}/${data.slug}`} className="text-base text-blue-500 font-medium">Edit</Link>
                                    </div>
                                }
                                { data.status === "scheduled" &&
                                    <div className="flex items-center space-x-2">
                                        <p onClick={() => {setSelectedArticle(data);scheduledBtn.current.click()}} className="text-base text-secondary font-medium border-r pr-2 border-gray-400">See schedule</p>
                                        <Link to={`${ApplicationRoutes.PRE_UPDATE}/${data.slug}`} className="text-base text-blue-500 font-medium border-r pr-2 border-gray-400">Edit</Link>
                                        <Link to={`${ApplicationRoutes.ALL_ARTICLES}/${data.slug}`} className="text-base text-amber-700 font-medium">View</Link>
                                    </div>
                                }
                            </div>

                            <div className="">
                                <LucideTrash2 className="text-red-500 cursor-pointer" size={19} onClick={() => {setSelectedArticle(data); openDeleteBtn.current.click()}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ArticleCard