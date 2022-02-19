import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'cassandra',
  connector: 'cassandra',
  host: 'localhost',
  port: 9042,
  user: 'root',
  password: '123456',
  database: 'hotel',
  connectTimeout: 30000,
  readTimeout: 30000
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class CassandraDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'cassandra';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.cassandra', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
