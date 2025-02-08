import { Calendar, Home, Inbox, LucideChevronRight, LucideLogOut, Search, Settings } from "lucide-react"
 
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "../../components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { Link, useLocation } from "react-router-dom"
import { Button } from "../ui/button"
import { ApplicationRoutes } from "../../routes/routes-constant"

const items = [
    {
      title: "Overview",
      url: ApplicationRoutes.DASHBOARD,
      children: []
    },
    {
      title: "All articles",
      url: ApplicationRoutes.ALL_ARTICLES,
      children: []
    },
    {
      title: "By Category",
      children: [
        {
            title: "Blog",
            url: ApplicationRoutes.BLOG_ARTICLES,
        },
        {
            title: "Research Insight",
            url: ApplicationRoutes.RESEARCH_INSIGHT,
        }
      ]
    },
    {
      title: "By Status",
      children: [
        {
            title: "Drafts",
            url: ApplicationRoutes.DRAFT_ARTICLES,
        },
        {
            title: "Scheduled",
            url: ApplicationRoutes.SCHEDULED_ARTICLE,
        },
        {
            title: "Published",
            url: ApplicationRoutes.PUBLISHED_ARTICLE,
        }
      ]
    },
    {
      title: "Time based",
      children: [
        {
            title: "Recentlly published",
            url: ApplicationRoutes.RECENTLY_PUSBLISHED,
        },
        {
            title: "Recently updated",
            url: ApplicationRoutes.RECENTLY_UPDATED,
        },
        {
            title: "Featured articles",
            url: ApplicationRoutes.FEATURED_ARTICLES,
        }
      ]
    },
]

const categoryRoute = [
    ApplicationRoutes.BLOG_ARTICLES,
    ApplicationRoutes.RESEARCH_INSIGHT
]

const timeBasedRoute = [
    ApplicationRoutes.RECENTLY_PUSBLISHED,
    ApplicationRoutes.RECENTLY_UPDATED,
    ApplicationRoutes.FEATURED_ARTICLES
]

const statusRoutes = [
    ApplicationRoutes.PUBLISHED_ARTICLE,
    ApplicationRoutes.DRAFT_ARTICLES,
    ApplicationRoutes.SCHEDULED_ARTICLE
]

const AppSideBar = () => {
    const location = useLocation()
    const path = location.pathname


    return (
        <>
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                    <SidebarGroupLabel className="text-xl mt-2">
                        Dashboard
                    </SidebarGroupLabel>

                    <SidebarGroupContent className="mt-10">
                        <SidebarMenu className="flex flex-col gap-y-4">
                            {items.map((item) => {
                                return item.children.length < 1 ?

                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton>
                                        <Link className="text-base font-medium" to={item.url}>{item.title}</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem> :

                                <Collapsible key={item.title} className="group/collapsible">
                                    <SidebarMenuItem key={item.title}>
                                        <CollapsibleTrigger id={item.title} key={item.title} className="" asChild>
                                            <SidebarMenuButton className="flex items-center justify-between">
                                                <Link to={item.url} className="text-base font-medium">{item.title}</Link>
                                                <LucideChevronRight/>
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>

                                        <CollapsibleContent className="mt-3">
                                            <SidebarMenuSub key={item.title} className="flex flex-col gap-y-2 text-base font-normal">
                                                { item.children.map(children => (
                                                    <SidebarMenuSubItem >
                                                        <Link to={children.url}>{children.title}</Link>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible> 
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter className="">
                    <Button className="flex items-center space-x-3 bg-white border border-gray-300 py-6 text-base text-red-500 hover:bg-gray-200 focus:bg-gray-200">
                        <p className="">Log out</p>
                        <LucideLogOut/>
                    </Button>
                </SidebarFooter>
            </Sidebar>
        </>
    )
}

export default AppSideBar
