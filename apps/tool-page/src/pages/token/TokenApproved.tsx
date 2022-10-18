import { Container } from '@mui/material';
import Page from "@/components/Page";
import { PATH_DASHBOARD } from "@/routes/paths";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import useSettings from "@/hooks/useSettings";

const TokenApproved = () => {
    const { themeStretch } = useSettings();
    
    return (
        <Page title="货币授权分析">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="货币授权分析"
                    links={[
                        { name: '操作区', href: PATH_DASHBOARD.root },
                        { name: '货币', href: PATH_DASHBOARD.token.singleTokenMultiTransfer },
                        { name: '批量操作' },
                    ]}
                />

            </Container>
        </Page>
    );
}

export default TokenApproved;