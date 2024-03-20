const invoiceDataFormatter = (invoice: TInvoice) => {
  const formData = new FormData();

  const content = {
    items: invoice.items,
    tax: invoice.tax,
  };

  formData.append("invoice[content]", JSON.stringify(content));
  formData.append("invoice[date]", invoice.date.toISOString());
  formData.append("invoice[due_date]", invoice.dueDate.toISOString());
  formData.append("invoice[title]", invoice.title);
  formData.append("invoice[number]", invoice.number);
  formData.append("invoice[subtotal]", String(invoice.subTotal));
  formData.append(
    "invoice[tva]",
    String(invoice.items.reduce((acc, item) => acc + item.tax.total, 0))
  );
  formData.append("invoice[total]", String(invoice.total));
  formData.append(
    "invoice[sale]",
    String(
      invoice.items.reduce((acc, item) => acc + (item.discount ? acc + item.discount.total : 0), 0)
    )
  );
  formData.append("invoice[is_draft]", String(invoice.is_draft || true));
  formData.append("invoice[is_paid]", String(invoice.is_paid || false));
  formData.append("invoice[status]", invoice.status || "draft");

  return formData;
};

export default invoiceDataFormatter;
