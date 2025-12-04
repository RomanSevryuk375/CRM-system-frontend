import Exit from "../../assets/svg/Exit.svg";
import { useEffect, useState } from "react";
import User from "../../assets/svg/User.svg";
import { useDispatch, useSelector } from "react-redux";
import { getMyClient } from "../../redux/Actions/clients";
import ExitModal from "../ExitModal/ExitModal";

import "./Account.css";
import { useNavigate } from "react-router-dom";
import { getMyWorker } from "../../redux/Actions/workers";

function Account({ registrationIsOpen, setRegistrationIsOpen }) {
  const myClient = useSelector((state) => state.clients.myClient);
  const myWorker = useSelector((state) => state.workers.myWorker);
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  const usersId = useSelector((state) => state.users.userRoleId);

  const [activeExitMenu, setActiveExitMenu] = useState(false);
  const [activeUserMenu, setActiveUserMenu] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && usersId === 2) {
      dispatch(getMyClient({}));
    }
    if (isLoggedIn && usersId === 3) {
      dispatch(getMyWorker({}));
    }
  }, [isLoggedIn, dispatch]);
  console.log("myClient =", myClient);
  console.log("myWorker =", myWorker);
  const toggleRouting = (id) => {
    switch (id) {
      case 1:
        navigate("/manager-page");
        break;
      case 2:
        navigate("/personal-page");
        break;
      case 3:
        navigate("/worker-page");
        break;
      default:
        break;
    }
  };

  if (!isLoggedIn) {
    return (
      <button
        className="profile-button-cli"
        onClick={() => setRegistrationIsOpen(!registrationIsOpen)}
      >
        <img src={User} alt="" />
      </button>
    );
  }
  
  let currentData = {};

  switch (usersId) {
    case 2:
      currentData = myClient;
      break;
    case 3:
      currentData = myWorker;
      break;
    default:
      break;
  }

  return (
    <>
      <div
        className={`Acontainer ${activeUserMenu ? "open" : "close"}`}
        onClick={() => {
          setActiveUserMenu(!activeUserMenu);
        }}
      >
        <div className="Aprofle-content">
          <div className="profile-mini-cli">
            <p className="profile-mini-text-cli">
              {currentData[0]?.name?.[0]}
              {currentData[0]?.surname?.[0]}
            </p>
          </div>

          <div className="profile-user-role-cli">
            <h1 className="profile-user-cli">
              {currentData[0]?.name} {currentData[0]?.surname}
            </h1>
            <p className="profile-role-cli">{currentData[0]?.email}</p>
          </div>
        </div>
        {activeUserMenu && (
          <button
            className="Aprofile-personal-button"
            onClick={() => {
              toggleRouting(usersId);
            }}
          >
            Личный кабнет
          </button>
        )}
      </div>
      <button
        className="profile-button-cli"
        onClick={() => setActiveExitMenu(true)}
      >
        <img src={Exit} alt="" />
      </button>
      <ExitModal
        activeExitMenu={activeExitMenu}
        setActiveExitMenu={setActiveExitMenu}
      />
    </>
  );
}

export default Account;
