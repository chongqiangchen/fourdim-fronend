import { Container } from '@mui/material';
import SingleTokenMultiTransferList from "./sections/singleTokenMultiTransfer";
import { PATH_DASHBOARD } from "@/routes/paths";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import useSettings from "@/hooks/useSettings";
import Page from "@/components/Page";

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