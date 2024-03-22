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
  if (invoice.author.id) {
    formData.append("invoice[society_id]", String(invoice.author.id));
  }

  if (invoice.client.id) {
    formData.append("invoice[client_id]", String(invoice.client.id));
  } else {
    formData.append("invoice[client_infos][is_pro]", String(invoice.client.is_pro || false));
    if (invoice.client.is_pro) {
      formData.append("invoice[client_infos][business_name]", String(invoice.client.name));
      formData.append("invoice[client_infos][siret]", String(invoice.client.siret));
    } else {
      formData.append("invoice[client_infos][first_name]", invoice.client.name);
      formData.append("invoice[client_infos][last_name]", invoice.client.surname || "");
    }
    formData.append("invoice[client_infos][address]", invoice.client.address.street);
    formData.append("invoice[client_infos][city]", invoice.client.address.city);
    formData.append("invoice[client_infos][zip]", invoice.client.address.zip);
  }

  formData.append("invoice[additional_info]", invoice.additionalInfo || "");

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
