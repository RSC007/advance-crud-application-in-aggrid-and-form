// from libraries
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AsyncSelect from "react-select/async";
import Select from "react-select";

// from rtk
import {
  useGetUserDetailsQuery,
  useLazyGetUserDetailsQuery,
  usePostUserDetailMutation,
  usePutUserDetailMutation,
} from "RTK/UserApi";

const UserForm = ({ setIsModalOpen, userDetail = {} }) => {
  // rtk hooks
  const [postApi] = usePostUserDetailMutation();
  const [updateUser] = usePutUserDetailMutation();
  const [getAllState] = useLazyGetUserDetailsQuery();
  const { data: getRequestAllCities } = useGetUserDetailsQuery({
    endPoint: `cities`,
  });

  // react-select features
  const loadOptionsForState = async (inputValue) => {
    return inputValue
      ? getAllState({ endPoint: `states?name=${inputValue}` }).then(
          (response) => response.data
        )
      : getAllState({ endPoint: "states" }).then((response) => response.data);
  };

  // useFormik regarding form
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
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
    values: { email, name, address, city, state, zip, check },
  } = useFormik({
    initialValues: {
      email: userDetail.email ? userDetail.email : "",
      name: userDetail.name ? userDetail.name : "",
      address: userDetail.address ? userDetail.address : "",
      city: userDetail.city ? userDetail.city : "",
      state: userDetail.state ? userDetail.state : "",
      zip: userDetail.zip ? userDetail.zip : "",
      check: userDetail?.check ? userDetail.check : false,
    },
    onSubmit: (values) => {
      if (values?.check) {
        if (userDetail?.id) {
          let data = { ...values, id: userDetail?.id };
          updateUser({ endPoint: "user", body: data, id: data.id });
        } else {
          postApi({ endPoint: "user", body: values });
        }
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
      check: Yup.bool().oneOf([true], "You have accept these"),
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
        <div className="form-group col-md-4">
          <label htmlFor="inputState">State</label>
          <AsyncSelect
            name="state"
            id="inputState"
            cacheOptions
            loadOptions={loadOptionsForState}
            getOptionLabel={(option) => `${option.name}`}
            getOptionValue={(option) => `${option.name}`}
            defaultInputValue={state}
            defaultOptions
            onChange={(data) => setFieldValue("state", data.name)}
          />
          {errState && touchedState && (
            <div className="text-danger">{errState}</div>
          )}
        </div>
        {state && (
          <div className="form-group col-md-6">
            <label htmlFor="inputCity">City</label>
            <Select
              name="city"
              id="inputCity"
              options={
                getRequestAllCities
                  ? getRequestAllCities[state].map((state) => ({
                      label: state,
                      value: state,
                    }))
                  : []
              }
              defaultInputValue={city}
              defaultOptions
              onChange={(data) => setFieldValue("city", data.value)}
            />
            {errCity && touchedCity && (
              <div className="text-danger">{errCity}</div>
            )}
          </div>
        )}
        {city && (
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
            {errZip && touchedZip && (
              <div className="text-danger">{errZip}</div>
            )}
          </div>
        )}
        <div className="form-group mt-3">
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            name="check"
            type="checkbox"
            className="d-block"
            id="termsCheck"
            checked={check}
          />
          <label htmlFor="termsCheck">Terms & Conditions</label>
          {errCheck && touchedCheck && (
            <div className="text-danger">{errCheck}</div>
          )}
        </div>
      </div>
      <button className="btn btn-primary mt-3" type="submit">
        {userDetail?.id ? "Update Record" : "Add User"}
      </button>
    </form>
  );
};

export default UserForm;
