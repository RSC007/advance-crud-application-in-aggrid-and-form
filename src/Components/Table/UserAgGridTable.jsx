// from libraries
import React, { useEffect, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";

// components
import UserForm from "../Form/UserForm";

// common components
import FormModal from "../../Common/FormModal";

// rtk features
import {
  useDeleteUserDetailMutation,
  useGetUserDetailsQuery,
} from "../../RTK/UserSlice";

// styles
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import swal from "sweetalert";

const UserAgGridTable = () => {
  const [rowData, setRowData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetail, setUserDetail] = useState({});

  const [deleteUser] = useDeleteUserDetailMutation();
  const { data: userDetials } = useGetUserDetailsQuery();

  useEffect(() => {
    console.log("userDetials", userDetials);
    setRowData(userDetials);
  }, [userDetials]);

  const modules = [
    MenuModule,
    ClientSideRowModelModule,
    SetFilterModule,
    RowGroupingModule,
  ];

  const columnDefs = [
    { field: "email", filter: "agTextColumnFilter" },
    { field: "name", filter: "agTextColumnFilter" },
    { field: "address", filter: "agTextColumnFilter" },
    { field: "city", filter: "agTextColumnFilter" },
    { field: "state", filter: "agTextColumnFilter" },
    { field: "zip", filter: "agTextColumnFilter" },
    {
      field: "Action",
      cellRenderer: ({ data }) => {
        return (
          <div className="actions">
            <button
              onClick={() => {
                swal({
                  title: "Are you sure?",
                  text: "Once deleted, you will not be able to recover this Detail!",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                }).then((willDelete) => {
                  if (willDelete) {
                    swal("Poof! This detail has been deleted!", {
                      icon: "success",
                    });
                    deleteUser(data.id);
                  } else {
                    swal("This detail is safe!");
                  }
                });
              }}
              className="btn btn-danger"
            >
              Delete
            </button>
            {"   "}
            <button
              onClick={() => {
                setIsModalOpen(!isModalOpen);
                setUserDetail(data);
              }}
              className="btn btn-warning"
            >
              Edit
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="container">
      <FormModal
        component={
          <UserForm userDetail={userDetail} setIsModalOpen={setIsModalOpen} />
        }
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        button={
          <button
            onClick={() => {
              setIsModalOpen(!isModalOpen);
            }}
            className="btn btn-success mb-3"
          >
            Add User
          </button>
        }
      />
      <div className="ag-theme-alpine" style={{ height: 600, width: 1200 }}>
        <AgGridReact
          // ref={gridRef}
          modules={modules}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{
            filter: true,
            floatingFilter: true,
            sortable: true,
            flex: 1,
          }}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default UserAgGridTable;
