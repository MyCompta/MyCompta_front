import { UserInfos } from "./UserInfos";
import { ItemLine } from "./ItemLine";
import { useState, useEffect } from "react";
import fetcher from "../../utils/fetcher";
import { invoiceDataFormatterSend } from "../../utils/invoiceDataFormatter";
import { useSetAtom, useAtom, useAtomValue } from "jotai";
import { successAtom } from "../../atom/notificationAtom";
import { clientsAtom } from "../../atom/clientsAtom";
import { currentSocietyAtom, societiesAtom } from "../../atom/societyAtom";
import societyAtom from "../../atom/societyAtom";
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";

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
  const [society, setSociety] = useAtom(societyAtom);
  const navigate = useNavigate();
  const [author, setAuthor] = useState(
    authorProp ||
      ({
        id: society?.id || undefined,
        name: society?.name || "",
        logo: "",
        is_pro: true,
        logoAlt: "",
        address: {
          street: society?.address || "",
          city: society?.city || "",
          zip: society?.zip.toString() || "",
          country: society?.country || "",
        },
        siret: society?.siret || 0,
        email: society?.email || "",
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
          country: "",
        },
        email: "",
        siret: undefined,
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
        is_valid: false,
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
      };
    });
  }, [author, setInvoice]);

  useEffect(() => {
    setInvoice((prevInvoice) => {
      return {
        ...prevInvoice,
        client: client,
      };
    });
  }, [client, setInvoice]);

  useEffect(() => {
    if (
      (client.id && author.id) ||
      (author.id &&
        client.address &&
        client.address.city &&
        client.address.zip &&
        client.address.street &&
        client.address.country &&
        client.name &&
        client.email)
    ) {
      setInvoice((prevInvoice) => {
        return {
          ...prevInvoice,
          is_valid: true,
        };
      });
    } else {
      setInvoice((prevInvoice) => {
        return {
          ...prevInvoice,
          is_valid: false,
        };
      });
    }
  }, [client, author, setInvoice]);

  const handleSave = async () => {
    let req: TSaveReq;
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
            client: {
              ...invoice.client,
              id: req.client_id,
            },
            author: {
              ...invoice.author,
              id: req.society_id,
            },
          };
        });
      }

      return Promise.resolve();
    }

    return Promise.reject();
  };

  // Auto save after 5s
  const [autoSave, setAutoSave] = useState<null | NodeJS.Timeout>(null);
  const triggerAutoSave = () => {
    if (autoSave) {
      clearTimeout(autoSave);
    }
    if (!invoice.is_valid) return;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice]);

  const [clients, setClients] = useAtom(clientsAtom);
  const currentSociety = useAtomValue(currentSocietyAtom);
  // Clients fetch
  useEffect(() => {
    if (!clients.length) {
      fetcher(
        `clients${currentSociety ? `?society_id=${currentSociety}` : ""}`,
        undefined,
        "GET",
        true
      )
        .then((res) => setClients(res))
        .catch((err) => console.error(err));
    }
  }, [clients.length, currentSociety, setClients]);

  // useEffect(() => {
  //   console.log("clients", clients);
  // }, [clients]);

  // useEffect(() => {
  //   console.log("client", client);
  // }, [client]);

  const handleClientSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const clientId = event.target.value;

    if (!clientId) {
      setClient((client) => {
        return {
          ...client,
          id: undefined,
          address: {
            street: "",
            zip: "",
            city: "",
            country: "",
          },
          siret: undefined,
          is_pro: false,
          name: "",
          surname: "",
          email: "",
        } as TUserInfos;
      });
      return;
    }

    const client = clients.find((client) => client.id === Number(clientId)) as TClientBack;

    setClient({
      id: client.id,
      address: {
        street: client.address,
        zip: String(client.zip),
        city: client.city,
        country: client.country,
      },
      email: client.email,
      siret: client.siret,
      is_pro: client.is_pro,
      ...(client.is_pro && {
        name: client.business_name,
      }),
      ...(!client.is_pro && {
        name: client.first_name,
        surname: client.last_name,
      }),
    } as TUserInfos);
  };

  const [societies, setSocieties] = useAtom(societiesAtom);
  const handleAuthorSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const authorId = event.target.value;
    const author = societies.find((society) => society.id === Number(authorId)) as TSocietyBack;

    setAuthor((prevAuthor) => {
      return {
        ...prevAuthor,
        id: author.id,
        name: author.name,
        address: {
          street: author.address,
          zip: author.zip.toString(),
          city: author.city,
          country: author.country,
        },
        email: author.email,
        siret: author.siret,
      } as TUserInfos;
    });

    setSociety({
      id: author.id.toString(),
      name: author.name,
      address: author.address,
      siret: author.siret.toString(),
      city: author.city,
      zip: author.zip.toString(),
      country: author.country,
      capital: author.capital.toString(),
      status: author.status,
      email: author.email,
    });
  };

  useEffect(() => {
    if (!societies.length) {
      fetcher("societies", undefined, "GET", true).then((societies) => {
        setSocieties(societies);
        if (!author.id) {
          setAuthor((prevAuthor) => {
            return {
              ...prevAuthor,
              id: societies[0].id,
              address: {
                street: societies[0].address,
                zip: societies[0].zip.toString(),
                city: societies[0].city,
                country: societies[0].country,
              },
              siret: Number(societies[0].siret),
              email: societies[0].email,
              name: societies[0].name,
            } as TUserInfos;
          });
        }
      });
    }
  }, [societies, setSocieties, author.id]);

  return (
    <div className="invoice">
      <p className="invoice__titles" style={{ textAlign: "right", margin: 0 }}>
        Facture
      </p>
      <div className="invoice__author">
        <p className="invoice__titles">Vous</p>
        <select value={author.id} onChange={handleAuthorSelect}>
          {societies &&
            societies.length &&
            societies.map((society) => (
              <option key={society.id} value={society.id}>
                {society.name}
              </option>
            ))}
        </select>
        <UserInfos user={author} setUser={setAuthor} />
      </div>
      <div className="invoice__client">
        <p className="invoice__titles">Client</p>
        <select value={client.id} onChange={handleClientSelect}>
          <option value="">Créer un nouveau client</option>
          {clients &&
            clients.length &&
            clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.is_pro ? client.business_name : client.first_name + " " + client.last_name}
              </option>
            ))}
        </select>
        <div>
          Client pro ?
          <Switch
            checked={client.is_pro!}
            onChange={() =>
              setClient((prevClient) => ({ ...prevClient, is_pro: !prevClient.is_pro }))
            }
          />
        </div>
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
              <td colSpan={7} className="item__line__description__cell">
                <textarea
                  name="additionalInfo"
                  id="additionalInfo"
                  placeholder="Informations additionnelles"
                  className="item__line__description"
                  value={invoice.additionalInfo}
                  onChange={(e) =>
                    setInvoice({ ...invoice, additionalInfo: e.target.value })
                  }></textarea>
              </td>
            </tr>
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
      <button
        onClick={() => handleSave().then(() => navigate(`/invoices/${invoice.id}`))}
        disabled={!invoice.is_valid}>
        Enregistrer la facture
      </button>
    </div>
  );
}

type TSaveReq = {
  additional_info: string;
  client_id: number;
  content: string;
  created_at: string;
  date: string;
  due_date: string;
  id: number;
  is_draft: boolean;
  is_paid: boolean;
  number: string;
  sale: number;
  society_id: number;
  status: string;
  subtotal: number;
  title: string;
  total: number;
  tva: number;
  updated_at: string;
  user_id: number;
  error?: string;
};
