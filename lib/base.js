import { bech32 } from 'bech32'

const convert = (from, to) => str => Buffer.from(str, from).toString(to)

export const utf8ToHex = convert('utf8', 'hex')
export const hexToUtf8 = convert('hex', 'utf8')

export function returnStakeAddressFromBech32(addr, network) {
  if (addr.length == 58) return addr
  if (!addr.startsWith('addr')) return addr

  var addressWords = bech32.decode(addr, 1000);
  var payload = bech32.fromWords(addressWords.words);
  var addressDecoded = `${Buffer.from(payload).toString("hex")}`;

  var stakeAddressDecoded =
    `e${network}` + addressDecoded.substring(addressDecoded.length - 56);

  const stakeAddress = bech32.encode(
    `${(network == 1) ? 'stake' : 'stake_test'}`,
    bech32.toWords(Uint8Array.from(Buffer.from(stakeAddressDecoded, "hex"))),
    1000
  );

  return stakeAddress;
}

export function makeHexID(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return utf8ToHex(result);
}

export function responseError(code, message) {
  let error = ""

  if (code == 400) error = "Bad Request"
  else if (code == 403) error = "Forbidden"
  else if (code == 404) error = "Not Found"
  else error = "Server Error"

  return {
    status_code: code,
    error: error,
    message: message
  }
}

export function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}