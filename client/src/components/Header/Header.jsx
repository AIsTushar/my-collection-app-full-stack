import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";

import Search from "./Search";
import Theme from "./Theme";
import ProfileLogo from "./ProfileLogo";
import Button from "../Button/Button";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

function Header() {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const picture = useSelector((state) => state.user.picture);

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const NaveLinks = () => {
    return (
      <>
        <div className="hidden md:flex text-lg font-medium gap-3">
          <Search />
          {!isAuthenticated ? (
            <Button design="login" onClick={() => loginWithRedirect()}>
              Login
            </Button>
          ) : (
            <>
              <ProfileLogo picture={picture} />
              <Button design="logout" onClick={() => logout()}>
                Logout
              </Button>
            </>
          )}
        </div>
      </>
    );
  };

  return (
    <header className="px-12 py-4 bg-gray-100 text-gray-900">
      <nav className="container mx-auto flex justify-between flex-wrap">
        <Link to="/" className="text-3xl font-bold">
          Collection
        </Link>

        <NaveLinks />

        <div className="flex w-[75px] justify-end md:hidden">
          <button onClick={toggleNavbar}>
            {isOpen ? <RxCross2 /> : <IoMdMenu />}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="mt-4 basis-full flex flex-col items-center gap-4 justify-center md:hidden">
          <>
            <Search />
            <div className="flex text-lg font-medium gap-3">
              {!isAuthenticated ? (
                <Button design="login" onClick={() => loginWithRedirect()}>
                  Login
                </Button>
              ) : (
                <>
                  <ProfileLogo picture={picture} />
                  <Button design="logout" onClick={() => logout()}>
                    Logout
                  </Button>
                </>
              )}
            </div>
          </>
        </div>
      )}
    </header>
  );
}

export default Header;
