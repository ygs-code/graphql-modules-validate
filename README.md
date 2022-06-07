# graphql-modules-validate

Secondary encapsulation based on GraphQL-modules.。

As our project gets bigger and bigger, graphQL gets bigger and bigger, and we need to modularize them in a way that helps decouple and maintain them.

##  installation

```
npm i --save graphql-modules-validate
or
yarn add graphql-modules-validate
```





## Modular use method：

For example, we can divide it into several modules

User module GraphQL

Suppose we have two modules: the user and marketing modules

The directory structure

```
user
marketing
```

User directory structure

```
  user
     index.js
     module.js
```

Index.js in the user module

```
   import { UserModule } from './module';

    export default [UserModule];
```

  Module.js in the user module

```
     /*
 * @Date: 2022-05-20 14:22:59
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-06-07 11:10:21
 * @FilePath: /graphql-demo/src/demo/GraphQLModules/user/module.js
 * @Description:
 */
import { createModule, gql } from 'graphql-modules';

export const UserModule = {
    id: 'user-module', // id不能与其他模块重名
    dirname: __dirname,
    typeDefs: [
        `
            extend type Query {
                getUser: User
            }

            type User {
                name: String!
                id: ID!
                type:Int,
                address:String!
            }
            # 不管前端从variables传参还是从函数调用中传参，这里接受参数不会变。
            extend type Mutation {
                updateUser(id: ID, name: String!): User!
            }
        `,
    ],
    // 这里并没有校验resolvers重复性，所以需要我们自己实现校验
    resolvers: {
        Mutation: {
            updateUser(root, parameter, source, fieldASTs) {
                console.log('root==', root);
                console.log('parameter==', parameter);
                const { name, id } = parameter;
                return {
                    name: '成功更新用户',
                    id,
                    type: 1,
                    address: '中国广东深圳',
                };
            },
        },
        Subscription: {},
        Query: {
            getUser: (root, parameter, source, fieldASTs) => {
                // console.log('root==', root);
                // console.log('parameter==', parameter);
                // console.log('source==',source)
                // console.log('fieldASTs==',fieldASTs)
                return {
                    id: '1',
                    name: '用户1模块',
                    address: '中国广东深圳',
                    type: 1,
                };
            },
        },
    },
};

```





The marketing module

  The marketing directory

```
  marketing
     index.js
     module.js
```

 Index.js in the marketing module

```
   import { UserModule } from './module';

    export default [UserModule];
```

  Index.js in the marketing module

```
   import { UserModule } from './module';

    export default [UserModule];
```

  Module.js in the marketing module

```
/*
 * @Date: 2022-05-20 14:22:59
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-05-20 16:24:05
 * @FilePath: /graphql-demo/src/demo/GraphQLModules/user/module.js
 * @Description:
 */
import { createModule, gql } from 'graphql-modules';

export const MarketingModule = {
    id: 'marketing-module', // id不能与其他模块重名
    dirname: __dirname,
    typeDefs: [
        `
            type Discount {
                id: ID
                name: String
            }

            extend type Query {
                getDiscount: Discount 
            }

            extend type Mutation {
                updateDiscount(id: ID!, name: String!): Discount!
            }
        `,
    ],
    // 这里并没有校验resolvers重复性，所以需要我们自己实现校验
    resolvers: {
        Mutation: {
            updateDiscount(root, parameter, source, fieldASTs) {
                console.log('root==', root);
                console.log('parameter==', parameter);
                const { id } = parameter;
                return {
                    name: '成功更新优惠券',
                    id,
                };
            },
        },
        Subscription: {},
        Query: {
            getDiscount: (root, parameter, source, fieldASTs) => {
                console.log('root==', root);
                console.log('parameter==', parameter);
                // console.log('source==',source)
                // console.log('fieldASTs==',fieldASTs)
                return {
                    id: '1',
                    name: '营销模块 恭喜你获得7折扣',
                };
            },
        },
    },
}

```



graphql-modules-validate  How do you verify that?

First, let's introduce the user and marketing modules we just introduced

Then I'll introduce graphqL-modules-validate

## Used in HTTP：

```
/*
 * @Date: 2022-05-20 15:51:10
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-05-20 16:28:48
 * @FilePath: /graphql-demo/src/demo/GraphQLModules/index2.js
 * @Description:
 */
import Koa from 'koa'
import UserModule from './user'
import MarketingModule from './marketing'
import ValidateGraphql, { validateGraphql } from 'graphql-modules-validate'

const $validateGraphql = validateGraphql({
  modules: [...UserModule, ...MarketingModule],
})

var app = Koa()
app.get('/data', async (ctx, next) => {
  const {
    query: { query: clientSchema = '', variables },
    response,
    request,
  } = ctx
  const {
    body: {
      // mutation = '', variables = {}
    },
  } = request

  $validateGraphql({
    rootValue: {
      ctx: {
        request: {
          setCookie() {},
        },
      },
      next: () => {},
    },
    clientSchema: {
      schema: clientSchema,
      variables: {},
      operationName: 'getUser',
    },
  }).then((data) => {
    ctx.body = data
  })
})

```



options  ：


| parameter     | Value types                        | describe                                 |
| ------------- | ---------------------------------- | ---------------------------------------- |
| debug         | boolean                            | Graphql Verifying output logs            |
| modules       | [UserModule,   MarketingModule,  ] | The module  Graphql                      |
| rootValue     | obj                                | Pass CTX or next to the resolvers function root. |
| clientSchema  | string                             | The client Schema                        |
| variables     | obj                                | http Request parameters                  |
| operationName | string                             | http  Schema The operation name          |
| lang          | string                             | Language: EN or zh-CN                    |





# 中文文档

