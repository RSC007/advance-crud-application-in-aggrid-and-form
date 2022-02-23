// from libraries
import React, { useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";

// component
import UserMasterForm from "../Form/UserMasterForm";

// common component
import FormModal from "../../Common/FormModal";

// from utils and rtk
import { deletePopup } from "utils";
import { usePutUserDetailMutation } from "RTK/UserApi";

// style
import "Assets/styles/UserMasterTable.css";

const message = "This Company Detail has been deleted!";
const UserMasterTable = ({ userDetail }) => {
  // hooks
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changeCompanyDetail, setChangeCompanyDetail] = useState({});
  const [formrequestType, setFormrequestType] = useState("Add");

  // rtk
  const [updateUser] = usePutUserDetailMutation();

  const removeCompanyDetail = (data) => {
    let companyRemoved = userDetail?.companyDetail.filter(
      (company) => company.companyName !== data.companyName
    );
    let updateDetail = { ...userDetail, companyDetail: companyRemoved };
    deletePopup(updateUser, updateDetail, message);
  };

  // ag-grid fuctionalities
  const columnDefs = [
    {
      field: "companyName",
    },
    {
      field: "numberOfEmployee",
      cellStyle: ({ data }) => {
        if (data.numberOfEmployee > 5000) {
          return { "border-left-color": "green" };
        } else {
          return { "border-left-color": "red" };
        }
      },
    },
    {
      field: "Action",
      cellRenderer: ({ data }) => {
        return (
          <div className="master-table-actions">
            <button
              className="btn btn-danger"
              onClick={() => removeCompanyDetail(data)}
            >
              Delete
            </button>
            {"    "}
            <button
              className="btn btn-warning"
              onClick={() => {
                setChangeCompanyDetail(data);
                setIsModalOpen(!isModalOpen);
                setFormrequestType("Edit");
              }}
            >
              Edit
            </button>
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
              onClick={() => {
                setChangeCompanyDetail({});
                setFormrequestType("Add");
                setIsModalOpen(!isModalOpen);
              }}
            >
              Add
            </button>
          }
          component={
            <UserMasterForm
              changeCompanyDetail={changeCompanyDetail}
              userDetail={userDetail}
              formType={formrequestType}
            />
          }
        />
        <div className="information">
          <h3>{userDetail?.name}</h3>
        </div>
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
