import * as chai from 'chai';
import chaiHttp from 'chai-http';

let app;

before(async () => {
  const mod = await import('../server.js');
  app = mod.default || mod; // works for both ESM and CommonJS
});

const expect = chai.expect;
chai.use(chaiHttp);

describe('Bundle API', () => {
  it('should return all bundles', async () => {
    const res = await chai.request(app).get('/bundles');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });
});
