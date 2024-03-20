import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/database.service';
import { dto } from './prod.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService:PrismaService){}
  async create(createProductDto: Prisma.ProductCreateInput) {
    return this.databaseService.product.create({data: createProductDto})
  }

  async findAll() {
    return this.databaseService.product.findMany()
  }

  async findOne(id: number) {
    return this.databaseService.product.findUnique({
      where: {
        id: id
      },
      include: {
        description: true,
        tags: true,
        reviews:true
      }
    })
  }



  async update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    return this.databaseService.product.update({
      where: {
        id: id
      },
      data: updateProductDto
    })
  }


  async remove(id: number) {
    const product = await this.databaseService.product.delete({
      where: {
        id: id
      }
    })
    return product.id
  }
}
