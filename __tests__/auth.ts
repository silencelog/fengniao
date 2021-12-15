import Fengniao from '../src/index';
import data from './data.json';

const fengniao = new Fengniao({
  config: {
    app_id: data.app_id,
    secretkey: data.secretkey,
    merchant_id: data.merchant_id,
    code: 'code'
  },
  debug: data.debug,
  sandbox: data.sandbox,
})

describe('Auth', () => {
  test('Auth token',async () => {
    const res = await fengniao.exec('token')
    expect(res.code).toBe('200')
  });
  test('Auth refreshToken',async () => {
    await fengniao.getToken()
    const res = await fengniao.exec('refreshToken')
    expect(res.code).toBe('200')
  });
});
