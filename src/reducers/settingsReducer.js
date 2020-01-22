import {
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
  ALLOW_REGISTRATION,
  RESET_SETTINGS
} from "../actions/types";

// Initial state is obtained from the localStorage
// const initialState = {
//   allowRegistration: false,
//   disableBalanceOnAdd: true,
//   disableBalanceOnEdit: false,
// };

export default function(state = {}, action) {
  switch (action.type) {
    case DISABLE_BALANCE_ON_ADD:
      return {
        ...state,
        disableBalanceOnAdd: action.payload
      };
    case DISABLE_BALANCE_ON_EDIT:
      return {
        ...state,
        disableBalanceOnEdit: action.payload
      };
    case ALLOW_REGISTRATION:
      return {
        ...state,
        allowRegistration: action.payload
      };
      case RESET_SETTINGS:
        return {
          ...state,
          allowRegistration: action.payload.allowRegistration,
          disableBalanceOnAdd: action.payload.disableBalanceOnAdd,
          disableBalanceOnEdit: action.payload.disableBalanceOnEdit
        };
      default:
      return state;
  }
}
