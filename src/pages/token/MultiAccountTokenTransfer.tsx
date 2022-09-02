import Page from "src/components/Page";
import { Container } from '@mui/material';
import useSettings from "src/hooks/useSettings";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "src/routes/paths";
import MultiAccountTokenTransferList from "./sections/multiAccountTokenTransfer";

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