import { ChaincodeMockStub } from '@theledger/fabric-mock-stub';
import { expect } from 'chai';
import 'mocha';
import TokenChaincode from '../../../chaincode';

import valid_CmdFixture from '../../../test/fixtures/health/valid_cmd.json';

const chaincode = new TokenChaincode();

describe('Test Health', () => {
  it('Should initailize', async () => {
    const mockStub = new ChaincodeMockStub('MyMockStub', chaincode);
    const response = await mockStub.mockInit('tx1', []);
    expect(response.status).to.equal(200);
  });

  it('Should be healthy', async () => {
    const mockStub = new ChaincodeMockStub('TestMockStub', chaincode);
    await mockStub.mockInit('tx1', []);
    const txID = 'TX0001';
    mockStub.mockTransactionStart(txID);

    console.log('fixture name: ', valid_CmdFixture.name)
    const response = await mockStub.mockInvoke(txID, [
      valid_CmdFixture.name
    ]);
    mockStub.mockTransactionEnd(txID);
    expect(response.status).to.equal(200);
    expect(JSON.parse(response?.payload?.toString())).to.equal('healthy');
  });

});
