import Page from "src/components/Page";
import { Container } from '@mui/material';
import useSettings from "src/hooks/useSettings";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "src/routes/paths";
import SingleTokenMultiTransferList from "./sections/singleTokenMultiTransfer";

const SingleTokenMultiTransfer = () => {
    const { themeStretch } = useSettings();
    
    return (
        <Page title="批量转发货币">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="批量转发货币"
                    links={[
                        { name: '操作区', href: PATH_DASHBOARD.root },
                        { name: '货币', href: PATH_DASHBOARD.token.singleTokenMultiTransfer },
                        { name: '批量操作' },
                    ]}
                />

                <SingleTokenMultiTransferList />
            </Container>
        </Page>
    );
}

export default SingleTokenMultiTransfer;