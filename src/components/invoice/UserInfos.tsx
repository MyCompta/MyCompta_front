import { Dispatch } from "react";
import "./UserInfos.css";

export const UserInfos = ({
  user,
  setUser,
}: {
  user: TUserInfos;
  setUser: Dispatch<TUserInfos>;
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const [firstKey, secondKey] = name.split(".");
    if (firstKey && secondKey) {
      setUser({
        ...user,
        [firstKey]: {
          ...(user[firstKey] as object),
          [secondKey]: value,
        },
        modified: true,
      } as TUserInfos);
    } else {
      setUser({
        ...user,
        [name]: value,
        modified: true,
      } as TUserInfos);
    }
  };

  return (
    <div className="user__infos">
      <div className="user__infos__inline">
        <input
          type="text"
          name="name"
          placeholder="Nom"
          required
          value={user.name}
          onChange={handleInputChange}
        />

        {!user.is_pro && (
          <input
            type="text"
            name="surname"
            placeholder="Prénom"
            required
            value={user.surname}
            onChange={handleInputChange}
          />
        )}
      </div>

      <input
        type="text"
        name="address.street"
        placeholder="Adresse"
        required
        value={user.address.street}
        onChange={handleInputChange}
      />

      <div className="user__infos__inline">
        <input
          type="number"
          name="address.zip"
          placeholder="Code postal"
          min={0}
          max={99999}
          required
          value={user.address.zip}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="address.city"
          placeholder="Ville"
          required
          value={user.address.city}
          onChange={handleInputChange}
        />
      </div>
      <input
        type="text"
        name="address.country"
        placeholder="Pays"
        required
        value={user.address.country}
        onChange={handleInputChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        value={user.email}
        onChange={handleInputChange}
      />

      {user.is_pro && (
        <input
          type="text"
          name="siret"
          placeholder="Siret"
          required
          value={user.siret}
          onChange={handleInputChange}
        />
      )}
    </div>
  );
};
