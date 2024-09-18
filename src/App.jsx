import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientEdit from "./componets/ClientEdit";
import Clients from "./componets/Clients";
import Header from "./componets/Header";
import Footer from "./componets/Footer";
import SeachBar from "./componets/SeachBar";
import ClientsView from "./componets/ClientsView";
import ClientAdd from "./componets/ClientAdd";
import NewClient from "./componets/NewClient";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <div className="p-2 bg-white rounded-md">
      <Router>
        <Provider store={store}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <ClientAdd />
                  <Clients />
                </>
              }
            />
            <Route path="/addClient" element={<NewClient />} />
            <Route path="/edit/:id" element={<ClientEdit />} />
            <Route path="/view/:id" element={<ClientsView />} />
          </Routes>
        </Provider>
      </Router>
    </div>
  );
};

export default App;
