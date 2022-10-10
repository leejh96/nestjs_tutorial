import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardModel } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { v4 as uuid } from 'uuid';
@Injectable()
export class BoardService {
  private boards: BoardModel[] = [];

  getAllBoards(): BoardModel[] {
    return this.boards;
  }
  getBoardById(id: string): BoardModel {
    const board = this.boards.find((board) => board.id === id);
    if (!board) {
      throw new NotFoundException('Not Found Board Data');
    }
    return board;
  }
  createBoard(body: CreateBoardDto) {
    const { title, description, status } = body;
    const board: BoardModel = {
      id: uuid(),
      title,
      description,
      status,
    };

    this.boards.push(board);
    return board;
  }
  updateBoardById(id: string, body: CreateBoardDto): BoardModel {
    const { title, description, status } = body;

    const board = this.boards.find((board) => board.id === id);
    board.title = title;
    board.description = description;
    board.status = status;
    return board;
  }
  deleteBoardById(id: string): void {
    this.getBoardById(id);
    this.boards = this.boards.filter((item) => item.id !== id);
  }
}
