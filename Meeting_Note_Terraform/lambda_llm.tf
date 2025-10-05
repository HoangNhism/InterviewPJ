provider "aws" {
  region = "ap-southeast-1"
}

resource "aws_iam_role" "lambda_role" {
  name = "lambda_llm_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Principal = {
          Service = "lambda.amazonaws.com"
        },
        Effect = "Allow",
        Sid    = ""
      }
    ]
  })
}

resource "aws_iam_role_policy" "lambda_policy" {
  name = "lambda_llm_policy"
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Resource = "*"
      },
      {
        Effect = "Allow",
        Action = [
          "bedrock:InvokeModel",
          "bedrock:InvokeModelWithResponseStream"
        ],
        Resource = "*"
      },
      {
        Effect = "Allow",
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "dynamodb:PutItem",
          "dynamodb:GetItem"
        ],
        Resource = "*"
      }
    ]
  })
}

resource "aws_lambda_function" "llm_handler" {
  function_name = "meeting-note-llm-handler"
  filename         = "lambda_llm.zip"
  handler          = "index.handler"
  runtime          = "nodejs20.x"
  role             = aws_iam_role.lambda_role.arn
  timeout          = 30

  environment {
    variables = {
      MODEL_ID = "gpt-oss-120b-high"
      REGION   = "ap-southeast-1"
    }
  }
}

output "lambda_function_name" {
  value = aws_lambda_function.llm_handler.function_name
}

output "lambda_role_arn" {
  value = aws_iam_role.lambda_role.arn
}
