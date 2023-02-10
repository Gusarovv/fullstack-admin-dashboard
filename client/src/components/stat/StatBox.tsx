import { Box, Typography, useTheme } from '@mui/material';
import { ThemeSettings } from '../../theme';
import { LoaderCircular } from '../global/LoaderCircular';
import { FlexBetween } from '../styles/FlexBetween';

type PropsStatBox = {
    title: string;
    value: number | undefined;
    increase: string;
    icon: JSX.Element;
    description: string;
    loading?: boolean;
};

export const StatBox = ({ title, value, increase, icon, description, loading }: PropsStatBox) => {
    const theme = useTheme<ThemeSettings>();
    return (
        <Box
            display="flex"
            flex="1 1 100%"
            gridColumn="span 2"
            gridRow="span 1"
            flexDirection="column"
            justifyContent="space-between"
            p="1.25rem 1rem"
            bgcolor={theme.palette.background.alt}
            borderRadius="0.55rem"
        >
            {!loading ? (
                <>
                    <FlexBetween>
                        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                            {title}
                        </Typography>
                        {icon}
                    </FlexBetween>

                    <Typography variant="h3" fontWeight="600" sx={{ color: theme.palette.secondary[200] }}>
                        {value}
                    </Typography>
                    <FlexBetween gap="1rem">
                        <Typography
                            variant="h5"
                            fontStyle="italic"
                            sx={{ color: theme.palette.secondary.light }}
                        >
                            {increase}
                        </Typography>
                        <Typography>{description}</Typography>
                    </FlexBetween>
                </>
            ) : (
                <LoaderCircular isBlock={true} />
            )}
        </Box>
    );
};
