import { 
    CHANGE_PAGE, 
    CLEAR_ALERT, 
    CLEAR_FILTERS, 
    CLEAR_VALUES, 
    CREATE_LISTING_BEGIN, 
    CREATE_LISTING_ERROR, 
    CREATE_LISTING_SUCCESS, 
    CREATE_ORDER_BEGIN, 
    CREATE_ORDER_ERROR, 
    CREATE_ORDER_SUCCESS, 
    DISPLAY_ALERT, 
    GET_AUTHLISTINGS_BEGIN, 
    GET_AUTHLISTINGS_SUCCESS, 
    GET_BOOKINGS_BEGIN, 
    GET_BOOKINGS_SUCCESS, 
    GET_CURRENT_USER_BEGIN, GET_CURRENT_USER_SUCCESS, 
    GET_LISTINGS_BEGIN, 
    GET_LISTINGS_SUCCESS, 
    GET_SINGLELISTING_BEGIN, 
    GET_SINGLELISTING_ERROR, 
    GET_SINGLELISTING_SUCCESS, 
    HANDLE_CHANGE, 
    LOGOUT_USER, 
    SETUP_USER_BEGIN, SETUP_USER_ERROR, 
    SETUP_USER_SUCCESS, 
    UPDATE_LISTING_BEGIN,
    UPDATE_LISTING_ERROR,
    UPDATE_LISTING_SUCCESS
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
    if (action.type === CREATE_LISTING_BEGIN) {
      return { ...state, isLoading: true }
    }
    if (action.type === CREATE_LISTING_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        listing: action.payload.listing,
        alertType: 'success',
        alertText: 'Listing created',
      }
    }
    if (action.type === CREATE_LISTING_ERROR) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    }
    
    if (action.type === UPDATE_LISTING_BEGIN) {
      return {
        ...state,
        isLoading: true,
      }
    }
    if (action.type === UPDATE_LISTING_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'Listing Updated!',
      }
    }
    if (action.type === UPDATE_LISTING_ERROR) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    }

    if (action.type === GET_LISTINGS_BEGIN) {
      return { ...state, isLoading: true, showAlert: false }
    }
    if (action.type === GET_LISTINGS_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        listings: action.payload.listings,
        totalListings: action.payload.totalListings,
        numOfPages: action.payload.numOfPages
      }
    }


    if (action.type === GET_AUTHLISTINGS_BEGIN) {
      return { ...state, isLoading: true, showAlert: false }
    }
    if (action.type === GET_AUTHLISTINGS_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        listings: action.payload.listings,
        totalListings: action.payload.totalListings,
        numOfPages: action.payload.numOfPages
      }
    }

    if (action.type === GET_SINGLELISTING_BEGIN) {
      return { ...state, isLoading: true, showAlert: false }
    }
    if (action.type === GET_SINGLELISTING_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        listing: action.payload.listing
      }
    }
  
    if (action.type === GET_SINGLELISTING_ERROR) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    }


    if (action.type === CREATE_ORDER_BEGIN) {
      return { ...state, isLoading: true }
    }
    if (action.type === CREATE_ORDER_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        order: action.payload.order,
        alertType: 'success',
        alertText: 'Order created',
      }
    }
    if (action.type === CREATE_ORDER_ERROR) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    }

    if (action.type === GET_BOOKINGS_BEGIN) {
      return { ...state, isLoading: true, showAlert: false }
    }
    if (action.type === GET_BOOKINGS_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        orders: action.payload.orders,
        totalOrders: action.payload.totalOrders
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