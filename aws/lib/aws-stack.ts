import * as cdk from 'aws-cdk-lib';
import * as eks from 'aws-cdk-lib/aws-eks';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';

export class AwsStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		new eks.Cluster(this, 'nttdata-cluster', {
			version: eks.KubernetesVersion.V1_22,
		});

		new ecr.Repository(this, 'nttdata-repository', {
			repositoryName: 'nttdata-repository',
		});
	}
}
