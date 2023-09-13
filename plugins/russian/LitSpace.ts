import { Chapter, Novel, Plugin } from "@typings/plugin";
import { FilterInputs } from "@libs/filterInputs";
import { fetchApi, fetchFile } from "@libs/fetch";
import { NovelStatus } from "@libs/novelStatus";
import { load as parseHTML } from "cheerio";

export const id = "freedlit.space";
export const name = "LitSpace";
export const site = "https://freedlit.space";
export const version = "1.0.0";
export const icon = "src/ru/freedlit/icon.png";

export const popularNovels: Plugin.popularNovels = async function (
  page,
  { showLatestNovels, filters },
) {
  let url = site + "/books/";
  url += (filters?.genre || "all") + "?sort=";
  url += showLatestNovels ? "recent" : filters?.sort || "popular";
  url += "&status=" + (filters?.status || "all");
  url += "&access=" + (filters?.access || "all");
  url += "&adult=" + (filters?.adult || "hide");
  url += "&page=" + page;

  const result = await fetchApi(url);
  const body = await result.text();
  const loadedCheerio = parseHTML(body);

  let novels: Novel.Item[] = [];
  loadedCheerio("#bookListBlock > div > div").each(function () {
    const name = loadedCheerio(this).find("div > h4 > a").text()?.trim();
    const cover = loadedCheerio(this).find("div > a > img").attr("src")?.trim();
    const url = loadedCheerio(this).find("div > h4 > a").attr("href")?.trim();
    if (!name || !url) return;

    novels.push({ name, cover, url });
  });

  return novels;
};

export const parseNovelAndChapters: Plugin.parseNovelAndChapters =
  async function (novelUrl) {
    const result = await fetchApi(novelUrl);
    const body = await result.text();
    const loadedCheerio = parseHTML(body);

    let novel: Novel.instance = {
      url: novelUrl,
      name: loadedCheerio(".book-info > h4").text(),
      cover: loadedCheerio(".book-cover > div > img").attr("src")?.trim(),
      summary: loadedCheerio("#nav-home").text()?.trim(),
      author: loadedCheerio(".book-info > h5 > a").text(),
      genres: loadedCheerio(".genre-list > a")
        .map((index, element) => loadedCheerio(element).text()).get().join(","),
    };

    let chapters: Chapter.Item[] = [];

    loadedCheerio("#nav-contents > div").each(function () {
      const name = loadedCheerio(this).find("a").text();
      const releaseTime = loadedCheerio(this).find('span[class="date"]').text();
      const url = loadedCheerio(this).find("a").attr("href");
      if (!name || !url) return;

      chapters.push({ name, releaseTime, url });
    });

    novel.chapters = chapters.reverse();
    return novel;
  };

export const parseChapter: Plugin.parseChapter = async function (chapterUrl) {
  const result = await fetchApi(chapterUrl);
  const body = await result.text();
  const loadedCheerio = parseHTML(body);

  loadedCheerio('div[class="standart-block"]').remove();
  loadedCheerio('div[class="mobile-block"]').remove();

  const chapterText = loadedCheerio('div[class="chapter"]').html();
  return chapterText;
};

export const searchNovels: Plugin.searchNovels = async function (searchTerm) {
  const url = `${site}/search?query=${searchTerm}&type=all`;
  const result = await fetchApi(url);
  const body = await result.text();
  const loadedCheerio = parseHTML(body);

  let novels: Novel.Item[] = [];
  loadedCheerio("#bookListBlock > div").each(function () {
    const name = loadedCheerio(this).find("h4 > a").text()?.trim();
    const cover = loadedCheerio(this).find("a > img").attr("src")?.trim();
    const url = loadedCheerio(this).find("h4 > a").attr("href")?.trim();
    if (!name || !url) return;

    novels.push({ name, cover, url });
  });

  return novels;
};

