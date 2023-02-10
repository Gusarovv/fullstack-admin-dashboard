import { Box, CircularProgress } from '@mui/material';

export const LoaderCircular = ({ isBlock = false }) => {
    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems="center"
            justifyContent={'center'}
            minHeight={isBlock ? '100%' : '100vh'}
        >
            <CircularProgress color="secondary" />
        </Box>
    );
};
