import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Header } from '../../components/global/Header';
import { CustomColumnMenu } from '../../components/stat/DataGridCustomColumnMenu';
import { managementAPI } from '../../store/api/management';

export const Admin = () => {
    const { data, isLoading } = managementAPI.useAdminsQuery();

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
            <Header title="ADMINS" subtitle="List of admins" />
            <Box mt="40px" height="75vh">
                <DataGrid
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={data || []}
                    columns={columns}
                    isRowSelectable={() => false}
                    components={{
                        ColumnMenu: CustomColumnMenu,
                    }}
                />
            </Box>
        </Box>
    );
};
