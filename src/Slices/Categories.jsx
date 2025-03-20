import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   category : []
}


  const CategorySlice = createSlice({
    name:"Category",
    initialState,
    reducers : {
         setCategories(state , action){
            state.category = action.payload
         }
      }
      })

  export const {setCategories} = CategorySlice.actions
  export default CategorySlice.reducer