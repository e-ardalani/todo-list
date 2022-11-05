import {Task} from '../../todo-list/models/task-model';

export interface User {
  uid: string;
  email: string;
  photoURL: string;
  firstName?: string;
  lastName?: string;
  emailVerified: boolean;
  tasks?: Task[];
}

