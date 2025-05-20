import jwt from 'jsonwebtoken'

export const signToken = ({
  payload,
  secretKey,
  options
}: {
  payload: string | object | Buffer
  secretKey: string
  options: jwt.SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, secretKey, options, (err, token) => {
      if (err) throw reject(err)
      resolve(token as string)
    })
  })
}
