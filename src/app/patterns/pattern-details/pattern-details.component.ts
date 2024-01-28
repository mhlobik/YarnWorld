import { Component, OnInit } from "@angular/core";
import { Pattern } from "../../shared/models/pattern";
import { PatternService } from "../../shared/services/pattern.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'pattern-details',
    templateUrl: './pattern-details.component.html',
    styleUrl: './pattern-details.component.scss'
})
export class PatternDetailsComponent implements OnInit {
    id = 0;
    pattern = new Pattern();

    constructor(
        private patternService: PatternService,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe(params => this.id = params['id'] ? params['id'] : 0);
    }

    ngOnInit(): void {
        this.patternService.getPattern(this.id).subscribe(res => {
            this.pattern = res;
        });
    }

    navigateToPublishedUrl(patternUrl: string) {
        window.open(patternUrl, '_blank');
    }
}
