import * as fs from 'fs';

const peerAddresses = process.env.PEER_ADDRESSES.split(' ');
export const networkProfile = {
  name: `mynetwork-${process.env.ORG_NAME?.toLowerCase()}`,
  'x-type': 'hlfv1',
  description: '',
  version: '1.0',
  organizations: {
    [process.env.ORG_NAME || '']: {
      mspid: `${process.env.ORG_NAME}`,
      peers: (function() {
        const arr = [];
        for (let i = 0; i < peerAddresses.length; i += 1) {
          arr.push(peerAddresses[i]);
        }
        return arr;
      })(),
      certificateAuthorities: [`${process.env.CA_ADDRESS}`],
    },
  },
  orderers: {
    [process.env.ORDERER_ADDRESS || '']: {
      url: `grpcs://${process.env.ORDERER_ADDRESS}:7050`,
      grpcOptions: {
        'ssl-target-name-override': `${process.env.ORDERER_ADDRESS}`,
      },
      tlsCACerts: {
        pem: fs
          .readFileSync(process.env.ORDERER_TLS_CA_CERT_FILE || '')
          .toString(),
      },
    },
  },
  peers: (function() {
    const obj = {};
    for (let i = 0; i < peerAddresses.length; i += 1) {
      const peerAddress = peerAddresses[i];
      obj[peerAddress] = {
        url: `grpcs://${peerAddress}:7051`,
        grpcOptions: {
          'ssl-target-name-override': `${peerAddress}`,
        },
        tlsCACerts: {
          pem: fs
            .readFileSync(process.env.PEER_TLS_CA_CERT_FILE || '')
            .toString(),
        },
      };
    }
    return obj;
  })(),
  certificateAuthorities: {
    [process.env.CA_ADDRESS || '']: {
      url: `https://${process.env.CA_ADDRESS}:7054`,
      httpOptions: {
        verify: false,
      },
      registrar: [
        {
          enrollId: `${process.env.CA_ID}`,
          enrollSecret: `${process.env.CA_SECRET}`,
        },
      ],
      caName: `${process.env.CA_ADDRESS}`,
      tlsCACerts: fs
        .readFileSync(process.env.PEER_TLS_CA_CERT_FILE || '')
        .toString(),
    },
  },
};
