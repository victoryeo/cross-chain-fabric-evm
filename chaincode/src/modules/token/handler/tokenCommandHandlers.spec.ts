import { ChaincodeMockStub } from '@theledger/fabric-mock-stub';
import { expect } from 'chai';
import 'mocha';
import TokenChaincode from '../../../chaincode';

import validImportToken_CmdFixture from '../../../test/fixtures/token/valid_cmd.json';

const chaincode = new TokenChaincode();

describe('Test Token', () => {
  it('Should initailize', async () => {
    const mockStub = new ChaincodeMockStub('MyMockStub', chaincode);
    const response = await mockStub.mockInit('tx1', []);
    expect(response.status).to.equal(200);
  });

  it('Should be able to import token', async () => {
    const mockStub = new ChaincodeMockStub('MyMockStub', chaincode);
    await mockStub.mockInit('tx1', []);
    const txID = 'TX0002';
    mockStub.mockTransactionStart(txID);
    //import company first
    const responseComp = await mockStub.mockInvoke(txID, [
      validImportToken_CmdFixture.name,
      JSON.stringify(validImportToken_CmdFixture.payload),
    ]);
    expect(responseComp.status).to.equal(200);
  });
});