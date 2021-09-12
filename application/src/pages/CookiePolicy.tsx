import { styled } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia } from '@material-ui/core';
import Page from '../components/Page';

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11)
  }
}));

export default function CookiePolicy() {
  return (
    <RootStyle
      title="Cookie policy | Expensely"
      style={{ height: '100%', backgroundColor: 'white' }}
    >
      <Card
        style={{
          display: 'block',
          height: '100%',
          backgroundColor: 'white'
        }}
      >
        <CardHeader title="Policy name" />
        <CardMedia
          component="iframe"
          height="100%"
          style={{}}
          src="https://app.termly.io/document/cookie-policy/7c28cf4e-04a2-4eb4-9859-dfb50b7a9bf6"
        />
      </Card>
    </RootStyle>
  );
}
