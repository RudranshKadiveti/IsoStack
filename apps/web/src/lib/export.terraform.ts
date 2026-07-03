import type { ArchGraph, ArchNode } from './types';

function mapServiceToTerraform(node: ArchNode): string {
  const t = node.serviceType;
  const name = node.id;
  
  if (['postgresql', 'mysql', 'mariadb'].includes(t)) {
    return `
resource "aws_db_instance" "${name}" {
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "${t}"
  engine_version       = "13.4"
  instance_class       = "db.t3.micro"
  name                 = "${name}_db"
  username             = "admin"
  password             = "secure_password"
  skip_final_snapshot  = true
}`;
  }
  if (['redis', 'memcached'].includes(t)) {
    return `
resource "aws_elasticache_cluster" "${name}" {
  cluster_id           = "${name}-cluster"
  engine               = "${t}"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  port                 = 6379
}`;
  }
  if (['mongodb', 'dynamodb', 'cassandra'].includes(t)) {
    return `
resource "aws_dynamodb_table" "${name}" {
  name           = "${name}_table"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"
  attribute {
    name = "id"
    type = "S"
  }
}`;
  }
  if (['aws_lambda', 'gcp_functions', 'azure_functions'].includes(t)) {
    return `
resource "aws_lambda_function" "${name}" {
  function_name = "${name}_function"
  role          = aws_iam_role.lambda_exec.arn
  handler       = "index.handler"
  runtime       = "nodejs18.x"
}`;
  }
  if (['s3', 'gcs', 'minio'].includes(t)) {
    return `
resource "aws_s3_bucket" "${name}" {
  bucket = "${name}-bucket"
}`;
  }
  if (['api_gateway', 'kong', 'traefik'].includes(t)) {
    return `
resource "aws_apigatewayv2_api" "${name}" {
  name          = "${name}_api"
  protocol_type = "HTTP"
}`;
  }
  if (['kafka', 'sqs', 'rabbitmq'].includes(t)) {
    return `
resource "aws_sqs_queue" "${name}" {
  name = "${name}-queue"
}`;
  }
  
  // Generic compute for FastAPI, Django, Express, etc.
  if (node.layer === 'compute') {
    return `
resource "aws_ecs_service" "${name}" {
  name            = "${name}_service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.${name}_task.arn
  desired_count   = 1
}`;
  }
  
  // Fallback generic resource
  return `
# Generic mock block for ${t}
resource "mock_resource_${t}" "${name}" {
  name = "${name}"
}`;
}

export function generateTerraform(graph: ArchGraph | null): string {
  if (!graph || (graph.nodes?.length || 0) === 0) return '';
  
  let tf = `# Generated Terraform for ${graph.project_name}\n`;
  tf += `# Description: ${graph.description}\n\n`;
  
  tf += `provider "aws" {\n  region = "us-east-1"\n}\n\n`;
  
  (graph.nodes || []).forEach(node => {
    tf += mapServiceToTerraform(node) + '\n';
  });
  
  return tf;
}
