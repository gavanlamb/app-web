terraform {
  required_version = ">=1.0.2"
  backend "s3" {
    key = "terraform.tfstate"
    encrypt = true
  }
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "3.50.0"
    }
  }
}
