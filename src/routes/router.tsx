import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import React from "react";
import LoggedRoute from "./LoggedRoute";
import NotLoggedRoute from "./NotLoggedRoute";
import Page404 from "../pages/Page404";
import Layout from "../Layout";

const IndexQuotations = React.lazy(() => import("../pages/quotations/IndexQuotations"));
const EditQuotation = React.lazy(() => import("../pages/quotations/EditQuotation"));
const QuotationCreate = React.lazy(() => import("../pages/quotations/QuotationCreate"));
const IndexRegister = React.lazy(() => import("../pages/registers/IndexRegister"));
const CreateRegister = React.lazy(() => import("../pages/registers/CreateRegister"));
const EditRegister = React.lazy(() => import("../pages/registers/EditRegister"));

const InvoiceCreation = React.lazy(() => import("../pages/public/InvoiceCreation"));
const QuotationCreation = React.lazy(() => import("../pages/public/QuotationCreation"));
const PreviewPdf = React.lazy(() => import("../pages/public/PreviewPdf"));
const Index = React.lazy(() => import("../pages/Index"));
const Login = React.lazy(() => import("../pages/users/Login"));
const Register = React.lazy(() => import("../pages/users/Register"));
const ForgotPassword = React.lazy(() => import("../pages/users/ForgotPassword"));
const ResetPassword = React.lazy(() => import("../pages/users/ResetPassword"));
const CgProfile = React.lazy(() => import("../pages/users/CgProfile"));
const CGU = React.lazy(() => import("../pages/users/CGU"));
const Confidentiality = React.lazy(() => import("../pages/users/Confidentiality"));
// const Contact = React.lazy(() => import('../pages/Contact'));
const Dashboard = React.lazy(() => import("../pages/dashboard"));
const IndexInvoices = React.lazy(() => import("../pages/invoices/IndexInvoices"));
const ShowInvoice = React.lazy(() => import("../pages/invoices/ShowInvoice"));
const EditInvoice = React.lazy(() => import("../pages/invoices/EditInvoice"));
const InvoiceCreate = React.lazy(() => import("../pages/invoices/InvoiceCreate"));
const PageClientIndex = React.lazy(() => import("../pages/clients/PageClientIndex"));
const PageClientShow = React.lazy(() => import("../pages/clients/PageClientShow"));
const IndexSocieties = React.lazy(() => import("../pages/society/IndexSocieties"));
const ShowSociety = React.lazy(() => import("../pages/society/ShowSociety"));
const PageSocietyEdit = React.lazy(() => import("../pages/society/PageSocietyEdit"));
const CreateSociety = React.lazy(() => import("../pages/society/CreateSociety"));
const ShowQuotation = React.lazy(() => import("../pages/quotations/ShowQuotation"));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <Index />
            </React.Suspense>
          }
        />
        <Route
          path="/cgu"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <CGU />
            </React.Suspense>
          }
        />
        <Route
          path="Confidentiality"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <Confidentiality />
            </React.Suspense>
          }
        />

        <Route path="*" element={<Page404 />} />

        <Route element={<NotLoggedRoute redirectPath="/dashboard" />}>
          <Route
            path="/login"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Login />
              </React.Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Register />
              </React.Suspense>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <ForgotPassword />
              </React.Suspense>
            }
          />
          <Route
            path="/reset-password"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <ResetPassword />
              </React.Suspense>
            }
          />
          <Route
            path="/invoice/create"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <InvoiceCreation />
              </React.Suspense>
            }
          />
          <Route
            path="/quotation/create"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <QuotationCreation />
              </React.Suspense>
            }
          />
          <Route
            path="/document/preview"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <PreviewPdf />
              </React.Suspense>
            }
          />
        </Route>

        {/* Protected Routes */}
        <Route element={<LoggedRoute redirectPath="/login" />}>
          <Route
            path="/dashboard"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Dashboard />
              </React.Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <CgProfile />
              </React.Suspense>
            }
          />

          <Route
            path="/invoices"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <IndexInvoices />
              </React.Suspense>
            }
          />
          <Route
            path="/invoices/create"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <InvoiceCreate />
              </React.Suspense>
            }
          />
          <Route
            path="/invoices/:id"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <ShowInvoice />
              </React.Suspense>
            }
          />
          <Route
            path="/invoices/:id/edit"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <EditInvoice />
              </React.Suspense>
            }
          />

          <Route
            path="/quotations"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <IndexQuotations />
              </React.Suspense>
            }
          />
          <Route
            path="/quotations/create"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <QuotationCreate />
              </React.Suspense>
            }
          />
          <Route
            path="/quotations/:id"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <ShowQuotation />
              </React.Suspense>
            }
          />
          <Route
            path="/quotations/:id/edit"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <EditQuotation />
              </React.Suspense>
            }
          />

          <Route
            path="/clients"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <PageClientIndex />
              </React.Suspense>
            }
          />
          <Route
            path="/clients/:id"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <PageClientShow />
              </React.Suspense>
            }
          />

          <Route
            path="/societies"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <IndexSocieties />
              </React.Suspense>
            }
          />
          <Route
            path="/societies/:id"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <ShowSociety />
              </React.Suspense>
            }
          />
          <Route
            path="/societies/:id/edit"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <PageSocietyEdit />
              </React.Suspense>
            }
          />
          <Route
            path="/societies/create"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <CreateSociety />
              </React.Suspense>
            }
          />

          <Route
            path="/registers"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <IndexRegister />
              </React.Suspense>
            }
          />
          <Route
            path="/registers/create"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <CreateRegister />
              </React.Suspense>
            }
          />
          <Route
            path="/registers/:id"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <EditRegister />
              </React.Suspense>
            }
          />
        </Route>
      </Route>
    </>
  )
);
