import React from "react";
import { useNavigate } from "react-router-dom";

const ClientAdd = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row items-center justify-center mt-2">
      <button
        className="bg-blue-900 p-2.5 rounded-md text-white"
        onClick={() => {
          navigate("/addClient");
        }}
      >
        New Job Sheet
      </button>
    </div>
  );
};

export default ClientAdd;
