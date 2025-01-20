var e=this&&this.__awaiter||function(e,a,t,l){return new(t||(t=Promise))((function(r,n){function i(e){try{s(l.next(e))}catch(e){n(e)}}function o(e){try{s(l.throw(e))}catch(e){n(e)}}function s(e){var a;e.done?r(e.value):(a=e.value,a instanceof t?a:new t((function(e){e(a)}))).then(i,o)}s((l=l.apply(e,a||[])).next())}))},a=this&&this.__generator||function(e,a){var t,l,r,n={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]},i=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return i.next=o(0),i.throw=o(1),i.return=o(2),"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function o(o){return function(s){return function(o){if(t)throw new TypeError("Generator is already executing.");for(;i&&(i=0,o[0]&&(n=0)),n;)try{if(t=1,l&&(r=2&o[0]?l.return:o[0]?l.throw||((r=l.return)&&r.call(l),0):l.next)&&!(r=r.call(l,o[1])).done)return r;switch(l=0,r&&(o=[2&o[0],r.value]),o[0]){case 0:case 1:r=o;break;case 4:return n.label++,{value:o[1],done:!1};case 5:n.label++,l=o[1],o=[0];continue;case 7:o=n.ops.pop(),n.trys.pop();continue;default:if(!(r=n.trys,(r=r.length>0&&r[r.length-1])||6!==o[0]&&2!==o[0])){n=0;continue}if(3===o[0]&&(!r||o[1]>r[0]&&o[1]<r[3])){n.label=o[1];break}if(6===o[0]&&n.label<r[1]){n.label=r[1],r=o;break}if(r&&n.label<r[2]){n.label=r[2],n.ops.push(o);break}r[2]&&n.ops.pop(),n.trys.pop();continue}o=a.call(e,n)}catch(e){o=[6,e],l=0}finally{t=r=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}},t=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var l=require("@libs/fetch"),r=require("cheerio"),n=require("@libs/defaultCover"),i=require("@libs/novelStatus"),o=t(require("dayjs")),s=function(e,a){return new RegExp(a.join("|")).test(e)},u=new(function(){function t(e){var a;this.parseData=function(e){var a,t=(0,o.default)(),l=(null===(a=e.match(/\d+/))||void 0===a?void 0:a[0])||"",r=parseInt(l,10);if(!l)return e;if(s(e,["detik","segundo","second","วินาที"]))t=t.subtract(r,"second");else if(s(e,["menit","dakika","min","minute","minuto","นาที","دقائق"]))t=t.subtract(r,"minute");else if(s(e,["jam","saat","heure","hora","hour","ชั่วโมง","giờ","ore","ساعة","小时"]))t=t.subtract(r,"hours");else if(s(e,["hari","gün","jour","día","dia","day","วัน","ngày","giorni","أيام","天"]))t=t.subtract(r,"days");else if(s(e,["week","semana"]))t=t.subtract(r,"week");else if(s(e,["month","mes"]))t=t.subtract(r,"month");else{if(!s(e,["year","año"]))return"Invalid Date"!==(0,o.default)(e).format("LL")?(0,o.default)(e).format("LL"):e;t=t.subtract(r,"year")}return t.format("LL")},this.id=e.id,this.name=e.sourceName,this.icon="multisrc/madara/".concat(e.id.toLowerCase(),"/icon.png"),this.site=e.sourceSite;var t=(null===(a=e.options)||void 0===a?void 0:a.versionIncrements)||0;this.version="1.0.".concat(5+t),this.options=e.options,this.filters=e.filters}return t.prototype.translateDragontea=function(e){var a;if("dragontea"!==this.id)return e;var t=(0,r.load)((null===(a=e.html())||void 0===a?void 0:a.replace("\n","").replace(/<br\s*\/?>/g,"\n"))||"");return e.html(t.html()),e.find("*").addBack().contents().filter((function(e,a){return 3===a.nodeType})).each((function(e,a){var l=t(a),r=l.text().normalize("NFD").split("").map((function(e){var a=e.normalize("NFC"),t="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(a);return t>=0?"zyxwvutsrqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA"[t]+e.slice(a.length):e})).join("");l.replaceWith(r.replace("\n","<br>"))})),e},t.prototype.getHostname=function(e){var a=(e=e.split("/")[2]).split(".");return a.pop(),a.join(".")},t.prototype.getCheerio=function(t,n){return e(this,void 0,void 0,(function(){var e,i,o,s;return a(this,(function(a){switch(a.label){case 0:return[4,(0,l.fetchApi)(t)];case 1:if(!(e=a.sent()).ok&&1!=n)throw new Error("Could not reach site ("+e.status+") try to open in webview.");return o=r.load,[4,e.text()];case 2:if(i=o.apply(void 0,[a.sent()]),s=i("title").text().trim(),this.getHostname(t)!=this.getHostname(e.url)||"Bot Verification"==s||"You are being redirected..."==s||"Un instant..."==s||"Just a moment..."==s||"Redirecting..."==s)throw new Error("Captcha error, please open in webview");return[2,i]}}))}))},t.prototype.parseNovels=function(e){var a=[];return e(".manga-title-badges").remove(),e(".page-item-detail, .c-tabs-item__content").each((function(t,l){var r=e(l).find(".post-title").text().trim(),i=e(l).find(".post-title").find("a").attr("href")||"";if(r&&i){var o=e(l).find("img"),s={name:r,cover:o.attr("data-src")||o.attr("src")||o.attr("data-lazy-srcset")||n.defaultCover,path:i.replace(/https?:\/\/.*?\//,"/")};a.push(s)}})),a},t.prototype.popularNovels=function(t,l){return e(this,arguments,void 0,(function(e,t){var l,r,n,i,o,s,u=t.filters,c=t.showLatestNovels;return a(this,(function(a){switch(a.label){case 0:for(r in l=this.site+"/page/"+e+"/?s=&post_type=wp-manga",u||(u=this.filters||{}),c&&(l+="&m_orderby=latest"),u)if("object"==typeof u[r].value)for(n=0,i=u[r].value;n<i.length;n++)o=i[n],l+="&".concat(r,"=").concat(o);else u[r].value&&(l+="&".concat(r,"=").concat(u[r].value));return[4,this.getCheerio(l,1!=e)];case 1:return s=a.sent(),[2,this.parseNovels(s)]}}))}))},t.prototype.parseNovel=function(t){return e(this,void 0,void 0,(function(){var e,s,u,c,v,b,h,m,p=this;return a(this,(function(a){switch(a.label){case 0:return[4,this.getCheerio(this.site+t,!1)];case 1:return(e=a.sent())(".manga-title-badges, #manga-title span").remove(),(s={path:t,name:e(".post-title h1").text().trim()||e("#manga-title h1").text().trim()}).cover=e(".summary_image > a > img").attr("data-lazy-src")||e(".summary_image > a > img").attr("data-src")||e(".summary_image > a > img").attr("src")||n.defaultCover,e(".post-content_item, .post-content").each((function(){var a=e(this).find("h5").text().trim(),t=e(this).find(".summary-content");switch(a){case"Genre(s)":case"Genre":case"Tags(s)":case"Tag(s)":case"Tags":case"Género(s)":case"التصنيفات":s.genres?s.genres+=", "+t.find("a").map((function(a,t){return e(t).text()})).get().join(", "):s.genres=t.find("a").map((function(a,t){return e(t).text()})).get().join(", ");break;case"Author(s)":case"Author":case"Autor(es)":case"المؤلف":case"المؤلف (ين)":s.author=t.text().trim();break;case"Status":case"Novel":case"Estado":s.status=t.text().trim().includes("OnGoing")||t.text().trim().includes("مستمرة")?i.NovelStatus.Ongoing:i.NovelStatus.Completed;break;case"Artist(s)":s.artist=t.text().trim()}})),s.author||(s.author=e(".manga-authors").text().trim()),e("div.summary__content .code-block,script,noscript").remove(),s.summary=this.translateDragontea(e("div.summary__content")).text().trim()||e("#tab-manga-about").text().trim()||e('.post-content_item h5:contains("Summary")').next().find("span").map((function(a,t){return e(t).text()})).get().join("\n\n").trim()||e(".manga-summary p").map((function(a,t){return e(t).text()})).get().join("\n\n").trim()||e(".manga-excerpt p").map((function(a,t){return e(t).text()})).get().join("\n\n").trim(),u=[],c="",(null===(m=this.options)||void 0===m?void 0:m.useNewChapterEndpoint)?[4,(0,l.fetchApi)(this.site+t+"ajax/chapters/",{method:"POST",referrer:this.site+t}).then((function(e){return e.text()}))]:[3,3];case 2:return c=a.sent(),[3,5];case 3:return v=e(".rating-post-id").attr("value")||e("#manga-chapters-holder").attr("data-id")||"",(b=new FormData).append("action","manga_get_chapters"),b.append("manga",v),[4,(0,l.fetchApi)(this.site+"wp-admin/admin-ajax.php",{method:"POST",body:b}).then((function(e){return e.text()}))];case 4:c=a.sent(),a.label=5;case 5:return"0"!==c&&(e=(0,r.load)(c)),h=e(".wp-manga-chapter").length,e(".wp-manga-chapter").each((function(a,t){var l=e(t).find("a").text().trim(),r=e(t).find("span.chapter-release-date").text().trim();r=r?p.parseData(r):(0,o.default)().format("LL");var n=e(t).find("a").attr("href")||"";n&&"#"!=n&&u.push({name:l,path:n.replace(/https?:\/\/.*?\//,"/"),releaseTime:r||null,chapterNumber:h-a})})),s.chapters=u.reverse(),[2,s]}}))}))},t.prototype.parseChapter=function(t){return e(this,void 0,void 0,(function(){var e,l,r;return a(this,(function(a){switch(a.label){case 0:return[4,this.getCheerio(this.site+t,!1)];case 1:return e=a.sent(),l=e(".text-left")||e(".text-right")||e(".entry-content")||e(".c-blog-post > div > div:nth-child(2)"),null===(r=this.options)||void 0===r||r.customJs,[2,this.translateDragontea(l).html()||""]}}))}))},t.prototype.searchNovels=function(t,l){return e(this,void 0,void 0,(function(){var e,r;return a(this,(function(a){switch(a.label){case 0:return e=this.site+"/page/"+l+"/?s="+t+"&post_type=wp-manga",[4,this.getCheerio(e,!0)];case 1:return r=a.sent(),[2,this.parseNovels(r)]}}))}))},t}())({id:"fortuneeternal",sourceSite:"https://fortuneeternal.com",sourceName:"Fortune Eternal",options:{lang:"Korean",useNewChapterEndpoint:!0,versionIncrements:1},filters:{"genre[]":{type:"Checkbox",label:"Genre",value:[],options:[{label:"Abandoned Children",value:"abandoned-children"},{label:"Academy",value:"academy"},{label:"Action",value:"action"},{label:"Adopted Protagonist",value:"adopted-protagonist"},{label:"Adult",value:"adult"},{label:"Adventure",value:"adventure"},{label:"Age progression",value:"age-progression"},{label:"Alternate World",value:"alternate-world"},{label:"Animated",value:"animated"},{label:"Anime",value:"anime"},{label:"Apocalypse",value:"apocalypse"},{label:"Aristocracy",value:"aristocracy"},{label:"Arts",value:"arts"},{label:"Award Winning",value:"award-winning"},{label:"Betrayal",value:"betrayal"},{label:"Body Swap",value:"body-swap"},{label:"Business",value:"business"},{label:"Card Game",value:"card-game"},{label:"Cartoon",value:"cartoon"},{label:"Chaebol",value:"chaebol"},{label:"Cheat",value:"cheat"},{label:"Childcare",value:"childcare"},{label:"Chinese",value:"chinese"},{label:"Civilization",value:"civilization"},{label:"Clan Building",value:"clan-building-2"},{label:"Clan Building]",value:"clan-building"},{label:"Clever protagonist",value:"clever-protagonist"},{label:"Comedy",value:"comedy"},{label:"Comic",value:"comic"},{label:"Cooking",value:"cooking"},{label:"Dark",value:"dark"},{label:"Detective",value:"detective"},{label:"Disabilities",value:"disabilities"},{label:"Doujinshi",value:"doujinshi"},{label:"Drama",value:"drama"},{label:"Dying",value:"dying"},{label:"Eastern Fantasy",value:"eastern-fantasy"},{label:"Ecchi",value:"ecchi"},{label:"Evil organization",value:"evil-organization"},{label:"evil protagonist",value:"evil-protagonist"},{label:"Exorcism",value:"exorcism"},{label:"Extra character",value:"extra-character"},{label:"Fanfiction",value:"fanfiction"},{label:"Fantasy",value:"fantasy"},{label:"Farming",value:"farming"},{label:"Fashion",value:"fashion"},{label:"Female MC",value:"female-mc"},{label:"Firearms",value:"firearms"},{label:"Futuristic",value:"futuristic"},{label:"Game",value:"game"},{label:"Game character",value:"game-character"},{label:"Game element",value:"game-element"},{label:"Gate to another world",value:"gate-to-another-world"},{label:"Gender Bender",value:"gender-bender"},{label:"Genius",value:"genius"},{label:"Ghost posessed",value:"ghost-posessed"},{label:"Harem",value:"harem"},{label:"Healthcare",value:"healthcare"},{label:"Historical",value:"historical"},{label:"Horror",value:"horror"},{label:"human to animal",value:"human-to-animal"},{label:"Japanese",value:"japanese"},{label:"Josei",value:"josei"},{label:"Judicial",value:"judicial"},{label:"Korean",value:"korean"},{label:"Level system",value:"level-system"},{label:"Live action",value:"live-action"},{label:"Manga",value:"manga"},{label:"Manhua",value:"manhua"},{label:"Manhwa",value:"manhwa"},{label:"Married life",value:"married-life"},{label:"Martial Arts",value:"martial-arts"},{label:"Mature",value:"mature"},{label:"Mecha",value:"mecha"},{label:"Medical",value:"medical"},{label:"Military",value:"military"},{label:"misunderstanding",value:"misunderstanding"},{label:"Modern",value:"modern"},{label:"Monster Life",value:"monster-life"},{label:"Monster tamer",value:"monster-tamer"},{label:"MTL",value:"mtl"},{label:"Music",value:"music"},{label:"Mystery",value:"mystery"},{label:"Novel Character",value:"novel-character"},{label:"One shot",value:"one-shot"},{label:"Original",value:"original"},{label:"Outer Space",value:"outer-space"},{label:"Overpowered",value:"overpowered"},{label:"Political",value:"political"},{label:"Polygamy",value:"polygamy"},{label:"Possesion",value:"possesion"},{label:"Post-Apocalypse",value:"post-apocalypse"},{label:"Premium",value:"premium"},{label:"Psychological",value:"psychological"},{label:"RAW",value:"raw"},{label:"Regression",value:"regression"},{label:"Reincarnation",value:"reincarnation"},{label:"Request",value:"request"},{label:"Returnee",value:"returnee"},{label:"Revenge",value:"revenge"},{label:"Reverse Harem",value:"reverse-harem"},{label:"Romance",value:"romance"},{label:"Romance Fantasy",value:"romance-fantasy"},{label:"Royal family",value:"royal-family"},{label:"School Life",value:"school-life"},{label:"Sci-fi",value:"sci-fi"},{label:"Science Fiction",value:"science-fiction"},{label:"Seinen",value:"seinen"},{label:"Shoujo",value:"shoujo"},{label:"Shoujo Ai",value:"shoujo-ai"},{label:"Shounen",value:"shounen"},{label:"Shounen Ai",value:"shounen-ai"},{label:"Showbiz",value:"showbiz"},{label:"Slice of Life",value:"slice-of-life"},{label:"Smut",value:"smut"},{label:"Soft Yaoi",value:"soft-yaoi"},{label:"Soft Yuri",value:"soft-yuri"},{label:"Sports",value:"sports"},{label:"Strong to stronger",value:"strong-to-stronger"},{label:"Sudden Rich",value:"sudden-rich"},{label:"Superhero theme",value:"superhero-theme"},{label:"Supernatural",value:"supernatural"},{label:"Survival",value:"survival"},{label:"System",value:"system"},{label:"Teacher Protagonist",value:"teacher-protagonist"},{label:"Time",value:"time"},{label:"Tragedy",value:"tragedy"},{label:"Tragic past",value:"tragic-past"},{label:"Transmigration",value:"transmigration"},{label:"Tycoon",value:"tycoon"},{label:"Villain",value:"villain"},{label:"Warring period",value:"warring-period"},{label:"Weak to Strong",value:"weak-to-strong"},{label:"Webtoon",value:"webtoon"},{label:"World Hopping",value:"world-hopping"},{label:"Writer",value:"writer"},{label:"Yandere",value:"yandere"},{label:"Yaoi",value:"yaoi"},{label:"Yuri",value:"yuri"}]},op:{type:"Switch",label:"having all selected genres",value:!1},author:{type:"Text",label:"Author",value:""},artist:{type:"Text",label:"Artist",value:""},release:{type:"Text",label:"Year of Released",value:""},adult:{type:"Picker",label:"Adult content",value:"",options:[{label:"All",value:""},{label:"None adult content",value:"0"},{label:"Only adult content",value:"1"}]},"status[]":{type:"Checkbox",label:"Status",value:[],options:[{label:"OnGoing",value:"on-going"},{label:"Completed",value:"end"},{label:"Canceled",value:"canceled"},{label:"On Hold",value:"on-hold"},{label:"Upcoming",value:"upcoming"}]},m_orderby:{type:"Picker",label:"Order by",value:"",options:[{label:"Relevance",value:""},{label:"Latest",value:"latest"},{label:"A-Z",value:"alphabet"},{label:"Rating",value:"rating"},{label:"Trending",value:"trending"},{label:"Most Views",value:"views"},{label:"New",value:"new-manga"}]}}});exports.default=u;