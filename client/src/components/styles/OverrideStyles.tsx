import { GlobalStyles, useTheme } from '@mui/material';
import { ThemeSettings } from '../../theme';

export const OverrideStyles = () => {
    const theme = useTheme<ThemeSettings>();
    return (
        <GlobalStyles
            styles={{
                '.MuiDataGrid-panelWrapper': {
                    color: theme.palette.secondary[300],
                    backgroundColor: theme.palette.background.alt,
                    '& .MuiSwitch-track': {
                        backgroundColor: `${theme.palette.secondary[300]} !important`,
                    },
                    '& .MuiButtonBase-root, .MuiFormLabel-root': {
                        color: `${theme.palette.secondary[200]} !important`,
                    },
                },
                '.MuiPaper-root': {
                    backgroundColor: `${theme.palette.background.alt} !important`,
                },
                '.MuiDataGrid-root': {
                    border: `none !important`,
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: 'none',
                    },
                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: 'none',
                    },
                    '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                        color: `${theme.palette.secondary[200]} !important`,
                        border: 'none',
                    },
                },
            }}
        />
    );
};
