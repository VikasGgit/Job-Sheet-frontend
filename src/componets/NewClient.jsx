import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createJobsheet } from "../redux/jobsheetslice";

const NewClient = () => {
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
    status: "Pending",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    if (
      !formData.clientName ||
      !formData.contactNumber ||
      !formData.deadline ||
      !formData.receivedDate ||
      !formData.inventory ||
      !formData.reportedIssue
    ) {
      return alert("*  is required");
    }
    
    console.log(formDataToSend);
    dispatch(createJobsheet(formDataToSend))
      .unwrap()
      .then((response) => {
        console.log("Response:", response);
        alert("New job added successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  return (
    <div>
      <div className="flex items-center justify-center p-3 mt-2 text-3xl font-bold text-white bg-blue-900">
        CREATE NEW JOB
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
            Client Name * :
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
            Client Contact Number * :
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
            Received Date * :
          </label>
          <input
            type="date"
            name="receivedDate"
            value={formData.receivedDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">
            Inventory Received * :
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
            Reported Issue * :
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
            Deadline * :
          </label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewClient;
