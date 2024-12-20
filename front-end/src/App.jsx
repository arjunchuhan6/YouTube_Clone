import React from "react";
import Header from './components/Header';
import { SidebarProvider } from './sidebar/Sidebar';
import { SearchProvider } from './sidebar/Sidebar';
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import Footer from "./components/Footer.jsx"
import videoStore from "./sidebar/videoStore.js";
function App() {

  return (
    <Provider store={videoStore}>
      <SidebarProvider>
        <SearchProvider>
          <Header />
          <Outlet />
          <Footer />
        </SearchProvider>
      </SidebarProvider>
    </Provider>
  );
};

export default App;
