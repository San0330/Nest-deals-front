import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../../domain/User';
import { AuthRepository } from '../../repository/auth';
import { CredentialType, RegisterUserType } from '../../utils/types';

interface AuthState {
    user: User | null,
    status: 'pending' | 'failed' | 'succeeded' | 'idle',
}

const initialState: AuthState = {
    user: null,
    status: 'idle'
}

const authRepository = new AuthRepository()

const login = createAsyncThunk(
    'auth/login',
    async (credentials: CredentialType, thunkAPI) => {
        const user = await authRepository.login(credentials)
        return user
    }
)

const register = createAsyncThunk(
    'auth/register',
    async (user: RegisterUserType, thunkAPI) => {
        return await authRepository.register(user)
    }
)

const logout = createAsyncThunk(
    'auth/logout',
    async (payload, thunkAPI) => {
        await authRepository.logout()
    }
)

const checkAuth = createAsyncThunk(
    'auth/check',
    async (payload, thunkAPI) => {
        const user = await authRepository.getAuthUser()
        return user;
    }
)

const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        // login(state: AuthState, action: PayloadAction<Credentials>) {
        // }
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload
                state.status = 'succeeded'
            })
            .addCase(login.pending, (state, _) => {
                state.status = 'pending'
            })
            .addCase(login.rejected, (state, _) => {
                state.status = 'failed'
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(register.pending, (state, _) => {
                state.status = 'pending'
            })
            .addCase(register.rejected, (state, _) => {
                state.status = 'failed'
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.user = null
                state.status = 'succeeded'
            })
            .addCase(logout.pending, (state, _) => {
                state.status = 'pending'
            })
            .addCase(logout.rejected, (state, _) => {
                state.status = 'failed'
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.user = action.payload
                state.status = 'succeeded'
            })
            .addCase(checkAuth.pending, (state, _) => {
                state.status = 'pending'
            })
            .addCase(checkAuth.rejected, (state, _) => {
                state.status = 'failed'
            })
    }
})

// export const { login } = authSlice.actions
export { login, register, logout, checkAuth }
export default authSlice.reducer
