import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { reports, getUser } from "../contract/methods";
import Registraion from "./Registraion";
import { prettyDate } from "../utils/epoch_time";

const Dashboard = ({ currentAccount, onClickDisconnect }) => {
  const [user, setUser] = useState({
    name: "",
    sex: "",
    age: undefined,
    createAt: undefined,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fn() {
      setLoading(true);
      const result = await getUser();
      if (!result[0])
        setUser({ name: "", sex: "", age: undefined, createAt: undefined });

      setUser({
        name: result[0],
        sex: result[1],
        age: result[2],
        createAt: result[3],
      });
      setLoading(false);
    }

    fn();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);
  if (loading)
    return (
      <div>
        <Navbar
          currentAccount={currentAccount}
          onClickDisconnect={onClickDisconnect}
        />
        <div>Loading...</div>
      </div>
    );
  if (user.name)
    return (
      <div>
        <Navbar
          currentAccount={currentAccount}
          onClickDisconnect={onClickDisconnect}
        />
        <div>Dashboard</div>

        <div>
          <div>Name:{user.name}</div>
          <div>sex:{user.sex}</div>
          <div>Age:{user.age}</div>
          <div>Joined:{prettyDate(user.createAt)}</div>
        </div>
      </div>
    );
  return <Registraion />;
};

export default Dashboard;
