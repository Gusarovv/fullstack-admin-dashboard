import { Box, Typography, useTheme } from '@mui/material';
import { ResponsivePie } from '@nivo/pie';
import { salesAPI } from '../../store/api/sales';
import { ThemeSettings } from '../../theme';
import { LoaderCircular } from '../global/LoaderCircular';

export const BreakdownChart = ({ isDashboard = false }) => {
    const theme = useTheme<ThemeSettings>();
    const { data, isLoading } = salesAPI.useOverallQuery();

    const colors = [
        theme.palette.secondary[500],
        theme.palette.secondary[100],
        theme.palette.secondary[400],
        theme.palette.secondary[300],
        theme.palette.secondary[600],
        theme.palette.secondary[200],
        theme.palette.secondary[700],
    ];

    return data && !isLoading ? (
        <Box
            height={isDashboard ? '400px' : '100%'}
            width={undefined}
            minHeight={isDashboard ? '325px' : undefined}
            minWidth={isDashboard ? '325px' : undefined}
            position="relative"
        >
            <ResponsivePie
                data={Object.entries(data.salesByCategory).map(([category, sales], i) => ({
                    id: category,
                    label: category,
                    value: sales,
                    color: colors[i],
                }))}
                theme={{
                    axis: {
                        domain: {
                            line: {
                                stroke: theme.palette.secondary[200],
                            },
                        },
                        legend: {
                            text: {
                                fill: theme.palette.secondary[200],
                            },
                        },
                        ticks: {
                            line: {
                                stroke: theme.palette.secondary[200],
                                strokeWidth: 1,
                            },
                            text: {
                                fill: theme.palette.secondary[200],
                            },
                        },
                    },
                    legends: {
                        text: {
                            fill: theme.palette.secondary[200],
                        },
                    },
                    tooltip: {
                        container: {
                            color: theme.palette.primary[300],
                        },
                    },
                }}
                colors={{ datum: 'data.color' }}
                margin={
                    isDashboard
                        ? { top: 40, right: 25, bottom: 25, left: 25 }
                        : { top: 40, right: 80, bottom: 80, left: 80 }
                }
                sortByValue={true}
                padAngle={0.1}
                cornerRadius={3}
                innerRadius={0.45}
                activeOuterRadiusOffset={10}
                borderWidth={1}
                borderColor={{
                    from: 'color',
                    modifiers: [['darker', 0.2]],
                }}
                enableArcLinkLabels={!isDashboard}
                arcLinkLabelsTextColor={theme.palette.secondary[200]}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={isDashboard ? 10 : 5}
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [['darker', 2]],
                }}
            />
            <Box
                position="absolute"
                top="50%"
                left="50%"
                color={theme.palette.secondary[400]}
                textAlign="center"
                sx={{
                    transform: isDashboard ? 'translate(-50%, -25%)' : 'translate(-50%, -100%)',
                }}
            >
                <Typography variant="h6">
                    {!isDashboard && 'Total:'} ${data.yearlySalesTotal}
                </Typography>
            </Box>
        </Box>
    ) : (
        <LoaderCircular isBlock={true} />
    );
};
