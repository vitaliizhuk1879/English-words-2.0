export function getCacheStatistics() {

    const units = JSON.parse(localStorage.getItem('units') || '[]');

    let wordsCount = 0;

    for (const unit of units) {

        const words = JSON.parse(
            localStorage.getItem(`words_${unit.id}`) || '[]'
        );

        wordsCount += words.length;
    }

    return {
        unitsCount: units.length,
        wordsCount,
    };
}