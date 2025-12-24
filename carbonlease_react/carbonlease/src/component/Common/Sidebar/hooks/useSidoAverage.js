import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = window.ENV?.API_URL;

export const useSidoAverage = (sido) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sido) return;

    setLoading(true);

    axios
      .get(`${API_BASE}/api/air/sido`, { params: { name: sido } })
      .then((res) => {
        setData(res.data);
        localStorage.setItem(
          `sido-${sido}`,
          JSON.stringify({
            time: Date.now(),
            data: res.data
          })
        );
      })
      .catch((err) => {
        console.error(err);

        const cached = localStorage.getItem(`sido-${sido}`);
        if(cached) {
          const parsed = JSON.parse(cached);
          setData(parsed.data);
        } else {
          setData(null);
        }
      })
      .finally(() => setLoading(false));
    }, [sido]);

  return { data, loading };
};
