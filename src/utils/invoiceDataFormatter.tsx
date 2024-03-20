const invoiceDataFormatterSend = (invoice: TInvoice) => {
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

export { invoiceDataFormatterSend };

const invoiceDataFormatterReceive = (invoice: TInvoiceShowBack) => {
  const invoiceData = invoice.invoice;
  const author = invoice.author;
  const authorData = {
    name: author.name,
    email: author.email,
    is_pro: true,
    address: {
      street: author.adress,
      city: author.city,
      zip: author.zip.toString(),
    },
  } as TUserInfos;

  const content = JSON.parse(invoiceData.content);

  return {
    id: invoiceData.id,
    items: content.items,
    tax: content.tax,
    date: new Date(invoiceData.date),
    dueDate: new Date(invoiceData.due_date),
    title: invoiceData.title,
    number: invoiceData.number,
    subTotal: invoiceData.subtotal,
    total: invoiceData.total,
    is_draft: invoiceData.is_draft,
    is_paid: invoiceData.is_paid,
    status: invoiceData.status,
    author: authorData,
  } as TInvoice;
};

export { invoiceDataFormatterReceive };
