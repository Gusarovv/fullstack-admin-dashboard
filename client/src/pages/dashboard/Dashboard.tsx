import {
    DownloadOutlined as IconDownload,
    Email as IconEmail,
    PersonAdd as IconPersonAdd,
    PointOfSale as IconSale,
    Traffic as IconTraffic,
} from '@mui/icons-material';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { Header } from '../../components/global/Header';
import { BreakdownChart } from '../../components/stat/BreakdownChart';
import { OverviewChart } from '../../components/stat/OverviewChart';
import { StatBox } from '../../components/stat/StatBox';
import { FlexBetween } from '../../components/styles/FlexBetween';
import { clientAPI } from '../../store/api/client-facing';
import { salesAPI } from '../../store/api/sales';
import { ThemeSettings } from '../../theme';

export const Dashboard = () => {
    const theme = useTheme<ThemeSettings>();
    const isNonMediumScreens = useMediaQuery('(min-width: 1400px)');
    const { data: dateStats, isLoading: isLoadingStats } = salesAPI.useTodayAndTotalQuery();
    const { data: dateTransactions, isLoading: isLoadingTransactions } = clientAPI.useTransactionsQuery({
        page: 1,
        pageSize: 50,
        sort: `{ "field": "createdOn", "sort": "desc"}`,
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
            <FlexBetween>
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

                <Box>
                    <Button
                        sx={{
                            backgroundColor: theme.palette.secondary.light,
                            color: theme.palette.background.alt,
                            fontSize: '14px',
                            fontWeight: 'bold',
                            padding: '5px 20px',
                            marginLeft: '1rem',
                            ':hover': {
                                backgroundColor: theme.palette.secondary[400],
                            },
                        }}
                    >
                        <IconDownload sx={{ mr: '9px' }} />
                        Download Reports
                    </Button>
                </Box>
            </FlexBetween>

            <Box
                mt="20px"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="160px"
                gap="20px"
                sx={{
                    '& > div': { gridColumn: isNonMediumScreens ? undefined : 'span 12' },
                }}
            >
                {/* ROW 1 */}
                <StatBox
                    title="Total Customers"
                    loading={isLoadingStats || !dateStats}
                    value={dateStats && dateStats.totalCustomers}
                    increase="+14%"
                    description="Since last month"
                    icon={<IconEmail sx={{ color: theme.palette.secondary[300], fontSize: '26px' }} />}
                />
                <StatBox
                    title="Sales Today"
                    loading={isLoadingStats || !dateStats}
                    value={dateStats && dateStats.todayStats.totalSales}
                    increase="+21%"
                    description="Since last month"
                    icon={<IconSale sx={{ color: theme.palette.secondary[300], fontSize: '26px' }} />}
                />
                <Box
                    gridColumn="span 8"
                    gridRow="span 2"
                    bgcolor={theme.palette.background.alt}
                    p="1rem"
                    borderRadius="0.55rem"
                >
                    <OverviewChart view="sales" isDashboard={true} />
                </Box>
                <StatBox
                    title="Monthly Sales"
                    loading={isLoadingStats || !dateStats}
                    value={dateStats && dateStats.thisMonthStats.totalSales}
                    increase="+5%"
                    description="Since last month"
                    icon={<IconPersonAdd sx={{ color: theme.palette.secondary[300], fontSize: '26px' }} />}
                />
                <StatBox
                    title="Yearly Sales"
                    loading={isLoadingStats || !dateStats}
                    value={dateStats && dateStats.yearlySalesTotal}
                    increase="+43%"
                    description="Since last month"
                    icon={<IconTraffic sx={{ color: theme.palette.secondary[300], fontSize: '26px' }} />}
                />

                {/* ROW 2 */}
                <Box gridColumn="span 8" gridRow="span 3">
                    <DataGrid
                        pageSize={25}
                        rowsPerPageOptions={[25]}
                        loading={isLoadingTransactions || !dateTransactions}
                        getRowId={(row) => row._id}
                        rows={(dateTransactions && dateTransactions.transactions) || []}
                        columns={columns}
                        isRowSelectable={() => false}
                    />
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 3"
                    bgcolor={theme.palette.background.alt}
                    p="1.5rem"
                    borderRadius="0.55rem"
                >
                    <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                        Sales By Category
                    </Typography>
                    <Typography
                        marginTop="0.5rem"
                        fontSize="0.8rem"
                        sx={{ color: theme.palette.secondary[300] }}
                    >
                        Breakdown of real states and information via category for revenue made for this year
                        and total sales.
                    </Typography>
                    <BreakdownChart isDashboard={true} />
                </Box>
            </Box>
        </Box>
    );
};
