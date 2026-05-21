import { Loader, ScrollToTop } from "@/components";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("@/pages/home/Home"));
// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex-col flex items-center justify-center">
    <Loader size={40} />
    <p className="mt-4 text-gray-600">Loading...</p>
  </div>
);
const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
