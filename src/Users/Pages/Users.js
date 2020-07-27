import React from "react";
import UsersList from "../Components/UsersList";
const Users = (props) => {
  const USER = [
    {
      id: "3",
      name: "Hasham",
      image:
        "https://1.bp.blogspot.com/-FeykZDeyk_g/UqrKmAthznI/AAAAAAAAHT0/idOubv97yUk/s4000/Taylor+Swift+special+pictures.singersceleb.blogspot-1048.jpg",
      places: 4,
    },
  ];
  return (
    <div>
      <UsersList items={USER} />
    </div>
  );
};
export default Users;
