import { Box, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components/global/Navbar';
import { Sidebar } from '../../components/global/Sidebar';

export const Layout = () => {
    const isNonMobile = useMediaQuery('(min-width: 600px)');
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

    return (
        <Box display={isNonMobile ? 'flex' : 'block'} width="100%" height="100%">
            <Sidebar
                isNonMobile={isNonMobile}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <Box flexGrow={1}>
                <Navbar setIsSidebarOpen={setIsSidebarOpen} />
                <Box p="1.5rem 2.5rem">
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};
