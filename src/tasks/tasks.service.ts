import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.interface';
import { CreateDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  createTask(createDto: CreateDto): Task {
    const { title, description } = createDto;
    const task: Task = {
      id: `${Math.random()}`.slice(2),
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

  getFilteredTasks(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const idx = this.getTaskIndex(id);
    return this.tasks[idx];
  }

  updateTask(id: string, status: TaskStatus): Task {
    const idx = this.getTaskIndex(id);
    this.tasks[idx].status = status;
    return this.tasks[idx];
  }

  deleteTask(id): Task {
    const idx = this.getTaskIndex(id);
    return this.tasks.splice(idx, 1)[0];
  }

  getTaskIndex(id: string): number {
    const idx = this.tasks.findIndex(task => task.id === id);
    if (idx === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return idx;
  }
}
