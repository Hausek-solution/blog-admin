import { cn } from "../../lib/utils"
import { ArticleResponseType, RecentArticles } from "../../types/article-type"

type ArticleCardProps = {
    data: ArticleResponseType,
    displayLayout: "list" | "grid"
}

const ArticleCard = ({ data, displayLayout}: ArticleCardProps) => {

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
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-primary text-lg pt-2">{data.title}</p>
                        <div className={cn("px-4 capitalize py-1 rounded-full",
                            {"bg-gray-300": data.status === "draft"},
                            {"bg-blue-500 text-white": data.status === "scheduled"},
                            {"bg-green-500 text-white": data.status === "published"},
                        )}>
                            {data.status}
                        </div>
                    </div>

                    <p className={cn("py-2", {"hidden": displayLayout === "grid"})}>{data.content.slice(0, data.content.lastIndexOf(" ", 140))}...</p>

                    <div className={cn("flex justify-between items-center pt-3 border-t py-2", {"border-none": displayLayout === "grid"})}>
                        <div className="flex flex-col gap-y-2">
                            <div className="flex items-center space-x-2 text-sm">
                                <p className="">Published</p>
                                <p className="text-sm text-gray-500">{data.published_at}</p>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <p className="">Created at</p>
                                <p className="text-sm text-gray-500">{data.created_at}</p>
                            </div>

                            <div className="flex items-center space-x-2 text-sm">
                                <p className="">Last updated</p>
                                <p className="text-sm text-gray-500">{data.updated_at}</p>
                            </div>

                        </div>

                        <div className="flex items-center space-x-2">
                            { data.status === "draft" &&
                                <p className="text-base text-secondary font-medium">Continue editing</p>
                            }
                            { data.status === "published" &&
                                <p className="text-base text-secondary font-medium">View</p>
                            }
                            { data.status === "scheduled" &&
                                <p className="text-base text-secondary font-medium">See schedule</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ArticleCard