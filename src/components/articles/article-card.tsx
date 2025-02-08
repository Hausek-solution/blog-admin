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
                {"flex space-x-3": displayLayout === "list"},
                {"": displayLayout === "grid"},
            )}>
                <div className={cn("min-h-56 relative bg-white rounded-tl-lg rounded-tr-lg",
                    {"min-h-40": displayLayout === "list"}
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

                <div className="min-h-32 p-2 px-4 relative">
                    <p className="font-semibold text-primary">{data.title}</p>

                    <div className="flex justify-between items-center pt-1 absolute w-full bottom-0 left-0 px-4 py-4">
                        <p className="text-sm text-gray-500">{data.published_at}</p>
                        <p className="text-base text-secondary font-medium">View</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ArticleCard