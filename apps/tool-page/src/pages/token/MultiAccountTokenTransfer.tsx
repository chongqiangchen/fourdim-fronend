import { Container } from '@mui/material';
import MultiAccountTokenTransferList from "./sections/multiAccountTokenTransfer";
import useSettings from "@/hooks/useSettings";
import Page from "@/components/Page";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "@/routes/paths";

const MultiAccountSingleTokenTransfer = () => {
    const { themeStretch } = useSettings();
    
    return (
        <Page title="多号货币归集">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="多号货币归集"
                    links={[
                        { name: '操作区', href: PATH_DASHBOARD.root },
                        { name: '货币', href: PATH_DASHBOARD.token.multiAccountTokenTransfer },
                        { name: '归集' },
                    ]}
                />

                <MultiAccountTokenTransferList />
            </Container>
        </Page>
    );
}

export default MultiAccountSingleTokenTransfer;