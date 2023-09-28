// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const axios = require('axios');

const api_url = process.env.api_url 
const api_key = process.env.api_key 

export async function grabAssetsFromPolicyFromPage(policy, page = 1) {
  let assetsOfPolicyResponse = await callBlockfrostGet({
    method: 'get',
    url: `${api_url}/assets/policy/${policy}?page=${page}&count=100`,
    headers: {
      'project_id': `${api_key}`
    }
  })
  return assetsOfPolicyResponse
}

export async function grabAccountInfo(stakeAddr) {
  let accountInfoResponse = await callBlockfrostGet({
    method: 'get',
    url: `${api_url}/accounts/${stakeAddr}`,
    headers: {
      'project_id': `${api_key}`
    }
  })
  return accountInfoResponse

}
export async function grabAllAssetsFromStake(stakeAddress, page = 1) {
  let accountAssets = await callBlockfrostGet({
    method: 'get',
    url: `${api_url}/accounts/${stakeAddress}/addresses/assets?page=${page}&count=100`,
    headers: {
      'project_id': `${api_key}`
    }
  })
  return accountAssets
}

export async function grabAssetInformation(asset) {
  let assetInfo = await callBlockfrostGet({
    method: 'get',
    url: `${api_url}/assets/${asset}`,
    headers: {
      'project_id': `${api_key}`
    }
  })
  return assetInfo
}

async function callBlockfrostGet(getCall) {
  let response = await axios(
    getCall
  )
    .then(response => {
      //console.log(`${response.status} ${response.statusText} : [${response.config.method}] ${response.config.url} ${(response.config.data) ? response.config.data : ''}`)
      return response.data
    })
    .catch(error => {
      if (error.response === undefined) //add to error log
        console.log(`INVALID api request, no response`)
      else                              //add to error log
        console.log(`${error.response.status} ${error.response.statusText} : [${error.config.method}] ${error.config.url} ${(error.config.data) ? error.config.data : ''}`)
      return false
    });

  return response
}