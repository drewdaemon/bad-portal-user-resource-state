// load config (username/password/portalurl)
require('dotenv').config()
// ensures fetch is available as a global
require('cross-fetch/polyfill');
require('isomorphic-form-data');

const { UserSession } = require('@esri/arcgis-rest-auth');
const { request } = require('@esri/arcgis-rest-request');

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const portal = process.env.PORTAL

// create a session
const session = new UserSession({
  username,
  password,
  portal
});

const basicRequestOpts = {
  username,
  portal,
  authentication: session
};

function addUserResource (requestOptions) {
  return request(`${requestOptions.portal}/community/users/${requestOptions.username}/addResource`, requestOptions);
}

function getUserResource (requestOptions) {
  return request(`${requestOptions.portal}/community/users/${requestOptions.username}/resources/${requestOptions.name}`, requestOptions);
}

function listUserResources (requestOptions) {
  return request(`${requestOptions.portal}/community/users/${requestOptions.username}/resources`, requestOptions);
}

function removeUserResource (requestOptions) {
  return request(`${requestOptions.portal}/community/users/${requestOptions.username}/removeResource`, requestOptions);
}

const resourceName = 'hub-user-settings.json';
const resourceContents = { foo: 'bar' };

(async function main () {

  const { userResources } = await listUserResources(basicRequestOpts);
  console.log('CURRENT USER RESOURCES')
  console.log(userResources.map(resource => resource.key));

  console.log(`NO ENTRY FOR ${resourceName}`)

  console.log(`TRY ADDING ${resourceName}`)
  try {
    await addUserResource({
      ...basicRequestOpts,
      params: {
        // file: objectToJsonBlob(settingsObj), may have to do this later if we need to bypass sanitization
        text: JSON.stringify(resourceContents),
        access: 'UserPrivateAllApps',
        key: resourceName
      }
    })
  } catch (err) {
    console.error('ERROR: ' + err.message);
  }

  console.log(`TRY REMOVING ${resourceName}`)
  try {
    // remove resource
    await removeUserResource({
      ...basicRequestOpts,
      params: {
        key: resourceName
      }
    })
  } catch (err) {
    console.error('ERROR: ' + err.message);
  }
})();