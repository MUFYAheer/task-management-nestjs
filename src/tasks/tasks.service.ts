import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.interface';
import { CreateDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  createTask(createDto: CreateDto): Task {
    const { title, description } = createDto;
    const task: Task = {
      id: `${Math.random()}`,
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  updateTask(id: string, status: TaskStatus): Task {
    const index = this.tasks.findIndex(task => task.id === id);
    this.tasks[index].status = status;
    return this.tasks[index];
  }

  deleteTask(id): Task {
    const index = this.tasks.findIndex(task => task.id === id);
    return this.tasks.splice(index, 1)[0];
  }
}
