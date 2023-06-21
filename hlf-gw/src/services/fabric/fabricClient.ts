import {
  Contract,
  Gateway,
  GatewayOptions,
  Wallets,
  X509Identity,
} from 'fabric-network';
import { UserWalletIdentity } from './hlfWalletService';

import { networkProfile } from '../constant';

interface FabricNetworkObjects {
  gateway: Gateway;
  contract: Contract;
}

export async function getFabricContract(
  ident: UserWalletIdentity,
  channelName: string,
  chaincodeName: string
): Promise<FabricNetworkObjects> {
  const identity: X509Identity = {
    credentials: {
      certificate: ident.certificate,
      privateKey: ident.privateKey,
    },
    mspId: ident.mspID,
    type: 'X.509',
  };
  const userName = 'client';
  const wallet = await Wallets.newFileSystemWallet(
    process.env.WALLET_LOCATION || '/tmp/wallet'
  );

  await wallet.put(userName, identity);

  const connectOpt: GatewayOptions = {
    identity: userName,
    wallet,
    discovery: {
      enabled: true,
      asLocalhost: false,
    },
    queryHandlerOptions: {
      timeout: 600,
    },
    eventHandlerOptions: {
      endorseTimeout: 600,
      commitTimeout: 600,
    },
  };

  const gateway = new Gateway();

  await gateway.connect(networkProfile, connectOpt);

  const network = await gateway.getNetwork(channelName);
  const contract = await network.getContract(chaincodeName);

  return { gateway, contract };
}
