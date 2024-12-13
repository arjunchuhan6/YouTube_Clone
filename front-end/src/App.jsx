import React from "react";
import Header from './components/Header';
import { SidebarProvider } from './sidebar/Sidebar';
import { SearchProvider } from './sidebar/Sidebar';
import { Outlet } from "react-router-dom";
function App() {

  return (
    <SidebarProvider>
    <SearchProvider>
      <Header/>
      <Outlet />
    </SearchProvider>
    </SidebarProvider>
    
  );
};

export default App;
 