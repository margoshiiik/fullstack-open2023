// const filterReducer = (state = '', action) => {
//     switch (action.type) {
//         case 'FILTER':
//             return action.data
//         default:
//             return state
//     }
// }

// export const filterAction = (data) => {
//     return {
//         type: 'FILTER',
//         data
//     }
// }

// export default filterReducer

import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter: (state, action) => {
      return action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;

export const filterAction = (data) => {
  return setFilter(data);
};

export default filterSlice.reducer;