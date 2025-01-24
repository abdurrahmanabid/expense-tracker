import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, postRegistration } from "./postUser";

export const registration = createAsyncThunk(
  "user/registration",
  async (user) => {
    const res = await postRegistration(user);
    if (res) return res.data;
    return null;
  }
);

export const login = createAsyncThunk("user/login", async (user) => {
  const res = await loginUser(user);
  console.log("🚀 ~ login ~ res:", res.data);
  if (res.data.length > 0) {
    return res.data;
  } else {
    return null;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    isError: false,
    error: null,
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    checkLogin: (state) => {
      const id = document.cookie.replace(
        /(?:(?:^|.*;\s*)id\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      if (id) {
        state.isLoggedIn = true;
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      //delete id from cookies
      document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(registration.fulfilled, (state, action) => {
        console.log("payload", action.payload);
        if (!action?.payload) {
          state.isLoading = false;
          state.error = "User already exist";
          state.isError = true;
          return;
        }
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.isLoggedIn = true;
        state.user = action.payload;
        document.cookie = `id=${action.payload?.id}; expires=${new Date(
          Date.now() + 24 * 60 * 60 * 1000
        )}; path=/`;
      })
      .addCase(registration.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("Payload:", action.payload);
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.isLoggedIn = true;
        state.user = action.payload;
        // set id on cookies with expiration
        document.cookie = `id=${action.payload[0]?.id}; expires=${new Date(
          Date.now() + 24 * 60 * 60 * 1000
        )}; path=/`;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});
export default userSlice.reducer;

export const { checkLogin, logout } = userSlice.actions;
