import { Parser } from 'htmlparser2';
import { fetchApi, fetchFile } from '@libs/fetch';
import { Plugin } from '@typings/plugin';
import { Filters, FilterTypes } from '@libs/filterInputs';
import { NovelStatus } from '@libs/novelStatus';

class RoyalRoad implements Plugin.PluginBase {
  id = 'royalroad';
  name = 'Royal Road';
  version = '2.0.0';
  icon = 'src/en/royalroad/icon.png';
  site = 'https://www.royalroad.com/';

  async parseNovels(url: string) {
    const html = await fetchApi(url).then(r => r.text());
    const novels: Plugin.NovelItem[] = [];
    let tempNovel = {} as Plugin.NovelItem;
    tempNovel.name = '';
    let isParsingNovel = false;
    let isNovelName = false;
    const parser = new Parser({
      onopentag(name, attribs){
        if (attribs['class']?.includes('fiction-list-item')){
          isParsingNovel = true;
        }
        if (isParsingNovel){
          if (name === 'a' && attribs['class']?.includes('bold')){
            tempNovel.path = attribs['href'].slice(1);
            isNovelName = true;
          }
          if (name === 'img'){
            tempNovel.cover = attribs['src'];
          }
          if (tempNovel.path && tempNovel.name){
            novels.push(tempNovel);
            tempNovel = {} as Plugin.NovelItem;
            tempNovel.name = '';
          }
        }
      },
      ontext(data){
        if(isNovelName){
          tempNovel.name += data;
        }
      },
      onclosetag(name){
        if(name === 'h2'){
          isNovelName = false;
          isParsingNovel = false;
        }
      }
    })
    parser.write(html);
    parser.end();
    return novels;
  }

  async popularNovels(
    page: number,
    { filters }: Plugin.PopularNovelsOptions<typeof this.filters>,
  ): Promise<Plugin.NovelItem[]> {
    let link = `${this.site}fictions/`;

    link += filters.order.value;
    link += `?page=${page}`;

    if (filters.genre.value !== '') link += `&genre=${filters.genre.value}`;

    return await this.parseNovels(link);
  }

