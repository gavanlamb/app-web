variable "environment" {
  type = string
}
variable "region" {
  type = string
}

variable "domain_name" {
  type = string
}

variable "cognito_user_pool_name" {
  type = string
}
variable "cognito_client_name" {
  type = string
}

variable "time_service_url" {
  type = string
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
