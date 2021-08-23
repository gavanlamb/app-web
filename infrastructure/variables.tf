variable "environment" {
  type = string
}
variable "region" {
  type = string
}

variable "domain_name" {
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
