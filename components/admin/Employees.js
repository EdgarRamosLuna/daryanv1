import React, { useCallback, useEffect, useMemo, useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
registerLocale("es", es);
function Employees({ data }) {
  const [nameFilter, setNameFilter] = useState("");
  const [lastnameFilter, setLastnameFilter] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleFirstPageClick = () => {
    setCurrentPage(1);
  };
  const handleLastPageClick = () => {
    setCurrentPage(Math.ceil(filteredData.length / rowsPerPage));
  };
  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const filterData = useCallback(() => {
    return data.filter((item) => {
      const name = item.username.toLowerCase();
      const id = item.id;
      const fullName = `${name} ${id}`; // combinamos name y id en una sola variable
      const date = new Date(item.date).getTime();

      if (nameFilter && fullName.indexOf(nameFilter.toLowerCase()) === -1) {
        // buscamos dentro de fullName
        return false;
      }

      if (
        (dateStart && date < new Date(dateStart).getTime() && dateEnd) ||
        date > new Date(dateEnd).getTime()
      ) {
        return false;
      }
      /*
      if () {
        return false;
      }*/

      return true;
    });
  }, [nameFilter, dateStart, dateEnd]);

  const filteredData = filterData();
  const getPaginatedData = useCallback(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData]);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePageChange = useCallback(
    (pageNumber) => {
      if (pageNumber < 1) {
        setCurrentPage(1);
      } else if (pageNumber > totalPages) {
        setCurrentPage(totalPages);
      } else {
        setCurrentPage(pageNumber);
      }
    },
    [totalPages]
  );
  return (
    <>
      <div className="table-container">
        <div className="header-container">
          <form autoComplete="off">
            <div className="filter-container">
              <div className="filter-item">
                <label htmlFor="name-filter">Buscar por Nombre:</label>
                <div className="filter-item-input">
                  <input
                    type="text"
                    id="name-filter"
                    value={nameFilter}
                    onChange={handleNameFilterChange}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="table-body">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {getPaginatedData().map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>
                    <div className="actions">
                      <i className="fa-solid fa-trash"></i>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <span>
            Página {currentPage} de {totalPages}
          </span>

          <button disabled={currentPage === 1} onClick={handleFirstPageClick}>
            <i className="fa-solid fa-backward-step"></i>
          </button>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={handleLastPageClick}
          >
            <i className="fa-solid fa-forward-step"></i>
          </button>

          <select
            value={rowsPerPage}
            onChange={(event) => setRowsPerPage(parseInt(event.target.value))}
          >
            <option value="20">20 filas por página</option>
            <option value="50">50 filas por página</option>
            <option value="100">100 filas por página</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default Employees;
