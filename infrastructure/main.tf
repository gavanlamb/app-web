//Website
module "website" {
  source = "chgangaraju/cloudfront-s3-website/aws"
  version = "1.2.2"
  hosted_zone = var.domain_name
  domain_name = var.domain_name
  acm_certificate_domain = var.domain_name
  upload_sample_file = true
}
