import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = window.ENV?.API_URL;

export const useAir = (station) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!station) return;

    axios
      .get(`${API_BASE}/api/air/station`, { params: { name: station } })
      .then((res) => setData(res.data))
      .catch(console.error);
  }, [station]);

  return data;
};
