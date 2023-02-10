import { useTheme } from '@mui/material';
import { ResponsiveLine, Serie } from '@nivo/line';
import { useMemo } from 'react';
import { salesAPI } from '../../store/api/sales';
import { ThemeSettings } from '../../theme';
import { LoaderCircular } from '../global/LoaderCircular';

type PropsOverviewChart = {
    isDashboard?: boolean;
    view: 'sales' | 'units';
};

export const OverviewChart = ({ isDashboard = false, view }: PropsOverviewChart) => {
    const theme = useTheme<ThemeSettings>();
    const { data, isLoading } = salesAPI.useOverallQuery();

    const [totalSalesLine, totalUnitsLine] = useMemo((): Serie[][] => {
        if (!data) return [];

        const { monthlyData } = data;
        const totalSalesLine: Serie = {
            id: 'totalSales',
            color: theme.palette.secondary.main,
            data: [],
        };
        const totalUnitsLine: Serie = {
            id: 'totalUnits',
            color: theme.palette.secondary[600],
            data: [],
        };

        Object.values(monthlyData).reduce(
            (acc, { month, totalSales, totalUnits }) => {
                const curSales = acc.sales + totalSales;
                const curUnits = acc.units + totalUnits;

                totalSalesLine.data = [...totalSalesLine.data, { x: month, y: curSales }];
                totalUnitsLine.data = [...totalUnitsLine.data, { x: month, y: curUnits }];

                return { sales: curSales, units: curUnits };
            },
            { sales: 0, units: 0 },
        );

        return [[totalSalesLine], [totalUnitsLine]];
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

    return data || !isLoading ? (
        <ResponsiveLine
            data={view === 'sales' ? totalSalesLine : totalUnitsLine}
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
            margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: false,
                reverse: false,
            }}
            // yFormat=" >-.2f" // Кол-во знаков после запятой
            curve="catmullRom"
            animate={false}
            enableArea={isDashboard}
            axisBottom={{
                format: (v) => {
                    if (isDashboard) return v.slice(0, 3);
                    return v;
                },
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? '' : 'Month',
                legendOffset: 36,
                legendPosition: 'middle',
            }}
            axisLeft={{
                tickValues: 5,
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? '' : `Total ${view === 'sales' ? 'Revenue' : 'Units'} for Year`,
                legendOffset: -60,
                legendPosition: 'middle',
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
        />
    ) : (
        <LoaderCircular isBlock={true} />
    );
};
