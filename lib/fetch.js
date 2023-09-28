import axios from "axios";

export async function requestJWT(address, payload, message) {
  const jwtRequest = await fetchGet(`/api/auth?address=${address}&payload=${payload}&message=${JSON.stringify(message)}`)
  return jwtRequest
}

export async function requestWhitelistCheck(address, jwt) {
  const jwtRequest = await fetchGet(`/api/whitelist?address=${address}&jwt=${jwt}`)
  return jwtRequest
}


export async function requestTxBuild(address, jwt, tokenCount, utxos){
  let txBuildRequest = await fetch(`/api/tx/build?address=${address}&jwt=${jwt}&tokencount=${tokenCount}`, {
    method: 'POST',
    headers: {
      'Authorization': process.env.LAMBDA_AUTH,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'jwt': jwt
    },
    body: JSON.stringify({ utxos: utxos })
  });

  const data = await txBuildRequest.json()

  if (!data) {
    return false
  }

  return data
}

export async function requestTxSubmit(jwt, txhash, witness_sig) {
  const txSubmitRequest = await fetchGet(`/api/tx/submit?jwt=${jwt}&txhash=${txhash}&witness_sig=${witness_sig}`)
  return txSubmitRequest
}

export async function requestTxStatus(jwt, txhashes) {
  const txBuildRequest = await fetch(`/api/tx/status?jwt=${jwt}`, {
    method: 'POST',
    headers: {
      'Authorization': process.env.LAMBDA_AUTH,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'jwt': jwt
    },
    body: JSON.stringify({
      txHashes: txhashes
    })
  });

  const data = await txBuildRequest.json()

  if (!data) {
    return false
  }

  return data
}

export async function requestTxCancel(jwt, txhash) {
  const txCancelRequest = await fetchGet(`/api/tx/cancel?jwt=${jwt}&txhash=${txhash}`)
  return txCancelRequest
}

export async function requestTokenCount() {
  const tokenCountRequest = await fetchGet(`/api/token/count`)
  return tokenCountRequest
}

export async function requestJWTExperimentalFetch(address, payload, message) {
  const reqBody = { message: message, payload: payload };
  try {
  const txBuildRequest = await fetch(`http://localhost:3001/api/auth?address=${address}`, {
    method: 'POST',
    body: JSON.stringify({
      message: message, 
      payload: payload 
    })
  });

  const data = await txBuildRequest.json()

  if (!data) {
    return false
  }

  return data
} catch (err) {
  console.log(err)
}
}

export async function requestJWTExperimental(address, payload, message) {
  const strMessage = message
  const reqBody = { message: strMessage, payload: payload };
  try {
    const res = await axios({
      method: 'post',
      url: `http://localhost:3001/api/auth?address=${address}`,
      data: reqBody
    })
    console.log(res)
  } catch (err) {
    console.log(err)
  }
  //const tokenCountRequest = await fetchGet('https://euphoria-exposed.vercel.app/api/auth?stakeAddress=stake_test1ursyym6mqkkkm7lzuu89vecu62awrzmyrgwv4rfx9xzl72srwr99e')
}

async function fetchGet(url) {
  try {
    const res = await fetch(url)
    const data = await res.json()

    if (!data) {
      return false
    }

    return data
  } catch (err) {
    console.log(err)
    return false
  }
}