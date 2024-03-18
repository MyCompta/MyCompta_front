import React from "react";
import { Link, useParams } from "react-router-dom";

const EditInvoice = () => {
  const { id } = useParams();

  return (
    <>
      <h1>EditInvoice</h1>
      <Link to={`/invoices/${id}`}>Back to invoice #{id}</Link>
    </>
  );
};

export default EditInvoice;
