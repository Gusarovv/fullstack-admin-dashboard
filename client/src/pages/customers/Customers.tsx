import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Header } from '../../components/global/Header';
import { clientAPI } from '../../store/api/client-facing';

export const Customers = () => {
    const { data, isLoading } = clientAPI.useCustomersQuery();
    const columns = [
        {
            field: '_id',
            headerName: 'ID',
            flex: 1,
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 0.5,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
        },
        {
            field: 'country',
            headerName: 'Country',
            flex: 0.4,
        },
        {
            field: 'occupation',
            headerName: 'Occupation',
            flex: 1,
        },
        {
            field: 'role',
            headerName: 'Role',
            flex: 0.5,
        },
    ];

    return (
        <Box>
            <Header title="CUSTOMERS" subtitle="List of Customers" />
            <Box mt="40px" height="75vh" boxShadow={1}>
                <DataGrid
                    pageSize={50}
                    rowsPerPageOptions={[50]}
                    isRowSelectable={() => false}
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={data || []}
                    columns={columns}
                />
            </Box>
        </Box>
    );
};
