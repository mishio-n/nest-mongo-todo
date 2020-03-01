import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class UpdateDoneTodoGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const body = context.switchToHttp().getRequest().body;
    // false -> true の変更のみ許可する
    if ('isDone' in body && !body.isDone) {
      return false;
    }
    return true;
  }
}
