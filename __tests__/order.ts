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

function randomNum (minNum, maxNum) {
  switch(arguments.length) {
    case 1: 
      return parseInt(Math.random() * minNum + 1 + '',10)
    break; 
    case 2: 
      return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10)
    break;
    default:
      return 0;
    break;
  } 
} 

describe('Order', () => {
  test('Order chainstoreRange', async () => {
    const res = await fengniao.exec('chainstoreRange', {
      chain_store_id: data.chain_store_id
    })
    expect(res.code).toBe('200')
  })
  test('Order preCreateOrder',async () => {
    const res = await fengniao.exec('preCreateOrder', {
      "goods_item_list":[
        {
          "item_actual_amount_cent":500,
          "item_amount_cent":500,
          "item_name":"KFC汉堡一打",
          "item_quantity":2,
          "item_size": 0
        }
      ],
      "partner_order_code":"JSD4101231333235567",
      "use_coupon":0,
      "goods_count":1,
      "goods_actual_amount_cent":1000,
      "order_add_time":0,
      "order_tip_amount_cent":0,
      "receiver_longitude":116.39685489017384,
      "expect_fetch_time":0,
      // "base_goods_id": 3000,
      // "service_goods_id": 0,
      "receiver_latitude":40.039115,
      "order_source":4,
      "goods_total_amount_cent":1000,
      "receiver_address":"北京市昌平区中东路0000",
      "chain_store_id": data.chain_store_id,
      "order_type":1,
      "position_source":3,
      "require_receive_time": new Date().getTime() + 1 * 60 * 60 * 1000,
      "goods_weight":0.1
    })
    expect(res.code).toBe('200')
  })
  test('Order createOrder', async () => {
    const res = await fengniao.exec('createOrder', {
      "base_goods_id": "3000",
      "chain_store_id": data.chain_store_id,
      "expect_fetch_time": 0,
      "goods_actual_amount_cent": 1000,
      "goods_count": 1,
      "goods_item_list": [{
        "item_actual_amount_cent": 500,
        "item_amount_cent": 500,
        "item_name": "KFC汉堡一打",
        "item_quantity": 2,
        "item_size": 0
      }],
      "goods_total_amount_cent": 1000,
      "goods_weight": 0.1,
      "order_add_time": 0,
      "order_source": 4,
      "order_tip_amount_cent": 0,
      "order_type": 1,
      "partner_order_code": "JSD4101231333235567",
      "position_source": 3,
      "receiver_address": "北京市昌平区中东路00000号",
      "receiver_latitude": 40.039115,
      "receiver_longitude": 116.307892,
      "receiver_name": "张三",
      "receiver_primary_phone": "13123454567",
      "require_receive_time": 1638129743969,
      "use_coupon": 0
    })
    expect(res.code).toBe('200')
  })
  test('Order getAmount', async () => {
    const res = await fengniao.exec('getAmount', {})
    expect(res.code).toBe('200')
  })
  test('Order getOrderDetail', async () => {
    const res = await fengniao.exec('getOrderDetail', {
      "partner_order_code": "JSD4101231333235567",
    })
    expect(res.code).toBe('200')
  })
  test('Order getCancelReasonList', async () => {
    const res = await fengniao.exec('getCancelReasonList', {
      "partner_order_code": "JSD4101231333235567",
    })
    expect(res.code).toBe('200')
  })
  test('Order preCancelOrder', async () => {
    const resCRList = await fengniao.exec('getCancelReasonList', {
      "partner_order_code": "JSD4101231333235567",
    })
    expect(resCRList.code).toBe('200')
    const cancelList = JSON.parse(resCRList.business_data).cancel_reason_list
    const cancelCode = cancelList[randomNum(0, cancelList.length - 1)]
    const res = await fengniao.exec('preCancelOrder', {
      "partner_order_code": "JSD4101231333235567",
      "order_cancel_code": cancelCode
    })
    expect(res.code).toBe('200')
  })
});
