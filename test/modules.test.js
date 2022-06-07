/*
 * @Date: 2022-06-07 14:34:03
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-06-07 15:36:40
 * @FilePath: /graphql-demo/graphql-modules-validate/test/modules.test.js
 * @Description:
 */

import user from '../graphqlModules/user'
import marketing from '../graphqlModules/marketing'
import assert from 'assert'

describe('isArray', function () {
  describe('#isArray', function () {
    it('Check whether the module is an array', function () {
      assert.equal(user instanceof Array, true)
    })

    it('Check whether the module is an array', function () {
      assert.equal(marketing instanceof Array, true)
    })
  })
})

// id: 'marketing-module', // id不能与其他模块重名
// dirname: __dirname,
// typeDefs: [
//     `
//         type Discount {
//             id: ID
//             name: String
//         }

//         extend type Query {
//             getDiscount: Discount
//         }

//         extend type Mutation {
//             updateDiscount(id: ID!, name: String!): Discount!
//         }
//     `,
// ],
// // 这里并没有校验resolvers重复性，所以需要我们自己实现校验
// resolvers: {

describe('modules', function () {
  describe('#modules', function () {
    const { id, dirname, typeDefs, resolvers } = user[0]

    it('Id in the test module', function () {
      assert.equal(!!id, true)
    })

    it('Dirname in the test module', function () {
      assert.equal(!!dirname, true)
    })

    it('typeDefs in the test module', function () {
      assert.equal(typeDefs instanceof Array, true)
    })

    it('resolvers in the test module', function () {
      assert.equal(resolvers instanceof Object, true)
    })
  })
})
