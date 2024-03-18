import "./Invoice.css";
import { useEffect, useState } from "react";
import { UserInfos } from "./components/invoice/UserInfos";
import { ItemLine } from "./components/invoice/ItemLine";

export default function Invoice() {
  const [author, setAuthor] = useState({
    name: "",
    logo: "",
    is_pro: true,
    logoAlt: "",
    address: {
      street: "",
      city: "",
      zip: "",
    },
  } as TUserInfos);

  const [client, setClient] = useState({
    name: "",
    surname: "",
    is_pro: false,
    logo: "",
    logoAlt: "",
    address: {
      street: "",
      city: "",
      zip: "",
    },
  } as TUserInfos);

  const [items, setItems] = useState<TItem[]>([]);

  const [invoice, setInvoice] = useState({
    author: author,
    client: client,
    title: "",
    date: new Date(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    subTotal: items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    tax: sumTaxValues(items),
    discountTotal: 0,
    total:
      items.reduce((acc, item) => acc + item.price * item.quantity, 0) +
      sumTaxValues(items).reduce((acc, item) => acc + item.total, 0),
    items: items,
  } as TInvoice);

  useEffect(() => {
    setInvoice((prevInvoice) => {
      return {
        ...prevInvoice,
        items: items,
        subTotal: items.reduce((acc, item) => acc + item.price * item.quantity, 0),
        tax: sumTaxValues(items),
        discountTotal: items
          .filter((item) => item.discount)
          .reduce((acc, item) => acc + item.price * item.quantity, 0),
        total:
          items.reduce((acc, item) => acc + item.price * item.quantity, 0) +
          sumTaxValues(items).reduce((acc, item) => acc + item.total, 0),
      };
    });
    console.log(invoice);
  }, [items, setInvoice]);

  useEffect(() => {
    setInvoice((prevInvoice) => {
      return {
        ...prevInvoice,
        author: author,
        client: client,
      };
    });
    console.log(invoice);
  }, [author, client, setInvoice]);

  const addNewItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        name: "",
        quantity: 1,
        price: 0,
        unit: "",
        tax: {
          percentage: 0,
          total: 0,
        },
        description: "",
        discount: false,
      },
    ]);
  };

  function sumTaxValues(items: TItem[]) {
    const taxGroups = items.reduce(
      (acc, item) => {
        const taxKey = item.tax?.percentage;
        const taxValue = item.tax?.total ?? 0;

        if (!acc[taxKey!]) {
          acc[taxKey!] = 0;
        }
        acc[taxKey!] += taxValue;

        return acc;
      },
      {} as { [key: number]: number }
    );

    return Object.entries(taxGroups).map(
      ([tax, sum]) =>
        ({
          percentage: Number(tax),
          total: sum,
        }) as TTax
    );
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInvoice({
      ...invoice,
      [name]: value,
    } as TInvoice);
  };

  return (
    <div className="invoice">
      <h1 style={{ textAlign: "right", margin: 0 }}>Facture</h1>
      <div className="invoice__author">
        <h1>Vous</h1>
        <UserInfos user={author} setUser={setAuthor} />
      </div>
      <div className="invoice__client">
        <h1>Client</h1>
        <UserInfos user={client} setUser={setClient} />
      </div>
      <div className="invoice__title">
        <input
          type="text"
          name="title"
          placeholder="Titre de la facture"
          onChange={handleInputChange}
        />
      </div>
      <div className="invoice__items">
        <button onClick={addNewItem}>Ajouter un produit</button>
        <table>
          <thead>
            <tr>
              <th>Designation</th>
              <th>Quantité</th>
              <th>Unité</th>
              <th>Prix</th>
              <th>TVA</th>
              <th>Total HT</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="item__line__spacing"></td>
            </tr>
            {items.map((item, index) => (
              <ItemLine key={index} item={item} setItems={setItems} />
            ))}
            <tr>
              <td>
                <button onClick={addNewItem}>Ajouter un produit</button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}></td>
              <td colSpan={4}>
                <p>
                  Sous total HT :{" "}
                  {items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                </p>
                {/* TVAs */}
                {sumTaxValues(items)
                  .sort((a, b) => a.percentage - b.percentage)
                  .map((tax, index) => {
                    if (tax.total > 0) {
                      return (
                        <p key={index}>
                          TVA {tax.percentage}% : {tax.total.toFixed(2)}
                        </p>
                      );
                    }
                  })}
                <p>
                  Total TTC :{" "}
                  {(
                    items.reduce((acc, item) => acc + item.price * item.quantity, 0) +
                    sumTaxValues(items)
                      .map((tax) => tax.total)
                      .reduce((acc, curr) => acc + curr, 0)
                  ).toFixed(2)}
                </p>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
