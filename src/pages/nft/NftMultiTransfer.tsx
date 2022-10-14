import Page from "src/components/Page";
import { Container } from '@mui/material';
import useSettings from "src/hooks/useSettings";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "src/routes/paths";
import NftMultiTransferList from "./sections/nftMultiTransfer";

const NftMultiTransfer = () => {
    const { themeStretch } = useSettings();
    
    return (
        <Page title="NFT批量转移">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="NFT批量转移"
                    links={[
                        { name: '操作区', href: PATH_DASHBOARD.root },
                        { name: 'NFT', href: PATH_DASHBOARD.token.singleTokenMultiTransfer },
                        { name: '批量操作' },
                    ]}
                />

                <NftMultiTransferList />
            </Container>
        </Page>
    );
}

export default NftMultiTransfer;