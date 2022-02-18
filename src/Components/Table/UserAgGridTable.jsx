// from libraries
import React, { useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";

// components
import UserForm from "../Form/UserForm";

// common components
import FormModal from "../../Common/FormModal";

// rtk features
import { useDeleteUserDetailMutation } from "../../RTK/UserSlice";

// styles
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import swal from "sweetalert";

const pageSize = 10;
const UserAgGridTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteUser] = useDeleteUserDetailMutation();

  const modules = [
    ServerSideRowModelModule,
    MenuModule,
    ColumnsToolPanelModule,
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
            <FormModal
              component={<UserForm userDetail={data} />}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              button={
                <button
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className="btn btn-warning"
                >
                  Edit
                </button>
              }
            />
          </div>
        );
      },
    },
  ];

  //   Ag Server Side
  const datasource = {
    getRows(params) {
      console.log(JSON.stringify(params.request, null, 1));
      const { startRow, endRow, filterModel, sortModel } = params.request;
      let url = `http://localhost:5555/user?`;
      //Sorting
      if (sortModel.length) {
        const { colId, sort } = sortModel[0];
        url += `_sort=${colId}&_order=${sort}&`;
      }
      //Filtering
      const filterKeys = Object.keys(filterModel);
      filterKeys.forEach((filter) => {
        url += `${filter}=${filterModel[filter].filter}&`;
      });
      //Pagination
      url += `_start=${startRow}&_end=${endRow}`;
      fetch(url)
        .then((httpResponse) => httpResponse.json())
        .then((response) => {
          params.success({ rowData: response, rowCount: response.length });
        })
        .catch((error) => {
          console.error(error);
          params.fail();
        });
    },
  };
  const onGridReady = (params) => {
    params.api.setServerSideDatasource(datasource);
  };

  return (
    <div className="container">
      {/* {userDetails && ( */}
      <div className="ag-theme-alpine" style={{ height: 600, width: 1200 }}>
        <AgGridReact
          // defaultColDef={defaultColDef}
          modules={modules}
          // rowData={userDetails}
          columnDefs={columnDefs}
          rowModelType="serverSide"
          onGridReady={onGridReady}
          cacheBlockSize={pageSize}
          pagination
          paginationPageSize={pageSize}
          domLayout="autoHeight"
          serverSideStoreType="partial"
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
