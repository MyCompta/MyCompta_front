import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import LoggedRoute from "./LoggedRoute";
import NotLoggedRoute from "./NotLoggedRoute";

import Layout from "../Layout";
import Index from "../pages/Index";
import Login from "../pages/users/Login";
import Register from "../pages/users/Register";
import ForgotPassword from "../pages/users/ForgotPassword";
import ResetPassword from "../pages/users/ResetPassword";
import Invoice from "../pages/invoice/Invoice";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route element={<NotLoggedRoute redirectPath="/dashboard" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Protected Routes */}
        <Route path="/dashboard" element={<LoggedRoute redirectPath="/login" />}>
          <Route index element={<Index />} />
          <Route path="/invoice" element={<Invoice />} />
        </Route>
      </Route>
    </>
  )
);
