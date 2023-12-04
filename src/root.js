import { Router, Route, RootRoute } from "@tanstack/react-router";
import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile";
import Listing from "./pages/Listing"
import Root from "./App";

const rootRoute = new RootRoute({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const profilesRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/profile",
    component: ProfilePage,
  });

  const listingRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/listing",
    component: Listing,
  });
  

const routeTree = rootRoute.addChildren([
    indexRoute,
    profilesRoute,
    listingRoute,
  ]);

  export const router = new Router({ routeTree });

export default router;
