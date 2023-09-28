import { Lucid, Blockfrost } from 'lucid-cardano'
import { createJwt } from '../../../lib/authorize';

import { responseError, returnStakeAddressFromBech32 } from '../../../lib/base'
import { grabAccountInfo } from '../../../lib/blockfrost'

export default async function handler(req, res) {
  const { address, payload, message } = req.query

  if (!address || !payload || !message) { res.status(404).json(responseError(400, 'Missing parameters!')); return }

  const lucid = await Lucid.new(
    new Blockfrost(process.env.api_url, process.env.api_key),
    process.env.api_net
  )

  if (!await grabAccountInfo(returnStakeAddressFromBech32(address, process.env.network))) { res.status(404).json(responseError(404, 'Invalid Address')); return }
  
  const verify = lucid.verifyMessage(address, payload, JSON.parse(message))
  if (!verify) { res.status(404).json(responseError(404, 'Invalid Signing!')); return }

  const jwt = createJwt(message);
  if (!jwt) { res.status(404).json(responseError(404, 'Invalid JWT')); return }
  
  res.status(200).json({
    "status_code": 200,
    jwt: jwt
  })
}