import { NgModule } from "@angular/core";

import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
    imports: [
        ButtonModule,
        FileUploadModule
    ],
    exports: [
        ButtonModule,
        FileUploadModule
    ]
})
export class PrimeNGModule { }