const express = require("express");
const cheerio = require("cheerio");
const fetch = require("node-fetch");

const baseUrl = "https://boxnovel.com/novel";
const searchUrl = "https://boxnovel.com/";

const router = express.Router();

// Top novels

router.get("/novels/:pageNo/", async (req, res) => {
    const orderBy = req.params.orderBy;

    let url1 = `${baseUrl}/page/1/?m_orderby=${orderBy}`;
    let url2 = `${baseUrl}/page/2/?m_orderby=${orderBy}`;
    let url3 = `${baseUrl}/page/3/?m_orderby=${orderBy}`;
    let url4 = `${baseUrl}/page/4/?m_orderby=${orderBy}`;

    const page1 = await scraper(url1);
    const page2 = await scraper(url2);
    const page3 = await scraper(url3);
    const page4 = await scraper(url4);

    res.json([...page1, ...page2, ...page3, ...page4]);
});

// Novel

router.get("/novel/:novelUrl", async (req, res) => {
    const novelUrl = req.params.novelUrl;
    const url = `${baseUrl}/${novelUrl}/`;

    const result = await fetch(url);
    const body = await result.text();

    $ = cheerio.load(body);

    let novel = {};

    $(".post-title > h3 > span").remove();

    novel.extensionId = 1;

    novel.sourceName = "BoxNovel";

    novel.sourceUrl = url;

    novel.novelUrl = `${novelUrl}/`;

    novel.novelName = $(".post-title > h3")
        .text()
        .replace(/[\t\n]/g, "")
        .trim();

    novel.novelCover = $(".summary_image > a > img").attr("src");

    $(".post-content_item").each(function (result) {
        detailName = $(this)
            .find(".summary-heading > h5")
            .text()
            .replace(/[\t\n]/g, "")
            .trim();
        detail = $(this)
            .find(".summary-content")
            .text()
            .replace(/[\t\n]/g, "")
            .trim();

        novel[detailName] = detail;
    });

    $(".description-summary > div.summary__content").find("em").remove();

    novel.novelSummary = $(".description-summary > div.summary__content > div")
        .text()
        .replace(/[\t\n]/g, "");

    let novelChapters = [];

    $(".wp-manga-chapter").each(function (result) {
        chapterName = $(this)
            .find("a")
            .text()
            .replace(/[\t\n]/g, "")
            .trim();

        releaseDate = $(this)
            .find("span")
            .text()
            .replace(/[\t\n]/g, "")
            .trim();

        chapterUrl = $(this).find("a").attr("href").replace(url, "");

        novelChapters.push({ chapterName, releaseDate, chapterUrl });
    });

    novel.novelChapters = novelChapters.reverse();

    res.json(novel);
});

// Chapter

router.get("/novel/:novelUrl/:chapterUrl", async (req, res) => {
    let novelUrl = req.params.novelUrl;
    let chapterUrl = req.params.chapterUrl;

    const url = `${baseUrl}/${novelUrl}/${chapterUrl}`;

    const result = await fetch(url);
    const body = await result.text();

    $ = cheerio.load(body);

    const chapterName = $("div.text-left > h3").text();
    const chapterText = $(".reading-content").text();

    let nextChapter = null;

    if ($(".nav-next").length) {
        nextChapter = $(".nav-next")
            .find("a")
            .attr("href")
            .replace(baseUrl + "/" + novelUrl + "/", "");
    }

    let prevChapter = null;

    if ($(".nav-previous").length) {
        prevChapter = $(".nav-previous")
            .find("a")
            .attr("href")
            .replace(baseUrl + "/" + novelUrl + "/", "");
    }

    novelUrl = novelUrl + "/";
    chapterUrl = chapterUrl + "/";

    const chapter = {
        extensionId: 1,
        novelUrl,
        chapterUrl,
        chapterName,
        chapterText,
        nextChapter,
        prevChapter,
    };

    res.json(chapter);
});

// Search

router.get("/search/", async (req, res) => {
    const searchTerm = req.query.s;
    const orderBy = req.query.o;

    const url = `${searchUrl}?s=${searchTerm}&post_type=wp-manga&m_orderby=${orderBy}`;

    const result = await fetch(url);
    const body = await result.text();

    $ = cheerio.load(body);

    let novels = [];

    $(".c-tabs-item__content").each(function (result) {
        const novelName = $(this).find("h4 > a").text();
        const novelCover = $(this).find("img").attr("src");

        let novelUrl = $(this).find("h4 > a").attr("href");
        novelUrl = novelUrlreplace(`${baseUrl}/`, "");

        const novel = {
            extensionId: 1,
            novelName,
            novelCover,
            novelUrl,
        };

        novels.push(novel);
    });

    res.json(novels);
});

module.exports = router;

const scraper = async (url) => {
    const result = await fetch(url);
    const body = await result.text();

    let novels = [];

    $ = cheerio.load(body);

    $(".page-item-detail").each(function (result) {
        const novelName = $(this).find("h5 > a").text();
        const novelCover = $(this).find("img").attr("src");

        let novelUrl = $(this).find("h5 > a").attr("href");
        novelUrl = novelUrl.replace(`${baseUrl}/`, "");

        const novel = {
            extensionId: 1,
            novelName,
            novelCover,
            novelUrl,
        };

        novels.push(novel);
    });

    return novels;
};
