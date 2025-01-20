var e=this&&this.__awaiter||function(e,l,a,t){return new(a||(a=Promise))((function(u,n){function r(e){try{o(t.next(e))}catch(e){n(e)}}function i(e){try{o(t.throw(e))}catch(e){n(e)}}function o(e){var l;e.done?u(e.value):(l=e.value,l instanceof a?l:new a((function(e){e(l)}))).then(r,i)}o((t=t.apply(e,l||[])).next())}))},l=this&&this.__generator||function(e,l){var a,t,u,n={label:0,sent:function(){if(1&u[0])throw u[1];return u[1]},trys:[],ops:[]},r=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return r.next=i(0),r.throw=i(1),r.return=i(2),"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function i(i){return function(o){return function(i){if(a)throw new TypeError("Generator is already executing.");for(;r&&(r=0,i[0]&&(n=0)),n;)try{if(a=1,t&&(u=2&i[0]?t.return:i[0]?t.throw||((u=t.return)&&u.call(t),0):t.next)&&!(u=u.call(t,i[1])).done)return u;switch(t=0,u&&(i=[2&i[0],u.value]),i[0]){case 0:case 1:u=i;break;case 4:return n.label++,{value:i[1],done:!1};case 5:n.label++,t=i[1],i=[0];continue;case 7:i=n.ops.pop(),n.trys.pop();continue;default:if(!(u=n.trys,(u=u.length>0&&u[u.length-1])||6!==i[0]&&2!==i[0])){n=0;continue}if(3===i[0]&&(!u||i[1]>u[0]&&i[1]<u[3])){n.label=i[1];break}if(6===i[0]&&n.label<u[1]){n.label=u[1],u=i;break}if(u&&n.label<u[2]){n.label=u[2],n.ops.push(i);break}u[2]&&n.ops.pop(),n.trys.pop();continue}i=l.call(e,n)}catch(e){i=[6,e],t=0}finally{a=u=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,o])}}},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=require("@libs/filterInputs"),u=require("@libs/defaultCover"),n=require("@libs/fetch"),r=require("@libs/novelStatus"),i=require("@libs/storage"),o=a(require("dayjs")),v={1:r.NovelStatus.Ongoing,2:r.NovelStatus.Completed,3:r.NovelStatus.OnHiatus,4:r.NovelStatus.Cancelled},s=function(){function a(){var e=this;this.id="RLIB",this.name="RanobeLib",this.site="https://ranobelib.me",this.apiSite="https://api.mangalib.me/api/manga/",this.version="2.1.2",this.icon="src/ru/ranobelib/icon.png",this.webStorageUtilized=!0,this.resolveUrl=function(l,a){var t,u=(null===(t=e.user)||void 0===t?void 0:t.ui)?"ui="+e.user.ui:"";if(a)return e.site+"/ru/book/"+l+(u?"?"+u:"");var n=l.split("/"),r=n[0],i=n[1],o=n[2],v=n[3],s=r+"/read/v"+i+"/c"+o+(v?"?bid="+v:"");return e.site+"/ru/"+s+(u?(v?"&":"?")+u:"")},this.getUser=function(){var e,l,a=i.storage.get("user");if(a)return{token:{Authorization:"Bearer "+a.token},ui:a.id};var t=null===(e=i.localStorage.get())||void 0===e?void 0:e.auth;if(!t)return{};var u=JSON.parse(t);return(null===(l=null==u?void 0:u.token)||void 0===l?void 0:l.access_token)?(i.storage.set("user",{id:u.auth.id,token:u.token.access_token},u.token.timestamp+u.token.expires_in),{token:{Authorization:"Bearer "+u.token.access_token},ui:u.auth.id}):void 0},this.user=this.getUser(),this.filters={sort_by:{label:"Сортировка",value:"rating_score",options:[{label:"По рейтингу",value:"rate_avg"},{label:"По популярности",value:"rating_score"},{label:"По просмотрам",value:"views"},{label:"Количеству глав",value:"chap_count"},{label:"Дате обновления",value:"last_chapter_at"},{label:"Дате добавления",value:"created_at"},{label:"По названию (A-Z)",value:"name"},{label:"По названию (А-Я)",value:"rus_name"}],type:t.FilterTypes.Picker},sort_type:{label:"Порядок",value:"desc",options:[{label:"По убыванию",value:"desc"},{label:"По возрастанию",value:"asc"}],type:t.FilterTypes.Picker},types:{label:"Тип",value:[],options:[{label:"Япония",value:"10"},{label:"Корея",value:"11"},{label:"Китай",value:"12"},{label:"Английский",value:"13"},{label:"Авторский",value:"14"},{label:"Фанфик",value:"15"}],type:t.FilterTypes.CheckboxGroup},scanlateStatus:{label:"Статус перевода",value:[],options:[{label:"Продолжается",value:"1"},{label:"Завершен",value:"2"},{label:"Заморожен",value:"3"},{label:"Заброшен",value:"4"}],type:t.FilterTypes.CheckboxGroup},manga_status:{label:"Статус тайтла",value:[],options:[{label:"Онгоинг",value:"1"},{label:"Завершён",value:"2"},{label:"Анонс",value:"3"},{label:"Приостановлен",value:"4"},{label:"Выпуск прекращён",value:"5"}],type:t.FilterTypes.CheckboxGroup},genres:{label:"Жанры",value:{include:[],exclude:[]},options:[{label:"Арт",value:"32"},{label:"Безумие",value:"91"},{label:"Боевик",value:"34"},{label:"Боевые искусства",value:"35"},{label:"Вампиры",value:"36"},{label:"Военное",value:"89"},{label:"Гарем",value:"37"},{label:"Гендерная интрига",value:"38"},{label:"Героическое фэнтези",value:"39"},{label:"Демоны",value:"81"},{label:"Детектив",value:"40"},{label:"Детское",value:"88"},{label:"Дзёсэй",value:"41"},{label:"Драма",value:"43"},{label:"Игра",value:"44"},{label:"Исекай",value:"79"},{label:"История",value:"45"},{label:"Киберпанк",value:"46"},{label:"Кодомо",value:"76"},{label:"Комедия",value:"47"},{label:"Космос",value:"83"},{label:"Магия",value:"85"},{label:"Махо-сёдзё",value:"48"},{label:"Машины",value:"90"},{label:"Меха",value:"49"},{label:"Мистика",value:"50"},{label:"Музыка",value:"80"},{label:"Научная фантастика",value:"51"},{label:"Омегаверс",value:"77"},{label:"Пародия",value:"86"},{label:"Повседневность",value:"52"},{label:"Полиция",value:"82"},{label:"Постапокалиптика",value:"53"},{label:"Приключения",value:"54"},{label:"Психология",value:"55"},{label:"Романтика",value:"56"},{label:"Самурайский боевик",value:"57"},{label:"Сверхъестественное",value:"58"},{label:"Сёдзё",value:"59"},{label:"Сёдзё-ай",value:"60"},{label:"Сёнэн",value:"61"},{label:"Сёнэн-ай",value:"62"},{label:"Спорт",value:"63"},{label:"Супер сила",value:"87"},{label:"Сэйнэн",value:"64"},{label:"Трагедия",value:"65"},{label:"Триллер",value:"66"},{label:"Ужасы",value:"67"},{label:"Фантастика",value:"68"},{label:"Фэнтези",value:"69"},{label:"Хентай",value:"84"},{label:"Школа",value:"70"},{label:"Эротика",value:"71"},{label:"Этти",value:"72"},{label:"Юри",value:"73"},{label:"Яой",value:"74"}],type:t.FilterTypes.ExcludableCheckboxGroup},tags:{label:"Теги",value:{include:[],exclude:[]},options:[{label:"Авантюристы",value:"328"},{label:"Антигерой",value:"175"},{label:"Бессмертные",value:"333"},{label:"Боги",value:"218"},{label:"Борьба за власть",value:"309"},{label:"Брат и сестра",value:"360"},{label:"Ведьма",value:"339"},{label:"Видеоигры",value:"204"},{label:"Виртуальная реальность",value:"214"},{label:"Владыка демонов",value:"349"},{label:"Военные",value:"198"},{label:"Воспоминания из другого мира",value:"310"},{label:"Выживание",value:"212"},{label:"ГГ женщина",value:"294"},{label:"ГГ имба",value:"292"},{label:"ГГ мужчина",value:"295"},{label:"ГГ не ояш",value:"325"},{label:"ГГ не человек",value:"331"},{label:"ГГ ояш",value:"326"},{label:"Главный герой бог",value:"324"},{label:"Глупый ГГ",value:"298"},{label:"Горничные",value:"171"},{label:"Гуро",value:"306"},{label:"Гяру",value:"197"},{label:"Демоны",value:"157"},{label:"Драконы",value:"313"},{label:"Древний мир",value:"317"},{label:"Зверолюди",value:"163"},{label:"Зомби",value:"155"},{label:"Исторические фигуры",value:"323"},{label:"Кулинария",value:"158"},{label:"Культивация",value:"161"},{label:"ЛГБТ",value:"344"},{label:"ЛитРПГ",value:"319"},{label:"Лоли",value:"206"},{label:"Магия",value:"170"},{label:"Машинный перевод",value:"345"},{label:"Медицина",value:"159"},{label:"Межгалактическая война",value:"330"},{label:"Монстр Девушки",value:"207"},{label:"Монстры",value:"208"},{label:"Мрачный мир",value:"316"},{label:"Музыка",value:"358"},{label:"Музыка",value:"209"},{label:"Ниндзя",value:"199"},{label:"Обратный Гарем",value:"210"},{label:"Офисные Работники",value:"200"},{label:"Пираты",value:"341"},{label:"Подземелья",value:"314"},{label:"Политика",value:"311"},{label:"Полиция",value:"201"},{label:"Преступники / Криминал",value:"205"},{label:"Призраки / Духи",value:"196"},{label:"Призыватели",value:"329"},{label:"Прыжки между мирами",value:"321"},{label:"Путешествие в другой мир",value:"318"},{label:"Путешествие во времени",value:"213"},{label:"Рабы",value:"355"},{label:"Ранги силы",value:"312"},{label:"Реинкарнация",value:"154"},{label:"Самураи",value:"202"},{label:"Скрытие личности",value:"315"},{label:"Средневековье",value:"174"},{label:"Традиционные игры",value:"203"},{label:"Умный ГГ",value:"303"},{label:"Характерный рост",value:"332"},{label:"Хикикомори",value:"167"},{label:"Эволюция",value:"322"},{label:"Элементы РПГ",value:"327"},{label:"Эльфы",value:"217"},{label:"Якудза",value:"165"}],type:t.FilterTypes.ExcludableCheckboxGroup},require_chapters:{label:"Только проекты с главами",value:!0,type:t.FilterTypes.Switch}}}return a.prototype.popularNovels=function(a,t){return e(this,arguments,void 0,(function(e,a){var t,r,i,o,v,s,b,c,d,h,p,f,g,m,y,_,k,x,S,w,j,N=a.showLatestNovels,C=a.filters;return l(this,(function(l){switch(l.label){case 0:return t=this.apiSite+"?site_id[0]=3&page="+e,t+="&sort_by="+(N?"last_chapter_at":(null===(o=null==C?void 0:C.sort_by)||void 0===o?void 0:o.value)||"rating_score"),t+="&sort_type="+((null===(v=null==C?void 0:C.sort_type)||void 0===v?void 0:v.value)||"desc"),(null===(s=null==C?void 0:C.require_chapters)||void 0===s?void 0:s.value)&&(t+="&chapters[min]=1"),(null===(c=null===(b=null==C?void 0:C.types)||void 0===b?void 0:b.value)||void 0===c?void 0:c.length)&&(t+="&types[]="+C.types.value.join("&types[]=")),(null===(h=null===(d=null==C?void 0:C.scanlateStatus)||void 0===d?void 0:d.value)||void 0===h?void 0:h.length)&&(t+="&scanlateStatus[]="+C.scanlateStatus.value.join("&scanlateStatus[]=")),(null===(f=null===(p=null==C?void 0:C.manga_status)||void 0===p?void 0:p.value)||void 0===f?void 0:f.length)&&(t+="&manga_status[]="+C.manga_status.value.join("&manga_status[]=")),(null==C?void 0:C.genres)&&((null===(m=null===(g=C.genres.value)||void 0===g?void 0:g.include)||void 0===m?void 0:m.length)&&(t+="&genres[]="+C.genres.value.include.join("&genres[]=")),(null===(_=null===(y=C.genres.value)||void 0===y?void 0:y.exclude)||void 0===_?void 0:_.length)&&(t+="&genres_exclude[]="+C.genres.value.exclude.join("&genres_exclude[]="))),(null==C?void 0:C.tags)&&((null===(x=null===(k=C.tags.value)||void 0===k?void 0:k.include)||void 0===x?void 0:x.length)&&(t+="&tags[]="+C.tags.value.include.join("&tags[]=")),(null===(w=null===(S=C.tags.value)||void 0===S?void 0:S.exclude)||void 0===w?void 0:w.length)&&(t+="&tags_exclude[]="+C.tags.value.exclude.join("&tags_exclude[]="))),[4,(0,n.fetchApi)(t,{headers:null===(j=this.user)||void 0===j?void 0:j.token}).then((function(e){return e.json()}))];case 1:return r=l.sent(),i=[],r.data instanceof Array&&r.data.forEach((function(e){var l;return i.push({name:e.rus_name||e.eng_name||e.name,cover:(null===(l=e.cover)||void 0===l?void 0:l.default)||u.defaultCover,path:e.slug_url||e.id+"--"+e.slug})})),[2,i]}}))}))},a.prototype.parseNovel=function(a){return e(this,void 0,void 0,(function(){var e,t,i,s,b,c,d,h,p,f,g,m;return l(this,(function(l){switch(l.label){case 0:return[4,(0,n.fetchApi)(this.apiSite+a+"?fields[]=summary&fields[]=genres&fields[]=tags&fields[]=teams&fields[]=authors&fields[]=status_id&fields[]=artists",{headers:null===(d=this.user)||void 0===d?void 0:d.token}).then((function(e){return e.json()}))];case 1:return e=l.sent().data,t={path:a,name:e.rus_name||e.name,cover:(null===(h=e.cover)||void 0===h?void 0:h.default)||u.defaultCover,summary:e.summary},(null===(p=e.status)||void 0===p?void 0:p.id)&&(t.status=v[e.status.id]||r.NovelStatus.Unknown),(null===(f=e.authors)||void 0===f?void 0:f.length)&&(t.author=e.authors[0].name),(null===(g=e.artists)||void 0===g?void 0:g.length)&&(t.artist=e.artists[0].name),(i=[e.genres||[],e.tags||[]].flat().map((function(e){return null==e?void 0:e.name})).filter((function(e){return e}))).length&&(t.genres=i.join(", ")),s={0:"Главная страница"},e.teams.length&&e.teams.forEach((function(e){var l=e.name,a=e.details;return s[(null==a?void 0:a.branch_id)||"0"]=l})),[4,(0,n.fetchApi)(this.apiSite+a+"/chapters",{headers:null===(m=this.user)||void 0===m?void 0:m.token}).then((function(e){return e.json()}))];case 2:return(b=l.sent()).data.length&&(c=[],b.data.forEach((function(e){return e.branches.forEach((function(l){var t=l.branch_id,u=l.created_at;return c.push({name:"Том "+e.volume+" Глава "+e.number+(e.name?" "+e.name:""),path:a+"/"+e.volume+"/"+e.number+"/"+(t||""),releaseTime:(0,o.default)(u).format("LLL"),chapterNumber:e.index,page:s[t||"0"]||"Неизвестный"})}))})),c.length&&e.teams.length>1&&c.sort((function(e,l){return e.page&&l.page&&e.page!==l.page?e.page.localeCompare(l.page):(e.chapterNumber||0)-(l.chapterNumber||0)})),t.chapters=c),[2,t]}}))}))},a.prototype.parseChapter=function(a){return e(this,void 0,void 0,(function(){var e,t,u,r,i,o,v,s,c,d,h;return l(this,(function(l){switch(l.label){case 0:return e=a.split("/"),t=e[0],u=e[1],r=e[2],i=e[3],o="",t&&u&&r?[4,(0,n.fetchApi)(this.apiSite+t+"/chapter?"+(i?"branch_id="+i+"&":"")+"number="+r+"&volume="+u,{headers:null===(s=this.user)||void 0===s?void 0:s.token}).then((function(e){return e.json()}))]:[3,2];case 1:v=l.sent(),o="doc"==(null===(d=null===(c=null==v?void 0:v.data)||void 0===c?void 0:c.content)||void 0===d?void 0:d.type)?b(v.data.content.content,v.data.attachments):null===(h=null==v?void 0:v.data)||void 0===h?void 0:h.content,l.label=2;case 2:return[2,o]}}))}))},a.prototype.searchNovels=function(a){return e(this,void 0,void 0,(function(){var e,t,r,i;return l(this,(function(l){switch(l.label){case 0:return e=this.apiSite+"?site_id[0]=3&q="+a,[4,(0,n.fetchApi)(e,{headers:null===(i=this.user)||void 0===i?void 0:i.token}).then((function(e){return e.json()}))];case 1:return t=l.sent(),r=[],t.data instanceof Array&&t.data.forEach((function(e){var l;return r.push({name:e.rus_name||e.eng_name||e.name,cover:(null===(l=e.cover)||void 0===l?void 0:l.default)||u.defaultCover,path:e.slug_url||e.id+"--"+e.slug})})),[2,r]}}))}))},a}();function b(e,l,a){return void 0===a&&(a=""),e.forEach((function(e){var t,u;switch(e.type){case"hardBreak":a+="<br>";break;case"horizontalRule":a+="<hr>";break;case"image":if(null===(u=null===(t=e.attrs)||void 0===t?void 0:t.images)||void 0===u?void 0:u.length)e.attrs.images.forEach((function(e){var t=e.image,u=l.find((function(e){return e.name==t||e.id==t}));u&&(a+="<img src='".concat(u.url,"'>"))}));else if(e.attrs){var n=Object.entries(e.attrs).filter((function(e){return null==e?void 0:e[1]})).map((function(e){return"".concat(e[0],'="').concat(e[1],'"')}));a+="<img "+n.join("; ")+">"}break;case"paragraph":a+="<p>"+(e.content?b(e.content,l):"<br>")+"</p>";break;case"orderedList":a+="<ol>"+(e.content?b(e.content,l):"<br>")+"</ol>";break;case"listItem":a+="<li>"+(e.content?b(e.content,l):"<br>")+"</li>";break;case"blockquote":a+="<blockquote>"+(e.content?b(e.content,l):"<br>")+"</blockquote>";break;case"italic":a+="<i>"+(e.content?b(e.content,l):"<br>")+"</i>";break;case"bold":a+="<b>"+(e.content?b(e.content,l):"<br>")+"</b>";break;case"underline":a+="<u>"+(e.content?b(e.content,l):"<br>")+"</u>";break;case"heading":a+="<h2>"+(e.content?b(e.content,l):"<br>")+"</h2>";break;case"text":a+=e.text;break;default:a+=JSON.stringify(e,null,"\t")}})),a}exports.default=new s;