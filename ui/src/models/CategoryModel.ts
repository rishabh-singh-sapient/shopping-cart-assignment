export class CategoryModel {
  constructor(
    public id: string,
    public name: string,
    public order: number,
    public description?: string,
    public imageUrl?: string,
    public key?: string,
    public enabled?: number
  ) {}
}
