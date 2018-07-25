/// <reference types="grecaptcha" />
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
export declare class RecaptchaLoaderService {
    private readonly platformId;
    ready: Observable<ReCaptchaV2.ReCaptcha>;
    constructor(platformId: any);
}
