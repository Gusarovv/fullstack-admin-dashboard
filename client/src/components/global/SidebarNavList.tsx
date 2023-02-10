import {
    AdminPanelSettingsOutlined as IconAdminPanel,
    CalendarMonthOutlined as IconCalendar,
    ChevronRightOutlined as IconChevronRight,
    Groups2Outlined as IconGroups,
    HomeOutlined as IconHome,
    PieChartOutlined as IconPieChart,
    PointOfSaleOutlined as IconSale,
    PublicOutlined as IconPublic,
    ReceiptLongOutlined as IconReceipt,
    ShoppingCartOutlined as IconCart,
    TodayOutlined as IconToday,
    TrendingUpOutlined as IconTrending,
} from '@mui/icons-material';
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThemeSettings } from '../../theme';

const navItems = [
    {
        text: 'Dashboard',
        icon: <IconHome />,
    },
    {
        text: 'Client Facing',
        icon: null,
    },
    {
        text: 'Products',
        icon: <IconCart />,
    },
    {
        text: 'Customers',
        icon: <IconGroups />,
    },
    {
        text: 'Transactions',
        icon: <IconReceipt />,
    },
    {
        text: 'Geography',
        icon: <IconPublic />,
    },
    {
        text: 'Sales',
        icon: null,
    },
    {
        text: 'Overview',
        icon: <IconSale />,
    },
    {
        text: 'Daily',
        icon: <IconToday />,
    },
    {
        text: 'Monthly',
        icon: <IconCalendar />,
    },
    {
        text: 'Breakdown',
        icon: <IconPieChart />,
    },
    {
        text: 'Management',
        icon: null,
    },
    {
        text: 'Admin',
        icon: <IconAdminPanel />,
    },
    {
        text: 'Performance',
        icon: <IconTrending />,
    },
];

export const SidebarNavList = () => {
    const theme = useTheme<ThemeSettings>();
    const { pathname } = useLocation();
    const [active, setActive] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <List>
            {navItems.map(({ text, icon }) => {
                if (!icon) {
                    return (
                        <Typography key={text} sx={{ m: '2.25rem 0 1rem 3rem' }}>
                            {text}
                        </Typography>
                    );
                }
                const lcText = text.toLowerCase();

                return (
                    <ListItem key={text} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                navigate(`/${lcText}`);
                                setActive(lcText);
                            }}
                            sx={{
                                backgroundColor:
                                    active === lcText ? theme.palette.secondary[300] : 'transparent',
                                color:
                                    active === lcText
                                        ? theme.palette.primary[600]
                                        : theme.palette.secondary[100],
                                ':hover': {
                                    backgroundColor:
                                        active === lcText ? theme.palette.secondary[500] : 'transparent',
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    ml: '2rem',
                                    color:
                                        active === lcText
                                            ? theme.palette.primary[600]
                                            : theme.palette.secondary[200],
                                }}
                            >
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                            {active === lcText && <IconChevronRight sx={{ ml: 'auto' }} />}
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
};
