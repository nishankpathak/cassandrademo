import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CassandraDataSource} from '../datasources';
import {Hotels, HotelsRelations} from '../models';

export class HotelsRepository extends DefaultCrudRepository<
  Hotels,
  typeof Hotels.prototype.id,
  HotelsRelations
> {
  constructor(
    @inject('datasources.cassandra') dataSource: CassandraDataSource,
  ) {
    super(Hotels, dataSource);
  }
}
