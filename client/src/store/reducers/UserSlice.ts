import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type UserRole = 'user' | 'admin' | 'superadmin' | null;

export interface IUser {
    _id: string;
    name: string;
    email: string;
    city: string;
    country: string;
    occupation: string;
    phone: string;
    transactions: string[];
    role: UserRole;
}

const initState: IUser = {
    _id: '',
    name: '',
    email: '',
    city: '',
    country: '',
    occupation: '',
    phone: '',
    transactions: [],
    role: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        resetUser: () => initState,
        setUser(state, action: PayloadAction<IUser>) {
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.city = action.payload.city;
            state.country = action.payload.country;
            state.occupation = action.payload.occupation;
            state.phone = action.payload.phone;
            state.role = action.payload.role;
            state.transactions = action.payload.transactions?.length ? action.payload.transactions : [];
        },
    },
});

export const { resetUser, setUser } = userSlice.actions;

export default userSlice.reducer;

export const selectUserId = (state: RootState) => state.userReducer._id;
export const selectUserName = (state: RootState) => state.userReducer.name;
export const selectUserOccupation = (state: RootState) => state.userReducer.occupation;
