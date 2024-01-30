import { Component, OnInit } from "@angular/core";
import { PatternService } from "../../shared/services/pattern.service";
import { BehaviorSubject, Observable, debounceTime, map, merge, of, startWith, switchMap, tap } from "rxjs";
import { Pattern } from "../../shared/models/pattern";

@Component({
    selector: 'pattern-list',
    templateUrl: './pattern-list.component.html',
    styleUrl: './pattern-list.component.scss'
})
export class PatternListComponent implements OnInit {
    searchValue = '';

    patterns$: Observable<{ result: Pattern[], loading: boolean }> | undefined;
    patternsRequestEvent$ = new BehaviorSubject<string>('');

    constructor(private patternService: PatternService) { }

    ngOnInit(): void {
        let patterns: Pattern[];
        const patterns$ = this.patternService.getPatterns().pipe(
            tap(result => { patterns = result }),
            map(patterns => {
                return { result: patterns, loading: false };
            })
        );

        const searchPatterns$ = this.patternsRequestEvent$.pipe(
            debounceTime(500),
            switchMap(value => {
                if (value) {
                    const filteredPatterns = patterns.filter(pattern => pattern.title.toLowerCase().includes(value.toLowerCase()) || pattern.author.toLowerCase().includes(value.toLowerCase()));
                    return of({ loading: false, result: filteredPatterns });
                } else {
                    return of({ loading: false, result: patterns });
                }
            })
        );
        this.patterns$ = merge(patterns$, searchPatterns$).pipe(
            map(patterns => {
                return {
                    result: patterns.result && patterns.result.length > 0 ? patterns.result.sort((a, b) => a.title < b.title ? -1 : 1) : [],
                    loading: false
                };
            }),
            startWith({ result: [], loading: true })
        );
    }

    searchPatterns() {
        this.patternsRequestEvent$.next(this.searchValue);
    }
}
