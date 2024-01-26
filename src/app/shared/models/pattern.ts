import { CategoryEnum } from "./category";
import { CraftTypeEnum } from "./craft-type";

export class Pattern {
    id: number = 0;
    title: string | undefined;
    description: string | undefined;
    author: string | undefined;
    image: string | undefined;
    craftType?: CraftTypeEnum;
    category?: CategoryEnum;
    patternUrl?: string;
    publishedDate?: Date;
    languages?: string[];
}