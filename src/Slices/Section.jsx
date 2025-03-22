import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sectionId : null,
  editSection : null
}


  const SectionSlice = createSlice({
    name:"section",
    initialState,
    reducers : {
        SetsectionId(state , action){
           state.sectionId = action.payload
        },
        SetEditSection(state , action){
          state.editSection = action.payload
        }
      }
      })

  export const {SetsectionId , SetEditSection} = SectionSlice.actions
  export default SectionSlice.reducer