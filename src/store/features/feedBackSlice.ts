import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface feedBackState {
  orderNumber: String,
  rating: Number,
  problem: Boolean,
  resolution: Boolean,
  contact: Boolean,
  details: String
}

const initialState: feedBackState = {
  orderNumber: '',
  rating: 0,
  problem: false,
  resolution: false,
  contact: false,
  details: ''
};

const feedBackSlice = createSlice({
  name: 'feedBack',
  initialState,
  reducers: {
    updateOrderNumber(state, action: PayloadAction<String>) {
      const st = state;
      st.orderNumber = action.payload;
    },
    updateRating(state, action: PayloadAction<Number>){
      const st = state;
      st.rating = action.payload;
    },
    updateProblem(state, action: PayloadAction<Boolean>){
      const st = state;
      st.problem = action.payload;
    },
    updateResolution(state, action: PayloadAction<Boolean>){
      const st = state;
      st.resolution = action.payload;
    },
    updateContact(state, action: PayloadAction<Boolean>){
      const st = state;
      st.contact = action.payload;
    },
    updateDetails(state, action: PayloadAction<String>){
      const st = state;
      st.details = action.payload;
    }
  },
});

export const {
  updateOrderNumber,
  updateRating,
  updateProblem,
  updateResolution,
  updateContact,
  updateDetails
} = feedBackSlice.actions;

export default feedBackSlice.reducer;