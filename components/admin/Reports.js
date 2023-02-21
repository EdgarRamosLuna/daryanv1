"use client";
import React, { useState } from "react";
import TableActions from "./TableActions";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
registerLocale("es", es);
import {
  faChevronLeft,
  faChevronRight,
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const columns = [
  {
    name: "Total",
    selector: (row) => row.total,
  },
  {
    name: "Year",
    selector: (row) => row.year,
  },
];

const dataF = [
  {
    id: 1,
    size: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    size: "Ghostbusters",
    year: "1984",
  },
];
const Reports = ({ data }) => {
  //const [sort, setSort] = useState(20);
  const [filasPorPagina, setFilasPorPagina] = useState(20);
  const datos = data;
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState("");
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  // Calcular el número total de páginas
  const totalPaginas = Math.ceil(datos.length / filasPorPagina);

  // Calcular los botones de paginación a mostrar
  const botonesPaginacion = [];
  botonesPaginacion.push(
    <button
      key="inicio"
      className={`boton-paginacion ${paginaActual === 1 ? "activo" : ""}`}
      onClick={() => setPaginaActual(1)}
    >
      <FontAwesomeIcon icon={faCircleChevronLeft} />
    </button>
  );

  botonesPaginacion.push(
    <button
      key="retroceder"
      className={`boton-paginacion ${paginaActual === 1 ? "desactivado" : ""}`}
      onClick={() => setPaginaActual(paginaActual - 1)}
      disabled={paginaActual === 1}
    >
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
  );

  botonesPaginacion.push(
    <button
      key="avanzar"
      className={`boton-paginacion ${
        paginaActual === totalPaginas ? "desactivado" : ""
      }`}
      onClick={() => setPaginaActual(paginaActual + 1)}
      disabled={paginaActual === totalPaginas}
    >
      <FontAwesomeIcon icon={faChevronRight} />
    </button>
  );

  botonesPaginacion.push(
    <button
      key="fin"
      className={`boton-paginacion ${
        paginaActual === totalPaginas ? "activo" : ""
      }`}
      onClick={() => setPaginaActual(totalPaginas)}
    >
      <FontAwesomeIcon icon={faCircleChevronRight} />
    </button>
  );

  // Filtrar los datos por nombre
  /* const datosFiltrados = datos.filter((dato) => {
    return (
      dato.client.toLowerCase().includes(busqueda.toLowerCase()) ||
      dato.id.toLowerCase().includes(busqueda.toLowerCase())
    );
  });*/
  const [rangoFechas, setRangoFechas] = useState({
    startDate: null,
    endDate: null,
    key: "selection",
  });
  // Filtrar los datos por nombre, email y rango de fecha
  const datosFiltrados = datos.filter((dato) => {
    let fecha = new Date(dato.date);
    if (isNaN(fecha.getTime())) {
      fecha = null;
    }
    return (
      dato.id.toLowerCase().includes(busqueda.toLowerCase()) ||
      dato.client.toLowerCase().includes(busqueda.toLowerCase()) ||
      (fecha && fecha >= rangoFechas.startDate && fecha <= rangoFechas.endDate)
    );
  });

  // Calcular el índice del primer elemento de la página actual
  const indiceInicio = (paginaActual - 1) * filasPorPagina;

  // Calcular los datos que se mostrarán en la página actual
  const datosPagina = datosFiltrados.slice(
    indiceInicio,
    indiceInicio + filasPorPagina
  );
  const handleSelect = (event) => {
    setFilasPorPagina(parseInt(event.target.value));
    setPaginaActual(1); // Volver a la página 1 al cambiar la cantidad de filas por página
  };

  //console.log(fechaInicio);
  return (
    <>
      <div className="table-container">
        <div className="table-header"></div>
        <div className="table-body">
        <form autoComplete="off">
            <div className="absolute">
              <div className="fix">
                <label htmlFor="busqueda">Buscar:</label>
                <input
                  type="text"
                  id="busqueda"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="fechaInicio">Fecha de inicio:</label>
              <DatePicker
                id="fechaInicio"
                selected={fechaInicio}
                onChange={(date) => setFechaInicio(date)}
                showTimeSelect
                locale="es"
                timeFormat="h:mm aa"
                timeIntervals={60}
                timeCaption="Hora"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
            <div>
              <label htmlFor="fechaFin">Fecha de fin:</label>
              <DatePicker
                id="fechaFin"
                selected={fechaFin}
                onChange={(date) => setFechaFin(date)}
                showTimeSelect
                locale="es"
                timeFormat="h:mm aa"
                timeIntervals={60}
                timeCaption="Hora"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
          </form>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {datosPagina
                .filter((dato) => {
                  if (!fechaInicio || !fechaFin) {
                    return true;
                  }
                  const fechaDato = new Date(dato.date);
                  return fechaDato >= fechaInicio && fechaDato <= fechaFin;
                })
                .map((dato) => (
                  <tr key={dato.id}>
                    <td>{dato.id}</td>
                    <td>{dato.client}</td>
                    <td>{dato.total}</td>
                    <td>{dato.date}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="contenedor-paginacion">
          <div className="paginacion-number">
            <select value={filasPorPagina} onChange={(e) => handleSelect(e)}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="300">300</option>
              <option value="500">500</option>
              <option value="1000">1000</option>
            </select>
          </div>
          <div className="paginacion-btns">{botonesPaginacion}</div>
        </div>
      </div>
    </>
  );
};

export default Reports;
