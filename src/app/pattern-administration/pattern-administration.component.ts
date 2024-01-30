import { Component, Injector, ViewChild } from "@angular/core";
import { PatternService } from "../shared/services/pattern.service";
import { Pattern } from "../shared/models/pattern";
import { ConfirmationService } from "primeng/api";
import { MessageComponent } from "../core/message/message.component";
import { Table } from "primeng/table";

@Component({
    selector: 'pattern-administration',
    templateUrl: './pattern-administration.component.html'
})
export class PatternAdministrationComponent extends MessageComponent {
    patternDialog = false;
    patterns!: Pattern[];
    pattern!: Pattern;
    isLoading = false;
    globalSearchValue = '';

    constructor(
        private patternService: PatternService,
        private confirmationService: ConfirmationService,
        injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.isLoading = true;
        this.subsctiption.add(this.patternService.getPatterns().subscribe((data) => {
            this.patterns = data;
            this.isLoading = false;
        }));
    }

    openNew() {
        this.pattern = new Pattern();
        this.patternDialog = true;
    }

    editPattern(pattern: Pattern) {
        this.pattern = { ...pattern };
        this.patternDialog = true;
    }

    deletePattern(pattern: Pattern) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + pattern.title + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.patternService.deletePattern(pattern.id).subscribe({
                    complete: () => {
                        this.addMessageSuccess('Pattern Deleted');
                        this.getData();
                        this.pattern = new Pattern();
                    },
                    error: () => {
                        this.addMessageError('Pattern has not been deleted');
                    }
                });
            },
            key: 'deleteDialog'
        });
    }

    closeDialog(event: any) {
        this.patternDialog = false;
        this.getData();
    }
}
