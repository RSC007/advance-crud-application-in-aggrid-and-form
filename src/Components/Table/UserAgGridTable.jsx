// from libraries
import React, { useEffect, useRef, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import swal from "sweetalert";

// components
import UserForm from "../Form/UserForm";
import UserMasterTable from "./UserMasterTable";

// common components
import FormModal from "../../Common/FormModal";

// rtk features
import {
  useDeleteUserDetailMutation,
  useGetUserDetailsQuery,
} from "../../RTK/UserApi";

// styles
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";

const UserAgGridTable = () => {
  // Hooks
  const [rowData, setRowData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [gridApi, setGridApi] = useState(null);

  const gridRef = useRef();

  // rtk hooks
  const [deleteUser] = useDeleteUserDetailMutation();
  const { data: userDetials } = useGetUserDetailsQuery();

  useEffect(() => {
    setRowData(userDetials);
  }, [userDetials]);

  // Ag-Grid Features and functionalities
  const modules = [
    MenuModule,
    ClientSideRowModelModule,
    SetFilterModule,
    RowGroupingModule,
    MasterDetailModule,
    ColumnsToolPanelModule,
  ];

  const columnDefs = [
    { field: "email", filter: "agTextColumnFilter" },
    {
      field: "name",
      filter: "agTextColumnFilter",
      cellRenderer: "agGroupCellRenderer",
    },
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

  const onGridReady = (parmas) => {
    setGridApi(parmas);
  };

  const quickSearchUserDetail = (input) => {
    gridApi.api.setQuickFilter(input);
  };

  // masterDetail Chile Table
  const detailCellRenderer = ({ data }) => {
    return <UserMasterTable userDetail={data} />;
  };
  // Client side features
  const printNode = (node, index) => {
    console.log("node", node.data);
  };

  const onBtForEachLeafNode = () => {
    gridRef.current.api.forEachLeafNode(printNode);
  };

  const onBtnForEachAfterSort = () => {
    gridRef.current.api.forEachNodeAfterFilterAndSort(printNode);
  };

  return (
    <div className="container">
      <div className="client-side-feature row mb-3">
        <div className="global-search col-4">
          <input
            className="form-control"
            type="search"
            placeholder="Search anything related user detail here...."
            onChange={(e) => quickSearchUserDetail(e.target.value)}
          />
        </div>
        <div className="each-node-data col-3">
          <button className="btn" onClick={onBtForEachLeafNode}>
            forEachLeafNode
          </button>
        </div>
        <div className="each-node-after-sort col-3">
          <button className="btn btn" onClick={onBtnForEachAfterSort}>
            forEachNodeAfterSort
          </button>
        </div>
      </div>
      <FormModal
        title={"Add User-Detail"}
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
          ref={gridRef}
          onGridReady={onGridReady}
          modules={modules}
          rowData={rowData}
          columnDefs={columnDefs}
          detailCellRenderer={detailCellRenderer}
          masterDetail={true}
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
