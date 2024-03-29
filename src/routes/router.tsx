import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import LoggedRoute from "./LoggedRoute";
import NotLoggedRoute from "./NotLoggedRoute";
import Page404 from "../pages/Page404";

import Layout from "../Layout";
import Index from "../pages/Index";
import Login from "../pages/users/Login";
import Register from "../pages/users/Register";
import ForgotPassword from "../pages/users/ForgotPassword";
import ResetPassword from "../pages/users/ResetPassword";

import CgProfile from "../pages/users/CgProfile";
import CGU from "../pages/users/CGU";
import Confidentiality from "../pages/users/Confidentiality";
// import Contact from "../pages/Contact"

import Dashboard from "../pages/dashboard";

import IndexInvoices from "../pages/invoices/IndexInvoices";
import ShowInvoice from "../pages/invoices/ShowInvoice";
import EditInvoice from "../pages/invoices/EditInvoice";
import InvoiceCreate from "../pages/invoices/InvoiceCreate";

import PageClientIndex from "../pages/clients/PageClientIndex";
import PageClientShow from "../pages/clients/PageClientShow";

import IndexSocieties from "../pages/society/IndexSocieties";
import ShowSociety from "../pages/society/ShowSociety";
import PageSocietyEdit from "../pages/society/PageSocietyEdit";
import CreateSociety from "../pages/society/CreateSociety";
import ShowQuotation from "../pages/quotations/ShowQuotation";
import IndexQuotations from "../pages/quotations/IndexQuotations";
import EditQuotation from "../pages/quotations/EditQuotation";
import QuotationCreate from "../pages/quotations/QuotationCreate";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="/cgu" element={<CGU />} />
        <Route path="Confidentiality" element={<Confidentiality />} />

        <Route path="*" element={<Page404 />} />

        <Route element={<NotLoggedRoute redirectPath="/dashboard" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<LoggedRoute redirectPath="/login" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<CgProfile />} />

          <Route path="/invoices" element={<IndexInvoices />} />
          <Route path="/invoices/create" element={<InvoiceCreate />} />
          <Route path="/invoices/:id" element={<ShowInvoice />} />
          <Route path="/invoices/:id/edit" element={<EditInvoice />} />

          <Route path="/quotations" element={<IndexQuotations />} />
          <Route path="/quotations/create" element={<QuotationCreate />} />
          <Route path="/quotations/:id" element={<ShowQuotation />} />
          <Route path="/quotations/:id/edit" element={<EditQuotation />} />

          <Route path="/clients" element={<PageClientIndex />} />
          <Route path="/clients/:id" element={<PageClientShow />} />

          <Route path="/societies" element={<IndexSocieties />} />
          <Route path="/societies/:id" element={<ShowSociety />} />
          <Route path="/societies/:id/edit" element={<PageSocietyEdit />} />
          <Route path="/societies/create" element={<CreateSociety />} />
        </Route>
      </Route>
    </>
  )
);
