import { Contract } from 'fabric-network';
import { getFabricContract } from './fabricClient';
import { UserWalletIdentity } from './hlfWalletService';

const fs = require('fs');

/**
 * @export
 * @interface IWalletService
 */
export interface ICCService {
  submitTransaction(
    func: string,
    payload: any,
    channelName: string,
    chaincodeName: string
  ): Promise<string | undefined>;

  listenEvent(
    channelName: string,
    chaincodeName: string
  ): Promise<any>;

  evaluateTransaction(
    func: string,
    payload: any,
    channelName: string,
    chaincodeName: string
  ): Promise<string>;
}

/**
 * @export
 * @implements {ICCService}
 */
const CCService: ICCService = {
  async submitTransaction(
    func: string,
    payload: any = {},
    channelName: string,
    chaincodeName: string
  ): Promise<string | undefined> {
    const identity: UserWalletIdentity = {
      certificate: fs
        .readFileSync(process.env.PEER_CERTIFICATE_FILE || '')
        .toString(),
      privateKey: fs
        .readFileSync(process.env.PEER_PRIVATE_KEY_FILE || '')
        .toString(),
      mspID: process.env.ORG_NAME || '',
    };

    const { gateway, contract } = await getFabricContract(
      identity,
      channelName,
      chaincodeName
    );

    console.debug(
      JSON.stringify({
        func,
        // payload,
        mode: 'submit',
        invoker: identity.certificate,
      })
    );

    for (let retry = 8; retry > 0; retry -= 1) {
      try {
        const result = await contract.submitTransaction(
          func,
          JSON.stringify(payload)
        );
        console.debug(
          JSON.stringify({
            result: result.toString('utf-8'),
          })
        );
        gateway.disconnect();

        return result.toString('utf-8');
      } catch (error) {
        if (
          error.message != null &&
          (error.message as string).includes('MVCC_READ_CONFLICT')
        ) {
          // Retry
          await new Promise(resolve =>
            setTimeout(resolve, Math.random() * 800)
          );
        } else {
          console.debug('Failed:', JSON.stringify(error));
          gateway.disconnect();

          throw error;
        }
      }
    }

    gateway.disconnect();

    return undefined;
  },

  async listenEvent(
    channelName: string,
    chaincodeName: string
  ): Promise<any> {
    const identity: UserWalletIdentity = {
      certificate: fs
        .readFileSync(process.env.PEER_CERTIFICATE_FILE || '')
        .toString(),
      privateKey: fs
        .readFileSync(process.env.PEER_PRIVATE_KEY_FILE || '')
        .toString(),
      mspID: process.env.ORG_NAME || '',
    };

    const { gateway, contract } = await getFabricContract(
      identity,
      channelName,
      chaincodeName
    );

    // listen to chaincode event
    contract.addContractListener(async (event) => {
      console.log(event.eventName, event.payload.toString("utf-8"));
    });

  },

  async evaluateTransaction(
    func: string,
    payload: any = {},
    channelName: string,
    chaincodeName: string
  ): Promise<string> {
    const identity: UserWalletIdentity = {
      certificate: fs
        .readFileSync(process.env.PEER_CERTIFICATE_FILE || '')
        .toString(),
      privateKey: fs
        .readFileSync(process.env.PEER_PRIVATE_KEY_FILE || '')
        .toString(),
      mspID: process.env.ORG_NAME || '',
    };

    const { gateway, contract } = await getFabricContract(
      identity,
      channelName,
      chaincodeName
    );

    console.debug(
      JSON.stringify({
        func,
        payload,
        mode: 'query',
        invoker: identity.certificate,
      })
    );

    try {
      const result = await contract.evaluateTransaction(
        func,
        JSON.stringify(payload)
      );

      gateway.disconnect();

      return result.toString('utf-8');
    } catch (error) {
      console.debug(
        JSON.stringify({
          error,
        })
      );
      gateway.disconnect();

      throw error;
    }
  },
};

export default CCService;
