//Website
module "website" {
  source = "chgangaraju/cloudfront-s3-website/aws"
  version = "1.2.2"
  hosted_zone = var.domain_name
  domain_name = var.domain_name
  acm_certificate_domain = "*.${var.domain_name}"
  upload_sample_file = true
}

//Cognito
resource "aws_cognito_user_pool_client" "expensely" {
  name = var.cognito_client_name

  user_pool_id = sort(data.aws_cognito_user_pools.expensely.ids)[0]

  access_token_validity = 1
  id_token_validity = 1
  refresh_token_validity = 30
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows = [
    "code"
  ]
  allowed_oauth_scopes = [
    "phone",
    "email",
    "openid",
    "profile",
    "https://${var.time_service_url}/time:create",
    "https://${var.time_service_url}/time:delete",
    "https://${var.time_service_url}/time:read",
    "https://${var.time_service_url}/time:update"
  ]
  callback_urls = [
    "https://${var.domain_name}/index.html"]
  default_redirect_uri = "https://${var.domain_name}/index.html"
  enable_token_revocation = true
  explicit_auth_flows = [
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH"
  ]
  generate_secret = false
  logout_urls = [
    "https://${var.domain_name}/logout.html"]
  prevent_user_existence_errors = "ENABLED"
  read_attributes = [
    "email",
    "family_name",
    "given_name",
    "phone_number"]
  supported_identity_providers = [
    "cognito"]
  write_attributes = [
    "email",
    "family_name",
    "given_name",
    "phone_number"]
}
