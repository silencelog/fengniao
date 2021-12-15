import { IConfig, IStrategies } from '../../typings/index'
import { TokenParams, RefreshTokenParams } from '../../typings/auth'

const AUTHORIZATION_CODE = 'authorization_code'

const REFRESH_TOKEN = 'refresh_token'

const Auth: IStrategies = {
  token: {
    url: 'openapi/token',
    method: 'POST',
    request: {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    },
    grantType: AUTHORIZATION_CODE,
    params: <TokenParams>(v: TokenParams): TokenParams => v,
    sign: (config: IConfig) => [
      ['grant_type', AUTHORIZATION_CODE],
      ['code', config.code || ''],
      ['app_id', config.app_id || ''],
      ['merchant_id', config.merchant_id || ''],
      ['timestamp', config.timestamp || '']
    ]
  },
  refreshToken: {
    url: 'openapi/refreshToken',
    method: 'POST',
    request: {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    },
    grantType: REFRESH_TOKEN,
    params: <RefreshTokenParams>(v: RefreshTokenParams): RefreshTokenParams => v,
    sign: (config: IConfig) => {
      return [
        ['grant_type', REFRESH_TOKEN],
        ['app_id', config.app_id || ''],
        ['merchant_id', config.merchant_id || ''],
        ['timestamp', config.timestamp || ''],
        ['refresh_token', config.refresh_token || '']
      ]
    }
  }
};

export default Auth;