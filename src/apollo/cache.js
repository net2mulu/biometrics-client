import { InMemoryCache } from "@apollo/client";
import {
  userDatavar,
  osscDataVar,
  labourDatavar,
  labourPeronalInformationVar,
  biometricsIdVar,
} from "./store";

// field policy definations
export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return userDatavar().isLoggedInVar;
          },
        },
        accessToken: {
          read() {
            return userDatavar().accessTokenVar;
          },
        },
        refreshToken: {
          read() {
            return userDatavar().refreshTokenVar;
          },
        },
        userData: {
          read() {
            return userDatavar();
          },
        },
        osscData: {
          read() {
            return osscDataVar();
          },
        },
        labourData: {
          read() {
            return labourDatavar();
          },
        },
        labourPeronalInformation: {
          read() {
            return labourPeronalInformationVar();
          },
        },
        biometricsId: {
          read() {
            return biometricsIdVar();
          },
        },
      },
    },
  },
});
