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



variable "tags" {
  type        = map(string)
  default     = {}
  description = "tags for all the resources, if any"
}

variable "acm_certificate_domain" {
  default     = null
  description = "Domain of the ACM certificate"
}

variable "price_class" {
  default     = "PriceClass_100" // Only US,Canada,Europe
  description = "CloudFront distribution price class"
}

variable "use_default_domain" {
  default     = false
  description = "Use CloudFront website address without Route53 and ACM certificate"
}

variable "upload_sample_file" {
  default     = false
  description = "Upload sample html file to s3 bucket"
}
