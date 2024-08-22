import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import { SignupHandler } from "./utils/SignupHandler";
import Profile from "./utils/Profile";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SignupHandler />
      <Profile />
      <main className="px-0 sm:px-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
