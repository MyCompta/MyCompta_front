const invoiceDataFormatterSend = (invoice: TInvoice) => {
  const formData = new FormData();

  const content = {
    items: invoice.items,
    tax: invoice.tax,
  };

  formData.append("invoice[content]", JSON.stringify(content));
  formData.append("invoice[issued_at]", invoice.date.toISOString());
  formData.append("invoice[due_at]", invoice.dueDate.toISOString());
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
  formData.append(
    "invoice[is_draft]",
    String(typeof invoice.is_draft !== "undefined" ? invoice.is_draft : false)
  );
  formData.append("invoice[is_paid]", String(invoice.is_paid || false));
  formData.append("invoice[status]", invoice.status || "draft");
  if (invoice.author.id) {
    formData.append("invoice[society_id]", String(invoice.author.id));
  }

  if (invoice.client.id && invoice.client.modified !== true) {
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
    formData.append("invoice[client_infos][country]", invoice.client.address.country);
    formData.append("invoice[client_infos][email]", invoice.client.email || "");
  }

  if (invoice.author.id && invoice.author.modified) {
    formData.append("invoice[society_infos][name]", invoice.author.name);
    formData.append("invoice[society_infos][address]", invoice.author.address.street);
    formData.append("invoice[society_infos][city]", invoice.author.address.city);
    formData.append("invoice[society_infos][zip]", invoice.author.address.zip);
    formData.append("invoice[society_infos][country]", invoice.author.address.country);
    formData.append("invoice[society_infos][siret]", invoice.author.siret?.toString() || "");
  }

  formData.append("invoice[additional_info]", invoice.additionalInfo || "");

  return formData;
};

export { invoiceDataFormatterSend };

const invoiceDataFormatterReceive = (invoice: TInvoiceShowBack) => {
  const invoiceData = invoice.invoice;
  const author = invoice.author;
  const authorData = {
    id: author.id,
    name: author.name,
    email: author.email,
    is_pro: true,
    address: {
      street: author.address,
      city: author.city,
      zip: author.zip.toString(),
      country: author.country,
    },
    siret: author.siret,
  } as TUserInfos;

  const client = invoice.client;
  const clientData = {
    id: client.id,
    email: client.email,
    is_pro: client.is_pro,
    ...(client.is_pro && { siret: client.siret, name: client.business_name }),
    ...(!client.is_pro && { name: client.first_name, surname: client.last_name }),
    address: {
      street: client.address,
      city: client.city,
      zip: client.zip.toString(),
      country: client.country,
    },
  } as TUserInfos;

  const content = JSON.parse(invoiceData.content);

  return {
    id: invoiceData.id,
    items: content.items,
    tax: content.tax,
    date: new Date(invoiceData.issued_at),
    dueDate: new Date(invoiceData.due_at),
    title: invoiceData.title,
    number: invoiceData.number,
    subTotal: invoiceData.subtotal,
    total: invoiceData.total,
    is_draft: invoiceData.is_draft,
    is_paid: invoiceData.is_paid,
    status: invoiceData.status,
    author: authorData,
    client: clientData,
  } as TInvoice;
};

export { invoiceDataFormatterReceive };
