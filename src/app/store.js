import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "../feature/theme/themeSlice";
import userSlice from "../feature/user/userSlice";

const store = configureStore({
  reducer: {
    theme: themeSlice,
    user: userSlice,
  },
});
export default store;
