import googleTranslate from './google-translate';

class TranslationService {

    translateToAlbanian(word) {
           return googleTranslate.translate(word,'al').promise();
    }

    translateToEnglish(word) {
        return googleTranslate.translate(word,'en').promise();
    }
}

export default TranslationService;