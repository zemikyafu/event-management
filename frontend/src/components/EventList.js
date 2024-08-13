import React, { useEffect, useState, useMemo } from "react";
import { useTable } from "react-table";
import "../components/Event.css";
import axios from "axios";

const EventList = (prob) => {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState({ messageType: "", message: "" });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5); // Set the number of rows per page

  axios.defaults.baseURL = "http://localhost:8080/api/";


  const handleEdit = (event) => {
    prob.handleEdit(event,true)

};
  useEffect(() => {
    axios
      .get("/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        if (error.response) {
          const statusCode = error.response.status;
          if (statusCode === 500) {
            setMessage({
              messageType: "error-message",
              message: "Server error. Please try again later.",
            });
          } else {
            setMessage({
              messageType: "error-message",
              message: `Unexpected error: ${statusCode}. Please try again.`,
            });
          }
        } else if (error.request) {
          console.log("No response received:", error.request);
          setMessage({
            messageType: "error-message",
            message: "Network error. Please check your internet connection.",
          });
        } else {
          console.log("Error", error.message);
          setMessage({
            messageType: "error-message",
            message: "An unknown error occurred. Please try again.",
          });
        }
      });
  }, [prob.eventChanged]);

  const handleDelete = (id) => {

 //delete  existing event
 
 axios.delete('/events/'+id).then((response)=>{
     if (response.status === 200) {
         setMessage({messageType:'success-message',message:'Event deleted successfully.'})
        // prob.onEventChanged(response.data);
        }
 }).catch((error)=>{
     if(error.response)
         {
             const statusCode= error.response.status;
             if (statusCode === 400) {
                 setMessage({messageType:'error-message',message:'Missing required fields.'})
               } else if (statusCode === 500) {
                 setMessage({messageType:'error-message',message:'Server error. Please try again later.'})
               } else {
                 setMessage({messageType:'error-message',message:`Unexpected error: ${statusCode}. Please try again.`})
               }
            
         }
         else if (error.request) {
             console.log("No response received:", error.request);
             setMessage({messageType:'error-message',message:'Network error. Please check your internet connection.'})
             
           } else {
             console.log("Error", error.message);
             setMessage({messageType:'error-message',message:'An unknown error occurred. Please try again.'})
             
           }
 })

  };

  const columns = useMemo(
    () => [
      { Header: "Title", accessor: "title" },
      { Header: "Description", accessor: "description" },
      { Header: "Venue", accessor: "venue" },
      { Header: "Date", accessor: "date" },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div>
            <button className="edit-event-button" onClick={() => handleEdit(row.original)}>Edit</button>
            <button className="delete-event-button" onClick={() => handleDelete(row.original.id)}>
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => events, [events]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="event-list">
      <h2>Registered Events</h2>
      <table
        {...getTableProps()}
        style={{ width: "100%", border: "1px solid black" }}
      >
        <thead>
          {/* {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))} */}
           {headerGroups.map((headerGroup) => (
    <tr {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column) => {
        const { key, ...rest } = column.getHeaderProps();
        return (
          <th key={key} {...rest}>
            {column.render("Header")}
            <span>
              {column.isSorted
                ? column.isSortedDesc
                  ? " 🔽"
                  : " 🔼"
                : ""}
            </span>
          </th>
        );
      })}
    </tr>
  ))}
        </thead>

        <thead>
 
</thead>
        <tbody {...getTableBodyProps()}>
          {currentRows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventList;
