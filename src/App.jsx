import { useLazyQuery, useMutation } from "@apollo/client";
import { Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { REFRESH_TOKEN } from "./apollo/mutation";
import { OSSC_LABOUR_DATA_RID } from "./apollo/query";
import { osscDataVar, userDatavar } from "./apollo/store";
import AppLayout from "./components/layout/AppLayout";
import FullPageLoader from "./components/shared/FullPageLoader";
import RoutesList from "./routes";

function App() {
  const { pathname } = useLocation();

  // mutation
  const [updateRefreshToken, { loading: refreshTokenLoading }] =
    useMutation(REFRESH_TOKEN);

  // apollo graphql queries
  const [getOSSCLabourData, { loading: osscLabourDataLoading }] =
    useLazyQuery(OSSC_LABOUR_DATA_RID);

  useEffect(() => {
    //  on page load check the session storage
    if (sessionStorage.getItem("refreshToken")) {
      // set access token null
      userDatavar({
        ...userDatavar(),
        accessTokenVar: null,
      });

      // hit refresh token mutation
      updateRefreshToken({
        onCompleted(data) {
          // extract userData and tokens
          let userData = data?.refreshToken?.data;
          let tokens = data?.refreshToken?.tokens;

          // set user data, access token and refresh tokens
          userDatavar({
            ...userData,
            accessTokenVar: tokens?.access_token,
            refreshTokenVar: tokens?.refresh_token,
          });

          // grab old refresh token
          let oldRefreshToken = sessionStorage.getItem("refreshToken");

          // set session storage
          sessionStorage.setItem("isLoggedIn", true);
          sessionStorage.setItem("refreshToken", tokens?.refresh_token);
          sessionStorage.setItem("oldRefreshToken", oldRefreshToken);

          // set is logged in var
          userDatavar({
            ...userDatavar(),
            isLoggedInVar: true,
          });

          // fetch ossc data
          fetchOsscLabourData(userData?.id);
        },
        onError(error) {
          //  grab old and new refresh token from the session storage
          let newRefreshToken = sessionStorage.getItem("refreshToken");
          let oldRefreshToken = sessionStorage.getItem("oldRefreshToken");
          // check if old refresh token is the same as the old one
          if (oldRefreshToken !== newRefreshToken) {
            sessionStorage.setItem("oldRefreshToken", newRefreshToken);
            updateAccessToken();
          } else {
            sessionStorage.removeItem("isLoggedIn");
            sessionStorage.removeItem("refreshToken");

            userDatavar({
              ...userDatavar(),
              isLoggedInVar: false,
              accessTokenVar: null,
              refreshTokenVar: null,
            });
          }
        },
      });
    } else {
      sessionStorage.removeItem("isLoggedIn");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update access token
  const updateAccessToken = () => {
    updateRefreshToken({
      onCompleted(data) {
        let userData = data?.refreshToken?.data;
        let tokens = data?.refreshToken?.tokens;

        // set user data, access token and refresh tokens

        userDatavar({
          ...userData,
          accessTokenVar: tokens?.access_token,
          refreshTokenVar: tokens?.refresh_token,
        });

        // grab old refresh token
        let oldRefreshToken = sessionStorage.getItem("refreshToken");

        // set session storage
        sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("refreshToken", tokens?.refresh_token);
        sessionStorage.setItem("oldRefreshToken", oldRefreshToken);

        userDatavar({
          ...userDatavar(),
          isLoggedInVar: true,
        });

        // fetch ossc data
        fetchOsscLabourData(userData?.id);
      },
      onError(error) {
        // set is logged in var
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("refreshToken");
        userDatavar({
          ...userDatavar(),
          isLoggedInVar: false,
          accessTokenVar: null,
          refreshTokenVar: null,
        });
      },
    });
  };

  // fetch ossc labour data
  const fetchOsscLabourData = (rId) => {
    // fetch ossc labour data
    getOSSCLabourData({
      variables: {
        _eq: rId,
      },
      onError(error) {
        // toast.error("Failed to fetch ossc info");
      },
      onCompleted(data) {
        let osscData = data.registration_namespace.labors[0];
        osscDataVar(osscData);
      },
    });
  };
  return (
    <>
      {refreshTokenLoading || osscLabourDataLoading ? (
        <FullPageLoader
          showLoader={refreshTokenLoading || osscLabourDataLoading}
        />
      ) : (
        <Suspense fallback={<FullPageLoader showLoader={true} />}>
          <FullPageLoader />
          {pathname === "/" ? (
            <RoutesList />
          ) : (
            <AppLayout>
              <RoutesList />
            </AppLayout>
          )}
        </Suspense>
      )}
    </>
  );
}

export default App;
