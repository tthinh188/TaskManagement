import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { Observable } from "rxjs";

export interface CanLeave {
    canDeactivate: () => Observable<any> | Promise<any> | boolean;
}

@Injectable({
    providedIn: 'root'
})
export class DeactivateGaurdService implements CanDeactivate<CanLeave> {

    canDeactivate(component: CanLeave) {
        if (component.canDeactivate) {
            return component.canDeactivate();
        }
        return true;
    }
}