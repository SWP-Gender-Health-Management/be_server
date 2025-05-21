import { checkSchema } from 'express-validator'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/Error'
import accountService from '~/services/account.service'
import { verifyPassword } from '~/utils/crypto'
import { validate } from '~/utils/validations'

export const validateRegister = validate(
  checkSchema({
    email: {
      isEmail: {
        errorMessage: 'Email must be a valid email address'
      },
      custom: {
        options: async (value, { req }) => {
          const user = await accountService.checkEmailExist(value)
          console.log(typeof user)
          if (!user.isEmpty()) {
            throw new Error(USERS_MESSAGES.EMAIL_ALREADY_EXIST)
          }
          return true
        }
      }
    },
    password: {
      isLength: {
        options: { min: 6 },
        errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_AT_LEAST_6_CHARACTERS
      },
      isString: true,
      trim: true,
      isStrongPassword: {
        options: {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        },
        errorMessage: USERS_MESSAGES.PASSWORD_INVALID
      }
    },
    confirmPassword: {
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error(USERS_MESSAGES.CONFIRM_PASSWORD_MUST_MATCH)
          }
          return true
        }
      }
    }
  })
)

export const validateLogin = validate(
  checkSchema({
    email: {
      isEmail: {
        errorMessage: 'Email must be a valid email address'
      },
      custom: {
        options: async (value, { req }) => {
          const [user, isPasswordValid] = await Promise.all([
            accountService.checkEmailExist(value),
            verifyPassword(value, req.body.password)
          ])
          if (!user || !isPasswordValid) {
            throw new Error(USERS_MESSAGES.EMAIL_OR_PASSWORD_INVALID)
          }
          req.body.account_id = user.account_id
          req.body.password = user.password
          return true
        }
      }
    },
    password: {
      isLength: {
        options: { min: 6 },
        errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_AT_LEAST_6_CHARACTERS
      }
    }
  })
)
