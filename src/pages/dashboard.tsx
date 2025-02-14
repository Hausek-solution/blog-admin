import { Link } from "react-router-dom"
import DashboardLineChart from "../components/dashboard/articles-chart"
import DashboardStats from "../components/dashboard/dashboard-stats"
import { Button } from "../components/ui/button"
import { ApplicationRoutes } from "../routes/routes-constant"

const Dashboard = () => {
    return (
        <>
            <div className="app-container w-full pb-16">
                <div className="w-full flex justify-between text-gray-500 border-b border-gray-500 items-center">
                    <h1 className="mt-10 text-2xl ">Overview</h1>
                    <Link to={ApplicationRoutes.CREATE_ARTICLE} className="">
                        <Button className="text-white px-6 py-6">Create Article</Button>
                    </Link>
                </div>

                <div className="">
                    <div className="grid grid-cols-1 gap-y-6 md:grid-cols-8 md:gap-y-0 md:gap-x-7 mt-8">
                        <div className="md:col-span-4 mini:col-span-5">
                            <DashboardLineChart/>
                        </div>
                        
                        <div className="md:col-span-4 mini:col-span-3">
                            {/* <RecentRecipientComponent/> */}
                            <DashboardStats/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard