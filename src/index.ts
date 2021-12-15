import auth from './apis/auth'
import order from './apis/order'
import { version } from '../package.json'
import axios, { AxiosRequestConfig } from 'axios'
import { IConfig, ICore, IFormat, IMapForKeys, IRequest, IStrategies, IStrategiesItem } from '../typings'
import crypto from 'crypto'

const ELE_URI = 'https://open-anubis.ele.me/anubis-webapi/';
const SANDBOX_URI = 'https://exam-anubis.ele.me/anubis-webapi/';

export const APIs: IStrategies = {
  ...auth,
  ...order,
}

const requestByAxios = async (item: IStrategiesItem, params: any, config?: AxiosRequestConfig) => {
  const resOpt = {
    method: item.method || 'GET',
    url: item.url,
    ...config
  }
  resOpt.headers ? resOpt.params = params : resOpt.data = params
  const res = await axios.request(resOpt)
  return res.data
}

class Core implements ICore {
  format?: IFormat;
  version: string = version;
  request: IRequest;
  uri: string;
  config: IConfig;
  static add: (key: string, fn: IStrategiesItem) => void;
  debug: boolean;
  // 自定义token
  tokenProxy: (() => string) | undefined;

  constructor (props: ICore) {
    this.format = props.format
    this.request = props.request || requestByAxios
    this.debug = props.debug || false
    this.uri = props.uri || props.sandbox ? SANDBOX_URI : ELE_URI
    this.tokenProxy = props.tokenProxy
    this.config = props.config
    this.config.version = '1.0'
  }

  /**
   * 签名
   */
  sign (params: string[][]) {
    const query = new URLSearchParams(params)
    query.sort()
    let paramStr = query.toString();
    // URLSearchParams会转义json字符串这里反转
    if (/business_data/.test(paramStr)) paramStr = paramStr.replace(/(business_data)\=([^&]*)/g, (w, w1, w2) => {
      return `${w1}=${decodeURIComponent(w2)}`
    })
    const signBefore = this.config.secretkey + paramStr;
    const signature = crypto.createHash('SHA256').update(signBefore).digest('hex');
    this.log(`---sign--- config:${JSON.stringify(this.config)} params: ${params} query: ${paramStr} signature: ${signature}`)
    return signature
  }

  /**
   * 
   * @param key 
   * @param params 
   */
  async exec<T extends keyof IMapForKeys> (key: T, params?: IMapForKeys[T]) {
    const item = APIs[key]
    // TODO this.format
    const url = this.uri + item.url
    const timestamp = new Date().getTime().toString()
    const signature = this.sign(item.sign ? item.sign({
      ...this.config,
      timestamp,
    }) : [
      ['app_id', this.config.app_id || ''],
      ['merchant_id', this.config.merchant_id || ''],
      ['timestamp', timestamp || ''],
      ['version', this.config.version || ''],
      ['access_token', await this.getToken() || ''],
      ['business_data', JSON.stringify(params)]
    ])
    const nParams = item.params({
      ...this.config,
      grant_type: item.grantType,
      timestamp,
      signature,
      business_data: params ? JSON.stringify(params) : undefined,
    })
    this.log(`---exec--- url:${url} key:${key} item:${JSON.stringify(item)} params:${JSON.stringify(params)}`)
    this.log(`---req--- params:${JSON.stringify(nParams)}`)
    let res: any = {
      code: 500
    };
    try {
      res = await this.request({
        ...item,
        url: url
      }, {
        ...nParams,
      },
      item.request)
      this.log(`---res--- res:${JSON.stringify(res)}`)
      if (res.code != '200') throw new Error(JSON.stringify(res))
    } catch (error) {
      console.error(error)
    }
    return res
  }

  /**
   * 打印日志
   * @param arg 
   */
  log (...arg: string[]) {
    if (this.debug) {
      console.log(...arg)
    }
  }

  async getToken () {
    // TODO 自定义token处理
    if (this.tokenProxy) return this.tokenProxy();
    if (!this.config.access_token) {
      const res = await this.exec('token')
      const business_data = JSON.parse(res.business_data)
      Object.assign(this.config, business_data)
      this.config.tokenData = new Date()
    } else if (this.config.tokenData && this?.config?.expire_in && (this.config.tokenData.getTime() + (this?.config?.expire_in || 0) * 1000) < new Date().getTime()) {
      const res = await this.exec('refreshToken')
      const business_data = JSON.parse(res.business_data)
      Object.assign(this.config, business_data)
    }
    return this.config.access_token
  }

}

Core.add = function (key: string, fn: IStrategiesItem) {
  APIs[key] = fn
}

export default Core;