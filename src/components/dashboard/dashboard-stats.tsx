const DashboardStats = () => {
    return (
        <>
            <div className="font-outfit mini:pl-6 mini:border-l border-gray-400">
                <div className=" text-xl mb-9">Aticles summary</div>
                <div className="flex flex-col gap-y-4">
                    <div className="flex items-center justify-between">
                        <p className="font-normal">Total no of articles</p>
                        <p className="text-lg mini:text-xl">12</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <p className="font-normal">Published articles</p>
                        <p className="text-lg mini:text-xl">19</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-normal">Scheduled articles</p>
                        <p className="text-lg mini:text-xl">8</p>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-400 mb-4 pb-3">
                        <p className="font-normal">Drafts</p>
                        <p className="text-lg mini:text-xl">5</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-normal">Blog</p>
                        <p className="text-lg mini:text-xl">8</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-normal">Research insight</p>
                        <p className="text-lg mini:text-xl">8</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardStats