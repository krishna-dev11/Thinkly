import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addSubSection: false,
  editSubSection: null,
  viewSubSection: null,
};

const SubSectionSlice = createSlice({
  name: "subsection",
  initialState,
  reducers: {
    SetaddSubSection(state , action){
        state.addSubSection = action.payload
    },
    SeteditSubSection(state , action){
        state.editSubSection = action.payload
    },
    SetviewSubSection(state , action){
        state.viewSubSection = action.payload
    }
  },
});

export const {SetaddSubSection , SetviewSubSection , SeteditSubSection} = SubSectionSlice.actions;
export default SubSectionSlice.reducer;
