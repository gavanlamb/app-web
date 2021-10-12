import { useLocation } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
import Page from '../../components/Page';
import {VerifyAttributeLink} from "../../components/authentication/verify-attribute";

const RootStyle = styled(Page)(({ theme }) => ({
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    padding: theme.spacing(12, 0)
}));

export default function VerifyAttribute() {
    const searchParameters = new URLSearchParams(useLocation().search);
    const code = searchParameters.has('code') ? searchParameters.get('code') : undefined;
    const userId = searchParameters.has('user-id') ? searchParameters.get('user-id') : undefined;

    return (
        <RootStyle title="Verify Attribute | Expensely">
            <LogoOnlyLayout />
            <Container>
                {code && userId ? (
                    <VerifyAttributeLink userId={userId} code={code} type="email" />
                ) : (
                    <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
                        <Typography variant="h3" paragraph>
                            Oops, something has gone wrong!
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                            We're not able to verify your email right now.
                        </Typography>
                    </Box>
                )}
            </Container>
        </RootStyle>
    );
}
