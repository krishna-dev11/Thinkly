import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   category : [] , 
   CategoryWiseCourses : null,
}


  const CategorySlice = createSlice({
    name:"Category",
    initialState,
    reducers : {
         setCategories(state , action){
            state.category = action.payload
         },
         setCategoryWiseCourses(state , action){
            state.CategoryWiseCourses = action.payload
         }
      }
      })

  export const {setCategories , setCategoryWiseCourses} = CategorySlice.actions
  export default CategorySlice.reducer