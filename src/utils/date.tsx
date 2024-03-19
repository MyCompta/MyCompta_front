import { DateTimeFormatOptions } from "intl";

// INPUT: stringed datetime : "2024-03-18T00:00:00.000Z"
export const formatDate1 = (datetime: string) => {
  const dateObj = new Date(datetime);
  const formattedDate = `${dateObj.getDate()}-${
    dateObj.getMonth() + 1
  }-${dateObj.getFullYear().toString().slice(-2)}`;
  return formattedDate; //  OUTPUT: "18-3-24"
};

// INPUT: stringed datetime : "2024-03-18T00:00:00.000Z"
export const formatDate2 = (datetime: string) => {
  const date = new Date(datetime);
  const options: DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate; //  OUTPUT: March 18, 2024
};
