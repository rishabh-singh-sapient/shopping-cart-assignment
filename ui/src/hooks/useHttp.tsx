import axios from "axios";
import { useCallback, useState } from "react";

const URL = [process.env.REACT_APP_BASE_URL];

interface IResponse {
  loading: boolean;
  error: string | boolean | any;
}

interface IReqConfig {
  keyword: string;
  method?: string;
  body?: object;
}

export default function useHttp() {
  const [response, setResponse] = useState<IResponse>({
    loading: false,
    error: false,
  });

  const fetchData = useCallback(
    async (reqConfig: IReqConfig, requestData: any) => {
      try {
        setResponse({
          error: false,
          loading: true,
        });

        const response = !reqConfig.method
          ? await axios.get(`${URL}/${reqConfig.keyword}`)
          : await axios.post(
              `${URL}/${reqConfig.keyword}`,
              JSON.stringify(reqConfig.body)
            );
        if (!response.data) {
          console.log(response.status, response.statusText);
          throw new Error("Data not found!!!" + response.status);
        }

        requestData(response.data);
      } catch (error: any) {
        console.log(error);

        setResponse({
          loading: false,
          error: error.message,
        });
      }
      setResponse((cur) => ({
        ...cur,
        loading: false,
      }));
    },
    []
  );

  return {
    fetchData,
    loading: response.loading,
    error: response.error,
  };
}
