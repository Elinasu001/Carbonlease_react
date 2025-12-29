import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from '../../../../api/api.js';

export const useAir = (station) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!station) return;

    axios
      .get(`${API_BASE_URL}/api/air/station`, { params: { name: station } })
      .then((res) => setData(res.data))
      .catch(console.error);
  }, [station]);

  return data;
};
