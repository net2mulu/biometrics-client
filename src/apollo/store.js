import { makeVar } from "@apollo/client";

// Initializes to true if local storage includes a 'token' key, false otherwise
export const isLoggedInVar = makeVar(!!localStorage.getItem("token"));

// initialize access token
export const accessTokenInVar = makeVar(null);

// initialize refersh token
export const refreshTokenInVar = makeVar(
  sessionStorage.getItem("refreshToken")
    ? sessionStorage.getItem("refreshToken")
    : null
);

// intialize user data
export const userDatavar = makeVar({
  id: "",
  email: "",
  phoneNumber: "",
  password: "",
});

// initialize ossc data
export const osscDataVar = makeVar();

// initialize labour data
export const labourDatavar = makeVar();

// Initialized to an empty string
export const laborIdVar = makeVar("");

// Intialize education level id
export const educationLevelIdVar = makeVar("");

// Initialize labour data info when user logs in
export const labourFullDataVar = makeVar(null);

// Intialize education level status
export const educationLevelStatusVar = makeVar("");

// educationLevelStatusVar("value")

// initialize lang selector
export const selectedLangVar = makeVar(
  localStorage?.getItem("lang") ? localStorage?.getItem("lang") : null
);

// set labour personal information for generating biometrics id
export const labourPeronalInformationVar = makeVar(null)

// to save the generated biometrics id
export const biometricsIdVar = makeVar(null);

// to save face registration data
export const faceDataVar = makeVar(null);
