import {
    GridColDef,
    GridColumnMenuContainer,
    GridFilterMenuItem,
    HideGridColMenuItem,
} from '@mui/x-data-grid';

type PropsCustomColumnMenu = {
    hideMenu: (event: React.SyntheticEvent) => void;
    currentColumn: GridColDef;
    open: boolean;
};

export const CustomColumnMenu = (props: PropsCustomColumnMenu) => {
    const { hideMenu, currentColumn, open } = props;

    return (
        <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} open={open}>
            <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
            <HideGridColMenuItem onClick={hideMenu} column={currentColumn} />
        </GridColumnMenuContainer>
    );
};
