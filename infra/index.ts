import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';

const config = new pulumi.Config();
const domain = config.require('domain');
const subdomain = `auth.${domain}`;

// Create a new Route 53 hosted zone for the GoDaddy domain
const hostedZone = new aws.route53.Zone('godaddy-hosted-zone', {
  name: domain,
});

const ec2Role = new aws.iam.Role('keycloak-ec2-role', {
  assumeRolePolicy: JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: {
          Service: 'ec2.amazonaws.com',
        },
        Action: 'sts:AssumeRole',
      },
    ],
  }),
});

const instanceProfile = new aws.iam.InstanceProfile(
  'keycloak-instance-profile',
  {
    role: ec2Role.name,
  },
);

const vpc = new aws.ec2.Vpc('keycloak-vpc', {
  cidrBlock: '10.0.0.0/16',
  enableDnsHostnames: true,
  enableDnsSupport: true,
  tags: {
    Name: 'keycloak-vpc',
    Environment: 'production',
  },
});

const publicSubnet = new aws.ec2.Subnet('keycloak-public-subnet', {
  vpcId: vpc.id,
  cidrBlock: '10.0.1.0/24',
  availabilityZone: 'ap-southeast-3a',
  mapPublicIpOnLaunch: true,
  tags: {
    Name: 'keycloak-public-subnet',
    Environment: 'production',
  },
});

const internetGateway = new aws.ec2.InternetGateway('keycloak-igw', {
  vpcId: vpc.id,
  tags: {
    Name: 'keycloak-igw',
    Environment: 'production',
  },
});

const routeTable = new aws.ec2.RouteTable('keycloak-rt', {
  vpcId: vpc.id,
  routes: [
    {
      cidrBlock: '0.0.0.0/0',
      gatewayId: internetGateway.id,
    },
  ],
  tags: {
    Name: 'keycloak-rt',
    Environment: 'production',
  },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routeTableAssociation = new aws.ec2.RouteTableAssociation(
  'keycloak-rta',
  {
    subnetId: publicSubnet.id,
    routeTableId: routeTable.id,
  },
);

const securityGroup = new aws.ec2.SecurityGroup('keycloak-sg', {
  description: 'Allow HTTP, HTTPS, and SSH traffic',
  vpcId: vpc.id,
  ingress: [
    {
      protocol: 'tcp',
      fromPort: 22,
      toPort: 22,
      cidrBlocks: ['0.0.0.0/0'],
    },
    {
      protocol: 'tcp',
      fromPort: 80,
      toPort: 80,
      cidrBlocks: ['0.0.0.0/0'],
    },
    {
      protocol: 'tcp',
      fromPort: 443,
      toPort: 443,
      cidrBlocks: ['0.0.0.0/0'],
    },
    {
      protocol: 'tcp',
      fromPort: 8080,
      toPort: 8080,
      cidrBlocks: ['0.0.0.0/0'],
    },
  ],
  egress: [
    {
      fromPort: 0,
      toPort: 0,
      protocol: '-1',
      cidrBlocks: ['0.0.0.0/0'],
    },
  ],
  tags: {
    Name: 'keycloak-sg',
    Environment: 'production',
  },
});

const userData = `#!/bin/bash
  # Install required packages
  apt-get update
  apt-get install -y docker.io nginx certbot python3-certbot-nginx

  # Start Docker service
  systemctl start docker
  systemctl enable docker

  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs

  # Get admin credentials from Secrets Manager
  REGION=$(curl -s http://169.254.169.254/latest/meta-data/placement/region)
  ADMIN_USERNAME=Admin-NICE
  ADMIN_PASSWORD=fxP47arneUAxEml86UrfNnfG/nh4rfzUzQ5reOBDZZY=

  # Run Keycloak container with production configuration
  docker run -d \
      --name keycloak \
      -p 8080:8080 \
      -e KEYCLOAK_ADMIN="$ADMIN_USERNAME" \
      -e KEYCLOAK_ADMIN_PASSWORD="$ADMIN_PASSWORD" \
      -e KC_PROXY=edge \
      -e KC_HTTP_ENABLED=true \
      -e KC_HOSTNAME_STRICT=false \
      -e KC_HOSTNAME_STRICT_HTTPS=false \
      quay.io/keycloak/keycloak:latest \
      start
`;

const ami = aws.ec2.getAmi({
  mostRecent: true,
  filters: [
    {
      name: 'name',
      values: ['ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*'],
    },
    {
      name: 'virtualization-type',
      values: ['hvm'],
    },
  ],
  owners: ['099720109477'],
});

const instance = new aws.ec2.Instance('keycloak-instance', {
  instanceType: 't3.micro',
  ami: ami.then((ami) => ami.id),
  subnetId: publicSubnet.id,
  vpcSecurityGroupIds: [securityGroup.id],
  iamInstanceProfile: instanceProfile.name,
  userData: userData,
  rootBlockDevice: {
    volumeSize: 20,
    volumeType: 'gp3',
    deleteOnTermination: true,
  },
  tags: {
    Name: 'keycloak-instance',
    Environment: 'production',
  },
  availabilityZone: 'ap-southeast-3a',
  keyName: 'NC',
  associatePublicIpAddress: true,
});

// Create an Elastic IP
const eip = new aws.ec2.Eip('keycloak-eip', {
  instance: instance.id,
  vpc: true,
});

// Export the necessary information
export const instanceId = instance.id;
export const publicIp = eip.publicIp;
export const keycloakUrl = pulumi.interpolate`https://${subdomain}`;
export const nameServers = hostedZone.nameServers;