基于graphql-modules二次封装。

当我们的项目越来越大的时候，graphql就会越来越大，这个时候我们需要把他们模块化，这样方式可以利于解耦和维护。

## 安装

```
npm i --save graphql-modules-validate
or
yarn add graphql-modules-validate
```







## 模块化使用方法：

比如 我们可以分为几个模块 

用户模块 graphql

假如我们有 两个模块一个是 user和 marketing 模块

目录结构

```
user
marketing
```



user目录结构

```
  user
     index.js
     module.js
```

  user 模块中的index.js 

```
   import { UserModule } from './module';

    export default [UserModule];
```

  user 模块中的 module.js

```
     /*
 * @Date: 2022-05-20 14:22:59
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-06-07 11:10:21
 * @FilePath: /graphql-demo/src/demo/GraphQLModules/user/module.js
 * @Description:
 */
import { createModule, gql } from 'graphql-modules';

export const UserModule = {
    id: 'user-module', // id不能与其他模块重名
    dirname: __dirname,
    typeDefs: [
        `
            extend type Query {
                getUser: User
            }

            type User {
                name: String!
                id: ID!
                type:Int,
                address:String!
            }
            # 不管前端从variables传参还是从函数调用中传参，这里接受参数不会变。
            extend type Mutation {
                updateUser(id: ID, name: String!): User!
            }
        `,
    ],
    // 这里并没有校验resolvers重复性，所以需要我们自己实现校验
    resolvers: {
        Mutation: {
            updateUser(root, parameter, source, fieldASTs) {
                console.log('root==', root);
                console.log('parameter==', parameter);
                const { name, id } = parameter;
                return {
                    name: '成功更新用户',
                    id,
                    type: 1,
                    address: '中国广东深圳',
                };
            },
        },
        Subscription: {},
        Query: {
            getUser: (root, parameter, source, fieldASTs) => {
                // console.log('root==', root);
                // console.log('parameter==', parameter);
                // console.log('source==',source)
                // console.log('fieldASTs==',fieldASTs)
                return {
                    id: '1',
                    name: '用户1模块',
                    address: '中国广东深圳',
                    type: 1,
                };
            },
        },
    },
};

```





marketing 模块

  marketing 目录 

```
  marketing
     index.js
     module.js
```

  marketing 模块中的index.js 

```
   import { UserModule } from './module';

    export default [UserModule];
```

  marketing 模块中的   marketing     index.js     module.js

  marketing 模块中的index.js 

```
   import { UserModule } from './module';

    export default [UserModule];
```

  marketing 模块中的index.js 

```
/*
 * @Date: 2022-05-20 14:22:59
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-05-20 16:24:05
 * @FilePath: /graphql-demo/src/demo/GraphQLModules/user/module.js
 * @Description:
 */
import { createModule, gql } from 'graphql-modules';

export const MarketingModule = {
    id: 'marketing-module', // id不能与其他模块重名
    dirname: __dirname,
    typeDefs: [
        `
            type Discount {
                id: ID
                name: String
            }

            extend type Query {
                getDiscount: Discount 
            }

            extend type Mutation {
                updateDiscount(id: ID!, name: String!): Discount!
            }
        `,
    ],
    // 这里并没有校验resolvers重复性，所以需要我们自己实现校验
    resolvers: {
        Mutation: {
            updateDiscount(root, parameter, source, fieldASTs) {
                console.log('root==', root);
                console.log('parameter==', parameter);
                const { id } = parameter;
                return {
                    name: '成功更新优惠券',
                    id,
                };
            },
        },
        Subscription: {},
        Query: {
            getDiscount: (root, parameter, source, fieldASTs) => {
                console.log('root==', root);
                console.log('parameter==', parameter);
                // console.log('source==',source)
                // console.log('fieldASTs==',fieldASTs)
                return {
                    id: '1',
                    name: '营销模块 恭喜你获得7折扣',
                };
            },
        },
    },
}

```



graphql-modules-validate 是如何做验证的呢？

首先我们将刚才的 user和marketing模块引入进来

然后在把graphql-modules-validate引入

## 在http中使用：

```
/*
 * @Date: 2022-05-20 15:51:10
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-05-20 16:28:48
 * @FilePath: /graphql-demo/src/demo/GraphQLModules/index2.js
 * @Description:
 */
import Koa from 'koa'
import UserModule from './user'
import MarketingModule from './marketing'
import ValidateGraphql, { validateGraphql } from 'graphql-modules-validate'

const $validateGraphql = validateGraphql({
  modules: [...UserModule, ...MarketingModule],
})

var app = Koa()
app.get('/data', async (ctx, next) => {
  const {
    query: { query: clientSchema = '', variables },
    response,
    request,
  } = ctx
  const {
    body: {
      // mutation = '', variables = {}
    },
  } = request

  $validateGraphql({
    rootValue: {
      ctx: {
        request: {
          setCookie() {},
        },
      },
      next: () => {},
    },
    clientSchema: {
      schema: clientSchema,
      variables: {},
      operationName: 'getUser',
    },
  }).then((data) => {
    ctx.body = data
  })
})

```






options  ：


| parameter     | Value types                        | describe                                 |
| ------------- | ---------------------------------- | ---------------------------------------- |
| debug         | boolean                            | Graphql校验输出日志                            |
| modules       | [UserModule,   MarketingModule,  ] | 模块  Graphql                              |
| rootValue     | obj                                | 传递给 resolvers 中函数  root，可以传递 ctx或者 next。 |
| clientSchema  | string                             | 客户端 Schema                               |
| variables     | obj                                | 请求参数                                     |
| operationName | string                             | 操作名称                                     |
| lang          | string                             | 语言， EN或者 zh-CN                           |

