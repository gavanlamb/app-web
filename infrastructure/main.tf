// Website
resource "aws_route53_record" "app" {
  depends_on = [
    aws_cloudfront_distribution.app
  ]

  zone_id = data.aws_route53_zone.domain_name.zone_id
  name = var.domain_name
  type = "A"

  alias {
    name = aws_cloudfront_distribution.app.domain_name
    zone_id = "Z2FDTNDATAQYW2"

    evaluate_target_health = false
  }
}

resource "aws_cloudfront_distribution" "app" {
  origin {
    domain_name = aws_s3_bucket.app.bucket_regional_domain_name
    origin_id = "s3-cloudfront"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.app.cloudfront_access_identity_path
    }
  }

  enabled = true
  is_ipv6_enabled = true
  default_root_object = "index.html"

  aliases = [var.domain_name]

  price_class = "PriceClass_All"

  default_cache_behavior {
    allowed_methods = [
      "GET",
      "HEAD",
      "OPTIONS"
    ]

    cached_methods = [
      "GET",
      "HEAD"
    ]

    target_origin_id = "s3-cloudfront"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl = var.ttl
    default_ttl = var.ttl
    max_ttl = var.ttl
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = data.aws_acm_certificate.root.arn
    ssl_support_method = "sni-only"
    minimum_protocol_version = "TLSv1"
  }

  custom_error_response {
    error_code = 403
    response_code = 200
    error_caching_min_ttl = 0
    response_page_path = "/"
  }

  tags = local.default_tags
}

resource "aws_cloudfront_origin_access_identity" "app" {
  comment = "access-identity-${var.domain_name}.s3.amazonaws.com"
}

resource "aws_s3_bucket" "app" {
  bucket = var.domain_name
  acl = "private"
  policy = data.aws_iam_policy_document.app_bucket.json
  tags = local.default_tags
}
resource "aws_s3_bucket_public_access_block" "app" {
  bucket = aws_s3_bucket.app.id
  block_public_acls = true
  block_public_policy = true
  restrict_public_buckets = true
  ignore_public_acls = true
}
data "aws_iam_policy_document" "app_bucket" {
  statement {
    sid = "1"

    actions = [
      "s3:GetObject",
    ]

    resources = [
      "arn:aws:s3:::${var.domain_name}/*",
    ]

    principals {
      type = "AWS"

      identifiers = [
        aws_cloudfront_origin_access_identity.app.iam_arn,
      ]
    }
  }
}

// Cognito
resource "aws_cognito_user_pool_client" "app" {
  name = var.cognito_app_client_name

  user_pool_id = sort(data.aws_cognito_user_pools.expensely.ids)[0]

  access_token_validity = 1
  id_token_validity = 1
  refresh_token_validity = 30
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows = [
    "code"
  ]
  allowed_oauth_scopes = concat(
  [
    "phone",
    "email",
    "openid",
    "profile"
  ],
  var.cognito_allowed_oauth_scopes
  )
  callback_urls = [
    "https://${var.domain_name}",
    "https://${var.domain_name}/dashboard"]
  default_redirect_uri = "https://${var.domain_name}"
  enable_token_revocation = true
  explicit_auth_flows = [
    "ALLOW_USER_SRP_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH"
  ]
  generate_secret = false
  logout_urls = [
    "https://${var.domain_name}/auth/logout"]
  prevent_user_existence_errors = "ENABLED"
  read_attributes = [
    "email",
    "family_name",
    "given_name",
    "phone_number"]
  supported_identity_providers = [
    "COGNITO"]
  write_attributes = [
    "email",
    "family_name",
    "given_name",
    "phone_number"]
}
resource "aws_cognito_user_pool_client" "postman" {
  // TODO only create for preview
  name = var.cognito_postman_client_name

  user_pool_id = sort(data.aws_cognito_user_pools.expensely.ids)[0]

  access_token_validity = 1
  id_token_validity = 1
  refresh_token_validity = 30
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows = [
    "code"
  ]
  allowed_oauth_scopes = concat(
  [
    "phone",
    "email",
    "openid",
    "profile"
  ],
  var.cognito_allowed_oauth_scopes
  )
  callback_urls = [
    "https://localhost"]
  default_redirect_uri = "https://localhost"
  enable_token_revocation = true
  explicit_auth_flows = [
    "ALLOW_USER_SRP_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH"
  ]
  generate_secret = false
  logout_urls = [
    "https://localhost/logout.html"]
  prevent_user_existence_errors = "ENABLED"
  read_attributes = [
    "email",
    "family_name",
    "given_name",
    "phone_number"]
  supported_identity_providers = [
    "COGNITO"]
  write_attributes = [
    "email",
    "family_name",
    "given_name",
    "phone_number"]
}

