import "server-only";

import type { ExpiryPeriod } from "@/types";

export const setLoginCookieExpiry = () => {
   return {
      dateFormat: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      stringFormat: "7 days" as ExpiryPeriod,
   };
};

export const setVerifyCookieExpiry = () => {
   return {
      dateFormat: new Date(Date.now() + 15 * 60 * 1000),
      stringFormat: "15 minutes" as ExpiryPeriod,
   };
};
