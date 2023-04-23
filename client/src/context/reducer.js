import { 
    CHANGE_PAGE, 
    CLEAR_ALERT, 
    CLEAR_FILTERS, 
    CLEAR_VALUES, 
    DISPLAY_ALERT, 
    GET_CURRENT_USER_BEGIN, GET_CURRENT_USER_SUCCESS, 
    HANDLE_CHANGE, 
    LOGOUT_USER, 
    SETUP_USER_BEGIN, SETUP_USER_ERROR, 
    SETUP_USER_SUCCESS 
} from "./actions"

import { initialState } from './appContext'

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
      return {
        ...state,
        showAlert: true,
        alertType: 'danger',
        alertText: 'Please provide all values!',
      }
    }
    if (action.type === CLEAR_ALERT) {
      return {
        ...state,
        showAlert: false,
        alertType: '',
        alertText: '',
      }
    }
  
    if (action.type === SETUP_USER_BEGIN) {
      return { ...state, isLoading: true }
    }
    if (action.type === SETUP_USER_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        userAddress: action.payload.address,
        showAlert: true,
        alertType: 'success',
        alertText: action.payload.alertText,
      }
    }
    if (action.type === SETUP_USER_ERROR) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    }

    
    if (action.type === LOGOUT_USER) {
      return {
        ...initialState,
        userLoading: false,
      };
    }

    if(action.type === CLEAR_VALUES) {
        const initialState = {
          isLoading: false,
          
        }
    
        return {
          ...state, 
          ...initialState
        }
    }

    if (action.type === CHANGE_PAGE) {
      return { ...state, page: action.payload.page };
    }

    if (action.type === CLEAR_FILTERS) {
      return {
        ...state,
        search: '',
        sort: 'latest',
      };
    }

    if (action.type === HANDLE_CHANGE) {
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        }
    }

    if (action.type === GET_CURRENT_USER_BEGIN) {
        return { ...state, userLoading: true, showAlert: false };
      }
    if (action.type === GET_CURRENT_USER_SUCCESS) {
      return {
          ...state,
          userLoading: false,
          user: action.payload.user,
          userAddress: action.payload.address
      };
    }
    
    throw new Error(`no such action : ${action.type}`)
}

export default reducer