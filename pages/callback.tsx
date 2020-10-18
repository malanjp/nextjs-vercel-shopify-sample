import * as crypto from 'crypto';


export default function Callback() {
  return;
}


Callback.getInitialProps = async ({ query, res }) => {
  validateShopId(query.shop);
  validateHmac(query, process.env.SHOPIFY_API_SECRET_KEY);
  // TODO: nonce の検証
  // ...

  // TODO: access_token の取得
  // ...
  const { access_token, scope } = await getAccessTokenRequest(query.shop, query.code);
  console.log('access_token', access_token);
  console.log('scope', scope);

  // アプリ管理画面へ飛ばす
  const redirect_uri = `https://${query.shop}/admin/apps/${process.env.SHOPIFY_APP_NAME}`;
  if (res) {
    res.writeHead(301, {
      Location: redirect_uri,
    })
    res.end();
  }

  return {};
}


/**
 * 店舗ID の検証
 * @param shopId 店舗ID (hoge.myshopify.com)
 */
const validateShopId = (shopId: string) => {
  const re = /[a-zA-Z0-9][a-zA-Z0-9\-]*\.myshopify\.com[\/]?/;
  if (!shopId.match(re)) throw 'unmatched shopName';
  return true;
}


/**
 * HMAC の検証
 * @param query req.query
 * @param secret_key SHOPIFY_API_SECRET_KEY
 */
const validateHmac = (query: any, secret_key: string) => {
  console.log('secret_key', secret_key);
  const hmac = query.hmac;
  delete query.hmac;
  const message = `code=${query.code}&shop=${query.shop}&timestamp=${query.timestamp}`;
  console.log('queryString', message);
  var digest = crypto.createHmac('sha256', secret_key).update(message).digest('hex');
  console.log('hmac', hmac);
  console.log('digest', digest);
  if (hmac !== digest) throw 'unmatched hmac';
  return true;
}


const getAccessTokenRequest = async (shopId: string, code: string) => {
  const url = `https://${shopId}/admin/oauth/access_token`;
  const payload = {
    cliend_id: process.env.SHOPIFY_API_KEY,
    client_secret: process.env.SHOPIFY_SECRET_API_KEY,
    code: code,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  console.log('fetched', data);
  
  return data;
}
