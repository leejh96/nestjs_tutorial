import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { BoardModel } from './board.model';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService){}
  @Get()
  getAllBoard(): BoardModel[] {
    return this.boardService.getAllBoards();
  }
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() body: CreateBoardDto): BoardModel {
    return this.boardService.createBoard(body);
  }

  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id): BoardModel {
    return this.boardService.getBoardById(id);
  }

  @Put('/:id')
  updateBoardById(
    @Param('id') id,
    @Body() body,
    @Body('status', BoardStatusValidationPipe)
    status ): BoardModel {
    return this.boardService.updateBoardById(id, body);
  }

  @Delete('/:id')
  deleteBoardById(@Param('id') id): void {
    return this.boardService.deleteBoardById(id);
  }
}
