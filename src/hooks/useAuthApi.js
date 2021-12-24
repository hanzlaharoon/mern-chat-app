import axios from "axios";
import { useState } from "react";

const useAuthApi = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchApi = async (url, username, password) => {
    setLoading(true);
    const body = { username, password };

    try {
      const res = await axios.post(`http://localhost:4000/${url}`, body);
      setLoading(false);
      if (res.status === 200 && res.data) {
        setData(body);
        setError(null);
        return body;
      } else {
        setError("Invalid Credentials");
        return "Invalid Credentials";
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
      return error.message;
    }
  };

  return [{ loading, data, error }, fetchApi];
};

export default useAuthApi;
