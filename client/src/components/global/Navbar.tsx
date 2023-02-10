import {
	DarkModeOutlined as IconDarkMode,
	LightModeOutlined as IconLightMode,
	Menu as IconMenu,
	Search as IconSearch,
	SettingsOutlined as IconSettings
} from '@mui/icons-material';
import { Box, IconButton, InputBase, Toolbar, useTheme } from '@mui/material';
import { useAppDispatch } from '../../store/hooks/redux';
import { switchTheme } from '../../store/reducers/GlobalSlice';
import { ThemeSettings } from '../../theme';
import { FlexBetween } from '../styles/FlexBetween';
import { DropMenu } from './DropMenu';

type PropsNavbar = {
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Navbar = (props: PropsNavbar) => {
    const dispatch = useAppDispatch();
    const theme = useTheme<ThemeSettings>();

    return (
        <Box
            sx={{
                position: 'static',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {/* LEFT */}
                <FlexBetween gap="0.75rem">
                    <IconButton onClick={() => props.setIsSidebarOpen((prev) => !prev)}>
                        <IconMenu />
                    </IconButton>
                    <FlexBetween
                        bgcolor={theme.palette.background.alt}
                        borderRadius="9px"
                        gap="3rem"
                        p="0.1rem 1.5rem"
                    >
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <IconSearch />
                        </IconButton>
                    </FlexBetween>
                </FlexBetween>

                {/* RIGHT */}
                <FlexBetween gap="0.75rem">
                    <IconButton onClick={() => dispatch(switchTheme())}>
                        {theme.palette.mode === 'dark' ? (
                            <IconDarkMode sx={{ fontSize: '25px' }} />
                        ) : (
                            <IconLightMode sx={{ fontSize: '25px' }} />
                        )}
                    </IconButton>
                    <IconButton>
                        <IconSettings sx={{ fontSize: '25px' }} />
                    </IconButton>
                    <DropMenu />
                </FlexBetween>
            </Toolbar>
        </Box>
    );
};
