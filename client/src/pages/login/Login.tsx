import {
    DarkModeOutlined as IconDarkMode,
    LightModeOutlined as IconLightMode,
    LoginOutlined,
} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, ResponseAuth } from '../../store/api/auth';
import { useAppDispatch } from '../../store/hooks/redux';
import { switchTheme } from '../../store/reducers/GlobalSlice';
import { resetUser, setUser } from '../../store/reducers/UserSlice';
import { ThemeSettings } from '../../theme';

export const Login = () => {
    const dispatch = useAppDispatch();
    const theme = useTheme<ThemeSettings>();
    const navigate = useNavigate();
    const [email, setEmail] = useState(process.env.REACT_APP_TEST_USER_EMAIL ?? '');
    const [password, setPassword] = useState(process.env.REACT_APP_TEST_USER_PASS ?? '');
    const [isShowPassword, setIsShowPassword] = useState(false);

    const initErrorFields = {
        email: false,
        password: false,
    };
    const [errorFields, setErrorFields] = useState<{ email: boolean; password: boolean }>(initErrorFields);
    const [errorMsg, setErrorMsg] = useState('');

    const [login, { isLoading }] = authAPI.useLoginMutation();
    const handleLogin = () => {
        if (email.length < 4 || password.length < 1) {
            const errors = initErrorFields;
            if (email.length < 4) errors.email = true;
            if (password.length < 1) errors.password = true;
            setErrorFields(errors);
            setErrorMsg('Please fill in all fields.');
            return;
        }
        setErrorFields(initErrorFields);
        login({ email, password }).then((result) => {
            if (result.hasOwnProperty('data')) {
                const accessToken = (result as ResponseAuth).data.accessToken;
                localStorage.setItem('token', accessToken);
                // Запись данных в store
                setErrorMsg('');
                dispatch(setUser(jwt_decode(accessToken)));
                navigate('/', { replace: true });
            } else {
                setErrorMsg('Authorization error. Check that the entered values are correct.');
                dispatch(resetUser());
            }
        });
    };

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems="center"
            justifyContent={'center'}
            minHeight="100vh"
        >
            <Box
                maxWidth={400}
                color={theme.palette.secondary[300]}
                bgcolor={theme.palette.background.alt}
                sx={{ padding: '1.5rem', paddingTop: '.7rem' }}
                borderRadius={1}
                boxShadow={1}
            >
                <FormControl>
                    <Box display={'flex'} justifyContent={'right'}>
                        <IconButton onClick={() => dispatch(switchTheme())}>
                            {theme.palette.mode === 'dark' ? (
                                <IconDarkMode sx={{ fontSize: '25px' }} />
                            ) : (
                                <IconLightMode sx={{ fontSize: '25px' }} />
                            )}
                        </IconButton>
                    </Box>
                    <Typography variant="h3" fontWeight="bold" textAlign="center">
                        Login
                    </Typography>
                    <TextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        fullWidth
                        sx={{ marginTop: '.85rem' }}
                        label="Enter your email"
                        placeholder="Email Address"
                        variant="outlined"
                        required
                        error={errorFields.email}
                    />
                    <TextField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={isShowPassword ? 'text' : 'password'}
                        fullWidth
                        sx={{ marginTop: '.85rem' }}
                        label="Password"
                        placeholder="Password"
                        variant="outlined"
                        required
                        error={errorFields.password}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleLogin();
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setIsShowPassword((prev) => !prev)}
                                        aria-label="toggle password"
                                        edge="end"
                                    >
                                        {isShowPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={handleLogin}
                        disabled={isLoading}
                        sx={{
                            marginTop: '.85rem',
                            backgroundColor: theme.palette.secondary[300],
                            color: theme.palette.primary[600],
                            ':hover': {
                                backgroundColor: theme.palette.secondary[400],
                            },
                        }}
                        endIcon={<LoginOutlined />}
                    >
                        Sign In
                    </Button>
                    {errorMsg && (
                        <Typography
                            fontWeight="bold"
                            color={theme.palette.neutral[200]}
                            textAlign="center"
                            sx={{ marginTop: '.5rem' }}
                        >
                            {errorMsg}
                        </Typography>
                    )}
                </FormControl>
            </Box>
        </Box>
    );
};
