import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  cars: [],
  car: null,
  loading: false,
  error: null,
  message: null,
};

export const carReducer = createReducer(initialState, (builder) => {
  builder
    // Create car
    .addCase('Create_Car_Request', (state) => {
      state.loading = true;
    })
    .addCase('Create_Car_Success', (state, action) => {
      state.loading = false;
      state.message = action.payload.message;  
      state.cars.push(action.payload.car);  
    })
    .addCase('Create_Car_Failure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Get all cars
    .addCase('Get_All_Cars_Request', (state) => {
      state.loading = true;
    })
    .addCase('Get_All_Cars_Success', (state, action) => {
      state.loading = false;
      state.cars = action.payload;
    })
    .addCase('Get_All_Cars_Failure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Get a particular car
    .addCase('Get_Car_Request', (state) => {
      state.loading = true;
    })
    .addCase('Get_Car_Success', (state, action) => {
      state.loading = false;
      state.car = action.payload.car;
    })
    .addCase('Get_Car_Failure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Delete car
    .addCase('Delete_Car_Request', (state) => {
      state.loading = true;
    })
    .addCase('Delete_Car_Success', (state, action) => {
      state.loading = false;
      state.message = action.payload;
      // Remove car from the cars array based on the ID
      state.cars = state.cars.filter((car) => car.id !== action.meta.id);
    })
    .addCase('Delete_Car_Failure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Clear errors
    .addCase('CLEAR_ERRORS', (state) => {
      state.error = null;
    });
});
