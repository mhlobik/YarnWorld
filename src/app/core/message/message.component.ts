import { Injectable, Injector, OnDestroy } from "@angular/core";
import { MessageService } from "primeng/api";
import { Subscription } from "rxjs";

@Injectable()
export abstract class MessageComponent implements OnDestroy {
    protected readonly subsctiption: Subscription;
    protected messageService: MessageService;

    constructor(injector: Injector) {
        this.subsctiption = new Subscription();
        this.messageService = injector.get(MessageService);
    }
    ngOnDestroy(): void {
        this.subsctiption?.unsubscribe();
    }

    addMessageSuccess(message: string) {
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: message
        });
    }

    addMessageError(message: string) {
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: message
        });
    }
}