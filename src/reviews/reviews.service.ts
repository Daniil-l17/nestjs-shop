import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/database.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly databaseService:PrismaService){}

  async create(createReviewDto: Prisma.ReviewCreateInput) {
    return this.databaseService.review.create({
      data: createReviewDto
    })
  }

  async findAll() {
    return this.databaseService.review.findMany()
  }


  async update(id: number, updateReviewDto: Prisma.ReviewUpdateInput) {
    return this.databaseService.review.update({
      where: {
        id: id
      },
      data: updateReviewDto
    })
  }

  async remove(id: number) {
    const Review = await this.databaseService.review.delete({
      where: {
        id: id
      }
    })
    return Review.id
  }
}
