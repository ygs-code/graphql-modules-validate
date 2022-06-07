/*
 * @Date: 2022-06-07 10:11:45
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-06-07 11:05:02
 * @FilePath: /graphql-demo/graphql-modules-validate/language.js
 * @Description:
 */
export default {
  EN: {
    moduleID: 'module ID',
    path: 'path',
    andModule: 'With the module ID',
    their: 'their',
    duplicationName: 'Duplicate name conflict occurred, please modify.',
    schemaVerified: 'The server Schema is verified',
    errorMessage: 'error message',
    serverSchemaVerification:
      'The server schema verification failed. Procedure',
    verifyClientSchemaPasses: 'Verify that the client schema passes',
    validateClientFailed: 'Failed to validate the client schema',
    serverClientSchemaVerified:
      'Both the server schema and client schema are verified',
    serverClientSchemaValidationFails:
      'The server schema and the client schema fail to be validated together',
    clientServerSchemaRequestParametersVerified:
      'The client Schema and request parameters are verified with the server Schema',
    canNotEmpty: "Can't be empty",
    clientServerSchemaRequestParametersVerifiedFailed:
      "The client Schema and request parameters failed to verify with the server's Schema",
  },
  'zh-CN': {
    moduleID: '模块ID',
    path: '路径',
    and: '与',
    their: '它们的',
    duplicationName: '发生重名冲突，请重新修改。',
    schemaVerified: '服务器schema验证通过',
    errorMessage: '错误信息',
    serverSchemaVerification: '服务器schema验证失败',
    validateClientFailed: '验证客户端schema失败',
    verifyClientSchemaPasses: '验证客户端schema通过',
    serverClientSchemaVerified: '服务端的schema和客户端的schema一起验证通过',
    serverClientSchemaValidationFails:
      '服务端的schema和客户端的schema一起验证失败',
    clientServerSchemaRequestParametersVerified:
      '客户端Schema和请求参数与服务器的Schema校验通过',
    canNotEmpty: '不能为空',
    clientServerSchemaRequestParametersVerifiedFailed:
    "客户端Schema和请求参数与服务器的Schema校验失败",
  },
}
