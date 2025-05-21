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
<<<<<<< HEAD
      if (err) throw reject(err)
=======
      if (err) reject(err)
>>>>>>> 02f30bca547b77ede059705c0bdb6e5bdf4e860e
      resolve(token as string)
    })
  })
}
