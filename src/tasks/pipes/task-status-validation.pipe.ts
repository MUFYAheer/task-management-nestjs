import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task.interface';

export class TaskStatusValidationPipe implements PipeTransform {
  private readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    if (!this.isValidStatus(value)) {
      throw new BadRequestException(`"${value}" is not a valid status`);
    }
  }

  private isValidStatus(status: any): boolean {
    if (this.allowedStatuses.indexOf(status) === -1) {
      return false;
    }
    return true;
  }
}
