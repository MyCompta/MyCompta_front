import { Dispatch, SetStateAction } from "react";
import "./ItemLine.css";

import { IoDuplicateOutline, IoTrashOutline } from "react-icons/io5";

export const ItemLine = ({
  item,
  setItems,
}: {
  item: TItem;
  setItems: Dispatch<SetStateAction<TItem[]>>;
}) => {
  const handleItemChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (name === "tax") {
      setItems((items) =>
        items.map((i) => {
          if (i.id === item.id) {
            return {
              ...i,
              tax: {
                percentage: Number(value),
                total: i.quantity * i.price * (Number(value) / 100),
              },
            };
          }
          return i;
        })
      );
      return;
    }
    setItems((items) =>
      items.map((i) => {
        if (i.id === item.id) {
          return {
            ...i,
            [name]: value,
          };
        }
        return i;
      })
    );

    // Update tax values
    if (name === "discount" || name === "price" || name === "quantity") {
      setItems((items) =>
        items.map((i) => {
          if (i.id === item.id) {
            return {
              ...i,
              tax: {
                percentage: i.tax!.percentage,
                total: i.quantity * i.price * (i.tax!.percentage / 100),
              },
            };
          }
          return i;
        })
      );
    }
    // console.log(item);
  };

  return (
    <>
      <tr className="item__line">
        <td>
          <input
            type="text"
            name="name"
            placeholder="Designation"
            value={item.name}
            onChange={handleItemChange}
          />
        </td>

        <td>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            min={0}
            value={item.quantity}
            style={{
              width: `${item.quantity.toString().length > 3 ? item.quantity.toString().length / 2 : 3}rem`,
            }}
            onChange={handleItemChange}
          />
        </td>

        <td>
          <select name="unit" value={item.unit} onChange={handleItemChange}>
            <option value={""}>None</option>
            <option value={"unit"}>Unit{item.quantity > 1 ? "s" : ""}</option>
            <option value={"hour"}>Hour{item.quantity > 1 ? "s" : ""}</option>
            <option value={"day"}>Day{item.quantity > 1 ? "s" : ""}</option>
            <option value={"week"}>Week{item.quantity > 1 ? "s" : ""}</option>
            <option value={"month"}>Month{item.quantity > 1 ? "s" : ""}</option>
            <option value={"package"}>Package{item.quantity > 1 ? "s" : ""}</option>
          </select>
        </td>

        <td>
          <input
            type="number"
            name="price"
            placeholder="Price"
            min={0}
            step={0.01}
            style={{
              width: `${item.price.toString().length > 3 ? item.price.toString().length / 2 : 3}rem`,
            }}
            value={item.price}
            onChange={handleItemChange}
          />
        </td>

        <td>
          <select name="tax" value={item.tax?.percentage} onChange={handleItemChange}>
            <option value={20}>20 %</option>
            <option value={10}>10 %</option>
            <option value={8.5}>8,5 %</option>
            <option value={5.5}>5,5 %</option>
            <option value={2.1}>2,1 %</option>
            <option value={0}>0 %</option>
          </select>
        </td>

        <td className="no-outline">
          <p className="item__line__price">{(item.price * item.quantity).toFixed(2)}</p>
        </td>

        <td className="no-outline">
          <div className="item__line__actions">
            <button
              title="Delete item"
              className="btn btn--alert"
              onClick={() =>
                window.confirm("Are you sure to delete this line?") &&
                setItems((items) => items.filter((i) => i.id !== item.id))
              }>
              <IoTrashOutline />
            </button>
            <button
              title="Duplicate item"
              className="btn btn--no-bg"
              onClick={() => setItems((items) => [...items, { ...item, id: Date.now() }])}>
              <IoDuplicateOutline />
            </button>
          </div>
        </td>
      </tr>
      <tr>
        <td colSpan={7} className="item__line__description__cell">
          <textarea
            name="description"
            placeholder="Description"
            className="item__line__description"
            value={item.description}
            onChange={handleItemChange}
          />
        </td>
      </tr>
    </>
  );
};
