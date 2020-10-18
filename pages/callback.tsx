import * as crypto from 'crypto';

export default function Callback() {
  return;
}

Callback.getInitialProps = async ({ query, res }) => {
  validateShopname(query.shop);
  validateHmac(query, process.env.SHOPIFY_API_SECRET_KEY);

  const redirect_uri = `${process.env.APP_URL}terms`;
  if (res) {
    res.writeHead(301, {
      Location: redirect_uri,
    })
    res.end();
  }

  return {};
}

const validateShopname = (shopName: string) => {
  const re = /[a-zA-Z0-9][a-zA-Z0-9\-]*\.myshopify\.com[\/]?/;
  if (!shopName.match(re)) throw 'unmatched shopName';
  return true;
}

const validateHmac = (query: any, secret_key: string) => {
  console.log('secret_key', secret_key);
  const hmac = query.hmac;
  delete query.hmac;
  const queryString = Object.entries(query).map((e) => `${e[0]}=${e[1]}`).join('&');
  console.log('queryString', queryString);
  var digest = crypto.createHmac('sha256', secret_key).update(queryString).digest('hex');
  console.log('hmac', hmac);
  console.log('digest', digest);
  if (hmac !== digest) throw 'unmatched hmac';
  return true;
}