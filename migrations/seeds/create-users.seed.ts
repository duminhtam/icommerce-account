import { Seeder, Factory } from 'typeorm-seeding'
import { User } from '../../src/user/entities/user.entity'
import {getRepository} from "typeorm";


export default class CreateUsers implements Seeder {
  public async run(factory: Factory): Promise<void> {

    const { count } = await getRepository(User)
      .createQueryBuilder("User")
      .select("COUNT(User.id)", "count")
      .getRawOne();

    if(parseInt(count) === 0){
      await factory(User)({ name: 'admin' }).create()
    }
    await factory(User)({}).create()
  }
}
