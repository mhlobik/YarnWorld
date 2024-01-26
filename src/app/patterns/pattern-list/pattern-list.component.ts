import { Component, OnInit, ViewChild } from "@angular/core";
import { PatternService } from "../../shared/services/pattern.service";
import { Observable } from "rxjs";
import { Pattern } from "../../shared/models/pattern";
import { FileUpload } from "primeng/fileupload";

@Component({
    selector: 'pattern-list',
    templateUrl: './pattern-list.component.html',
    styleUrl: './pattern-list.component.scss'
})
export class PatternListComponent implements OnInit {
    patterns$: Observable<Pattern[]> | undefined;
    model = new Pattern();

    constructor(private patternService: PatternService) { }

    ngOnInit(): void {
        this.patterns$ = this.patternService.getPatterns();
        this.patternService.getPattern(2).subscribe(res => this.model = res);
    }

    onFileUploadClicked(event: { files: Blob[] }) {
        console.log('on file upload clicked', event.files[0]);
        const blob = event.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const base64data = reader.result as string;
            this.model.image = base64data;
            // this.patternService.updatePattern(this.model).subscribe();
        };
    }

    onDelete(id: number) {
        console.log('onDelete', id);
        this.patternService.deletePattern(id).subscribe();
    }
}
