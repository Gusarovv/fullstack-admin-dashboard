import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { useMemo } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { OverrideStyles } from './components/styles/OverrideStyles';
import { Admin } from './pages/admin/Admin';
import { Breakdown } from './pages/breakdown/Breakdown';
import { Customers } from './pages/customers/Customers';
import { Daily } from './pages/daily/Daily';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Geography } from './pages/geography/Geography';
import { Layout } from './pages/layout/Layout';
import { RequireAuth } from './pages/layout/RequireAuth';
import { Login } from './pages/login/Login';
import { Monthly } from './pages/monthly/Monthly';
import { Overview } from './pages/overview/Overview';
import { Performance } from './pages/performance/Performance';
import { Products } from './pages/products/Products';
import { Transactions } from './pages/transactions/Transactions';
import { useAppSelector } from './store/hooks/redux';
import { selectTheme } from './store/reducers/GlobalSlice';
import { themeSettings } from './theme';

function App() {
    const nameTheme = useAppSelector(selectTheme);
    const themeMui = useMemo(() => createTheme(themeSettings(nameTheme)), [nameTheme]);

    return (
        <ThemeProvider theme={themeMui}>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
                <CssBaseline />
                <OverrideStyles />
                <BrowserRouter>
                    <Routes>
                        {/* public routes */}
                        <Route path="/login" element={<Login />} />

                        {/* protected routes */}
                        <Route element={<RequireAuth />}>
                            <Route element={<Layout />}>
                                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/products" element={<Products />} />
                                <Route path="/customers" element={<Customers />} />
                                <Route path="/transactions" element={<Transactions />} />
                                <Route path="/geography" element={<Geography />} />
                                <Route path="/overview" element={<Overview />} />
                                <Route path="/daily" element={<Daily />} />
                                <Route path="/monthly" element={<Monthly />} />
                                <Route path="/breakdown" element={<Breakdown />} />
                                <Route path="/admin" element={<Admin />} />
                                <Route path="/performance" element={<Performance />} />
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;
