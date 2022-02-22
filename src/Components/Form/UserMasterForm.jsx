import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePutUserDetailMutation } from "../../RTK/UserApi";

const UserMasterForm = ({ userDetail }) => {
  // rtk hooks
  const [updateUser] = usePutUserDetailMutation();

  const {
    handleSubmit,
    handleChange,
    values: { companyName, numberOfEmployee },
  } = useFormik({
    initialValues: {
      companyName: "",
      numberOfEmployee: 0,
    },
    onSubmit: (values) => {
      console.log("values---->", values, userDetail);
      let allData = {
        ...userDetail,
        companyDetail: [...userDetail?.companyDetail, values],
      };
      updateUser(allData);
    },
    validationSchema: Yup.object().shape({
      companyName: Yup.string(),
      numberOfEmployee: Yup.number(),
    }),
  });
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group  mb-4">
          <label className="my-2" for="companyName">
            Company Name
          </label>
          <input
            onChange={handleChange}
            id="companyName"
            className="form-control"
            type="text"
            name="companyName"
            value={companyName}
            placeholder="Enetr company name"
          />
        </div>
        <div className="form-group my-4">
          <label className="my-2" for="numberOfEmployee">
            Number Of Employees
          </label>
          <input
            onChange={handleChange}
            id="numberOfEmployee"
            className="form-control"
            type="number"
            name="numberOfEmployee"
            value={numberOfEmployee}
            placeholder="Enter Employee numbers"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserMasterForm;
