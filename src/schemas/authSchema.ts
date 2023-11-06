import { object, string } from 'zod';

/**
 * @openapi
 * components:
 *  schemas:
 *    LoginRequest:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: ahmed.helmy@qwitter.com
 *        password:
 *          type: string
 *          default: stringPassword123
 *    SignUpRequest:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - password
 *        - birthDate
 *      properties:
 *        email:
 *          type: string
 *          default: ahmed.helmy@qwitter.com
 *        name:
 *          type: string
 *          default: Ahmed Helmy
 *        password:
 *          type: string
 *          default: stringPassword123
 *        birthDate:
 *          type: string
 *          default: 2020-03-09T22:18:26.625Z
 *        passwordConfirmation:
 *          type: string
 *          default: stringPassword123
 *    ForgotPasswordRequest:
 *      type: object
 *      required:
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        password:
 *          type: string
 *          default: stringPassword123
 *        passwordConfirmation:
 *          type: string
 *          default: stringPassword123
 *    SignUpResponse:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *          default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZmNTgyOGMyLTBkYzUtNDNlMS1hZmQzLWFhODI3ZmQxODRiYSIsImlhdCI6MTY5OTI3MjE0MiwiZXhwIjoxNzA3MDQ4MTQyfQ.s4Bgs8RJr9U242CdG9cJyiVK6N7_VAVw9mziMdAkFrM
 *        data:
 *          $ref: '#/components/schemas/User'
 *        suggestions:
 *          type: array
 *          items:
 *            string
 *          default: [ahmedzahran6335d6,ahmedzahran891380]
 *    LoginResponse:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *        user:
 *          $ref: '#/components/schemas/User'
 *    VerifyEmailResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          default: "Your account has been successfully verified"
 */

const ForgetPasswordPayload = {
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email address'),
  }),
};
export const ForgetPasswordSchema = object({
  ...ForgetPasswordPayload,
});

/**
 * @openapi
 * components:
 *  schemas:
 *    ChangePasswordRequest:
 *      type: object
 *      required:
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        password:
 *          type: string
 *          default: hamada
 *        passwordConfirmation:
 *          type: string
 *          default: hamada
 *    ChangePasswordSuccessResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          default: Password Changed Successfully
 *    ResetPasswordSuccessResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          default: Password Reset Permissions Gauranteed
 *        token:
 *          type: string
 *          default: q98ehwniudwe98fehwf094r12i3112321
 *    SendVerificationEmailResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          default: Verification Email has been sent
 */

const ResetPasswordParameter = {
  params: object({
    token: string({
      required_error: 'Token is required',
    }),
  }),
};
export const ResetPasswordSchema = object({
  ...ResetPasswordParameter,
});

const SendVerificationEmailPayload = {
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email address'),
  }),
};
export const SendVerificationEmailSchema = object({
  ...SendVerificationEmailPayload,
});

export const signUpSchema = object({
  body: object({
    name: string().min(1).max(50),
    email: string().email(),
    password: string().min(8),
    birthDate: string().datetime(),
  }),
});

export const checkExistenceSchema = object({
  body: object({
    userNameOrEmail: string({
      required_error: 'Email or UserName is required',
    }),
  }),
});

export const headersSchema = {
  headers: object({
    auth_key: string().refine((value) => value.startsWith('Bearer'), {
      message: 'Invalid Auth Key"',
    }),
  }),
};
export const tokenSchema = object({
  ...headersSchema,
});