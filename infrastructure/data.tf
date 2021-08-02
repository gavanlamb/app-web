data "aws_cognito_user_pools" "expensely" {
  name = var.cognito_user_pool_name
}
