import React, { useReducer, useContext, useEffect } from 'react'
import reducer from './reducer'
import axios from 'axios'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  
  CHANGE_PAGE,
  CLEAR_FILTERS,
  CREATE_LISTING_BEGIN,
  CREATE_LISTING_SUCCESS,
  CREATE_LISTING_ERROR,
  GET_LISTINGS_SUCCESS,
  GET_LISTINGS_BEGIN,
  GET_AUTHLISTINGS_BEGIN,
  GET_AUTHLISTINGS_SUCCESS,
  GET_SINGLELISTING_BEGIN,
  GET_SINGLELISTING_SUCCESS,
  GET_SINGLELISTING_ERROR,
  CREATE_ORDER_BEGIN,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
  GET_BOOKINGS_SUCCESS,
  GET_BOOKINGS_BEGIN,
  UPDATE_LISTING_BEGIN,
  UPDATE_LISTING_SUCCESS,
  UPDATE_LISTING_ERROR,
  
 

} from './actions'



const initialState = {
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: null,
  userAddress: '',
  
  search: '',
  sort: 'latest',
  page: 1,

  listing: null,
  listings: [],
  totalListings: 0,
  numOfPages: 1,

  order: null,
  orders: [],
  totalOrders: 0,

}
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  

  // axios
  const authFetch = axios.create({
    baseURL: '/api/v1',
  });
  // request

  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );


  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }


  const logoutUser = async () => {
    await axios.get('/api/v1/auth/logout');
    dispatch({ type: LOGOUT_USER });
  };
  

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }
  
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES })
  }

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const setupUser = async ({currentUser, endPoint, alertText}) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
    };
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser, config)

      const { user, address } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, address, alertText },
      })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }
  

  const createListing = async (listingData, clearFormFields) => {
    dispatch({ type: CREATE_LISTING_BEGIN })
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await authFetch.post('/listings', listingData, config)
      const {listing} = data
      dispatch({ type: CREATE_LISTING_SUCCESS, payload: {listing}})
      clearFormFields();
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: CREATE_LISTING_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const updateListing = async (id, listingData) => {
    dispatch({ type: UPDATE_LISTING_BEGIN });
    try {
      await authFetch.put(
        `/listings/${id}`,
        listingData
      );
  
      dispatch({ type: UPDATE_LISTING_SUCCESS });
    } catch (error) {
      if (error.response.status !== 401) return;
      dispatch({
        type: UPDATE_LISTING_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert()
  }

  const getListings = async () => {
    const {sort, page, search} = state
    let url = `listings/all?page=${page}&sort=${sort}`
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_LISTINGS_BEGIN })
  
    try {
      const { data } = await axios.get(`/api/v1/${url}`)
      const { listings, totalListings, numOfPages } = data
      console.log(listings)
      dispatch({
        type: GET_LISTINGS_SUCCESS,
        payload: {
          listings,
          totalListings,
          numOfPages
        },
      })
    } catch (error) {
      console.log(error)
    }
    clearAlert()
  }

  const getUserListings = async () => {
    const {sort, page} = state
    let url = `/listings?page=${page}&sort=${sort}`

    dispatch({ type: GET_AUTHLISTINGS_BEGIN })
  
    try {
      const { data } = await authFetch(url)
      const { listings, totalListings, numOfPages } = data
      console.log(listings)
      dispatch({
        type: GET_AUTHLISTINGS_SUCCESS,
        payload: {
          listings,
          totalListings,
          numOfPages
        },
      })
    } catch (error) {
        logoutUser();
    }
    clearAlert()
  }

  const getSingleListing = async (id) => {
    dispatch({ type: GET_SINGLELISTING_BEGIN })
    try {
      const { data } = await axios.get(`/api/v1/listings/${id}`)
      const { listing } = data
      console.log(listing)
      dispatch({
        type: GET_SINGLELISTING_SUCCESS,
        payload: {
          listing,
        },
      })
    } catch (error) {
      if (error.response.status === 401) return
        dispatch({
          type: GET_SINGLELISTING_ERROR,
          payload: { msg: error.response.data.msg }
        })
    }
    clearAlert()
  }

  const createOrder = async (listingData) => {
    dispatch({ type: CREATE_ORDER_BEGIN });
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await authFetch.post('/orders', listingData, config);
      const { order } = data
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: {order} });
      
    } catch (error) {
      logoutUser();
      console.log(error)
    }
    clearAlert();
  }


  const getHostBookings = async () => {
    
    let url = `/orders/showHostBookings`

    dispatch({ type: GET_BOOKINGS_BEGIN })
  
    try {
      const { data } = await authFetch(url)
      const { orders, totalOrders,  } = data
      
      dispatch({
        type: GET_BOOKINGS_SUCCESS,
        payload: {
          orders,
          totalOrders,
        },
      })
      console.log(orders)
    } catch (error) {
        logoutUser();
    }
    clearAlert()
  }
  

  
  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await authFetch('/auth/getCurrentUser');
      const { user, address } = data;

      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: { user, address }
      });
    } catch (error) {
      if (error.response.status === 401) return;
      logoutUser();;
    }
  };
  
  
  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        logoutUser,
        handleChange,
        clearValues,
        changePage,
        clearFilters,
        getCurrentUser,
        createListing,
        updateListing,
        getListings,
        getUserListings,
        getSingleListing,
        createOrder,
        getHostBookings
    
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
