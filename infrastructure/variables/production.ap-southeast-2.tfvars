environment="production"
region="ap-southeast-2"
domain_name="expensely.app"
hosted_zone="expensely.app"
cognito_name="expensely"
ttl=120
cognito_allowed_oauth_scopes=[
  "time.expensely.io/time:create",
  "time.expensely.io/time:update",
  "time.expensely.io/time:delete",
  "time.expensely.io/time:read"
]
cognito_app_client_name="web app"
