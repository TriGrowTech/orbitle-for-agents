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
}

const initialState: AuthState = {
  user: localStorage.getItem('orbitle_user') 
    ? JSON.parse(localStorage.getItem('orbitle_user')!) 
    : null,
  isAuthenticated: !!localStorage.getItem('orbitle_user'),
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
    updateOnboardingStatus(state, action: PayloadAction<boolean>) {
      if (state.user) {
        state.user.isOnboarded = action.payload;
        localStorage.setItem('orbitle_user', JSON.stringify(state.user));
      }
    },
    clearAuth(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('orbitle_user');
    },
  },
});

export const { setUser, updateOnboardingStatus, clearAuth } = authSlice.actions;
export default authSlice.reducer;
