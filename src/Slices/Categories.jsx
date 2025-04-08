import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   category : [] , 
   CategoryWiseCourses : null,
   courseDetails : null
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
         },
         setWholeCourseData(state , action){
            state.courseDetails = action.payload
         }
      }
      })

  export const {setCategories , setCategoryWiseCourses , setWholeCourseData } = CategorySlice.actions
  export default CategorySlice.reducer