import { Box, useTheme } from '@mui/material';
import { ResponsiveLine, Serie } from '@nivo/line';
import { useMemo } from 'react';
import { Header } from '../../components/global/Header';
import { LoaderCircular } from '../../components/global/LoaderCircular';
import { salesAPI } from '../../store/api/sales';
import { ThemeSettings } from '../../theme';

export const Monthly = () => {
    const theme = useTheme<ThemeSettings>();
    const { data } = salesAPI.useOverallQuery();

    const [formattedData] = useMemo((): Serie[][] => {
        if (!data) return [];

        const { monthlyData } = data;
        const totalSalesLine: Serie = {
            id: 'Total Sales',
            color: theme.palette.secondary.main,
            data: [],
        };
        const totalUnitsLine: Serie = {
            id: 'Total Units',
            color: theme.palette.secondary[600],
            data: [],
        };

        Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {
            totalSalesLine.data = [...totalSalesLine.data, { x: month, y: totalSales }];
            totalUnitsLine.data = [...totalUnitsLine.data, { x: month, y: totalUnits }];
        });
        return [[totalSalesLine, totalUnitsLine]];
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box paddingRight="1rem">
            <Header title="MONTHLY SALES" subtitle="Chart of monthly sales" />
            <Box height="75vh" width="99%">
                {data ? (
                    <ResponsiveLine
                        data={formattedData}
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
                        colors={{ datum: 'color' }}
                        margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
                        xScale={{ type: 'point' }}
                        yScale={{
                            type: 'linear',
                            min: 'auto',
                            max: 'auto',
                            stacked: false,
                            reverse: false,
                        }}
                        axisTop={null}
                        axisRight={null}
                        animate={false}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 90,
                            legend: 'Month',
                            legendOffset: 60,
                            legendPosition: 'middle',
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Total',
                            legendOffset: -50,
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
                        legends={[
                            {
                                anchor: 'top-right',
                                direction: 'column',
                                justify: false,
                                translateX: 50,
                                translateY: 0,
                                itemsSpacing: 0,
                                itemDirection: 'left-to-right',
                                itemWidth: 80,
                                itemHeight: 20,
                                itemOpacity: 0.75,
                                symbolSize: 12,
                                symbolShape: 'circle',
                                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemBackground: 'rgba(0, 0, 0, .03)',
                                            itemOpacity: 1,
                                        },
                                    },
                                ],
                            },
                        ]}
                    />
                ) : (
                    <LoaderCircular />
                )}
            </Box>
        </Box>
    );
};
