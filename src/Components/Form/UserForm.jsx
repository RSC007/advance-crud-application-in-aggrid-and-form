// from libraries
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// from rtk
import {
  usePostUserDetailMutation,
  usePutUserDetailMutation,
} from "../../RTK/UserSlice";

const UserForm = ({ setIsModalOpen, userDetail = {} }) => {
  const [postApi] = usePostUserDetailMutation();

  const [updateUser] = usePutUserDetailMutation();

  const initialValues = {
    email: userDetail.email ? userDetail.email : "",
    name: userDetail.name ? userDetail.name : "",
    address: userDetail.address ? userDetail.address : "",
    city: userDetail.city ? userDetail.city : "",
    state: userDetail.state ? userDetail.state : "",
    zip: userDetail.zip ? userDetail.zip : "",
  };
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors: {
      email: errEmail,
      name: errName,
      address: errAddress,
      city: errCity,
      state: errState,
      zip: errZip,
      check: errCheck,
    },
    touched: {
      email: touchedEmail,
      name: touchedName,
      address: touchedAddress,
      city: touchedCity,
      state: touchedState,
      zip: touchedZip,
      check: touchedCheck,
    },
    values: { email, name, address, city, state, zip },
  } = useFormik({
    initialValues,
    onSubmit: (values) => {
      if (userDetail?.id) {
        let data = { ...values, id: userDetail?.id };
        updateUser(data);
        setIsModalOpen((isModalOpen) => !isModalOpen);
      } else {
        postApi(values);
        setIsModalOpen((isModalOpen) => !isModalOpen);
      }
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required("Email is required"),
      name: Yup.string().required("Name is required"),
      address: Yup.string().required("Address is  required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zip: Yup.number("This must be number").required(
        "Please provide zip code"
      ),
    }),
    enableReinitialize: true,
  });
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail4">Email</label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            type="email"
            className="form-control"
            id="inputEmail4"
            placeholder="Email"
            value={email}
          />
          {errEmail && touchedEmail && (
            <div className="text-danger">{errEmail}</div>
          )}
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputName">Name</label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Enter Name"
            value={name}
          />
          {errName && touchedName && (
            <div className="text-danger">{errName}</div>
          )}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="inputAddress">Address</label>
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          name="address"
          type="text"
          className="form-control"
          id="inputAddress"
          placeholder="1234 Main St"
          value={address}
        />
        {errAddress && touchedAddress && (
          <div className="text-danger">{errAddress}</div>
        )}
      </div>
      <div className="row">
        <div className="form-group col-md-6">
          <label htmlFor="inputCity">City</label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            name="city"
            type="text"
            className="form-control"
            id="inputCity"
            value={city}
          />
          {errCity && touchedCity && (
            <div className="text-danger">{errCity}</div>
          )}
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="inputState">State</label>
          <select
            name="state"
            id="inputState"
            className="form-control"
            onChange={handleChange}
            onBlur={handleBlur}
            value={state}
          >
            <option selected>Choose...</option>
            <option>Gujarat</option>
            <option>Maharashtra</option>
            <option>Punjab</option>
          </select>
          {errState && touchedState && (
            <div className="text-danger">{errState}</div>
          )}
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="inputZip">Zip</label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            name="zip"
            type="text"
            className="form-control"
            id="inputZip"
            value={zip}
          />
          {errZip && touchedZip && <div className="text-danger">{errZip}</div>}
        </div>
      </div>
      <div className="form-group my-3">
        <div className="form-check">
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            name="check"
            className="form-check-input"
            type="checkbox"
            id="gridCheck"
          />
          <label className="form-check-label" htmlFor="gridCheck">
            Check me out
          </label>
          {errCheck && touchedCheck && <div>{errCheck}</div>}
        </div>
      </div>
      <button className="btn btn-primary">
        {userDetail?.id ? "Update Record" : "Add User"}
      </button>
    </form>
  );
};

export default UserForm;
