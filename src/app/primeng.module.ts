import { NgModule } from "@angular/core";

import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
    imports: [
        ButtonModule,
        FileUploadModule,
        ToolbarModule,
        AvatarModule,
        CardModule,
        PanelModule,
        BrowserModule,
        BrowserAnimationsModule,
        InputTextModule,
        DividerModule,
        ChipModule,
        TooltipModule
    ],
    exports: [
        ButtonModule,
        FileUploadModule,
        ToolbarModule,
        AvatarModule,
        CardModule,
        PanelModule,
        BrowserModule,
        BrowserAnimationsModule,
        InputTextModule,
        DividerModule,
        ChipModule,
        TooltipModule
    ]
})
export class PrimeNGModule { }