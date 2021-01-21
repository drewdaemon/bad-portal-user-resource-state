// load config (username/password/portalurl)
require('dotenv').config()
// ensures fetch is available as a global
require('cross-fetch/polyfill');
require('isomorphic-form-data');

const { UserSession } = require('@esri/arcgis-rest-auth');
const { searchItems, setItemAccess } = require('@esri/arcgis-rest-portal');

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const portal = process.env.PORTAL

// create a session
const session = new UserSession({
  username,
  password,
  portal
});

const itemIds = [
  '7eec561b24c843e5b49aca585000e0be',
  '51bfd3e2b5bc4c6c87a08fc19e152c81',
  '0144b5e434484221a4cef2a88078c7e7',
  'be31b2c465834508b8937737e12cc570',
  'beca445f5d114fae8b2ff154ea33739a',
  '12d7b2a7bdc84e3885d20ffa0784b5dd'
];

function formatAccessLevels(items) {
  const accesses = items.map(item => `${item.id}: ${item.access}\n`);
  return accesses.join('');
}

function toggleAccess(access) {
  return access === 'public' ? 'org' : 'public';
}

async function getItems(itemIds) {
  const { results } = await searchItems({
    q: 'id:' + itemIds.join(' OR id:'),
    authentication: session
  });
  return results;
}

function pause (seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

async function runTest() {
  console.log(`Here's how the items are now.\n`);
  const beforeItems = await getItems(itemIds);
  console.log(formatAccessLevels(beforeItems));

  const newAccess = toggleAccess(beforeItems[0].access);
  console.log(`Setting all items to ${newAccess.toUpperCase()}\n`);

  await Promise.all(beforeItems.map(item => setItemAccess({
    id: item.id,
    owner: item.owner,
    access: newAccess,
    authentication: session
  })));
  console.log(`DONE!\n`);

  console.log(`Requesting items again immediately.\n`);
  const afterItems = await getItems(itemIds);
  console.log(formatAccessLevels(afterItems));

  // wait for things to settle
  await pause(1);

  console.log(`Requesting items again after a pause.\n`);
  const wayafterItems = await getItems(itemIds);
  console.log(formatAccessLevels(wayafterItems));
}

(async function main () {
  for (let i = 0; i < 3; i++) {
    console.log(`TEST ${i+1}`)
    console.log(`-------------------------------------------\n`)
    await runTest();
  }
})();