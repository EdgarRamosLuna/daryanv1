import React, { useEffect, useState } from "react";
import style from "./styles.module.css";
import {
  faFileLines,
  faUser,
  faGear,
  faRightFromBracket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubHeader from "./SubHeader";
import Link from "next/link";
import Image from "next/image";
const linksUser = [
  {
    label: "Mis Reportes",
    route: "/app/user/reports",
    ico: faFileLines,
    fun: () => {},
  },
 /* {
    label: "Mi Cuenta",
    route: "/app/user/my-account",
    ico: faGear,
    fun: () => {},
  },*/
  {
    label: "Salir",
    route: "/app/user/login",
    ico: faRightFromBracket,
    fun: (e) => {
      localStorage.removeItem("sesType");
    },
  },
];

const linksClient = [
  {
    label: "Mis Reportes",
    route: "/app/client/reports",
    ico: faFileLines,
    fun: () => {},
  },
/*  {
    label: "Mi Cuenta",
    route: "/app/client/my-account",
    ico: faGear,
    fun: () => {},
  },*/
  {
    label: "Salir",
    route: "/app/client/login",
    ico: faRightFromBracket,
    fun: (e) => {
      localStorage.removeItem("sesType");
    },
  },
];
const linksAdmin = [
  {
    label: "Reportes",
    route: "/app/admin/reports",
    ico: faFileLines,
    fun: (e) => {},
  },
  {
    label: "Usuarios",
    route: "/app/admin/users",
    ico: faUsers,
    fun: (e) => {},
  },
  {
    label: "Empleados",
    route: "/app/admin/employees",
    ico: faUsers,
    fun: (e) => {},
  },
  {
    label: "Clientes",
    route: "/app/admin/clients",
    ico: faUsers,
    fun: (e) => {},
  },
  /*{
    label: "Mi Cuenta",
    route: "/app/admin/my-account",
    ico: faGear,
    fun: (e) => {},
  },*/
  {
    label: "Salir",
    route: "/app/admin/login",
    ico: faRightFromBracket,
    fun: (e) => {
      localStorage.removeItem("sesType");
    },
  },
];

let val;
if (typeof window !== "undefined") {
  // This code will only be executed in the browser
  const value = localStorage.getItem("sesType");
  val = value;
}
export default function Header() {
  const [mapData, setMapData] = useState([]);
  
  useEffect(() => {
    setMapData(linksAdmin);
    if (val === "user") {
      setMapData(linksUser);
    }
    if (val === "client") {
      setMapData(linksClient);
    }
    if (val === "admin") {
      setMapData(linksAdmin);
    }
  }, []);
  return (
    <>
      <header className={style.header}>
        <div className="menu-container">
          <nav>
            <ul>
              <li className={style.logo}>
                <Link href="/app/admin" className="logo">
                  <Image src="/assets/img/logo.png" width={60} height={20} alt="Daryan Saltillo" />
                </Link>
              </li>
              {mapData.map(({ label, route, ico, fun }, ind) => (
                <li key={route}>
                  <Link
                    href={route}
                    onClick={(e) => (label === "Salir" ? fun(e) : "")}
                  >
                    <div className={style.ico}>
                      <FontAwesomeIcon icon={ico} />
                    </div>
                    <div className={style.linkText}>{label}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      
    </>
  );
}
