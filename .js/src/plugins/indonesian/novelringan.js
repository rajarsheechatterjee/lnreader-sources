var e=this&&this.__awaiter||function(e,l,a,t){return new(a||(a=Promise))((function(n,i){function r(e){try{u(t.next(e))}catch(e){i(e)}}function o(e){try{u(t.throw(e))}catch(e){i(e)}}function u(e){var l;e.done?n(e.value):(l=e.value,l instanceof a?l:new a((function(e){e(l)}))).then(r,o)}u((t=t.apply(e,l||[])).next())}))},l=this&&this.__generator||function(e,l){var a,t,n,i={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]},r=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return r.next=o(0),r.throw=o(1),r.return=o(2),"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function o(o){return function(u){return function(o){if(a)throw new TypeError("Generator is already executing.");for(;r&&(r=0,o[0]&&(i=0)),i;)try{if(a=1,t&&(n=2&o[0]?t.return:o[0]?t.throw||((n=t.return)&&n.call(t),0):t.next)&&!(n=n.call(t,o[1])).done)return n;switch(t=0,n&&(o=[2&o[0],n.value]),o[0]){case 0:case 1:n=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,t=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(n=i.trys,(n=n.length>0&&n[n.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!n||o[1]>n[0]&&o[1]<n[3])){i.label=o[1];break}if(6===o[0]&&i.label<n[1]){i.label=n[1],n=o;break}if(n&&i.label<n[2]){i.label=n[2],i.ops.push(o);break}n[2]&&i.ops.pop(),i.trys.pop();continue}o=l.call(e,i)}catch(e){o=[6,e],t=0}finally{a=n=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,u])}}};Object.defineProperty(exports,"__esModule",{value:!0});var a=require("cheerio"),t=require("@libs/fetch"),n=require("@libs/filterInputs"),i=function(){function i(){this.id="novelringan.com",this.name="NovelRingan",this.icon="src/id/novelringan/icon.png",this.site="https://novelringan.com/",this.version="1.0.0",this.coverUriPrefix="https://i0.wp.com/novelringan.com/wp-content/uploads/",this.filters={status:{value:"",label:"Status",options:[{label:"All",value:""},{label:"Ongoing",value:"Ongoing"},{label:"Completed",value:"Completed"}],type:n.FilterTypes.Picker},sort:{value:"popular",label:"Urutkan",options:[{label:"A-Z",value:"title"},{label:"Z-A",value:"titlereverse"},{label:"Terbarui",value:"update"},{label:"Ditambahkan",value:"latest"},{label:"Terpopuler",value:"popular"}],type:n.FilterTypes.Picker},type:{value:[],label:"Tipe",options:[{label:"Chinese Novel",value:"chinese-novel"},{label:"Chinese Web Novel",value:"chinese-web-novel"},{label:"Filipino Novel",value:"filipino-novel"},{label:"Indonesia Novel",value:"indonesia-novel"},{label:"Korean Novel",value:"korean-novel"},{label:"Light Novel",value:"light-novel"},{label:"Light Novel (CN)",value:"light-novel-cn"},{label:"Light Novel (JP)",value:"light-novel-jp"},{label:"Light Novel (KR)",value:"light-novel-kr"},{label:"Malaysian Novel",value:"malaysian-novel"},{label:"Published Novel (CN)",value:"published-novel-cn"},{label:"Published Novel (JP)",value:"published-novel-jp"},{label:"Published Novel (KR)",value:"published-novel-kr"},{label:"Published Novel (TH)",value:"published-novel-th"},{label:"Thai Novel",value:"thai-novel"},{label:"Vietnamese Novel",value:"vietnamese-novel"},{label:"Web Novel",value:"web-novel"},{label:"Webnovel",value:"webnovel"}],type:n.FilterTypes.CheckboxGroup},genre:{value:[],label:"Genres",options:[{label:"Action",value:"action"},{label:"Adult",value:"adult"},{label:"Adventure",value:"adventure"},{label:"Celebrity",value:"celebrity"},{label:"Comedy",value:"comedy"},{label:"ction",value:"ction"},{label:"Drama",value:"drama"},{label:"Eastern",value:"eastern"},{label:"Ecchi",value:"ecchi"},{label:"Fantasy",value:"fantasy"},{label:"Game",value:"game"},{label:"Games",value:"games"},{label:"Gender Bender",value:"gender-bender"},{label:"Harem",value:"harem"},{label:"Historical",value:"historical"},{label:"Horror",value:"horror"},{label:"Isekai",value:"isekai"},{label:"Josei",value:"josei"},{label:"Life",value:"life"},{label:"LitRPG",value:"litrpg"},{label:"Magical Realism",value:"magical-realism"},{label:"Martial Arts",value:"martial-arts"},{label:"Mature",value:"mature"},{label:"Mecha",value:"mecha"},{label:"Mystery",value:"mystery"},{label:"Psychologic",value:"psychologic"},{label:"Psychological",value:"psychological"},{label:"Recarnation",value:"recarnation"},{label:"Reincarnation",value:"reincarnation"},{label:"Romance",value:"romance"},{label:"School",value:"school"},{label:"School Life",value:"school-life"},{label:"Sci-fi",value:"sci-fi"},{label:"Seinen",value:"seinen"},{label:"Shotacon",value:"shotacon"},{label:"Shoujo",value:"shoujo"},{label:"Shoujo Ai",value:"shoujo-ai"},{label:"Shounen",value:"shounen"},{label:"Shounen Ai",value:"shounen-ai"},{label:"Slice of Life",value:"slice-of-life"},{label:"Smut",value:"smut"},{label:"Sports",value:"sports"},{label:"Supernatural",value:"supernatural"},{label:"Tragedy",value:"tragedy"},{label:"Urban",value:"urban"},{label:"Urban Life",value:"urban-life"},{label:"ve names:N/A Genre:Romance",value:"ve-namesn-a-genreromance"},{label:"Wuxia",value:"wuxia"},{label:"Xianxia",value:"xianxia"},{label:"Xuanhuan",value:"xuanhuan"},{label:"Yaoi",value:"yaoi"},{label:"Yuri",value:"yuri"}],type:n.FilterTypes.CheckboxGroup}}}return i.prototype.parseNovels=function(e){var l=this,a=[];return e("article.post").each((function(t,n){var i,r=null===(i=e(n).find(".entry-title").text())||void 0===i?void 0:i.trim(),o=l.coverUriPrefix+e(n).find("img").attr("data-sxrx"),u=e(n).find("h2 > a").attr("href");if(u){var s={name:r,cover:o,path:u.replace(l.site,"")};a.push(s)}})),a},i.prototype.popularNovels=function(n,i){return e(this,arguments,void 0,(function(e,n){var i,r,o,u=n.filters;return l(this,(function(l){switch(l.label){case 0:return i="".concat(this.site,"advanced-search/page/").concat(e,"/?title"),i+="&status=".concat(u.status.value),i+="&order=".concat(u.sort.value),u.type.value.length&&(i+=u.type.value.map((function(e){return"&type[]=".concat(e)})).join("")),u.genre.value.length&&(i+=u.genre.value.map((function(e){return"&genre[]=".concat(e)})).join("")),[4,(0,t.fetchApi)(i)];case 1:return[4,l.sent().text()];case 2:return r=l.sent(),o=(0,a.load)(r),[2,this.parseNovels(o)]}}))}))},i.prototype.parseNovel=function(n){return e(this,void 0,void 0,(function(){var e,i,r,o,u,s,v=this;return l(this,(function(l){switch(l.label){case 0:return[4,(0,t.fetchApi)(this.site+n)];case 1:return[4,l.sent().text()];case 2:return e=l.sent(),i=(0,a.load)(e),r=Array.from((null===(s=i("meta[name=msapplication-TileImage] + style").html())||void 0===s?void 0:s.matchAll(/"(.*?)"/g))||[],(function(e){return e[1]})),(o={path:n,name:r[0]||i(".entry-title").text()||"Untitled",author:r[1],summary:i(".maininfo span p").text(),chapters:[]}).cover=this.coverUriPrefix+i("img.ts-post-image").attr("data-sxrx"),i(".maininfo li").each((function(){var e=i(this).find("b").text().trim(),l=i(this).find("b").remove().end().text().trim();switch(e){case"Status:":o.status=l;break;case"Genre:":o.genres=l}})),u=[],i(".bxcl > ul > li").each((function(e,l){var a=i(l).find("a").text(),t=i(l).find("a").attr("href");t&&u.push({name:a,path:t.replace(v.site,"")})})),o.chapters=u.reverse(),[2,o]}}))}))},i.prototype.parseChapter=function(n){return e(this,void 0,void 0,(function(){var e,i,r;return l(this,(function(l){switch(l.label){case 0:return e=this.site+n,[4,(0,t.fetchApi)(e)];case 1:return[4,l.sent().text()];case 2:return i=l.sent(),(r=(0,a.load)(i))('.entry-content div[style="display:none"]').remove(),[2,r(".entry-content").html()||""]}}))}))},i.prototype.searchNovels=function(n,i){return e(this,void 0,void 0,(function(){var e,r,o;return l(this,(function(l){switch(l.label){case 0:return e=this.site+"page/"+i+"/?s="+n,[4,(0,t.fetchApi)(e)];case 1:return[4,l.sent().text()];case 2:return r=l.sent(),o=(0,a.load)(r),[2,this.parseNovels(o)]}}))}))},i}();exports.default=new i;