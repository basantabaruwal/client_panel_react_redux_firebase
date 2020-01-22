import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import createHistory from "history/createBrowserHistory";
import SpinnerPage from "../components/spinners/SpinnerPage"; // change it to your custom component

const locationHelper = locationHelperBuilder({});
const browserHistory = createHistory();

export const UserIsAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: "UserIsAuthenticated",
  AuthenticatingComponent: SpinnerPage,
  allowRedirectBack: true,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || "/auth/signin",
  authenticatingSelector: ({ firebase: { auth, profile, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && !auth.isEmpty,
  // redirectAction: newLoc => dispatch => {
  //   browserHistory.replace(newLoc); // or routerActions.replace
  //   dispatch({ type: "UNAUTHED_REDIRECT" });
  // }
});

export const UserIsNotAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: "UserIsNotAuthenticated",
  AuthenticatingComponent: SpinnerPage,
  allowRedirectBack: false,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || "/dashboard",
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && auth.isEmpty,
  // redirectAction: newLoc => dispatch => {
  //   browserHistory.replace(newLoc); // or routerActions.replace
  //   dispatch({ type: "UNAUTHED_REDIRECT" });
  // }
});
