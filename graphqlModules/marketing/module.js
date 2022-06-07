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
