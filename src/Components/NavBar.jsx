// FRom libraries
import React, { useState } from "react";
import { Button } from "reactstrap";

// Common Components
import FormModal from "../Common/FormModal";
import UserForm from "./Form/UserForm";

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <FormModal
              component={<UserForm setIsModalOpen={setIsModalOpen} />}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              button={
                <Button
                  color="success"
                  onClick={() => setIsModalOpen(!isModalOpen)}
                >
                  Add User
                </Button>
              }
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
