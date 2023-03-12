import { Recommend } from "../models/recommend.model";

/**
 * This class represent a smaller part of the entity.
 * Its includes only the relavnt fields we want to display.
 */
export class RecommendDtoAll {
  id: number;
  title: string;
  content: string;
  color: string
  isRemoveAble: boolean;

  constructor(recommendEntity: Recommend) {
    this.id = recommendEntity.id;
    this.title = recommendEntity.title;
    this.content = recommendEntity.content;
    this.color = recommendEntity.color;
    this.isRemoveAble = recommendEntity.isRemoveAble;
  }
}

export class RecommendDto {
  title: String;
  content: String;
  color: String;
  isRemoveAble: boolean;

  constructor(title: string, content: string, isRemoveAble: boolean, color:string) {
    this.title = title;
    this.content = content;
    this.color = color;
    this.isRemoveAble = isRemoveAble;
  }
}
