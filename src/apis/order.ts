import { IStrategies } from '../../typings/index'
import { IPreCreateOrder } from '../../typings/order'

const URL = 'v3/invoke/'

const Order: IStrategies = {
  chainstoreRange: {
    url: `${URL}chainstoreRange`,
    method: 'POST',
    params: (v: any): any => {
      return {
        access_token: v.access_token,
        signature: v.signature,
        merchant_id: v.merchant_id,
        version: v.version,
        app_id: v.app_id,
        timestamp: v.timestamp,
        business_data: v.business_data,
      }
    }
  },
  preCreateOrder: {
    url: `${URL}preCreateOrder`,
    method: 'POST',
    params: (v: any): any => {
      return {
        access_token: v.access_token,
        signature: v.signature,
        merchant_id: v.merchant_id,
        version: v.version,
        app_id: v.app_id,
        timestamp: v.timestamp,
        business_data: v.business_data,
      }
    }
  },
  createOrder: {
    url: `${URL}createOrder`,
    method: 'POST',
    params: (v: any): any => {
      return {
        access_token: v.access_token,
        signature: v.signature,
        merchant_id: v.merchant_id,
        version: v.version,
        app_id: v.app_id,
        timestamp: v.timestamp,
        business_data: v.business_data,
      }
    }
  },
  getAmount: {
    url: `${URL}getAmount`,
    method: 'POST',
    params: (v: any): any => {
      return {
        access_token: v.access_token,
        signature: v.signature,
        merchant_id: v.merchant_id,
        version: v.version,
        app_id: v.app_id,
        timestamp: v.timestamp,
        business_data: v.business_data,
      }
    }
  },
  getOrderDetail: {
    url: `${URL}getOrderDetail`,
    method: 'POST',
    params: (v: any): any => {
      return {
        access_token: v.access_token,
        signature: v.signature,
        merchant_id: v.merchant_id,
        version: v.version,
        app_id: v.app_id,
        timestamp: v.timestamp,
        business_data: v.business_data,
      }
    }
  },
  getCancelReasonList: {
    url: `${URL}getCancelReasonList`,
    method: 'POST',
    params: (v: any): any => {
      return {
        access_token: v.access_token,
        signature: v.signature,
        merchant_id: v.merchant_id,
        version: v.version,
        app_id: v.app_id,
        timestamp: v.timestamp,
        business_data: v.business_data,
      }
    }
  },
  preCancelOrder: {
    url: `${URL}preCancelOrder`,
    method: 'POST',
    params: (v: any): any => {
      return {
        access_token: v.access_token,
        signature: v.signature,
        merchant_id: v.merchant_id,
        version: v.version,
        app_id: v.app_id,
        timestamp: v.timestamp,
        business_data: v.business_data,
      }
    }
  },
  cancelOrder: {
    url: `${URL}cancelOrder`,
    method: 'POST',
    params: (v: any): any => {
      return {
        access_token: v.access_token,
        signature: v.signature,
        merchant_id: v.merchant_id,
        version: v.version,
        app_id: v.app_id,
        timestamp: v.timestamp,
        business_data: v.business_data,
      }
    }
  }
};

export default Order
