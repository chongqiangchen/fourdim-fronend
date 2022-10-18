import { Container } from '@mui/material';
import NftMultiTransferList from "./sections/nftMultiTransfer";
import useSettings from "@/hooks/useSettings";
import Page from "@/components/Page";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "@/routes/paths";

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