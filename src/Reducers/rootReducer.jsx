import { combineReducers } from '@reduxjs/toolkit'

import authReducer from '../Slices/Auth'
import profileReducer from '../Slices/Profile'
import CourseReducer from '../Slices/Courses'
import CategoryReducer from '../Slices/Categories'
import SectionReducer from '../Slices/Section'
import SubSectionReducer from '../Slices/SubSection'

export const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    Course:CourseReducer,
    Category:CategoryReducer,
    section:SectionReducer,
    subsection:SubSectionReducer,
})