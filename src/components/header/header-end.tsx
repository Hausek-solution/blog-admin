import { Link, useLocation } from "react-router-dom"
import { MobileDrawer, MobileDrawerClose, MobileDrawerContent, MobileDrawerHeader, MobileDrawerTrigger } from "../ui/mobile-drawer"
import LogoLight from "../icons/logo-light"
import { cn } from "../../lib/utils"
import { LucideAlignJustify, LucideX } from "lucide-react"
import { ApplicationRoutes } from "../../routes/routes-constant"

const HeaderEnd = () => {
    const location = useLocation()
    const path = location.pathname

    const headerRoutes = [
        {name: "Home", link: ApplicationRoutes.HOME},
        {name: "Blog", link: ApplicationRoutes.BLOG},
        {name: "Research Insight", link: ApplicationRoutes.RESEARCH_INSIGHT},
    ]

    return (
        <>
            <div className="hidden sm:flex items-center space-x-5 text-primary">
                { headerRoutes.map(_ => {
                    return (
                        <Link className="text-lg" to={_.link}>{_.name}</Link>
                    )
                })}
            </div>

            <div className="sm:hidden">
                <MobileDrawer>
                    <MobileDrawerTrigger className="md:hidden">
                        <LucideAlignJustify fill="#132A23" className=""/>
                    </MobileDrawerTrigger>
                    
                    <MobileDrawerContent side="left" className="z-[10000000] bg-[#11201b] border-none overflow-y-auto pb-12">
                        <MobileDrawerHeader className="mt-5">
                            <div className="flex justify-between items-center w-full">
                                <LogoLight classname=""/>
                                <MobileDrawerClose>
                                    <LucideX fill="#B8B08D" className="text-[#9495A5]"/>
                                </MobileDrawerClose>
                            </div>
                        </MobileDrawerHeader>

                        <div className="mt-10 flex flex-col gap-y-6 px-5">
                            {headerRoutes.map((route, index) => {
                                return (
                                    <Link to={route.link} key={route.name + index} className="flex w-max items-center space-x-4 font-outfit">
                                        <MobileDrawerClose className={cn("text-[#9495A5] text-[24px] leading-[29.06px font-medium tracking-[0.096px]",
                                            {
                                                "text-white" : route.link === path
                                            }
                                        )}>{route.name}</MobileDrawerClose>
                                    </Link>
                                )
                            })}
                        </div>
                    </MobileDrawerContent>
                </MobileDrawer>
            </div>
        </>
    )
}

export default HeaderEnd