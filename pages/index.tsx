export default function Index() {
  return;
}

Index.getInitialProps = async ({ query, res }) => {
  console.log(query);
  // インストール済みなら /terms へ飛ばす
  if (query.session) {
    const redirect_uri = `${process.env.APP_URL}terms`;
    if (res) {
      res.writeHead(301, {
        Location: redirect_uri,
      })
      res.end();
    }
    return;
  }
  const { SHOPIFY_API_KEY } = process.env;
  const scopes = 'read_orders';
  const redirect_uri = `${process.env.APP_URL}callback`;
  const url = `https://${query.shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${scopes}&redirect_uri=${redirect_uri}`;
  console.log(url);
  if (res) {
    res.writeHead(301, {
      Location: url,
    })
    res.end();
  }
  return;
}