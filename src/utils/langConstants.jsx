const lang = {
	en: {
		search: "Search",
		gptSearchPlaceholder: "What would you like to watch today?",
	},
	hindi: {
		search: "खोज",
		gptSearchPlaceholder: "आज आप क्या देखना चाहेंगे?",
	},
	punjabi: {
		search: "ਖੋਜ",
		gptSearchPlaceholder: "ਤੁਸੀਂ ਅੱਜ ਕੀ ਦੇਖਣਾ ਚਾਹੋਗੇ?",
	},
	spanish: {
		search: "Buscar",
		gptSearchPlaceholder: "¿Qué te gustaría ver hoy?",
	},
};

export const SUPPORTED_LANGUAGES = [
	{
		identifier: "en",
		name: "English",
	},
    {
        identifier: "punjabi",
        name: "Punjabi",
    },
	{
		identifier: "hindi",
		name: "Hindi",
	},
	{
		identifier: "spanish",
		name: "Spanish",
	},
];

export default lang;
