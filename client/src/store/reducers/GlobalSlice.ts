import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type Theme = 'dark' | 'light';

interface GlobalState {
    theme: Theme;
}

const initState: GlobalState = {
    theme: localStorage.getItem('theme') === 'light' ? 'light' : 'dark',
};

export const globalSlice = createSlice({
    name: 'global',
    initialState: initState,
    reducers: {
        setTheme(state, action: PayloadAction<Theme>) {
            state.theme = action.payload as Theme;
        },
        switchTheme(state) {
            const newTheme = state.theme === 'dark' ? 'light' : 'dark';
            state.theme = newTheme;
            localStorage.setItem('theme', newTheme);
        },
    },
});

export const { setTheme, switchTheme } = globalSlice.actions;

export default globalSlice.reducer;

export const selectTheme = (state: RootState) => state.globalReducer.theme;
