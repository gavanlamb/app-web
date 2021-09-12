import { styled } from '@material-ui/core/styles';
import Page from '../components/Page';

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11)
  }
}));

export default function TermsOfService() {
  return (
    <RootStyle title="Terms of service | Expensely">
      <div
        data-name="termly-embed"
        data-id="96d0bb28-c979-4a3c-b549-2ca653b7cb3a"
        data-type="iframe"
      />
      <script type="text/javascript">
        {`
          (function(d, s, id) {
            var js, tjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(data-id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://app.termly.io/embed-policy.min.js";
            tjs.parentNode.insertBefore(js, tjs);
          }(document, 'script', 'termly-jssdk'));
        `}
      </script>
    </RootStyle>
  );
}
