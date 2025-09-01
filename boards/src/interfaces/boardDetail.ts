import { ListColumn } from "./listColumn";
import { Task } from "./task";

export interface BoardDetail {
id: string;
name: string;
description?: string;
lists: ListColumn[];
tasks: Record<string, Task>;
}