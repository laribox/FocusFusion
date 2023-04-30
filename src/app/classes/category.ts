export class Category {
  id: string;
  name: string;
  icon: string;
  user_id: number;
  created?: string;
  updated?: string;

  constructor(
    id: string,
    name: string,
    icon: string,
    user_id: number,
    created?: string,
    updated?: string
  ) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.user_id = user_id;
    this.created = created;
    this.updated = updated;
  }
}
