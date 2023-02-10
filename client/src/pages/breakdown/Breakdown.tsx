import { Box } from '@mui/material';
import { Header } from '../../components/global/Header';
import { BreakdownChart } from '../../components/stat/BreakdownChart';

export const Breakdown = () => {
    return (
        <Box>
            <Header title="BREAKDOWN" subtitle="Breakdown of Sales By Category" />
            <Box mt="40px" height="75vh" width="99%">
                <BreakdownChart />
            </Box>
        </Box>
    );
};
