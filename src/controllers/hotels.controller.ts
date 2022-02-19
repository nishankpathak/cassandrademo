import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Hotels} from '../models';
import {HotelsRepository} from '../repositories';

export class HotelsController {
  constructor(
    @repository(HotelsRepository)
    public hotelsRepository: HotelsRepository,
  ) { }

  @post('/hotels')
  @response(200, {
    description: 'Hotels model instance',
    content: {'application/json': {schema: getModelSchemaRef(Hotels)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hotels, {
            title: 'NewHotels',

          }),
        },
      },
    })
    hotels: Hotels,
  ): Promise<Hotels> {
    console.log(hotels.address.street)
    return this.hotelsRepository.create(hotels);
  }

  @get('/hotels/count')
  @response(200, {
    description: 'Hotels model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Hotels) where?: Where<Hotels>,
  ): Promise<Count> {
    return this.hotelsRepository.count(where);
  }

  @get('/hotels')
  @response(200, {
    description: 'Array of Hotels model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Hotels, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Hotels) filter?: Filter<Hotels>,
  ): Promise<Hotels[]> {
    return this.hotelsRepository.find(filter);
  }

  @patch('/hotels')
  @response(200, {
    description: 'Hotels PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hotels, {partial: true}),
        },
      },
    })
    hotels: Hotels,
    @param.where(Hotels) where?: Where<Hotels>,
  ): Promise<Count> {
    return this.hotelsRepository.updateAll(hotels, where);
  }

  @get('/hotels/{id}')
  @response(200, {
    description: 'Hotels model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Hotels, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Hotels, {exclude: 'where'}) filter?: FilterExcludingWhere<Hotels>
  ): Promise<Hotels> {
    return this.hotelsRepository.findById(id, filter);
  }

  @patch('/hotels/{id}')
  @response(204, {
    description: 'Hotels PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hotels, {partial: true}),
        },
      },
    })
    hotels: Hotels,
  ): Promise<void> {
    await this.hotelsRepository.updateById(id, hotels);
  }

  @put('/hotels/{id}')
  @response(204, {
    description: 'Hotels PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() hotels: Hotels,
  ): Promise<void> {
    await this.hotelsRepository.replaceById(id, hotels);
  }

  @del('/hotels/{id}')
  @response(204, {
    description: 'Hotels DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.hotelsRepository.deleteById(id);
  }
}
