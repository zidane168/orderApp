import axios from "axios";

import { commonConfig } from "../configs";
import { commonHelpers } from "../helpers";
import { formatFormData } from '../helpers/common/common.helpers'

const commonAxios = axios.create({
  baseURL: `${commonConfig.API_HOST}`,
  headers: {
    Language: 'en_US', 
    'Content-Type': 'application/json' 
  }
});

commonAxios.interceptors.request.use(
  (req) => {
    if (
      typeof req.headers["Language"] === "undefined" &&
      typeof window !== "undefined"
    )
      req.headers["Language"] = 'en_US'; //window.NextPublic.lang.replace("-", "_");

    
    switch ((req.method as string).toUpperCase()) {
      case "GET": {
        req.params = req.params || {}; 
        break;
      }
      case "POST": { 
        req.data = JSON.stringify(req.data) 
        // if (!(req.data instanceof FormData) && !!req.data) {
        //   req.data = formatFormData(req.data);  
       
        // }
 
        break;
      }
      case "PUT": {
        if (!(req.data instanceof FormData) && !!req.data) {
          req.data = formatFormData(req.data);  
          // req.data = commonHelpers.formatFormData(req.data);
        } 
        break;
      }
    }
    return req;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

commonAxios.interceptors.response.use(
  (res) => {
    // if (!["", null, undefined].includes(res?.data?.error_code)) {
    // 	// helpers.axios.allocateRoute(res.data.error_code)
    // }

    return res;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

export default commonAxios;
