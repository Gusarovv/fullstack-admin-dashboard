import { Box, Button, Card, CardActions, CardContent, Rating, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { IProductWithStat } from '../../store/interface/product.interface';
import { ThemeSettings } from '../../theme';

export const ProductCard = ({ product }: { product: IProductWithStat }) => {
    const theme = useTheme<ThemeSettings>();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card
            sx={{
                backgroundImage: 'none',
                backgroundColor: theme.palette.background.alt,
                borderRadius: '0.55rem',
                '& .MuiCardContent-root': {
                    padding: '1rem',
                },
            }}
        >
            <Box
                display="flex"
                flexDirection="column"
                flexWrap="nowrap"
                height="100%"
                justifyContent="space-between"
                minHeight="13.5rem"
            >
                <Box display="flex">
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[200]} gutterBottom>
                            {product.category}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {product.name}
                        </Typography>
                        {!isExpanded ? (
                            <Box>
                                <Typography sx={{ mb: '1.5rem' }} color={theme.palette.secondary[300]}>
                                    ${Number(product.price).toFixed(2)}
                                </Typography>
                                <Rating value={product.rating} readOnly />

                                <Typography variant="body2">{product.description}</Typography>
                            </Box>
                        ) : (
                            <Box marginTop="0.2rem">
                                <Typography>
                                    <span style={{ color: theme.palette.secondary[300] }}>id:</span>{' '}
                                    {product._id}
                                </Typography>
                                <Typography>
                                    <span style={{ color: theme.palette.secondary[300] }}>Supply Left:</span>{' '}
                                    {product.supply}
                                </Typography>
                                <Typography>
                                    <span style={{ color: theme.palette.secondary[300] }}>Yearly Sales:</span>{' '}
                                    {product.stat.yearlySalesTotal}
                                </Typography>
                                <Typography>
                                    <span style={{ color: theme.palette.secondary[300] }}>
                                        Yearly Units Sold:
                                    </span>{' '}
                                    {product.stat.yearlyTotalSoldUnits}
                                </Typography>
                            </Box>
                        )}
                    </CardContent>
                </Box>
                <Box display="flex">
                    <CardActions>
                        <Button variant="contained" size="small" onClick={() => setIsExpanded(!isExpanded)}>
                            Details
                        </Button>
                    </CardActions>
                </Box>
            </Box>
        </Card>
    );
};
