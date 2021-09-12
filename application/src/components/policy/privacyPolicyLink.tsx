// material
import { Link } from '@material-ui/core';
import { privacyPolicyUrl } from '../../config';

export default function PrivacyPolicyLink() {
  return (
    <Link underline="always" color="text.primary" target="_blank" href={privacyPolicyUrl}>
      Privacy Policy
    </Link>
  );
}
