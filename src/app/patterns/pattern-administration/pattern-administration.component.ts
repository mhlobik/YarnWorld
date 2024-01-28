import { Component } from "@angular/core";

@Component({
    selector: 'pattern-administration',
    templateUrl: './pattern-administration.component.html'
})
export class PatternAdministrationComponent {
    constructor() { }

    onAddNewPattern() {
        console.log('onAddNewPattern');
    }
}
