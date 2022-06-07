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
