import { Box, TextField, useTheme } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { ResponsiveLine, Serie } from '@nivo/line';
import { DateTime } from 'luxon';
import { useMemo, useState } from 'react';
import { Header } from '../../components/global/Header';
import { LoaderCircular } from '../../components/global/LoaderCircular';
import { salesAPI } from '../../store/api/sales';
import { ThemeSettings } from '../../theme';

export const Daily = () => {
    const theme = useTheme<ThemeSettings>();
    const { data } = salesAPI.useOverallQuery();

    const [startDate, setStartDate] = useState<DateTime | null>(DateTime.fromISO('2022-01-01'));
    const [endDate, setEndDate] = useState<DateTime | null>(DateTime.fromISO('2022-02-01'));

    const [formattedData] = useMemo((): Serie[][] => {
        if (!data) return [];

        const { dailyData } = data;
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

        Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
            const dateFormatted = DateTime.fromISO(date);
            if ((!startDate || dateFormatted >= startDate) && (!endDate || dateFormatted <= endDate)) {
                const splitDate = date.substring(date.indexOf('-') + 1);

                totalSalesLine.data = [...totalSalesLine.data, { x: splitDate, y: totalSales }];
                totalUnitsLine.data = [...totalUnitsLine.data, { x: splitDate, y: totalUnits }];
            }
        });
        return [[totalSalesLine, totalUnitsLine]];
    }, [data, startDate, endDate]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box paddingRight="1rem">
            <Header title="DAILY SALES" subtitle="Chart of daily sales" />
            <Box height="75vh" width="99%">
                <Box display="flex" justifyContent="flex-end" marginTop="1rem">
                    <Box marginRight=".5rem">
                        <DatePicker
                            disableMaskedInput
                            label="Start Date"
                            minDate={DateTime.fromISO('2022-01-01')}
                            maxDate={endDate}
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            renderInput={(params) => (
                                <TextField {...params} onKeyDown={(e) => e.preventDefault()} />
                            )}
                        />
                    </Box>
                    <Box>
                        <DatePicker
                            disableMaskedInput
                            label="End Date"
                            minDate={startDate?.plus({ days: 1 })}
                            maxDate={DateTime.fromISO('2022-12-31')}
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            renderInput={(params) => (
                                <TextField {...params} onKeyDown={(e) => e.preventDefault()} />
                            )}
                        />
                    </Box>
                </Box>

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
                        animate={false}
                        colors={{ datum: 'color' }}
                        margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
                        curve="catmullRom"
                        axisTop={null}
                        axisRight={null}
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
