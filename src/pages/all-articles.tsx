import { LucideGrid, LucideLayoutGrid, LucideList } from "lucide-react"
import { useCallback, useState } from "react"
import { ArticleResponseType, RecentArticles } from "../types/article-type"
import ArticleCard from "../components/articles/article-card"
import { cn } from "../lib/utils"

const dummyArticles : ArticleResponseType[] = [
    {
        categories: "blog",
        featured_image: '/images/dummy/blog.jpg',
        id: 1,
        is_featured: false,
        published_at: null,
        slug: 'sks-ssjdjd-sjdjd',
        title: 'Test of Title of article',
        content: "",
        created_at: "2025-02-03",
        status: "draft",
        tags: [{name: "Housing"}, {name: "Agency"}],
        updated_at: null
    },
    {
        categories: "blog",
        featured_image: '/images/dummy/blog.jpg',
        id: 2,
        is_featured: false,
        published_at: null,
        slug: 'sks-ssjdjd-sjdjd',
        title: 'Test of Title of article',
        content: "",
        created_at: "2025-02-03",
        status: "draft",
        tags: [{name: "Housing"}, {name: "Agency"}],
        updated_at: null
    },
    {
        categories: "blog",
        featured_image: '/images/dummy/blog2.jpg',
        id: 3,
        is_featured: false,
        published_at: null,
        slug: 'sks-ssjdjd-sjdjd',
        title: 'Test of Title of article',
        content: "",
        created_at: "2025-02-03",
        status: "draft",
        tags: [{name: "Housing"}, {name: "Agency"}],
        updated_at: null
    },
    {
        categories: "research",
        featured_image: '/images/dummy/dummy2.jpg',
        id: 4,
        is_featured: false,
        published_at: null,
        slug: 'sks-ssjdjd-sjdjd',
        title: 'Test of Title of article',
        content: "",
        created_at: "2025-02-03",
        status: "draft",
        tags: [{name: "Housing"}, {name: "Agency"}],
        updated_at: null
    },
]

const AllArticlesPage = () => {
    const [activelayout, setAciveLayout] = useState<"list" | "grid">("list")
    const PAGE_SIZE = 10
    const [page, setPage] = useState(1)


    const renderArticles = useCallback(() => {
        return (
            <>
                <div className="">
                    <div className={cn("gap-7",
                        { "flex flex-col": activelayout === "list"},
                        { "grid grid-cols-1 sm:grid-cols-2 mini:grid-cols-3": activelayout === "grid"},
                    )}>
                        { dummyArticles.map((art, index) => (
                            <ArticleCard
                                data={art}
                                displayLayout={activelayout}
                                key={art.id}
                            />
                        ))}
                    </div>
                </div>
            </>
        )
    }, [activelayout, page])

    return (
        <>
            <div className="app-container w-full pb-16">
                <div className="w-full flex justify-between text-gray-500 border-b border-gray-500 items-center">
                    <h1 className="mt-10 text-2xl ">All articles</h1>

                    <div className="flex items-center space-x-3">
                        <LucideList onClick={() => {setAciveLayout("list")}} className="cursor-pointer"/>
                        <LucideLayoutGrid onClick={() => {setAciveLayout("grid")}} className="cursor-pointer"/>
                    </div>
                </div>

                <div className="mt-16 border-t border-gray-500">
                    {renderArticles()}
                </div>
            </div>
        </>
    )
}

export default AllArticlesPage