import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  isOnboarded: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem('orbitle_user') 
    ? JSON.parse(localStorage.getItem('orbitle_user')!) 
    : null,
  isAuthenticated: !!localStorage.getItem('orbitle_user'),
  token: localStorage.getItem('orbitle_token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      if (action.payload) {
        localStorage.setItem('orbitle_user', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('orbitle_user');
      }
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem('orbitle_token', action.payload);
      } else {
        localStorage.removeItem('orbitle_token');
      }
    },
    updateOnboardingStatus(state, action: PayloadAction<boolean>) {
      if (state.user) {
        state.user.isOnboarded = action.payload;
        localStorage.setItem('orbitle_user', JSON.stringify(state.user));
      }
    },
    clearAuth(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('orbitle_user');
      localStorage.removeItem('orbitle_token');
    },
  },
});

export const { setUser, setToken, updateOnboardingStatus, clearAuth } = authSlice.actions;
export default authSlice.reducer;
