import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   Step:1,
   course:null,
   editCourse : null
}


  const CourseSlice = createSlice({
    name:"Course",
    initialState,
    reducers : {
         setStep(state , action){
            state.Step = action.payload
         },
         setCourse(state , action){
            state.course = action.payload
         },
         setEditCourse(state , action){
            state.editCourse = action.payload
         },
      }
      })

  export const {setStep , setCourse , setEditCourse} = CourseSlice.actions
  export default CourseSlice.reducer