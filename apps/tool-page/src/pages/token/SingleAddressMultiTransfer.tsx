import { Container } from '@mui/material';
import SingleAddressMultiTransferList from "./sections/singleAddressMultiTransfer";
import Page from "@/components/Page";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import useSettings from "@/hooks/useSettings";
import { PATH_DASHBOARD } from "@/routes/paths";

const SingleAddressMultiTransfer = () => {
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

                <SingleAddressMultiTransferList />
            </Container>
        </Page>
    );
}

export default SingleAddressMultiTransfer;