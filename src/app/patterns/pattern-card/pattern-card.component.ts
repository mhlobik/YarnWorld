import { Component, Input } from "@angular/core";
import { Pattern } from "../../shared/models/pattern";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'pattern-card',
    templateUrl: './pattern-card.component.html'
})
export class PatternCardComponent {
    @Input('pattern') pattern = new Pattern();

    constructor(private router: Router, private route: ActivatedRoute) { }

    onViewDetails() {
        this.router.navigate([this.pattern.id], { relativeTo: this.route });
    }
}
