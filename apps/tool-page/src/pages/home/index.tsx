import { useEffect } from "react";
// @mui
import { Container } from "@mui/material";
import useSettings from "../../hooks/useSettings";
import Page from "../../components/Page";
import { useAccount } from "wagmi";
import useRefreshAccountRequest from "@/pages/home/hooks/useRefreshAccountRequest";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import UserTokenList from "@/pages/home/sections/UserTokenList";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function UserList() {
  const { themeStretch } = useSettings();
  const { address } = useAccount();

  const refreshTokenList = useRefreshAccountRequest();

  useEffect(() => {
    if (address) {
      refreshTokenList(address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <Page title="User: List">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="账户货币数据"
          links={[
            { name: "货币数据" }
          ]}
        />

        <UserTokenList />
      </Container>
    </Page>
  );
}