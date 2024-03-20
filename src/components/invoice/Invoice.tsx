import { UserInfos } from "./UserInfos";
import { ItemLine } from "./ItemLine";
import { useState, useEffect } from "react";
import fetcher from "../../utils/fetcher";
import { invoiceDataFormatterSend } from "../../utils/invoiceDataFormatter";
import { useSetAtom } from "jotai";
import { successAtom } from "../../atom/notificationAtom";

export default function Invoice({
  authorProp,
  clientProp,
  invoiceProp,
}: {
  authorProp?: TUserInfos;
  clientProp?: TUserInfos;
  invoiceProp?: TInvoice;
}) {
  const setSuccess = useSetAtom(successAtom);
  const [author, setAuthor] = useState(
    authorProp ||
      ({
        name: "",
        logo: "",
        is_pro: true,
        logoAlt: "",
        address: {
          street: "",
          city: "",
          zip: "",
        },
      } as TUserInfos)
  );

  const [client, setClient] = useState(
    clientProp ||
      ({
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
      } as TUserInfos)
  );

  const [items, setItems] = useState<TItem[]>(invoiceProp?.items || []);

  const [invoice, setInvoice] = useState(
    invoiceProp ||
      ({
        author: author,
        client: client,
        title: "",
        date: new Date(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        subTotal: 0,
        tax: {},
        discountTotal: 0,
        total: 0,
        items: items,
      } as TInvoice)
  );

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
      },
    ]);
  };

  const sumTaxValues = (items: TItem[]) => {
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
  };

  const [dueDateChoice, setDueDateChoice] = useState(false);
  const handleDateSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    if (value === "choice") {
      setDueDateChoice(true);
      return;
    }

    setDueDateChoice(false);

    if (value === "45") {
      setInvoice({
        ...invoice,
        dueDate: new Date(
          Date.parse(
            new Date(Date.parse(invoice.date.toString()))
              .toISOString()
              .slice(0, 10)
              .split("-")
              .map((date, i) => {
                if (i === 0) {
                  return date;
                }
                if (i === 1) {
                  return Number(date) === 12
                    ? "01"
                    : Number(date) + 1 >= 10
                      ? `${Number(date) + 1}`
                      : "0" + (Number(date) + 1);
                }
                return "01";
              })
              .join("-")
          ) +
            44 * 24 * 60 * 60 * 1000
        ),
      } as TInvoice);
      // console.log(invoice);
      return;
    }

    setInvoice({
      ...invoice,
      dueDate: new Date(Date.parse(invoice.date.toString()) + Number(value) * 24 * 60 * 60 * 1000),
    } as TInvoice);

    // console.log(invoice);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    let date;
    if (name === "date" || name === "dueDate") {
      date = new Date(value);
    }

    setInvoice({
      ...invoice,
      [name]: date ? date : value,
    } as TInvoice);
  };

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
    // console.log(invoice);
  }, [items, setInvoice]);

  useEffect(() => {
    setInvoice((prevInvoice) => {
      return {
        ...prevInvoice,
        author: author,
        client: client,
      };
    });
  }, [author, client, setInvoice]);

  const handleSave = async () => {
    let req: any;
    if (invoice.id) {
      req = await fetcher(
        `invoices/${invoice.id}`,
        invoiceDataFormatterSend(invoice),
        "PATCH",
        true
      );
    } else {
      req = await fetcher("invoices", invoiceDataFormatterSend(invoice), "POST", true);
    }

    req?.error && console.error(req.error);

    if (!req?.error) {
      console.log(req);
      setSuccess("Facture enregistrée avec succès");

      if (!invoice.id) {
        setInvoice((invoice) => {
          return {
            ...invoice,
            id: req.id,
          };
        });
      }
    }
  };

  // Auto save after 5s
  const [autoSave, setAutoSave] = useState<null | NodeJS.Timeout>(null);
  const triggerAutoSave = () => {
    if (autoSave) {
      clearTimeout(autoSave);
    }

    const timeout = setTimeout(() => {
      handleSave();
    }, 5000);

    setAutoSave(timeout);
  };

  useEffect(() => {
    triggerAutoSave();

    return () => {
      if (autoSave) {
        clearTimeout(autoSave);
      }
    };
  }, [invoice]);

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
        <div>
          <label htmlFor="title">Titre de la facture</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Titre de la facture"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="number">N° de facture</label>
          <input
            type="text"
            name="number"
            id="number"
            placeholder="N° de facture"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="date">Date d'émission :</label>
          <input
            type="date"
            name="date"
            id="date"
            onChange={handleInputChange}
            value={invoice.date.toISOString().substring(0, 10)}
          />
          <label htmlFor="dueDate">Date d'écheance :</label>
          <select name="dueDateSelect" id="dueDate" onChange={handleDateSelect} defaultValue={"30"}>
            <option value="0">À réception</option>
            <option value="15">15 jours</option>
            <option value="30">30 jours</option>
            <option value="60">60 jours</option>
            <option value="45">45 jours fin de mois</option>
            <option value="choice">Choisir une date</option>
          </select>
          {dueDateChoice && <input type="date" name="dueDate" onChange={handleInputChange} />}
        </div>
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
      <button onClick={handleSave}>Enregistrer la facture</button>
    </div>
  );
}
