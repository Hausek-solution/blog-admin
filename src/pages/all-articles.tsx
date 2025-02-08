import { LucideGrid, LucideLayoutGrid, LucideList } from "lucide-react"
import { useCallback, useState } from "react"
import { ArticleResponseType, RecentArticles } from "../types/article-type"
import ArticleCard from "../components/articles/article-card"
import { cn } from "../lib/utils"
import CustomPagination from "../components/articles/custom-pagination"

const dummyArticles : ArticleResponseType[] = [
    {
        categories: "blog",
        featured_image: '/images/dummy/blog.jpg',
        id: 1,
        is_featured: false,
        published_at: null,
        slug: 'sks-ssjdjd-sjdjd',
        title: 'Test of Title of article',
        content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident suscipit nostrum dolorum eius expedita accusantium ducimus ad incidunt quam illo ut eaque natus mollitia voluptas temporibus beatae at, totam neque?",
        created_at: "2025-02-03",
        status: "scheduled",
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
        content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident suscipit nostrum dolorum eius expedita accusantium ducimus ad incidunt quam illo ut eaque natus mollitia voluptas temporibus beatae at, totam neque?",
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
        content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident suscipit nostrum dolorum eius expedita accusantium ducimus ad incidunt quam illo ut eaque natus mollitia voluptas temporibus beatae at, totam neque?",
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
        content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident suscipit nostrum dolorum eius expedita accusantium ducimus ad incidunt quam illo ut eaque natus mollitia voluptas temporibus beatae at, totam neque?",
        created_at: "2025-02-03",
        status: "published",
        tags: [{name: "Housing"}, {name: "Agency"}],
        updated_at: null
    },
]

const AllArticlesPage = () => {
    const [activelayout, setAciveLayout] = useState<"list" | "grid">("list")
    const PAGE_SIZE = 10
    const [page, setPage] = useState(1)

    const [totalNumberOfPages, setTotalNumberOfPages] = useState(7)


    const renderArticles = useCallback(() => {
        return (
            <>
                <div className="">
                    <div className={cn("gap-7",
                        { "grid grid-cols-1 ipad:grid-cols-2 gap-8": activelayout === "list"},
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

    const handlePageChange = (page: number) => {
        setPage(page);
        // You can also fetch data or perform other actions here
      };

    const renderPagination = useCallback(() => {
        return (
            <>
                <CustomPagination
                    currentPage={page}
                    totalPages={7}
                    onPageChange={handlePageChange}
                />
            </>
        )
    }, [page])

    

    return (
        <>
            <div className="app-container w-full pb-16">
                <div className="w-full flex justify-between text-gray-500 border-b border-gray-500 items-center">
                    <h1 className="mt-10 text-2xl ">All articles <span className="font-medium">(23)</span></h1>

                    <div className="flex items-center space-x-3">
                        <LucideList onClick={() => {setAciveLayout("list")}} className="cursor-pointer"/>
                        <LucideLayoutGrid onClick={() => {setAciveLayout("grid")}} className="cursor-pointer"/>
                    </div>
                </div>

                <div className="mt-16 ">
                    {renderArticles()}

                    <div className="mt-10 md:mt-16">
                        {renderPagination()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllArticlesPage