import { BoardStatus } from '../board.model';
import { IsNotEmpty, IsEnum } from 'class-validator';
export class CreateBoardDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsEnum(BoardStatus)
  status: BoardStatus;
}
