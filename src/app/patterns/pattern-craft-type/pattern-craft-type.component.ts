import { Component, Input } from "@angular/core";
import { PatternCraftTypeEnum } from "../../shared/models/pattern-craft-type";

@Component({
    selector: 'pattern-craft-type',
    templateUrl: './pattern-craft-type.component.html',
    styleUrl: './pattern-craft-type.component.scss'
})
export class PatternCraftTypeComponent {
    @Input('type') type: PatternCraftTypeEnum | undefined;
    typeLabel: string | undefined;
    typeBackgroundColor: string | undefined;
    typeColor: string | undefined;

    constructor() { }

    ngOnInit(): void {
        switch (this.type) {
            case PatternCraftTypeEnum.Crochet:
                this.typeLabel = 'Crochet';
                this.typeBackgroundColor = '--cyan-500';
                this.typeColor = '--cyan-100';
                break;
            case PatternCraftTypeEnum.Knitting:
                this.typeLabel = 'Knitting';
                this.typeBackgroundColor = '--pink-500';
                this.typeColor = '--pink-100';
                break;
            case PatternCraftTypeEnum.LoomKnitting:
                this.typeLabel = 'Loom Knitting';
                this.typeBackgroundColor = '--orange-500';
                this.typeColor = '--orange-100';
                break;
            case PatternCraftTypeEnum.MachineKnitting:
                this.typeLabel = 'Machine Knitting';
                this.typeBackgroundColor = '--red-500';
                this.typeColor = '--red-100';
                break;
            default:
                this.typeLabel = 'None';
        }
    }
}
