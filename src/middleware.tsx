import { ReactNode, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ApplicationRoutes } from "./routes/routes-constant"
import DashboardLayout from "./components/layout/dashbpard-layout"

const privateRoutes: string[] = [
  ApplicationRoutes.DASHBOARD,
  ApplicationRoutes.CREATE_ARTICLE,
  ApplicationRoutes.UPDATE_ARTICLE,
  ApplicationRoutes.BLOG_ARTICLES,
  ApplicationRoutes.RESEARCH_INSIGHT,
  ApplicationRoutes.DRAFT_ARTICLES,
  ApplicationRoutes.SCHEDULED_ARTICLE,
  ApplicationRoutes.PUBLISHED_ARTICLE,
  ApplicationRoutes.FEATURED_ARTICLES,
  ApplicationRoutes.RECENTLY_PUSBLISHED,
  ApplicationRoutes.RECENTLY_UPDATED,
  ApplicationRoutes.ALL_ARTICLES
]

const MiddlewareProvider = ({children}: {children: ReactNode}) => {
    const navigate = useNavigate()
    const location = useLocation();
    const currentPath = location.pathname 

    useEffect(() => {
      const currentPath = location.pathname

      if (privateRoutes.includes(currentPath)){
        
      }
    }, [location, navigate])

   
    

    return (
      <>
        {  privateRoutes.includes(currentPath) ?
                <DashboardLayout>
                    {children}
                </DashboardLayout> :
                
                <>
                    {children}
                </>
            }
      </>
    )

}

export default MiddlewareProvider