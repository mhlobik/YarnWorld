import { Component, OnInit } from "@angular/core";
import { PatternService } from "../../shared/services/pattern.service";
import { Observable } from "rxjs";
import { Pattern } from "../../shared/models/pattern";

@Component({
    selector: 'pattern-list',
    templateUrl: './pattern-list.component.html',
    styleUrl: './pattern-list.component.scss'
})
export class PatternListComponent implements OnInit {
    patterns$: Observable<Pattern[]> | undefined;

    constructor(private patternService: PatternService) { }

    ngOnInit(): void {
        this.patterns$ = this.patternService.getPatterns();
    }
}
