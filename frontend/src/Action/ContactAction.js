import axios from "axios";

import {
  ADD_NEW_CONTACT,
  DELETE_CONTACT,
  ERROR_MESSAGE,
  REMOVE_MESSAGE,
  GET_ALL_CONTACT,
} from "./type";

const baseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_BASE_URL_DEV
    : process.env.REACT_APP_BASE_URL_PROD;
};

console.log("base url -", baseUrl);
//Get All Contact
export const GetAllContact = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.get(`${baseUrl()}/api/contact`, config);
    dispatch({
      type: GET_ALL_CONTACT,
      payload: res.data,
    });
  } catch (err) {
    console.log("error on get contact-", err);
  }
};

//Add new Contact
export const AddNewContact = (name, phone) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, phone });

  try {
    const res = await axios.post(
      `${baseUrl()}/api/contact/addnewContact`,
      body,
      config
    );
    if (!res.data.error) {
      dispatch({
        type: ADD_NEW_CONTACT,
        payload: res.data,
      });

      dispatch({
        type: ERROR_MESSAGE,
        payload: {
          header: "Success!",
          message: "Contact Added Successfully!",
          error: true,
          color: "green",
        },
      });

      setTimeout(() => {
        dispatch({
          type: REMOVE_MESSAGE,
          payload: {
            message: "",
            error: false,
          },
        });
      }, 3000);
    } else {
      dispatch({
        type: ERROR_MESSAGE,
        payload: {
          message: res.data.message,
          header: "Error!",
          error: true,
          color: "red",
        },
      });

      setTimeout(() => {
        dispatch({
          type: REMOVE_MESSAGE,
          payload: {
            message: "",
            error: false,
          },
        });
      }, 3000);
    }
  } catch (err) {
    console.log(err);
  }
};

//Update Contact
export const UpdateContact = (name, phone, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, phone, id });

  try {
    const res = await axios.put(
      `${baseUrl()}/api/contact/editContact`,
      body,
      config
    );

    dispatch(GetAllContact());

    if (
      res.data.message === `${phone} number exists, choose another number` ||
      res.data.message === "Contact Information is Already exists!"
    ) {
      dispatch({
        type: ERROR_MESSAGE,
        payload: {
          message: res.data.message,
          error: true,
          color: "red",
          header: "Error!",
        },
      });

      setTimeout(() => {
        dispatch({
          type: REMOVE_MESSAGE,
          payload: {
            message: "",
            error: false,
          },
        });
      }, 3000);
    } else {
      dispatch({
        type: ERROR_MESSAGE,
        payload: {
          message: res.data.message,
          error: true,
          color: "green",
          header: "Edit!",
        },
      });

      setTimeout(() => {
        dispatch({
          type: REMOVE_MESSAGE,
          payload: {
            message: "",
            error: false,
          },
        });
      }, 3000);
    }
  } catch (err) {
    console.log(err);
  }
};

//Delete Contact
export const DeleteContact = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ id });

  try {
    const res = await axios.post(
      `${baseUrl()}/api/contact/DeleteContact`,
      body,
      config
    );

    dispatch({
      type: DELETE_CONTACT,
      payload: id,
    });

    console.log("res -- ", res);

    dispatch({
      type: ERROR_MESSAGE,
      payload: {
        message: "Contact Deleted Successfully!",
        error: true,
        color: "green",
        header: "Deleted!",
      },
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_MESSAGE,
        payload: {
          message: "",
          error: false,
        },
      });
    }, 3000);
  } catch (err) {
    console.log(err);
  }
};
