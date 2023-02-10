import { ChevronLeft as IconChevronLeft, SettingsOutlined as IconSettings } from '@mui/icons-material';
import { Box, Divider, Drawer, IconButton, Typography, useTheme } from '@mui/material';
import profile from '../../assets/profile.png';
import { useAppSelector } from '../../store/hooks/redux';
import { selectUserName, selectUserOccupation } from '../../store/reducers/UserSlice';
import { ThemeSettings } from '../../theme';
import { FlexBetween } from '../styles/FlexBetween';
import { SidebarNavList } from './SidebarNavList';

type PropsSidebar = {
    isNonMobile: boolean;
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Sidebar = (props: PropsSidebar) => {
    const theme = useTheme<ThemeSettings>();
    const userName = useAppSelector(selectUserName);
    const userOccupation = useAppSelector(selectUserOccupation);

    return (
        <Box component="nav">
            {props.isSidebarOpen && (
                <Drawer
                    open={props.isSidebarOpen}
                    onClose={() => props.setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: '250px',
                        '& .MuiDrawer-paper': {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSixing: 'border-box',
                            borderWidth: props.isNonMobile ? 0 : '2px',
                            width: '250px',
                        },
                    }}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        flexWrap="nowrap"
                        height="100%"
                        justifyContent="space-between"
                    >
                        <Box display="flex" width="100%">
                            <Box width="100%">
                                <Box m="1.5rem 2rem 2rem 3rem">
                                    <FlexBetween color={theme.palette.secondary.main}>
                                        <Box display="flex" alignItems="center" gap="0.5rem">
                                            <Typography variant="h4" fontWeight="bold">
                                                Gusarov
                                            </Typography>
                                        </Box>
                                        {!props.isNonMobile && (
                                            <IconButton
                                                onClick={() => props.setIsSidebarOpen((prev) => !prev)}
                                            >
                                                <IconChevronLeft />
                                            </IconButton>
                                        )}
                                    </FlexBetween>
                                </Box>
                                <SidebarNavList />
                            </Box>
                        </Box>

                        <Box display="flex" marginBottom="1rem">
                            <Divider />
                            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                                <Box
                                    component="img"
                                    alt="profile"
                                    src={profile}
                                    height="40px"
                                    width="40px"
                                    borderRadius="50%"
                                    sx={{ objectFit: 'cover' }}
                                />
                                <Box textAlign="left">
                                    <Typography
                                        fontWeight="bold"
                                        fontSize="0.9rem"
                                        sx={{ color: theme.palette.secondary[100] }}
                                    >
                                        {userName}
                                    </Typography>
                                    <Typography
                                        fontSize="0.8rem"
                                        sx={{ color: theme.palette.secondary[200] }}
                                    >
                                        {userOccupation}
                                    </Typography>
                                </Box>
                                <IconButton>
                                    <IconSettings
                                        sx={{
                                            color: theme.palette.secondary[300],
                                            fontSize: '25px ',
                                        }}
                                    />
                                </IconButton>
                            </FlexBetween>
                        </Box>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
};
