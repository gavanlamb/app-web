// material
import { Link } from '@material-ui/core';
import { termsOfServiceUrl } from '../../config';

export default function TermsOfServiceLink() {
  console.log(termsOfServiceUrl);
  return (
    <Link underline="always" color="text.primary" target="_blank" href={termsOfServiceUrl}>
      Terms of Service
    </Link>
  );
}
