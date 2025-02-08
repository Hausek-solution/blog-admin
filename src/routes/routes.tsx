import { Route } from "react-router-dom";
import HomePage from "../pages/login";
import { ApplicationRoutes } from "./routes-constant";
import Dashboard from "../pages/dashboard";
import CreateArticlePage from "../pages/create-article";
import UpdateArticlePage from "../pages/update-article";
import Blog from "../pages/article-category/blog";
import ResearchInsight from "../pages/article-category/ressearch-insight";
import DraftPage from "../pages/article-status/draft";
import ScheduledPage from "../pages/article-status/schedued";
import PublishedPage from "../pages/article-status/published";
import FeaturedArticle from "../pages/article-timebased/featured-article";
import RecentlyUpdated from "../pages/article-timebased/recently-updated";
import RecentlyPublished from "../pages/article-timebased/recently-published";
import AllArticlesPage from "../pages/all-articles";

export const CustomRoutes = () => {
  return [
    <Route>
      <Route element={<HomePage/>} path={ApplicationRoutes.HOME}></Route>
      <Route element={<Dashboard/>} path={ApplicationRoutes.DASHBOARD}></Route>
      <Route element={<AllArticlesPage/>} path={ApplicationRoutes.ALL_ARTICLES}></Route>
      
      <Route element={<CreateArticlePage/>} path={ApplicationRoutes.CREATE_ARTICLE}></Route>
      <Route element={<UpdateArticlePage/>} path={ApplicationRoutes.UPDATE_ARTICLE}></Route>

      <Route element={<Blog/>} path={ApplicationRoutes.BLOG_ARTICLES}></Route>
      <Route element={<ResearchInsight/>} path={ApplicationRoutes.RESEARCH_INSIGHT}></Route>

      <Route element={<DraftPage/>} path={ApplicationRoutes.DRAFT_ARTICLES}></Route>
      <Route element={<ScheduledPage/>} path={ApplicationRoutes.SCHEDULED_ARTICLE}></Route>
      <Route element={<PublishedPage/>} path={ApplicationRoutes.PUBLISHED_ARTICLE}></Route>
      
      <Route element={<FeaturedArticle/>} path={ApplicationRoutes.FEATURED_ARTICLES}></Route>
      <Route element={<RecentlyUpdated/>} path={ApplicationRoutes.RECENTLY_UPDATED}></Route>
      <Route element={<RecentlyPublished/>} path={ApplicationRoutes.RECENTLY_PUSBLISHED}></Route>
    </Route>,
  ];
};
