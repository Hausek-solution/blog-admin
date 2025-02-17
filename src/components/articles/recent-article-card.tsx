import { cn } from "../../lib/utils"
import { ArticleResponseType, RecentArticles } from "../../types/article-type"
import { Button } from "../../components/ui/button"
import { Link } from "react-router-dom"
import { ApplicationRoutes } from "../../routes/routes-constant"
import { format } from "date-fns"


type RecentArticleCardProps = {
    data: RecentArticles,
    displayLayout: "list" | "grid",
    scheduledBtn: React.MutableRefObject<HTMLDivElement>
}

const RecentArticleCard = ({ data, displayLayout, scheduledBtn}: RecentArticleCardProps) => {

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

                <div className="p-2 px-4 relative w-full">
                    <div className="flex gap-3 justify-between items-center">
                        <p className="font-semibold text-primary text-lg pt-2">{data.title}</p>
                        <div className={cn("px-4 capitalize py-1 rounded-full",
                            {"bg-blue-500 text-white": data.categories === "blog"},
                            {"bg-green-500 text-white": data.categories === "research"},
                        )}>
                            {data.categories}
                        </div>
                    </div>

                    {/* <p className={cn("py-2", {"hidden": displayLayout === "grid"})}>{data..slice(0, data.content.lastIndexOf(" ", 140))}...</p> */}

                    <div className={cn("flex justify-between items-center pt-3 border-t py-2 mt-4", {"border-none mt-0": displayLayout === "grid"})}>
                        <div className="flex flex-col gap-y-2">
                            <div className="flex items-center space-x-2 text-sm">
                                { data.status === "scheduled" ?
                                        <p className="">To Publish On</p> :
                                        <p className="">Published</p>
                                }
                                <p className="text-sm text-gray-500">{data.published_at ? format(data.published_at, "do MMMM yyyy 'by' h:mma"): ""}</p>
                            </div>
                            {/* <div className="flex items-center space-x-2 text-sm">
                                <p className="">Created at</p>
                                <p className="text-sm text-gray-500">{data.}</p>
                            </div> */}

                            <div className="flex items-center space-x-2 text-sm">
                                <p className="">Last updated</p>
                                <p className="text-sm text-gray-500">{data.updated_at}</p>
                            </div>

                        </div>
                    </div>
{/* 
                    <div className="flex items-center space-x-2">
                        { data.status === "draft" &&
                            <Link to={`${ApplicationRoutes.PRE_UPDATE}/${data.slug}`} className="text-base text-secondary font-medium">Continue editing</Link>
                        }
                        { data.status === "published" &&
                            <p className="text-base text-secondary font-medium">View</p>
                        }
                        { data.status === "scheduled" &&
                            <p onClick={() => {scheduledBtn.current.click()}} className="text-base text-secondary font-medium">See schedule</p>
                        }
                    </div> */}

                    <div className="capitalize text-gray-400">{data.status}</div>
                </div>
            </div>

        </>
    )
}

export default RecentArticleCard