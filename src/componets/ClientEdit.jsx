import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchJobsheetById, updateJobsheet } from "../redux/jobsheetslice"; 

const ClientEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jobsheet = useSelector((state) =>
    state.jobsheets.jobsheets.find((js) => js._id === id)
  );

  function formatDateForInput(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const [formData, setFormData] = useState({
    clientName: "",
    contactNumber: "",
    receivedDate: "",
    inventory: "",
    file: "",
    reportedIssue: "",
    clientNotes: "",
    technician: "",
    deadline: "",
    estimatedAmount: "",
    add_note:"",
    status: "Pending",
  });

  useEffect(() => {
    if (id && !jobsheet) {
      dispatch(fetchJobsheetById(id));
    } else if (jobsheet) {
      setFormData({
        clientName: jobsheet.clientName || "",
        contactNumber: jobsheet.contactNumber || "",
        receivedDate: jobsheet.receivedDate || "", 
        inventory: jobsheet.inventory || "",
        file: jobsheet.file || "",
        reportedIssue: jobsheet.reportedIssue || "",
        clientNotes: jobsheet.clientNotes || "",
        technician: jobsheet.technician || "",
        deadline: jobsheet.deadline || "",
        estimatedAmount: jobsheet.estimatedAmount || "",
        add_note: jobsheet.add_note || "",
        status: jobsheet.status || "Pending",
      });
    }
  }, [id, jobsheet, dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    dispatch(updateJobsheet({ id, jobsheetData: formDataToSend }))
      .unwrap() 
      .then((response) => {
        console.log("Response:", response);
        alert("Job updated successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  return (
    <div>
      <div className="flex items-center justify-center p-3 mt-2 text-3xl font-bold text-white bg-blue-900 rounded-t-md">
        EDIT JOB
      </div>
      <div
        className="flex items-center justify-center mt-2 bg-red-400 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </div>
      <form className="max-w-xl p-6 mx-auto" onSubmit={handleSubmit}>
        {/* Form Fields */}
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">
            Client Name:
          </label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter client name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">
            Client Contact Number:
          </label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter contact number"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">
            Received Date:
          </label>
          <input
            type="date"
            name="receivedDate"
            value={formatDateForInput(formData.receivedDate)}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">
            Inventory Received:
          </label>
          <input
            type="text"
            name="inventory"
            value={formData.inventory}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter inventory received"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">
            Upload File (Video/Image/Document):
          </label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            accept="video/*,image/*,.pdf,.doc,.docx"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">
            Reported Issue:
          </label>
          <textarea
            name="reportedIssue"
            value={formData.reportedIssue}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Describe the reported issue"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">
            Client Notes:
          </label>
          <textarea
            name="clientNotes"
            value={formData.clientNotes}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter any additional notes"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">
            Assigned Technician:
          </label>
          <input
            type="text"
            name="technician"
            value={formData.technician}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter technician name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">
            Deadline:
          </label>
          <input
            type="date"
            name="deadline"
            value={formatDateForInput(formData.deadline)}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">
            Estimated Amount:
          </label>
          <input
            type="number"
            name="estimatedAmount"
            value={formData.estimatedAmount}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter estimated amount"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-blue-400 ">
            Add Note:
          </label>
          <textarea
            type="text"
            name="add_note"
            value={formData.add_note}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="add Note"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full p-3 mt-4 text-white bg-blue-900 rounded-md"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ClientEdit;
