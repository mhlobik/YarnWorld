import { PatternCategoryEnum } from "./pattern-category";
import { PatternCraftTypeEnum } from "./pattern-craft-type";

export class Pattern {
    id!: string;
    title!: string;
    description!: string;
    author!: string;
    image!: string;
    craftType!: PatternCraftTypeEnum;
    category!: PatternCategoryEnum;
    patternUrl?: string;
}