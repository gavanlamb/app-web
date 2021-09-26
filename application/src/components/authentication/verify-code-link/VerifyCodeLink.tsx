import { Props } from "../verify-code/types";
import { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import useAuth from "../../../hooks/useAuth";


export default function VerifyCodeLink(props: Props) {
    const { confirmRegistration } = useAuth();
    const [sending, setSending] = useState(true);

    useEffect(() => {
        try{
            await confirmRegistration(props.sub, props.code);
            setSending(false);
        } catch (error){
            setSending(false);
        }
    }, [setSending, confirmRegistration, props])

    return (
        {sending ? (
            <Box sx={{ textAlign: 'center' }}>
                <p>sending</p>
            </Box>
        ) : (
            <Box sx={{ textAlign: 'center' }}>
                <p>Sent</p>
            </Box>
        )}
    );
}
