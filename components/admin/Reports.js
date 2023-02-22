import React, { useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
registerLocale("es", es);
function Reports({ data }) {
  const [nameFilter, setNameFilter] = useState("");
  const [lastnameFilter, setLastnameFilter] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleFirstPageClick = () => {
    setCurrentPage(1);
  };
  const handleLastPageClick = () => {
    setCurrentPage(Math.ceil(filteredData.length / rowsPerPage));
  };
  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleLastnameFilterChange = (event) => {
    setLastnameFilter(event.target.value);
  };

  const handleDateStartChange = (event) => {
    setDateStart(event.target.value);
  };

  const handleDateEndChange = (event) => {
    setDateEnd(event.target.value);
  };

  const filterData = () => {
    return data.filter((item) => {
      const name = item.id.toLowerCase();
      const lastname = item.id.toLowerCase();
      const date = new Date(item.date).getTime();

      if (nameFilter && name.indexOf(nameFilter.toLowerCase()) === -1) {
        return false;
      }

      if (
        lastnameFilter &&
        lastname.indexOf(lastnameFilter.toUpperCase()) === -1
      ) {
        return false;
      }

      if (dateStart && date < new Date(dateStart).getTime()) {
        return false;
      }

      if (dateEnd && date > new Date(dateEnd).getTime()) {
        return false;
      }

      return true;
    });
  };

  const filteredData = filterData();
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  return (
    <>
      <div className="table-container">
        <div className="header-container">
          <form autoComplete="off">
            <label htmlFor="name-filter">Filtrar por Nombre:</label>
            <input
              type="text"
              id="name-filter"
              value={nameFilter}
              onChange={handleNameFilterChange}
            />

            <label htmlFor="lastname-filter">Filtrar por Apellido:</label>
            <input
              type="text"
              id="lastname-filter"
              value={lastnameFilter}
              onChange={handleLastnameFilterChange}
            />

            <label htmlFor="date-filter">Filtrar por Fecha:</label>

            <DatePicker
              id="fechaInicio"
              selected={dateStart}
              onChange={(date) => setDateStart(date)}
              showTimeSelect
              locale="es"
              timeFormat="h:mm aa"
              timeIntervals={60}
              timeCaption="Hora"
              dateFormat="yyyy-MM-dd h:mm aa"
            />

            <DatePicker
              id="fechaInicio"
              selected={dateEnd}
              onChange={(date) => setDateEnd(date)}
              showTimeSelect
              locale="es"
              timeFormat="h:mm aa"
              timeIntervals={60}
              timeCaption="Hora"
              dateFormat="yyyy-MM-dd h:mm aa"
            />
          </form>
        </div>
        <div className="table-body">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Fecha de Nacimiento</th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedData().map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.client}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={handleFirstPageClick}>Primera página</button>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Anterior
          </button>

          <span>
            Página {currentPage} de {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Siguiente
          </button>
          <button disabled={currentPage === totalPages} onClick={handleLastPageClick}>Ultima página</button>

          <select
            value={rowsPerPage}
            onChange={(event) => setRowsPerPage(parseInt(event.target.value))}
          >
            <option value="5">5 filas por página</option>
            <option value="10">10 filas por página</option>
            <option value="50">50 filas por página</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default Reports;
