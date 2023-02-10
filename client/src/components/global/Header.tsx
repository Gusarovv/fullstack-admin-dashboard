import { Box, Typography, useTheme } from '@mui/material';
import { ThemeSettings } from '../../theme';

type PropsHeader = {
    title: string;
    subtitle: string;
};

export const Header = ({ title, subtitle }: PropsHeader) => {
    const theme = useTheme<ThemeSettings>();
    return (
        <Box>
            <Typography
                variant="h2"
                color={theme.palette.secondary[100]}
                fontWeight="bold"
                sx={{ mb: '5px' }}
            >
                {title}
            </Typography>
            <Typography variant="h5" color={theme.palette.secondary[300]}>
                {subtitle}
            </Typography>
        </Box>
    );
};
