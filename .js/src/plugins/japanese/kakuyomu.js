var e=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(r,o){function l(e){try{u(i.next(e))}catch(e){o(e)}}function a(e){try{u(i.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(l,a)}u((i=i.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var n,i,r,o={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]},l=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return l.next=a(0),l.throw=a(1),l.return=a(2),"function"==typeof Symbol&&(l[Symbol.iterator]=function(){return this}),l;function a(a){return function(u){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;l&&(l=0,a[0]&&(o=0)),o;)try{if(n=1,i&&(r=2&a[0]?i.return:a[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,a[1])).done)return r;switch(i=0,r&&(a=[2&a[0],r.value]),a[0]){case 0:case 1:r=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,i=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!(r=o.trys,(r=r.length>0&&r[r.length-1])||6!==a[0]&&2!==a[0])){o=0;continue}if(3===a[0]&&(!r||a[1]>r[0]&&a[1]<r[3])){o.label=a[1];break}if(6===a[0]&&o.label<r[1]){o.label=r[1],r=a;break}if(r&&o.label<r[2]){o.label=r[2],o.ops.push(a);break}r[2]&&o.ops.pop(),o.trys.pop();continue}a=t.call(e,o)}catch(e){a=[6,e],i=0}finally{n=r=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}};Object.defineProperty(exports,"__esModule",{value:!0});var n=require("@libs/fetch"),i=require("@libs/filterInputs"),r=require("cheerio"),o=require("@libs/defaultCover"),l=require("@libs/novelStatus"),a=function(){function a(){this.id="kakuyomu",this.name="kakuyomu",this.icon="src/jp/kakuyomu/icon.png",this.site="https://kakuyomu.jp",this.version="1.0.0",this.filters={genre:{type:i.FilterTypes.Picker,label:"Genre",options:[{label:"総合",value:"all"},{label:"異世界ファンタジー",value:"fantasy"},{label:"現代ファンタジー",value:"action"},{label:"SF",value:"sf"},{label:"恋愛",value:"love_story"},{label:"ラブコメ",value:"romance"},{label:"現代ドラマ",value:"drama"},{label:"ホラー",value:"horror"},{label:"ミステリー",value:"mystery"},{label:"エッセイ・ノンフィクション",value:"nonfiction"},{label:"歴史・時代・伝奇",value:"history"},{label:"創作論・評論",value:"criticism"},{label:"詩・童話・その他",value:"others"}],value:"all"},period:{type:i.FilterTypes.Picker,label:"Period",options:[{label:"累計",value:"entire"},{label:"日間",value:"daily"},{label:"週間",value:"weekly"},{label:"月間",value:"monthly"},{label:"年間",value:"yearly"}],value:"entire"}},this.imageRequestInit=void 0}return a.prototype.popularNovels=function(i,l){return e(this,arguments,void 0,(function(e,i){var l,a,u,c,s=i.filters;return t(this,(function(t){switch(t.label){case 0:return l=new URL("/rankings/".concat(s.genre.value,"/").concat(s.period.value),this.site),e>1&&l.searchParams.set("page",e.toString()),[4,(0,n.fetchText)(l.toString())];case 1:return a=t.sent(),u=(0,r.load)(a),c=[],u(".widget-media-genresWorkList-right > .widget-work").each((function(e,t){var n=u(t).find("a.widget-workCard-titleLabel"),i=n.attr("href");if(i){var r=n.text();c.push({name:r,path:i,cover:o.defaultCover})}})),[2,c]}}))}))},a.prototype.parseNovel=function(i){return e(this,void 0,void 0,(function(){var e,a,u,c,s,p,v,d,f,h,b,y,_,m,g,w,k;return t(this,(function(t){switch(t.label){case 0:return e=new URL(i,this.site),[4,(0,n.fetchText)(e.toString())];case 1:return a=t.sent(),u=(0,r.load)(a),c=JSON.parse(u('script#__NEXT_DATA__[type="application/json"]').html()||"{}"),s=null!==(g=null===(m=null===(_=null==c?void 0:c.props)||void 0===_?void 0:_.pageProps)||void 0===m?void 0:m.__APOLLO_STATE__)&&void 0!==g?g:{},p=Object.values(s).find((function(e){return"object"==typeof e&&null!==e&&"__typename"in e&&"Work"===e.__typename&&"id"in e&&e.id===i.replace("/works/","")})),v=Object.values(s).find((function(e){return"object"==typeof e&&null!==e&&"__typename"in e&&"UserAccount"===e.__typename&&"id"in e&&e.id===p.author.__ref.replace("UserAccount:","")})),d=Object.values(s).filter((function(e){if("object"==typeof e&&null!==e&&"__typename"in e&&"Chapter"===e.__typename)return!0})),f=Object.values(s).filter((function(e){if("object"==typeof e&&null!==e&&"__typename"in e&&"TableOfContentsChapter"===e.__typename)return!0})),h=Object.values(s).filter((function(e){if("object"==typeof e&&null!==e&&"__typename"in e&&"Episode"===e.__typename)return!0})),b=h.map((function(e){var t,n=null===(t=f.find((function(t){return t.episodeUnions.some((function(t){return t.__ref==="Episode:".concat(e.id)}))})))||void 0===t?void 0:t.chapter;return{chapter:d.find((function(e){return e.id===(null==n?void 0:n.__ref.replace("Chapter:",""))})),episode:e}})),y={path:i,name:p.title,cover:null!==(w=p.adminCoverImageUrl)&&void 0!==w?w:o.defaultCover,genres:(null!==(k=null==p?void 0:p.tagLabels)&&void 0!==k?k:[]).join(","),author:null==v?void 0:v.activityName,status:"COMPLETED"===p.serialStatus?l.NovelStatus.Completed:l.NovelStatus.Ongoing,summary:p.introduction,chapters:b.map((function(e){var t,n,r,o,l,a,u,c;return{name:(null===(t=e.chapter)||void 0===t?void 0:t.title)?"".concat(null===(n=e.chapter)||void 0===n?void 0:n.title," - ").concat(null===(r=e.episode)||void 0===r?void 0:r.title):null!==(l=null===(o=e.episode)||void 0===o?void 0:o.title)&&void 0!==l?l:"",path:"".concat(i,"/episodes/").concat(null===(a=e.episode)||void 0===a?void 0:a.id),releaseTime:new Date(null!==(c=null===(u=e.episode)||void 0===u?void 0:u.publishedAt)&&void 0!==c?c:0).toISOString()}}))},[2,y]}}))}))},a.prototype.parseChapter=function(i){return e(this,void 0,void 0,(function(){var e,o,l,a,u,c,s,p,v;return t(this,(function(t){switch(t.label){case 0:return e=new URL(i,this.site),[4,(0,n.fetchText)(e.toString())];case 1:return o=t.sent(),l=(0,r.load)(o),a=null!==(s=l(".chapterTitle").text())&&void 0!==s?s:"",u=null!==(p=l(".widget-episodeTitle").html())&&void 0!==p?p:"",c=null!==(v=l(".widget-episodeBody").html())&&void 0!==v?v:"",[2,"\n    <div>\n      ".concat(a?"<h1>".concat(a,"</h1>"):"","\n      <h2>").concat(u,"</h2>\n    </div>\n    <p><br><br></p>\n    ").concat(c)]}}))}))},a.prototype.searchNovels=function(i,l){return e(this,void 0,void 0,(function(){var e,a,u,c,s,p,v,d,f;return t(this,(function(t){switch(t.label){case 0:return(e=new URL("/search",this.site)).searchParams.set("q",i),l>1&&e.searchParams.set("page",l.toString()),[4,(0,n.fetchText)(e.toString())];case 1:return a=t.sent(),u=(0,r.load)(a),c=JSON.parse(u('script#__NEXT_DATA__[type="application/json"]').html()||"{}"),s=Object.values(null!==(f=null===(d=null===(v=null==c?void 0:c.props)||void 0===v?void 0:v.pageProps)||void 0===d?void 0:d.__APOLLO_STATE__)&&void 0!==f?f:{}).filter((function(e){if("object"==typeof e&&null!==e&&"__typename"in e&&"Work"===e.__typename)return!0})),p=s.map((function(e){var t,n;return{name:null!==(t=e.title)&&void 0!==t?t:"",path:"/works/".concat(e.id),cover:null!==(n=e.adminCoverImageUrl)&&void 0!==n?n:o.defaultCover}})),[2,p]}}))}))},a}();exports.default=new a;