import React from "react";
import { userDatavar } from "../../apollo/store";

const Home = () => {
  const keys = Object.keys(userDatavar());
  console.log(userDatavar());
  return (
    <div className="bg-dark">
      {keys.map((data, idx) => (
        <p key={idx} className="text-red">
          {data}: {userDatavar().id}
        </p>
      ))}
    </div>
  );
};

export default Home;
