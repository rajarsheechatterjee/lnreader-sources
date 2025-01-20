var t=this&&this.__awaiter||function(t,e,a,r){return new(a||(a=Promise))((function(n,i){function o(t){try{s(r.next(t))}catch(t){i(t)}}function l(t){try{s(r.throw(t))}catch(t){i(t)}}function s(t){var e;t.done?n(t.value):(e=t.value,e instanceof a?e:new a((function(t){t(e)}))).then(o,l)}s((r=r.apply(t,e||[])).next())}))},e=this&&this.__generator||function(t,e){var a,r,n,i={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]},o=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return o.next=l(0),o.throw=l(1),o.return=l(2),"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function l(l){return function(s){return function(l){if(a)throw new TypeError("Generator is already executing.");for(;o&&(o=0,l[0]&&(i=0)),i;)try{if(a=1,r&&(n=2&l[0]?r.return:l[0]?r.throw||((n=r.return)&&n.call(r),0):r.next)&&!(n=n.call(r,l[1])).done)return n;switch(r=0,n&&(l=[2&l[0],n.value]),l[0]){case 0:case 1:n=l;break;case 4:return i.label++,{value:l[1],done:!1};case 5:i.label++,r=l[1],l=[0];continue;case 7:l=i.ops.pop(),i.trys.pop();continue;default:if(!(n=i.trys,(n=n.length>0&&n[n.length-1])||6!==l[0]&&2!==l[0])){i=0;continue}if(3===l[0]&&(!n||l[1]>n[0]&&l[1]<n[3])){i.label=l[1];break}if(6===l[0]&&i.label<n[1]){i.label=n[1],n=l;break}if(n&&i.label<n[2]){i.label=n[2],i.ops.push(l);break}n[2]&&i.ops.pop(),i.trys.pop();continue}l=e.call(t,i)}catch(t){l=[6,t],r=0}finally{a=n=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,s])}}};Object.defineProperty(exports,"__esModule",{value:!0});var a=require("cheerio"),r=require("@libs/fetch"),n=require("@libs/filterInputs"),i=require("@libs/novelStatus"),o=function(){function o(){this.id="69shu",this.name="69书吧",this.icon="src/cn/69shu/icon.png",this.site="https://www.69shu.xyz",this.version="0.2.0",this.filters={rank:{label:"排行榜",value:"allvisit",options:[{label:"总排行榜",value:"allvisit"},{label:"月排行榜",value:"monthvisit"},{label:"周排行榜",value:"weekvisit"},{label:"日排行榜",value:"dayvisit"},{label:"收藏榜",value:"goodnum"},{label:"字数榜",value:"words"},{label:"推荐榜",value:"allvote"},{label:"新书榜",value:"postdate"},{label:"更新榜",value:"lastupdate"}],type:n.FilterTypes.Picker},sort:{label:"分类",value:"none",options:[{label:"无",value:"none"},{label:"全部",value:"all"},{label:"玄幻",value:"xuanhuan"},{label:"仙侠",value:"xianxia"},{label:"都市",value:"dushi"},{label:"历史",value:"lishi"},{label:"游戏",value:"youxi"},{label:"科幻",value:"kehuan"},{label:"灵异",value:"kongbu"},{label:"言情",value:"nvsheng"},{label:"其它",value:"qita"}],type:n.FilterTypes.Picker}}}return o.prototype.popularNovels=function(n,i){return t(this,arguments,void 0,(function(t,n){var i,o,l,s,u=n.showLatestNovels,c=n.filters;return e(this,(function(e){switch(e.label){case 0:return i=u?"".concat(this.site,"/rank/lastupdate/").concat(t,".html"):"none"===c.sort.value?"".concat(this.site,"/rank/").concat(c.rank.value,"/").concat(t,".html"):"".concat(this.site,"/sort/").concat(c.sort.value,"/").concat(t,".html"),[4,(0,r.fetchText)(i)];case 1:if(""===(o=e.sent()))throw Error("无法获取小说列表，请检查网络");return l=(0,a.load)(o),s=[],l("div.book-coverlist").each((function(t,e){var a=l(e).find("a.cover").attr("href"),r=l(e).find("h4.name").text().trim(),n=l(e).find("a.cover > img").attr("src");if(a){var i={name:r,cover:n,path:a};s.push(i)}})),[2,s]}}))}))},o.prototype.parseNovel=function(n){return t(this,void 0,void 0,(function(){var t,o,l,s,u,c,h,f,v,p;return e(this,(function(e){switch(e.label){case 0:return t=this.site+n,[4,(0,r.fetchText)(t)];case 1:if(""===(o=e.sent()))throw Error("无法获取小说内容，请检查网络");return l=(0,a.load)(o),(s={path:n,chapters:[],name:l("h1").text().trim()}).cover=l("div.cover > img").attr("src"),s.summary=l("#bookIntro").text().trim(),u=l("div.caption-bookinfo > p"),s.author=u.find("a").attr("title"),s.artist=void 0,s.status=u.text().includes("连载")?i.NovelStatus.Ongoing:i.NovelStatus.Completed,s.genres="",c=[],(h=l("dd.all > a").attr("href"))?(f=this.site+h,[4,(0,r.fetchText)(f)]):[3,3];case 2:return v=e.sent(),(p=(0,a.load)(v))("dd").each((function(t,e){var a=p(e).find("a").attr("href"),r=p(e).find("a").text().trim();a&&c.push({name:r,path:a})})),[3,4];case 3:l("div.panel.hidden-xs > dl.panel-chapterlist:nth-child(2) > dd").each((function(t,e){var a=l(e).find("a").attr("href"),r=l(e).find("a").text().trim();a&&c.push({name:r,path:a})})),e.label=4;case 4:return s.chapters=c,[2,s]}}))}))},o.prototype.parseChapter=function(n){return t(this,void 0,void 0,(function(){var t,i;return e(this,(function(e){switch(e.label){case 0:return[4,(0,r.fetchText)(this.site+n)];case 1:return t=e.sent(),i=(0,a.load)(t),[2,i("#chaptercontent p").map((function(t,e){return i(e).text()})).get().map((function(t){return t.trim()})).filter((function(t){return""!==t&&!t.includes("69书吧")})).map((function(t){return"<p>".concat(t,"</p>")})).join("\n")]}}))}))},o.prototype.searchNovels=function(n,i){return t(this,void 0,void 0,(function(){var t,o,l,s,u;return e(this,(function(e){switch(e.label){case 0:return i>1?[2,[]]:(t="".concat(this.site,"/search"),(o=new FormData).append("searchkey",n),[4,(0,r.fetchText)(t,{method:"post",body:o})]);case 1:if(""===(l=e.sent()))throw Error("无法获取搜索结果，请检查网络");return s=(0,a.load)(l),u=[],s("div.book-coverlist").each((function(t,e){var a=s(e).find("a.cover").attr("href"),r=s(e).find("h4.name").text().trim(),n=s(e).find("a.cover > img").attr("src");if(a){var i={name:r,cover:n,path:a};u.push(i)}})),[2,u]}}))}))},o}();exports.default=new o;