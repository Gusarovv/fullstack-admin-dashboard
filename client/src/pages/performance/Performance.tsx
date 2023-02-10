import { Box } from '@mui/material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { Header } from '../../components/global/Header';
import { CustomColumnMenu } from '../../components/stat/DataGridCustomColumnMenu';
import { managementAPI } from '../../store/api/management';

export const Performance = () => {
    const { data, isLoading } = managementAPI.useMePerformanceQuery();

    const columns = [
        {
            field: '_id',
            headerName: 'ID',
            flex: 1,
        },
        {
            field: 'userId',
            headerName: 'User ID',
            flex: 1,
        },
        {
            field: 'createdAt',
            headerName: 'CreatedAt',
            flex: 1,
        },
        {
            field: 'products',
            headerName: '# of Products',
            flex: 0.5,
            sortable: false,
            renderCell: (params: GridCellParams) => params.value.length,
        },
        {
            field: 'cost',
            headerName: 'Cost',
            flex: 1,
            renderCell: (params: GridCellParams) => `$${params.value.toFixed(2)}`,
        },
    ];

    return (
        <Box>
            <Header title="PERFORMANCE" subtitle="Track your Affiliate Sales Performance Here" />
            <Box mt="40px" height="75vh">
                <DataGrid
                    pageSize={50}
                    rowsPerPageOptions={[50]}
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={(data && data.sales) || []}
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
