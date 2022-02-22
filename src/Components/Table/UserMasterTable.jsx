// from libraries
import React, { useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";

// component
import UserMasterForm from "../Form/UserMasterForm";

// common component
import FormModal from "../../Common/FormModal";

const UserMasterTable = ({ userDetail }) => {
  // hooks
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columnDefs = [
    {
      field: "companyName",
    },
    {
      field: "numberOfEmployee",
    },
  ];
  return (
    <div className="container m-3 d-flex justify-content-around">
      <div className="mastr-table-avtions">
        <FormModal
          title={"User Company-Detail"}
          size="md"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          button={
            <button
              className="btn btn-secondary"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              Add
            </button>
          }
          component={<UserMasterForm userDetail={userDetail} />}
        />
      </div>
      <div className="master-table">
        <div className="ag-theme-alpine" style={{ height: 600, width: 500 }}>
          <AgGridReact
            rowData={userDetail?.companyDetail}
            columnDefs={columnDefs}
            domLayout
            defaultColDef={{
              filter: true,
              floatingFilter: true,
              sortable: true,
              flex: 1,
            }}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default UserMasterTable;
