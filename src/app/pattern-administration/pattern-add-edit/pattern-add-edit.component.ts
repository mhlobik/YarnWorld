import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChildren, ViewEncapsulation } from "@angular/core";
import { Pattern } from "../../shared/models/pattern";
import { MessageComponent } from "../../core/message/message.component";
import { PatternService } from "../../shared/services/pattern.service";
import { PatternCategoryEnum } from "../../shared/models/pattern-category";
import { PatternCraftTypeEnum } from "../../shared/models/pattern-craft-type";
import { HelperService } from "../../shared/services/helper.service";

export interface BaseSelection {
    id: string;
    label: string;
}

export interface CategorySelection extends BaseSelection {
    enum: PatternCategoryEnum;
}

export interface CraftTypeSelection extends BaseSelection {
    enum: PatternCraftTypeEnum;
}

@Component({
    selector: 'pattern-add-edit',
    templateUrl: './pattern-add-edit.component.html',
    styleUrl: './pattern-add-edit.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class PatternAddEditComponent extends MessageComponent implements OnInit {
    @Input('openPatternDialog') openPatternDialog = false;
    @Input('pattern') pattern: Pattern | undefined;

    @Output() dialogClosed = new EventEmitter<boolean>();

    isEdit = false;
    submitted = false;
    loading = false;
    error = false;

    categories: CategorySelection[] = [
        { id: 'category' + PatternCategoryEnum.Clothing, label: 'Clothing', enum: PatternCategoryEnum.Clothing },
        { id: 'category' + PatternCategoryEnum.Pets, label: 'Pets', enum: PatternCategoryEnum.Pets },
        { id: 'category' + PatternCategoryEnum.Toys, label: 'Toys', enum: PatternCategoryEnum.Toys },
        { id: 'category' + PatternCategoryEnum.Accessories, label: 'Accessories', enum: PatternCategoryEnum.Accessories }
    ]; // TODO get from service
    selectedPatternCategory: CategorySelection | undefined;

    craftTypes: CraftTypeSelection[] = [
        { id: 'craftType' + PatternCraftTypeEnum.Crochet, label: 'Crochet', enum: PatternCraftTypeEnum.Crochet },
        { id: 'craftType' + PatternCraftTypeEnum.Knitting, label: 'Knitting', enum: PatternCraftTypeEnum.Knitting },
        { id: 'craftType' + PatternCraftTypeEnum.LoomKnitting, label: 'Loom Knitting', enum: PatternCraftTypeEnum.LoomKnitting },
        { id: 'craftType' + PatternCraftTypeEnum.MachineKnitting, label: 'Machine Knitting', enum: PatternCraftTypeEnum.MachineKnitting }
    ]; // TODO  get from service

    constructor(injector: Injector, private patternService: PatternService, private helperService: HelperService) {
        super(injector);
    }

    ngOnInit(): void {
        this.loading = true;
        if (this.pattern && this.pattern.id) {
            this.isEdit = true;
            this.subsctiption.add(this.patternService.getPattern(this.pattern.id).subscribe(result => {
                this.pattern = result;
                this.selectedPatternCategory = this.categories.find(category => category.enum === this.pattern?.category);
                this.loading = false;
            }));
        } else {
            this.isEdit = false;
            this.selectedPatternCategory = this.categories[0];
            this.pattern = new Pattern();
            this.pattern.craftType = this.craftTypes[0].enum;
            this.loading = false;
        }
    }

    savePattern() {
        this.submitted = true;
        this.loading = true;
        if (this.pattern) {
            this.error = !this.pattern.title || !this.pattern.description || !this.pattern.author || !this.pattern.image;
            if (!this.error) {
                if (this.isEdit) {
                    this.patternService.updatePattern(this.pattern).subscribe({
                        complete: () => {
                            this.addMessageSuccess('Pattern Updated');
                            this.loading = false;
                            this.hideDialog();
                        },
                        error: () => {
                            this.addMessageSuccess('Pattern has not been updated');
                            this.error = true;
                            this.loading = false;
                        }
                    });
                } else {
                    this.pattern.id = this.helperService.createId();
                    this.patternService.createPattern(this.pattern).subscribe({
                        complete: () => {
                            this.addMessageSuccess('Pattern Created');
                            this.loading = false;
                            this.hideDialog();
                        },
                        error: () => {
                            this.addMessageSuccess('Pattern has not been created');
                            this.error = true;
                            this.loading = false;
                        }
                    });
                }
            }
        } else {
            this.error = true;
        }
    }

    hideDialog() {
        this.openPatternDialog = false;
        this.dialogClosed.emit(true);
    }

    patternCategoryChanged(event: CategorySelection) {
        if (this.pattern && event) {
            this.pattern = { ...this.pattern, category: event.enum };
        }
    }

    fileUploadClicked(event: { files: Blob[] }) {
        const blob = event.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const base64data = reader.result as string;
            if (this.pattern) {
                this.pattern.image = base64data;
            }
        };
    }
}
