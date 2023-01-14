import { ApolloClient, createHttpLink, Observable } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { cache } from "./cache";
import { userDatavar } from "./store";
import { GraphQLError } from "graphql";
import { REFRESH_TOKEN } from "./mutation";

/**
 * Apollo Setup
 */

function isRefreshRequest(operation) {
  return operation.operationName === "refreshToken";
}

// Returns accesstoken if opoeration is not a refresh token request
function returnTokenDependingOnOperation(operation) {
  if (isRefreshRequest(operation))
    return sessionStorage.getItem("refreshToken") || "";
  else return userDatavar().accessTokenVar || "";
}

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_LINK,
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
  mutate: {
    fetchPolicy: "no-cache",
  },
};

const authLink = setContext((operation, { headers }) => {
  // authentication token
  // let token = accessTokenInVar();
  let token = returnTokenDependingOnOperation(operation);
  // return the headers to the context so httpLink can read them
  if (token) {
    // check if the operation is refresh token
    if (isRefreshRequest(operation)) {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    } else {
      return {
        headers: {
          ...headers,
          "x-hasura-role": "ossc",
          // "x-hasura-admin-secret": "myadminsecretkey",
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    }
  } else {
    return {
      headers: {
        ...headers,
        "x-hasura-role": "ossc",
      },
    };
  }
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (networkError) {
    }

    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case "invalid-jwt":
            // ignore 401 error for a refresh request
            if (operation.operationName === "refreshToken") return;

            const observable = new Observable((observer) => {
              // used an annonymous function for using an async function
              (async () => {
                try {
                  const accessToken = await getRefreshToken();

                  if (!accessToken) {
                    throw new GraphQLError("Empty AccessToken");
                  }

                  // Retry the failed request
                  const subscriber = {
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer),
                  };

                  forward(operation).subscribe(subscriber);
                } catch (err) {
                  observer.error(err);
                }
              })();
            });

            return observable;
        }
      }
    }
  }
);

const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache,
  defaultOptions: defaultOptions,
});

const getRefreshToken = async () => {
  try {
    const refreshResolverResponse = await client.mutate({
      mutation: REFRESH_TOKEN,
    });
    const accessToken =
      refreshResolverResponse.data?.refreshToken.tokens?.access_token;
    const refreshToken =
      refreshResolverResponse.data?.refreshToken.tokens?.refresh_token;
    userDatavar({
      ...userDatavar,
      accessToken,
      refreshToken,
    });

    sessionStorage.setItem("refreshToken", refreshToken);
    sessionStorage.setItem("isLoggedIn", true);
    return accessToken;
  } catch (err) {
    localStorage.clear();

    userDatavar({
      ...userDatavar,
      accessTokenVar: "",
      refreshTokenVar: "",
      isLoggedInVar: false,
    });

    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("isLoggedIn");
    throw err;
  }
};

export default client;
