import { Box } from '@mui/material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { useState } from 'react';
import { Header } from '../../components/global/Header';
import { DataGridCustomToolbar } from '../../components/stat/DataGridCustomToolbar';
import { clientAPI } from '../../store/api/client-facing';

export const Transactions = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState('');

    const [searchInput, setSearchInput] = useState('');
    const { data, isLoading } = clientAPI.useTransactionsQuery({
        page: page + 1,
        pageSize,
        sort: JSON.stringify(sort),
        search,
    });

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
            <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
            <Box
                height="80vh"
                sx={{
                    '& .MuiDataGrid-root': {
                        border: 'none',
                    },
                }}
            >
                <DataGrid
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={(data && data.transactions) || []}
                    columns={columns}
                    rowCount={(data && data.total) || 0}
                    rowsPerPageOptions={[20, 50, 100]}
                    pagination
                    page={page}
                    pageSize={pageSize}
                    paginationMode="server"
                    sortingMode="server"
                    onPageChange={(newPage) => setPage(newPage)}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onSortModelChange={(newSortModel) => setSort(newSortModel[0])}
                    isRowSelectable={() => false}
                    components={{ Toolbar: DataGridCustomToolbar }}
                    componentsProps={{
                        toolbar: { searchInput, setSearchInput, setSearch },
                    }}
                />
            </Box>
        </Box>
    );
};
