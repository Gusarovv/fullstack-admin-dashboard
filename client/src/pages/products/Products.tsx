import { Box, useMediaQuery } from '@mui/material';
import { Header } from '../../components/global/Header';
import { LoaderCircular } from '../../components/global/LoaderCircular';
import { clientAPI } from '../../store/api/client-facing';
import { IProductWithStat } from '../../store/interface/product.interface';
import { ProductCard } from './ProductCard';

export const Products = () => {
    const { data, isLoading } = clientAPI.useProductsQuery();
    const isNonMobile = useMediaQuery('(min-width: 1000px)');

    return (
        <Box>
            <Header title="PRODUCTS" subtitle="See your list of products" />
            {data || !isLoading ? (
                <Box
                    mt="20px"
                    display="grid"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    justifyContent="space-between"
                    rowGap="20px"
                    columnGap="1.33%"
                    sx={{
                        '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
                    }}
                >
                    {data?.map((product: IProductWithStat) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </Box>
            ) : (
                <LoaderCircular />
            )}
        </Box>
    );
};
