const initialConfig = {
  cittaAgent: {
    affinity: {
      affinityType: "capabilitySubset"
    },
    dataBucket: {
      bucketName: "alpha.tenant.data",
      rootPath: "qinstance1-tenant1",
      s3IAMRole: "citta_emr_serverless_role"
    }
  },
  cittaAgentSet: {
    default: {
      cittaAgent: {
        affinity: {
          label: "default"
        },
        swlhType: "AWS_EMR_SERVERLESS_BACKED"
      }
    },
    default_new: {
      cittaAgent: {
        affinity: {
          label: "default_new"
        },
        swlhType: "AWS_EMR_SERVERLESS_BACKED"
      }
    }
  }
};

module.exports = initialConfig;
