import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform
} from '@nestjs/common';
import { BoardStatus } from '../board.model'
export class BoardStatusValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const boardStatus = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

    if (!boardStatus.includes(value)) {
      throw new BadRequestException('Check Status Data!!');
    }
    return value;
  }
}