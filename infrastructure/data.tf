data "aws_cognito_user_pools" "expensely" {
  name = var.cognito_name
}

data "aws_acm_certificate" "root" {
  provider = aws.us-east-1

  domain = var.hosted_zone
  statuses = ["ISSUED"]
}

data "aws_route53_zone" "domain_name" {
  name = var.hosted_zone
  private_zone = false
}
