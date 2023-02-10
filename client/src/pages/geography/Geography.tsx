import { Box, useTheme } from '@mui/material';
import { ResponsiveChoropleth } from '@nivo/geo';
import { geoData } from '../../assets/geoData';
import { Header } from '../../components/global/Header';
import { LoaderCircular } from '../../components/global/LoaderCircular';
import { clientAPI } from '../../store/api/client-facing';
import { ThemeSettings } from '../../theme';

export const Geography = () => {
    const theme = useTheme<ThemeSettings>();
    const { data } = clientAPI.useGeographyQuery();

    return (
        <Box>
            <Header title="GEOGRAPHY" subtitle="Find where your users are located" />
            <Box
                mt="40px"
                height="75vh"
                border={`1px solid ${theme.palette.secondary[200]}`}
                borderRadius="4px"
                width="99%"
            >
                {data ? (
                    <ResponsiveChoropleth
                        data={data}
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
                        features={geoData.features}
                        margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
                        domain={[0, Math.max(...data.map((o) => o.value))]}
                        unknownColor="#555555"
                        label="properties.name"
                        valueFormat=".2s"
                        projectionScale={150}
                        projectionTranslation={[0.45, 0.6]}
                        projectionRotation={[0, 0, 0]}
                        borderWidth={1}
                        borderColor={theme.palette.primary[200]}
                        legends={[
                            {
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: true,
                                translateX: -20,
                                translateY: -125,
                                itemsSpacing: 0,
                                itemWidth: 94,
                                itemHeight: 18,
                                itemDirection: 'left-to-right',
                                itemTextColor: theme.palette.primary[200],
                                itemOpacity: 0.85,
                                symbolSize: 18,
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: theme.palette.secondary[400],
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
