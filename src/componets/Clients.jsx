import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteJobsheet, fetchJobsheets } from "../redux/jobsheetslice";
import SearchBar from "./SeachBar";

function Clients() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jobsheets = useSelector((state) => state.jobsheets.jobsheets);
  const status = useSelector((state) => state.jobsheets.status);
  const error = useSelector((state) => state.jobsheets.error);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobsheets, setFilteredJobsheets] = useState([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchJobsheets());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = jobsheets.filter(
        (sheet) =>
          sheet.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sheet._id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredJobsheets(filtered);
    } else {
      setFilteredJobsheets(jobsheets);
    }
  }, [searchTerm, jobsheets]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const viewJobSheet = (id) => {
    navigate(`/view/${id}`);
    console.log("View jobsheet:", id);
  };

  const editJobSheet = (id) => {
    navigate(`/edit/${id}`);
    console.log("Edit jobsheet:", id);
  };

  const deleteJobSheet = (id) => {
    dispatch(deleteJobsheet(id));
    console.log("Deleted jobsheet:", id);
  };

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="mb-4 text-2xl font-bold">All Jobsheets</h2>
      <SearchBar onSearch={setSearchTerm} />
      <table className="w-full mt-4 border-collapse table-auto">
        <thead className="text-white bg-blue-900">
          <tr>
            <th>#</th>
            <th>Client Id</th>
            <th>Client Name</th>
            <th>Contact Info</th>
            <th>Received Date</th>
            <th>Inventory Received</th>
            <th>Reported Issues</th>
            <th>Client Notes</th>
            <th>Assigned Technician</th>
            <th>Estimated Amount</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobsheets?.map((sheet, index) => (
            <tr key={sheet._id}>
              <td>{index + 1}</td>
              <td className="break-all">{sheet._id}</td>
              <td className="break-all">{sheet.clientName}</td>
              <td className="break-all">{sheet.contactNumber}</td>
              <td>{new Date(sheet.receivedDate).toLocaleDateString()}</td>
              <td className="break-all">{sheet.inventory}</td>
              <td className="break-all">{sheet.reportedIssue}</td>
              <td className="break-all">{sheet.clientNotes}</td>
              <td>{sheet.technician}</td>
              <td>{sheet.estimatedAmount}</td>
              <td>{new Date(sheet.deadline).toLocaleDateString()}</td>
              <td>{sheet.status}</td>
              <td>
                <button
                  className="px-2 py-1 mr-2 text-white bg-blue-900 rounded"
                  onClick={() => viewJobSheet(sheet._id)}
                >
                  View
                </button>
                <button
                  className="px-2 py-1 text-white bg-orange-500 rounded"
                  onClick={() => editJobSheet(sheet._id)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 text-white bg-red-500 rounded"
                  onClick={() => deleteJobSheet(sheet._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clients;
