# Infrastructure as Code (Terraform)

## Overview
This repository provides Terraform configuration and a small Lambda function for processing meeting notes. The infrastructure is defined so you can deploy a serverless function, the required IAM role, and any supporting resources.

## Architecture summary
- AWS Lambda: Processes meeting notes and performs related tasks.
- IAM role and policy: Grants the Lambda permissions to write logs and access storage or database resources.
- Optional integrations: The function can read from/write to S3 and DynamoDB, and send logs to CloudWatch.

## Files
- `lambda_llm.tf` — Terraform configuration (provider, IAM role/policies, Lambda and related resources).
- `index.js` — Node.js Lambda handler.

## Setup instructions

Prerequisites
- Terraform installed
- AWS CLI installed and configured with credentials that can create IAM, Lambda, and related resources
- Node.js (if you need to install or package npm dependencies for the Lambda)

Configure AWS credentials
```powershell
aws configure
```

Initialize Terraform
```powershell
terraform init
```

Preview changes
```powershell
terraform plan
```

Apply the configuration
```powershell
terraform apply
```

After deploy
- If you update `index.js`, repackage or redeploy the function according to the deployment method defined in `lambda_llm.tf`.

Notes
- Review IAM permissions before applying in a production account.
- Adjust region and resource names in `lambda_llm.tf` to match your environment.

License
- MIT (or change to your preferred license)
