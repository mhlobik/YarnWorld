import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { CategoryEnum } from "../../shared/models/category";

@Component({
    selector: 'pattern-category',
    templateUrl: './pattern-category.component.html',
    styleUrl: './pattern-category.component.scss'
})
export class PatternCategoryComponent implements OnInit {
    @Input('category') category: CategoryEnum | undefined;
    categoryLabel: string | undefined;
    categoryBackgroundColor: string | undefined;
    categoryColor: string | undefined;

    constructor() { }

    ngOnInit(): void {
        switch (this.category) {
            case CategoryEnum.Accessories:
                this.categoryLabel = 'Accessories';
                this.categoryBackgroundColor = '--yellow-500';
                this.categoryColor = '--yellow-100';
                break;
            case CategoryEnum.Clothing:
                this.categoryLabel = 'Clothing';
                this.categoryBackgroundColor = '--blue-500';
                this.categoryColor = '--blue-100';
                break;
            case CategoryEnum.Pets:
                this.categoryLabel = 'Pets';
                this.categoryBackgroundColor = '--indigo-500';
                this.categoryColor = '--indigo-100';
                break;
            case CategoryEnum.Toys:
                this.categoryLabel = 'Toys';
                this.categoryBackgroundColor = '--teal-500';
                this.categoryColor = '--teal-100';
                break;
            default:
                this.categoryLabel = 'None';
        }
    }
}
