import { Injectable } from '@nestjs/common';
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
