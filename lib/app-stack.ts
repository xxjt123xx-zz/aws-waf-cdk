import { IResource, Stack, StackProps, Tags } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as wafv2 from 'aws-cdk-lib/aws-wafv2';

export interface AppProps extends cdk.StackProps {
  readonly appName: string;
  readonly account: string;
}

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props?: AppProps) {
    super(scope, id, props);

    const scp: string = 'REGIONAL';
    const ipver: string = 'IPV4';

    this.appName = props?.appName || '';

    // Setup WebACL
    let assetName = `${this.appName}-webACL`;
    const cfnWebACL = new wafv2.CfnWebACL(this, `${assetName}-fn`, {
      name: this.appName,
      scope: scp,
      defaultAction: {
        allow: {},
      },
      visibilityConfig: {
        cloudWatchMetricsEnabled: false,
        metricName: assetName,
        sampledRequestsEnabled: false,
      },
    });

    // Setup IP Set
    assetName = `${this.appName}-ip-set`;
    const cfnIPSet = new wafv2.CfnIPSet(this, assetName, {
      name: this.appName,
      scope: scp,
      ipAddressVersion: ipver,
      addresses: ['192.0.2.44/32'],
    });

    // Setup Rule Groups
    assetName = `${this.appName}-rule-group`;
    const cfnRuleGroup = new wafv2.CfnRuleGroup(this, assetName, {
      name: this.appName,
      scope: scp,
      capacity: 100,
      visibilityConfig: {
        cloudWatchMetricsEnabled: false,
        metricName: assetName,
        sampledRequestsEnabled: false,
      },
      rules: [
        {
          name: `${this.appName}-rule-1`, // TODO : Make dynamic
          priority: 0,
          visibilityConfig: {
            cloudWatchMetricsEnabled: false,
            metricName: 'metricName',
            sampledRequestsEnabled: false,
          },
          action: {
            block: {},
          },
          statement: {
            ipSetReferenceStatement: {
              arn: cfnIPSet.attrArn,
            },
          },
        },
      ],
    });
  }
  private appName: string;

  private addAppTag(resource: IResource) {
    Tags.of(resource).add('AppName', this.appName);
  }
}
