#!/bin/bash

echo "=== Verifying IAM Permissions for Pulumi Deployment ==="

# Check EC2 permissions
echo -n "Checking EC2 permissions... "
if aws ec2 describe-instances &>/dev/null; then
    echo "✅"
else
    echo "❌"
fi

# Check VPC permissions
echo -n "Checking VPC permissions... "
if aws ec2 describe-vpcs &>/dev/null; then
    echo "✅"
else
    echo "❌"
fi

# Check Secrets Manager permissions
echo -n "Checking Secrets Manager permissions... "
if aws secretsmanager list-secrets &>/dev/null; then
    echo "✅"
else
    echo "❌"
fi

# Check IAM permissions
echo -n "Checking IAM permissions... "
if aws iam get-user &>/dev/null; then
    echo "✅"
else
    echo "❌"
fi

# Check if we can describe regions (basic connectivity test)
echo -n "Checking basic AWS connectivity... "
if aws ec2 describe-regions &>/dev/null; then
    echo "✅"
else
    echo "❌"
fi