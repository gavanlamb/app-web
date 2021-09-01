variable "environment" {
  type = string
}
variable "region" {
  type = string
}

variable "cognito_name" {
  type = string
}
variable "cognito_app_client_name" {
  type = string
}
variable "cognito_postman_client_name" {
  type = string
}
variable "cognito_allowed_oauth_scopes" {
  type = list(string)
}
variable "domain_name" {
  type = string
  description = "domain name (or application name if no domain name available)"
}
variable "hosted_zone" {
  type = string
  description = "Route53 hosted zone"
}
variable "ttl" {
  type = number
  description = "Cloudfront ttl"
}

###################################################
# LOCALS
###################################################
locals {
  default_tags = {
    Application = "Expensely"
    Team = "Web App"
    ManagedBy = "Terraform"
    Environment = var.environment
  }
}




