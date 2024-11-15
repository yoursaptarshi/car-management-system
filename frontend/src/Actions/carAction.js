import axios from 'axios';

const backendURL = 'http://127.0.0.1:5000';


export const createCar = (carData) => async (dispatch) => {
  try {
    dispatch({ type: 'Create_Car_Request' });

    const { data } = await axios.post(`${backendURL}/api/v1/createcar`, carData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    });

    dispatch({
      type: 'Create_Car_Success',
      payload: data, 
    });
  } catch (error) {
    dispatch({
      type: 'Create_Car_Failure',
      payload: error.response?.data?.message || 'Failed to create car',
    });
  }
};



export const getAllCars = () => async (dispatch) => {
  try {
    dispatch({ type: 'Get_All_Cars_Request' });

    const { data } = await axios.get(`${backendURL}/api/v1/cars`, {
      withCredentials: true,
      headers:{
        'Content-Type':"application/json"
      }
    });

    dispatch({
      type: 'Get_All_Cars_Success',
      payload: data.cars,
    });
  } catch (error) {
    dispatch({
      type: 'Get_All_Cars_Failure',
      payload: error.response?.data?.message || 'Failed to fetch cars',
    });
  }
};


export const getCarById = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'Get_Car_Request' });

    const { data } = await axios.post(
      `${backendURL}/api/v1/cars/detail`,
      { id },
      {
        withCredentials: true,
        headers:{
          'Content-Type':"application/json"
        }
      }
    );
    

    dispatch({
      type: 'Get_Car_Success',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'Get_Car_Failure',
      payload: error.response?.data?.message || 'Failed to fetch car',
    });
  }
};

export const deleteCar = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'Delete_Car_Request' });

    const { data } = await axios.delete(`${backendURL}/api/v1/deletecar`, {
      data: { id },
      withCredentials: true,
      headers:{
        'Content-Type':"application/json"
      }
    });

    dispatch({
      type: 'Delete_Car_Success',
      payload: data.message,  
      meta: { id },  
    });
  } catch (error) {
    dispatch({
      type: 'Delete_Car_Failure',
      payload: error.response?.data?.message || 'Failed to delete car',
    });
  }
};


export const clearErrors = () => (dispatch) => {
  dispatch({ type: 'CLEAR_ERRORS' });
};
