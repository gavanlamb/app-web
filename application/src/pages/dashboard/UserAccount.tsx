import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useState, useEffect } from 'react';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
// material
import { Container, Tab, Box, Tabs, Typography } from '@material-ui/core';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
import {
  getCards,
  getProfile,
  getInvoices,
  getAddressBook,
  getNotifications
} from '../../redux/slices/user';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import { AccountGeneral } from '../../components/_dashboard/user/account';

// ----------------------------------------------------------------------

export default function UserAccount() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { cards, myProfile, notifications } = useSelector((state: RootState) => state.user);

  const [currentTab, setCurrentTab] = useState('profile');

  useEffect(() => {
    dispatch(getCards());
    dispatch(getAddressBook());
    dispatch(getInvoices());
    dispatch(getNotifications());
    dispatch(getProfile());
  }, [dispatch]);

  if (!myProfile) {
    return null;
  }

  if (!cards) {
    return null;
  }

  if (!notifications) {
    return null;
  }

  const ACCOUNT_TABS = [
    {
      value: 'profile',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <AccountGeneral />
    }
  ];

  return (
    <Page title="User: Account Settings | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Typography variant="h4" gutterBottom>
          Account
        </Typography>

        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => setCurrentTab(value)}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={capitalCase(tab.value)}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