export const filters = [
  {
    key: "sort",
    label: "Сортировка",
    values: [
      { label: "По популярности", value: "popular" },
      { label: "По количеству комментариев", value: "comments" },
      { label: "По количеству лайков", value: "likes" },
      { label: "По новизне", value: "recent" },
      { label: "По просмотрам", value: "views" },
    ],
    inputType: FilterInputs.Picker,
  },
  {
    key: "genre",
    label: "Жанры:",
    values: [
      { label: "Любой жанр", value: "all" },
      { label: "Альтернативная история", value: "alternative-history" },
      { label: "Антиутопия", value: "dystopia" },
      { label: "Бизнес-литература", value: "business-literature" },
      { label: "Боевая фантастика", value: "combat-fiction" },
      { label: "Боевик", value: "action" },
      { label: "Боевое фэнтези", value: "combat-fantasy" },
      { label: "Бояръ-Аниме", value: "boyar-anime" },
      { label: "Героическая фантастика", value: "heroic-fiction" },
      { label: "Героическое фэнтези", value: "heroic-fantasy" },
      { label: "Городское фэнтези", value: "urban-fantasy" },
      { label: "Гримдарк", value: "grimdark" },
      { label: "Детектив", value: "mystery" },
      { label: "Детская литература", value: "kids-literature" },
      { label: "Документальная проза", value: "biography" },
      { label: "Историческая проза", value: "historical-fiction" },
      { label: "Исторический детектив", value: "historical-mystery" },
      {
        label: "Исторический любовный роман",
        value: "historical-romantic-novel",
      },
      { label: "Историческое фэнтези", value: "historical-fantasy" },
      { label: "Киберпанк", value: "cyberpunk" },
      { label: "Космическая фантастика", value: "cosmic-fiction" },
      { label: "ЛитРПГ", value: "litrpg" },
      { label: "Лоу / Низкое фэнтези", value: "low-fantasy" },
      { label: "Любовное фэнтези", value: "romantic-fantasy" },
      { label: "Любовный роман", value: "romantic-novel" },
      { label: "Мистика", value: "mystic" },
      { label: "Мистический детектив", value: "mystic-detective" },
      { label: "Научная фантастика", value: "science-fiction" },
      { label: "Подростковая проза", value: "young-adult" },
      { label: "Политический роман", value: "political-romance" },
      { label: "Попаданцы", value: "accidental-travel" },
      { label: "Попаданцы в магические миры", value: "magic-worlds-travel" },
      { label: "Попаданцы во времени", value: "time-travel" },
      { label: "Порнотика", value: "pornotica" },
      { label: "Постапокалипсис", value: "post-apocalypse" },
      { label: "Поэзия", value: "poetry" },
      { label: "Приключения", value: "adventure" },
      { label: "Публицистика", value: "journalism" },
      { label: "Пьеса", value: "play" },
      { label: "Развитие личности", value: "how-to-book" },
      { label: "Разное", value: "other" },
      { label: "Реализм", value: "Realism" },
      { label: "РеалРПГ", value: "realrpg" },
      { label: "Репликация", value: "replication" },
      { label: "Романтическая эротика", value: "romantic-erotic-fiction" },
      { label: "Сказка", value: "fairy-tale" },
      { label: "Слэш", value: "slash" },
      { label: "Современная проза", value: "modern-prose" },
      { label: "Современный любовный роман", value: "modern-romantic-novel" },
      { label: "Социальная фантастика", value: "social-fiction" },
      { label: "Стимпанк", value: "steampunk" },
      { label: "Сценарий", value: "scenario" },
      { label: "Сюаньхуань", value: "xuanhuan" },
      { label: "Сянься", value: "xianxia" },
      { label: "Тёмное фэнтези", value: "dark-fantasy" },
      { label: "Триллер", value: "thriller" },
      { label: "Уся", value: "wuxia" },
      { label: "Фантастика", value: "fiction" },
      { label: "Фантастический детектив", value: "mystery-fiction" },
      { label: "Фанфик", value: "fan-fiction" },
      { label: "Фемслэш", value: "femslash" },
      { label: "Фэнтези", value: "fantasy" },
      { label: "Хоррор", value: "horror" },
      { label: "Шпионский детектив", value: "spy-crime" },
      { label: "Эпическое фэнтези", value: "epic-fantasy" },
      { label: "Эротика", value: "erotic-fiction" },
      { label: "Эротическая фантастика", value: "erotic-fiction" },
      { label: "Эротический фанфик", value: "erotic-fan-fiction" },
      { label: "Эротическое фэнтези", value: "erotic-fantasy" },
      { label: "Этническое фэнтези", value: "ethnic-fantasy" },
      { label: "Юмор", value: "humor" },
      { label: "Юмористическая фантастика", value: "humor-fiction" },
      { label: "Юмористическое фэнтези", value: "humor-fantasy" },
      { label: "RPS", value: "rps" },
    ],
    inputType: FilterInputs.Picker,
  },
  {
    key: "status",
    label: "Статус:",
    values: [
      { label: "Любой статус", value: "all" },
      { label: "В процессе", value: "in-process" },
      { label: "Завершено", value: "finished" },
    ],
    inputType: FilterInputs.Picker,
  },
  {
    key: "access",
    label: "Доступ:",
    values: [
      { label: "Любой доступ", value: "all" },
      { label: "Бесплатные", value: "free" },
      { label: "Платные", value: "paid" },
    ],
    inputType: FilterInputs.Picker,
  },
  {
    key: "adult",
    label: "Возрастные ограничения:",
    values: [
      { label: "Скрыть 18+", value: "hide" },
      { label: "Показать +18", value: "show" },
    ],
    inputType: FilterInputs.Picker,
  },
];
export const fetchImage: Plugin.fetchImage = fetchFile;