import axios from "axios";
import { axiosHelpers, commonHelpers } from "@/utils/helpers";
import { formatFormData }  from "@/utils/helpers/common/common.helpers"
import { commonConfig } from "../configs";
import Log from "../log";

const authAxios = axios.create({
  baseURL: `${commonConfig.API_HOST}`,
  headers: {
    common: {
      Language:
        typeof window !== "undefined"
          ? window.NextPublic.lang.replace("-", "_")
          : undefined,
    },
  },
});

authAxios.interceptors.request.use(
  (req) => {
    // const token = jwtService.getToken() || undefined;

    switch ((req.method as string).toUpperCase()) {
      case "GET": {
        req.params = req.params || {};
        // Object.assign(req.params, {
        //   token,
        // });
        break;
      }
      case "POST": {
        if (!(req.data instanceof FormData) && !!req.data) {  
          // req.data = commonHelpers.formatFormData(req.data);
          req.data =  formatFormData(req.data);
        }

        // if (req.data instanceof FormData) {
        // } else {
        //   req.data = req.data || {};
        //   // Object.assign(req.params, {});
        // }
        break;
      }
      case "PUT": {
        if (!(req.data instanceof FormData) && !!req.data) {
          // req.data = commonHelpers.formatFormData(req.data);
          req.data =  formatFormData(req.data);
        }
        // if (req.data instanceof FormData) {
        //   // req.data.append("language", window.NextPublic.lang);
        // } else {
        //   req.data = req.data || {};
        //   // Object.assign(req.params, {});
        // }
        break;
      }
    }
    return req;
  },
  (err) => {
    console.log(err.response);
    return Promise.reject(err);
  }
);

authAxios.interceptors.response.use(
  (res) => {
    if (axiosHelpers.checkRequestInvalidToken(res.data)) {
      // eventBusService.dispatch(eventBusCommonConstants.AUTH_EXPIRED_TOKEN)
    }
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default authAxios;
