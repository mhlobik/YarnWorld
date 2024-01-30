import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from "@angular/core";
import { PatternCategoryEnum } from "../../shared/models/pattern-category";

@Component({
    selector: 'pattern-category',
    templateUrl: './pattern-category.component.html',
    styleUrl: './pattern-category.component.scss'
})
export class PatternCategoryComponent implements OnInit, OnChanges {
    @Input('category') category: PatternCategoryEnum | undefined;
    categoryLabel: string | undefined;
    categoryBackgroundColor: string | undefined;
    categoryColor: string | undefined;

    constructor() { }

    ngOnInit(): void {
        this.getData();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes['category'] && changes['category'].currentValue !== changes['category'].previousValue) {
            this.getData();
        }
    }

    getData() {
        switch (this.category) {
            case PatternCategoryEnum.Accessories:
                this.categoryLabel = 'Accessories';
                this.categoryBackgroundColor = '--yellow-500';
                this.categoryColor = '--yellow-100';
                break;
            case PatternCategoryEnum.Clothing:
                this.categoryLabel = 'Clothing';
                this.categoryBackgroundColor = '--blue-500';
                this.categoryColor = '--blue-100';
                break;
            case PatternCategoryEnum.Pets:
                this.categoryLabel = 'Pets';
                this.categoryBackgroundColor = '--indigo-500';
                this.categoryColor = '--indigo-100';
                break;
            case PatternCategoryEnum.Toys:
                this.categoryLabel = 'Toys';
                this.categoryBackgroundColor = '--teal-500';
                this.categoryColor = '--teal-100';
                break;
            default:
                this.categoryLabel = 'None';
        }
    }
}
