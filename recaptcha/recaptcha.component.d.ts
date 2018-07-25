/// <reference types="grecaptcha" />
import { AfterViewInit, ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { RecaptchaLoaderService } from './recaptcha-loader.service';
import { RecaptchaSettings } from './recaptcha-settings';
export declare class RecaptchaComponent implements AfterViewInit, OnDestroy, OnChanges {
    private elementRef;
    private loader;
    private zone;
    id: string;
    siteKey: string;
    theme: ReCaptchaV2.Theme;
    type: ReCaptchaV2.Type;
    size: ReCaptchaV2.Size;
    tabIndex: number;
    badge: ReCaptchaV2.Badge;
    lang: string;
    resolved: EventEmitter<string>;
    private allowedLangs;
    constructor(elementRef: ElementRef, loader: RecaptchaLoaderService, zone: NgZone, settings?: RecaptchaSettings);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Executes the invisible recaptcha.
     * Does nothing if component's size is not set to "invisible".
     */
    execute(): void;
    reset(): void;
}