  async parseNovel(novelPath: string): Promise<Plugin.SourceNovel> {
    const result = await fetchApi(this.site + novelPath);
    const html = await result.text();
    const novel: Plugin.SourceNovel = {
      path: novelPath,
      name: '',
      summary: '',
      chapters: [],
    }
    let isNovelName = false;
    let isAuthorName = false;
    let isDescription = false;
    let isH4 = false;
    let isSpan = 0
    let isTags = false;
    let isGenres = false;
    let genreArray: string[] = []
    let isFooter = false;
    let isScript = 0;
    let chapterJson: ChapterEntry[] = [];
    let volumeJson: VolumeEntry[] = [];
    const parser = new Parser ({
      onopentag(name,attribs){
        if (name === 'img' && attribs['class']?.includes('thumbnail')){
          novel.cover = attribs['src'];
        }
        if (name === 'span' && attribs['class']?.includes('label-sm')){
          isSpan++;
        }
        if (name === 'span' && attribs['class']?.includes('tags')){
          isTags = true;
        }
      },
      onopentagname(name){
        if (name === 'h1'){
          isNovelName = true;
        }
        if (isH4 && name === 'a'){
          isAuthorName = true;
        }
        if(isTags && name === 'a'){
          isGenres = true;
        }
        if (name === 'label'){
          isDescription = false;
          isTags = false;
        }
        if (isFooter && name === 'script'){
          isScript++;
        }
      },
      onattribute(name,value){
        if (name === 'class' && value === 'description'){
          isDescription = true;
        }
        if (name === 'class' && value === 'page-footer footer'){
          isFooter = true;
        }
      },
      ontext(data){
        if (isNovelName){
          novel.name = data;
        }
        if (isAuthorName){
          novel.author = data;
          isAuthorName = false;
        }
        if (isDescription){
          novel.summary += data;
        }
        if (isSpan === 2){
          novel.status = data.trim();
          isSpan++;
        }
        if (isGenres){
          genreArray.push(data);
          novel.genres = genreArray.join(', ');
        }
        if (isScript === 5){
          const cJson = Array.from(
            data.matchAll(/window.chapters = (.+])(?=;)/g)
          ).map(match => JSON.parse(match[1]));
          const vJson = Array.from(
            data.matchAll(/window.volumes = (.+])(?=;)/g)
          ).map(match => JSON.parse(match[1]));
          if (cJson.length > 0){
            chapterJson = cJson[0];
          }
          if (vJson.length > 0){
            volumeJson = vJson[0];
          }
        }
      },
      onclosetag(name){
        if (name === 'h1'){
          isNovelName = false;
          isH4 = true;
        }
        if (name === 'h4'){
          isH4 = false;
        }
        if (name === 'a'){
          isGenres = false;
        }
        if (name === 'body'){
          isFooter = false;
        }
      }
    })
    parser.write(html);
    parser.end();
    novel.summary = novel.summary?.trim();
    switch(novel.status){
      case 'ONGOING':
        novel.status = NovelStatus.Ongoing;
        break;
      case 'HIATUS':
        novel.status = NovelStatus.OnHiatus;
        break;
      case 'COMPLETED':
        novel.status = NovelStatus.Completed;
        break;
      default:
        novel.status = NovelStatus.Unknown;
    }

    const chapter: Plugin.ChapterItem[] = chapterJson.map(
      (chapter: ChapterEntry) => {
        const matchingVolume = volumeJson.find(
          (volume: VolumeEntry) => volume.id === chapter.volumeId,
        );
        return {
          name: chapter.title,
          path: chapter.url.slice(1),
          releaseTime: chapter.date,
          chapterNumber: chapter?.order,
          page: matchingVolume?.title,
        };
      },
    );

    novel.chapters = chapter;
    return novel;
  }

  async parseChapter(chapterPath: string): Promise<string> {
    const result = await fetchApi(this.site + chapterPath);
    const html = await result.text();
    let chapterText = '';
    let isChapter = false;
    let isPtag = false;
    let isStyle = false;
    let isStyleText = false;
    let styles = '';
    const parser = new Parser({
      onopentag(name,attribs){
        if (isChapter && name === 'div'){
          let stylediv = attribs['style']
          if(stylediv){
            chapterText += `<div style="${stylediv}">`
            isStyleText = true;
          } else {
            chapterText += `<div>`
          }
        }
        if (isChapter && name === 'table'){
          let w = attribs['width'];
          if(w) {
            chapterText += `<table width="${w}">`;
          } else {
            chapterText += `<table>`;
          }
        }
        if (isChapter && name === 'tbody'){
          chapterText += `<tbody>`;
        }
        if (isChapter && name === 'tr'){
          chapterText += `<tr>`;
        }
        if (isChapter && name === 'td'){
          let w1 = attribs['width'];
          if(w1) {
            chapterText += `<td width="${w1}">`;
          } else {
            chapterText += `<td>`;
          }
        }
      },
      onattribute(name, value){
        if (name === 'class' && value === 'chapter-inner chapter-content'){
          isChapter = true;
        }
        if (name === 'class' && value === 'portlet light t-center-3'){
          isChapter = false;
          isPtag = false;
        }
        if (name === 'class' && value === styles){
          isPtag = false;
        }
      },
      onopentagname(name){
        if (isChapter && name === 'p'){
          chapterText += '<p>';
          isPtag = true;
          if(isStyleText){
            isStyleText = false;
          }
        }
        if (name === 'style'){
          isStyle = true;
        }
        if (isChapter && name === 'br'){
          chapterText += `<br>`;
        }
      },
      ontext(data){
        if(isPtag){
          chapterText += data;
        }
        if(isStyleText){
          chapterText += data;
        }
        if (isStyle){
          if (data.includes('display: none;')){
            styles = data.match(/\.(.*)\{/)![1];
          }
        }
      },
      onclosetag(name){
        if (name === 'p'){
          isPtag = false;
          chapterText += '</p>'
        }
        if (name === 'style'){
          isStyle = false;
        }
        if (isChapter && name === 'td'){
          chapterText += `</td>`;
        }
        if (isChapter && name === 'tr'){
          chapterText += `</tr>`;
        }
        if (isChapter && name === 'tbody'){
          chapterText += `</tbody>`;
        }
        if (isChapter && name === 'table'){
          chapterText += `</table>`;
        }
        if (isChapter && name === 'div'){
          isStyleText = false;
          chapterText += `</div>`
        }
      }
    })
    parser.write(html)
    parser.end();

    return chapterText;
  }

  async searchNovels(
    searchTerm: string,
    page: number,
  ): Promise<Plugin.NovelItem[]> {
    const searchUrl = `${this.site}fictions/search?page=${page}&title=${searchTerm}`;

    return await this.parseNovels(searchUrl);
  }

  async fetchImage(url: string): Promise<string | undefined> {
    return fetchFile(url);
  }

  filters = {
    order: {
      value: 'weekly-popular',
      label: 'Order By',
      options: [
        { label: 'Best Rated', value: 'best-rated' },
        { label: 'Trending', value: 'trending' },
        { label: 'Ongoing Fictions', value: 'active-popular' },
        { label: 'Complete', value: 'complete' },
        { label: 'Popular this week', value: 'weekly-popular' },
        { label: 'Latest Updates', value: 'latest-updates' },
        { label: 'Newest Fictions', value: 'new' },
        { label: 'Rising Stars', value: 'rising-stars' },
        { label: 'Writathon', value: 'writathon' },
      ],
      type: FilterTypes.Picker,
    },
    genre: {
      value: '',
      label: 'Genres',
      options: [
        { label: 'ALL', value: '' },
        { label: 'Action', value: 'action' },
        { label: 'Adventure', value: 'adventure' },
        { label: 'Comedy', value: 'comedy' },
        { label: 'Contemporary', value: 'contemporary' },
        { label: 'Drama', value: 'drama' },
        { label: 'Fantasy', value: 'fantasy' },
        { label: 'Historical', value: 'historical' },
        { label: 'Horror', value: 'horror' },
        { label: 'Mystery', value: 'mystery' },
        { label: 'Psychological', value: 'psychological' },
        { label: 'Romance', value: 'romance' },
        { label: 'Satire', value: 'satire' },
        { label: 'Sci-fi', value: 'sci_fi' },
        { label: 'Short Story', value: 'one_shot' },
        { label: 'Tragedy', value: 'tragedy' },
      ],
      type: FilterTypes.Picker,
    },
  } satisfies Filters;
}

export default new RoyalRoad();

interface ChapterEntry {
  push(chapterItem: { name: string; path: string; releaseTime: string; chapterNumber: number; page: string | null; }): unknown;
  id: number;
  volumeId: number;
  title: string;
  date: string;
  order: number;
  url: string;
}

interface VolumeEntry {
  id: number;
  title: string;
  cover: string;
  order: number;
}
