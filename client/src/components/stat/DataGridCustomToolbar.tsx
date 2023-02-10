import { Search } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
} from '@mui/x-data-grid';
import { FlexBetween } from '../styles/FlexBetween';

type PropsDataGridCustomToolbar = {
    searchInput: string;
    setSearchInput: (value: string) => void;
    setSearch: (value: string) => void;
};

export const DataGridCustomToolbar = (props: PropsDataGridCustomToolbar) => {
    return (
        <GridToolbarContainer>
            <FlexBetween width="100%">
                <FlexBetween>
                    <GridToolbarColumnsButton
                        sx={{
                            '& .MuiDataGrid-panelWrapper': {
                                bgcolor: 'red',
                            },
                        }}
                    />
                    <GridToolbarDensitySelector />
                    <GridToolbarExport />
                </FlexBetween>
                <TextField
                    label="Search by User ID..."
                    sx={{ mb: '0.5rem', width: '15rem' }}
                    onChange={(e) => props.setSearchInput(e.target.value)}
                    value={props.searchInput}
                    variant="standard"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => {
                                        props.setSearch(props.searchInput);
                                        props.setSearchInput('');
                                    }}
                                >
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </FlexBetween>
        </GridToolbarContainer>
    );
};
