import { ReactNode, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ApplicationRoutes } from "./routes/routes-constant"
import DashboardLayout from "./components/layout/dashbpard-layout"
import { pathToRegexp } from "path-to-regexp";

const privateRoutes: string[] = [
  ApplicationRoutes.DASHBOARD,
  ApplicationRoutes.CREATE_ARTICLE,
  ApplicationRoutes.PRE_UPDATE,
  ApplicationRoutes.UPDATE_ARTICLE,
  // ApplicationRoutes.BLOG_ARTICLES,
  // ApplicationRoutes.RESEARCH_INSIGHT,
  ApplicationRoutes.DRAFT_ARTICLES,
  ApplicationRoutes.SCHEDULED_ARTICLE,
  ApplicationRoutes.PUBLISHED_ARTICLE,
  ApplicationRoutes.FEATURED_ARTICLES,
  ApplicationRoutes.RECENTLY_PUSBLISHED,
  ApplicationRoutes.RECENTLY_UPDATED,
  ApplicationRoutes.ALL_ARTICLES,
  ApplicationRoutes.ARTICLE_DETAILS
]

const MiddlewareProvider = ({children}: {children: ReactNode}) => {
    const navigate = useNavigate()
    const location = useLocation();
    const currentPath = location.pathname 

    const isPrivateRoute = privateRoutes.some((route) => {
      const regex = pathToRegexp(route);
      return regex.regexp.test(currentPath);
    });

    useEffect(() => {
      const currentPath = location.pathname

      if (privateRoutes.includes(currentPath)){
        
      }
    }, [location, navigate])

   
    

    return (
      <>
        {  isPrivateRoute ?
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