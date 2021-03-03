import userRoutes from "./user/routes";
import authRoutes from "./auth/routes";

export default [
  ...userRoutes,
  ...authRoutes

];
