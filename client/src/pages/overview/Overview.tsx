import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { Header } from '../../components/global/Header';
import { OverviewChart } from '../../components/stat/OverviewChart';

export const Overview = () => {
    type ViewMode = 'sales' | 'units';
    const [view, setView] = useState<ViewMode>('units');

    return (
        <Box>
            <Header title="OVERVIEW" subtitle="Overview of general revenue and profit" />
            <Box height="75vh" width="99%">
                <FormControl sx={{ mt: '1rem' }}>
                    <InputLabel>View</InputLabel>
                    <Select value={view} label="View" onChange={(e) => setView(e.target.value as ViewMode)}>
                        <MenuItem value="sales">Sales</MenuItem>
                        <MenuItem value="units">Units</MenuItem>
                    </Select>
                </FormControl>
                <OverviewChart view={view} />
            </Box>
        </Box>
    );
};
