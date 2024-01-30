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
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SidebarModule } from 'primeng/sidebar';

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
        TooltipModule,
        MenuModule,
        TableModule,
        ConfirmDialogModule,
        DialogModule,
        RadioButtonModule,
        ToastModule,
        DropdownModule,
        InputTextareaModule,
        SidebarModule
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
        TooltipModule,
        MenuModule,
        TableModule,
        ConfirmDialogModule,
        DialogModule,
        RadioButtonModule,
        ToastModule,
        DropdownModule,
        InputTextareaModule,
        SidebarModule
    ]
})
export class PrimeNGModule { }