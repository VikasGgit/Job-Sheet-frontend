import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteJobsheet, fetchJobsheetById } from "../redux/jobsheetslice";

const ClientsView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jobsheets = useSelector((state) => state.jobsheets.jobsheets);
  const jobsheet = jobsheets.find((js) => js._id === id);

  const [notes, setNotes] = useState("");
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    
    dispatch(fetchJobsheetById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (jobsheet) {
      setNotes(jobsheet.clientNotes);
    }
  }, [jobsheet]);

  const handleSaveNote = () => {
    setNotes(newNote);
    setNewNote("");
  };

  if (!jobsheet) {
    return <div>Loading...</div>;
  }
  console.log(jobsheet);
  const editJobSheet = (id) => {
    navigate(`/edit/${id}`);
    console.log("View jobsheet:", id);
  };

  const deleteJobSheet = (id) => {
    dispatch(deleteJobsheet(id));
    alert("Job sheet deleted");
    navigate("/");
    console.log("deleted jobsheet:", id);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="p-4 mb-4 text-xl font-bold text-center text-white bg-blue-900 border border-gray-300 rounded-t-md">
        VIEW JOB DETAILS
      </div>

      <div className="border border-gray-300">
        <div className="grid grid-cols-2">
          <div className="p-3 font-bold text-white bg-blue-900 border border-gray-300">
            Client Name:
          </div>
          <div className="p-3 text-gray-700 bg-white border border-gray-300">
            {jobsheet.clientName}
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="p-3 font-bold text-white bg-blue-900 border border-gray-300">
            Contact Info:
          </div>
          <div className="p-3 text-gray-700 bg-white border border-gray-300">
            {jobsheet.contactNumber}
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="p-3 font-bold text-white bg-blue-900 border border-gray-300">
            Received Date:
          </div>
          <div className="p-3 text-gray-700 bg-white border border-gray-300">
            {new Date(jobsheet.receivedDate).toLocaleDateString()}
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="p-3 font-bold text-white bg-blue-900 border border-gray-300">
            Inventory Received:
          </div>
          <div className="p-3 text-gray-700 bg-white border border-gray-300">
            {jobsheet.inventory}
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="p-3 font-bold text-white bg-blue-900 border border-gray-300">
            Inventory Image/Document/Video:
          </div>
          <div className="p-3 text-blue-500 bg-white border border-gray-300">
            {/* Display file if it exists */}
            {jobsheet.inventoryAttachments && (
              <a
                href={jobsheet.inventoryAttachments}
                target="_blank"
                rel="noopener noreferrer"
              >
                View File
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="p-3 font-bold text-white bg-blue-900 border border-gray-300">
            Reported Issues:
          </div>
          <div className="p-3 text-gray-700 bg-white border border-gray-300">
            {jobsheet.reportedIssue}
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="p-3 font-bold text-white bg-blue-900 border border-gray-300">
            Client Notes:
          </div>
          <div className="p-3 text-gray-700 bg-white border border-gray-300">
            {jobsheet.clientNotes}
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="p-3 font-bold text-white bg-blue-900 border border-gray-300">
            Assigned Technician:
          </div>
          <div className="p-3 text-gray-700 bg-white border border-gray-300">
            {jobsheet.technician}
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="p-3 font-bold text-white bg-blue-900 border border-gray-300">
            Estimated Amount:
          </div>
          <div className="p-3 text-gray-700 bg-white border border-gray-300">
            {jobsheet.estimatedAmount}
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="p-3 font-bold text-white bg-blue-900 border border-gray-300">
            Deadline:
          </div>
          <div className="p-3 text-gray-700 bg-white border border-gray-300">
            {new Date(jobsheet.deadline).toLocaleDateString()}
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="p-3 font-bold text-white bg-blue-900 border border-gray-300">
            Status:
          </div>
          <div className="p-3 text-gray-700 bg-white border border-gray-300">
            {jobsheet.status}
          </div>
        </div>

        <div className="p-3 bg-white border border-gray-300">
          <div className="mb-2 font-bold text-gray-700">
            Add or Update Note:
          </div>
          <textarea
            value={jobsheet.add_note}
            onChange={(e) => {
              alert("click on save changes");
              setNewNote(e.target.value)}}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="3"
          ></textarea>
          <button
            onClick={() => editJobSheet(jobsheet._id)}
            className="px-4 py-2 mt-2 text-white bg-blue-900 rounded-md"
          >
            Save Note
          </button>
        </div>

        <div className="flex justify-between p-3 bg-white border border-gray-300">
          <div>
            <button
              className="px-4 py-2 text-white bg-blue-900 rounded-md"
              onClick={() => editJobSheet(jobsheet._id)}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 ml-2 text-white bg-blue-900 rounded-md"
              onClick={() => deleteJobSheet(jobsheet._id)}
            >
              Delete
            </button>
          </div>
          <div>
            <button
              className="px-4 py-2 mr-3 text-white bg-blue-900 rounded-md"
              onClick={() => navigate("/")}
            >
              Back
            </button>
            <button
              className="px-4 py-2 text-white bg-blue-900 rounded-md"
              onClick={() => window.print()}
            >
              Save as Pdf
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsView;
