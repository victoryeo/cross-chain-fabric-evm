import { ChaincodeMockStub } from '@theledger/fabric-mock-stub';
import { expect } from 'chai';
import 'mocha';
import Chaincode from '../../../chaincode';

import valid_CmdFixture from '../../../../test/fixtures/health/validCommand.json';

const chaincode = new Chaincode();
describe('Commands', () => {

  it('Should able to be healthy', async () => {
    const mockStub = new ChaincodeMockStub('TestMockStub', chaincode);
    await mockStub.mockInit('tx1', []);
    const txID = 'TX0001';
    mockStub.mockTransactionStart(txID);

    const response = await mockStub.mockInvoke(txID, [
      valid_CmdFixture.name
    ]);
    mockStub.mockTransactionEnd(txID);
    expect(response.status).to.equal(200);
    expect(JSON.parse(response.payload.toString())).to.equal('healthy');
  });

});
