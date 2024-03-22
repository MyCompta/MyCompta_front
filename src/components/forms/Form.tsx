import fetcher from "../../utils/fetcher";
import { useSetAtom } from "jotai";
import { errorAtom } from "../../atom/notificationAtom";

export function Form({
  method = "POST",
  fetchUrl,
  fields,
  btnDisplay,
  controller,
  onSuccess,
}: {
  method?: string;
  fetchUrl: string;
  fields: IFormFields[];
  btnDisplay: string;
  controller: string;
  onSuccess?: () => void;
}) {
  const setError = useSetAtom(errorAtom);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const newFormData = new FormData();

    for (const [field, value] of formData.entries()) {
      newFormData.append(`${controller}[${field}]`, value as string);
    }

    const req = await fetcher(fetchUrl, newFormData, method);

    if (req?.error) {
      console.error(req.error);
      setError(req.error);
      return;
    }

    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, i) => (
        <div key={i}>
          <label htmlFor={field.name + i.toString()}>{field.displayName}</label>
          <input
            type={field.type ? field.type : "text"}
            name={field.name}
            value={field.value}
            placeholder={field.displayName}
            id={field.name + i.toString()}
            required={!field.optional}
          />
        </div>
      ))}
      <input type="submit" value={btnDisplay} className="registerbutton"/>
    </form>
  );
}

interface IFormFields {
  name: string;
  type?: string;
  value?: string;
  displayName?: string;
  optional?: boolean;
}
