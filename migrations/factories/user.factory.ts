import * as Faker from 'faker'
import { define } from 'typeorm-seeding'
import { User } from '../../src/user/entities/user.entity'

define(User, (faker: typeof Faker, data: any) => {
  const name = data.name ? data.name : faker.name.firstName()
  const username = name === 'admin' ? 'admin' : faker.internet.userName(name).toLowerCase()
  const email = faker.internet.email(username)

  const user = new User()
  user.name = name
  user.username = username
  user.email = email
  user.password = 'a@123456!!!'
  return user
})
