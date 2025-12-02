import "./index.css"

import { useState } from "react";
import Task from "../assets/svg/Task.svg";
import Rashodi from "../assets/svg/Rashodi.svg";
import Bills from "../assets/svg/Bills.svg";
import Home from "../assets/svg/Home.svg";
import Journal from "../assets/svg/Journal.svg";
import Header from "../components/Header/Header";
import ExitModal from "../components/ExitModal/ExitModal";
import Navigation from "../components/Navigation/Navigation";
import Table from "../components/Table/Table";
import Toolbar from "../components/Toolbar/Toolbar";

const navButtonsConfig = [
  { text: "Главная", value: "mainWorker", icon: Home },
  { text: "Заказ-наряды", value: "ordersWorker", icon: Bills },
  { text: "История посещений", value: "historyWorker", icon: Task },
  { text: "Запчасти", value: "partsWorker", icon: Journal },
  { text: "Предложения", value: "proposalWorker", icon: Journal },
];

function PersonalPage() {
  const [activeFoolMenu, setActiveFoolMenu] = useState(false);
  const [activeExitMenu, setActiveExitMenu] = useState(false);
  const [activeTable, setActiveTable] = useState("mainWorker");
  const [isMod, setIsMod] = useState(false);
  const [page, setPage] = useState(1);
  return (
    <>
      <Header
        activeExitMenu={activeExitMenu}
        setActiveExitMenu={setActiveExitMenu}
        activeFoolMenu={activeFoolMenu}
        setActiveFoolMenu={setActiveFoolMenu}
      />
      <div className={`view-toolbar ${activeTable === "main" ? "disable" : "enable" }`}>
      <Toolbar
        activeTable={activeTable}
        activeFoolMenu={activeFoolMenu}
        setPage={setPage}
      />
      </div>
      <Navigation
        activeFoolMenu={activeFoolMenu}
        activeTable={activeTable}
        setActiveTable={setActiveTable}
        navButtonsConfig={navButtonsConfig}
      />
      <div className={`main-content-area ${activeFoolMenu ? 'sidebar-enabled' : 'sidebar-disabled'}`}>
        <Table
          isMod={isMod}
          setIsMod={setIsMod}
          activeTable={activeTable}
          activeFoolMenu={activeFoolMenu}
        />
      </div>
      <ExitModal
        activeExitMenu={activeExitMenu}
        setActiveExitMenu={setActiveExitMenu}
      />
    </>
  );
}

export default PersonalPage;
