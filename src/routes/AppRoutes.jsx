import { Route, Routes } from "react-router";
import MainLayout from "../layouts/MainLayout.jsx";
import FeedPage from "../pages/FeedPage.jsx";
import PostDetailsPage from "../pages/PostDetailsPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import Experiment from "../pages/Experiment.jsx";
// import Virtualization from "../pages/Virtualization.jsx";
import FileExplorer from "../pages/FileExplorer/FileExplorer.jsx";
import FolderStructure from "../pages/FolderStructure/FolderStructure.jsx";
import Container from "../pages/Feed/Container.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<FeedPage />} />
        <Route path="posts/:postId" element={<PostDetailsPage />} />
        <Route path="experiment" element={<Experiment />} />
        {/* <Route path="virtualization" element={<Virtualization />} /> */}
        {/* <Route path="explorer" element={<FileExplorer />} /> */}
        <Route path="explorer" element={<FolderStructure />} />
        <Route path="instagram" element={<Container />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
