// from libraries
import React, { useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";

// component
import UserMasterForm from "../Form/UserMasterForm";

// common component
import FormModal from "../../Common/FormModal";

// style
import "../../Assets/styles/UserMasterTable.css";
import { usePutUserDetailMutation } from "../../RTK/UserApi";
import { deletePopup } from "../../utils";

const UserMasterTable = ({ userDetail }) => {
  // hooks
  const [isModalOpen, setIsModalOpen] = useState(false);

  // rtk
  const [updateUser] = usePutUserDetailMutation();

  const addCompanyDetail = (data) => {
    let companyRemoved = userDetail?.companyDetail.filter(
      (company) => company.companyName !== data.companyName
    );
    let updateDetail = { ...userDetail, companyDetail: companyRemoved };
    deletePopup(updateUser, updateDetail);
  };

  // ag-grid fuctionalities
  const columnDefs = [
    {
      field: "companyName",
    },
    {
      field: "numberOfEmployee",
    },
    {
      field: "Action",
      cellRenderer: ({ data }) => {
        return (
          <div className="master-table-actions">
            <button
              className="btn btn-danger"
              onClick={() => addCompanyDetail(data)}
            >
              Delete
            </button>
            {"    "}
            <button className="btn btn-warning">Edit</button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="user-master-table-container">
      <div className="mastr-table-avtions">
        <FormModal
          title={"User Company-Detail"}
          size="md"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          button={
            <button
              className="btn btn-info"
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
            domLayout="autoHeight"
            defaultColDef={{
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
