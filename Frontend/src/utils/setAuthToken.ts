import axios from "axios";

const setAuthToken = (token: string) => {
  if (token.length > 0) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    // Delete the auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
