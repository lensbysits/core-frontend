import {MissingTranslationHandler, MissingTranslationHandlerParams} from '@ngx-translate/core';

export class LensMissingTranslationHandler implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams) {
        console.error(`Translation missing for key '${params.key}'`)
        return "Translation missing"
    }
}