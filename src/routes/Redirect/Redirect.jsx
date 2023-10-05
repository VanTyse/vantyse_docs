import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/context";

function Redirect() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/`);
    } else {
      navigate(`/auth`);
    }
  }, [user]);

  return <div></div>;
}

export default Redirect;
