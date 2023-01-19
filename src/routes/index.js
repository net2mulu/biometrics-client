import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { ProtectedRoute } from "./ProtectedRoute";

// dynamic imports
import Login from "../pages/Auth/login";
const BiometricsHome = lazy(() => import("../pages/Biometrics/BiometricsHome"));
const FaceSetting = lazy(() => import("../pages/Biometrics/Face/FaceSetting"));
const Home = lazy(() => import("../pages/Home"));

const RoutesList = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Login />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/biometrics-home" element={<BiometricsHome />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/face-setting" element={<FaceSetting />} />
      </Route>
    </Routes>
  );

  //   <Route path="/verify-users" element={<PrivateRoute />}>
  //     <Route path="/verify-users" element={<VerifyUsers />} />
  //   </Route>,

  //   <Route path="/fingerprint" element={<PrivateRoute />}>
  //     <Route path="/fingerprint" element={<Fingerprint />} />
  //   </Route>,
  //   <Route path="/fingerprint-scan" element={<PrivateRoute />}>
  //     <Route path="/fingerprint-scan" element={<FingerprintScan />} />
  //   </Route>,
  //   <Route path="/verification-fingerprint-scan" element={<PrivateRoute />}>
  //     <Route
  //       path="/verification-fingerprint-scan"
  //       element={<VerificationFingerprintScan />}
  //     />
  //   </Route>,
  //   <Route path="/verification-face-scan" element={<PrivateRoute />}>
  //     <Route path="/verification-face-scan" element={<FaceScan />} />
  //   </Route>,
  //   <Route path="/verification-iris-scan" element={<PrivateRoute />}>
  //     <Route path="/verification-iris-scan" element={<IrisScan />} />
  //   </Route>,
  //   <Route path="/face-home" element={<PrivateRoute />}>
  //     <Route path="/face-home" element={<FaceHome />} />
  //   </Route>,
  //   <Route path="/face-registration" element={<PrivateRoute />}>
  //     <Route path="/face-registration" element={<FaceRegistration />} />
  //   </Route>,
  //   <Route path="/face-registration" element={<PrivateRoute />}>
  //     <Route path="/face-registration" element={<FaceRegistration />} />
  //   </Route>,
  //   <Route path="/iris" element={<PrivateRoute />}>
  //     <Route path="/iris" element={<Iris />} />
  //   </Route>,
  //   <Route path="/labor-registration" element={<PrivateRoute />}>
  //     <Route path="/labor-registration" element={<SelfRegistrationPage />} />
  //   </Route>,
  //   <Route path="/registered-labors" element={<PrivateRoute />}>
  //     <Route path="/registered-labors" element={<RegisteredLabors />} />
  //   </Route>,
  //   <Route path="/biometrics-completed-labors" element={<PrivateRoute />}>
  //     <Route
  //       path="/biometrics-completed-labors"
  //       element={<BiometricsCompletedLabors />}
  //     />
  //   </Route>,
  //   <Route path="/iris-register" element={<IrisRegister />}></Route>,

  //   <Route path="register/*" element={<Register parent={true} />} />,
};
export default RoutesList;
