import { ArrowDropDownOutlined as IconArrowDrop } from '@mui/icons-material';
import {
    Box,
    Button,
    ClickAwayListener,
    Grow,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Typography,
    useTheme,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../store/api/auth';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { resetUser, selectUserName, selectUserOccupation } from '../../store/reducers/UserSlice';
import { ThemeSettings } from '../../theme';
import profile from '../../assets/profile.png';
import { FlexBetween } from '../styles/FlexBetween';

export const DropMenu = () => {
    const userName = useAppSelector(selectUserName);
    const userOccupation = useAppSelector(selectUserOccupation);

    const theme = useTheme<ThemeSettings>();
    const [isOpen, setIsOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setIsOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setIsOpen(false);
    };

    const dispatch = useAppDispatch();
    const [logout] = authAPI.useLogoutMutation();
    const navigate = useNavigate();
    const handleLogout = (event: Event | React.SyntheticEvent) => {
        handleClose(event);
        dispatch(resetUser());
        localStorage.removeItem('token');
        logout();
        navigate(`/login`);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setIsOpen(false);
        } else if (event.key === 'Escape') {
            setIsOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(isOpen);
    useEffect(() => {
        if (prevOpen.current === true && isOpen === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = isOpen;
    }, [isOpen]);

    return (
        <FlexBetween zIndex={99}>
            <Button
                ref={anchorRef}
                aria-controls={isOpen ? 'composition-menu' : undefined}
                aria-expanded={isOpen ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textTransform: 'none',
                    gap: '1rem',
                }}
            >
                <Box
                    component="img"
                    alt="profile"
                    src={profile}
                    height="32px"
                    width="32px"
                    borderRadius="50%"
                    sx={{ objectFit: 'cover' }}
                />
                <Box textAlign="left">
                    <Typography
                        fontWeight="bold"
                        fontSize="0.85rem"
                        sx={{ color: theme.palette.secondary[100] }}
                    >
                        {userName}
                    </Typography>
                    <Typography fontSize="0.75rem" sx={{ color: theme.palette.secondary[200] }}>
                        {userOccupation}
                    </Typography>
                </Box>
                <IconArrowDrop sx={{ color: theme.palette.secondary[300], fontSize: '25px' }} />
            </Button>
            <Popper
                open={isOpen}
                anchorEl={anchorRef.current}
                placement="bottom-end"
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper
                            sx={{
                                bgcolor: theme.palette.background.alt,
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={isOpen}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                >
                                    <MenuItem disabled onClick={handleClose}>
                                        My account
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </FlexBetween>
    );
};
