var e=this&&this.__awaiter||function(e,t,a,r){return new(a||(a=Promise))((function(s,l){function n(e){try{i(r.next(e))}catch(e){l(e)}}function o(e){try{i(r.throw(e))}catch(e){l(e)}}function i(e){var t;e.done?s(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(n,o)}i((r=r.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var a,r,s,l={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]},n=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return n.next=o(0),n.throw=o(1),n.return=o(2),"function"==typeof Symbol&&(n[Symbol.iterator]=function(){return this}),n;function o(o){return function(i){return function(o){if(a)throw new TypeError("Generator is already executing.");for(;n&&(n=0,o[0]&&(l=0)),l;)try{if(a=1,r&&(s=2&o[0]?r.return:o[0]?r.throw||((s=r.return)&&s.call(r),0):r.next)&&!(s=s.call(r,o[1])).done)return s;switch(r=0,s&&(o=[2&o[0],s.value]),o[0]){case 0:case 1:s=o;break;case 4:return l.label++,{value:o[1],done:!1};case 5:l.label++,r=o[1],o=[0];continue;case 7:o=l.ops.pop(),l.trys.pop();continue;default:if(!(s=l.trys,(s=s.length>0&&s[s.length-1])||6!==o[0]&&2!==o[0])){l=0;continue}if(3===o[0]&&(!s||o[1]>s[0]&&o[1]<s[3])){l.label=o[1];break}if(6===o[0]&&l.label<s[1]){l.label=s[1],s=o;break}if(s&&l.label<s[2]){l.label=s[2],l.ops.push(o);break}s[2]&&l.ops.pop(),l.trys.pop();continue}o=t.call(e,l)}catch(e){o=[6,e],r=0}finally{a=s=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}};Object.defineProperty(exports,"__esModule",{value:!0});var a=require("cheerio"),r=require("htmlparser2"),s=require("@libs/fetch"),l=require("@libs/novelStatus"),n=require("@libs/defaultCover");function o(e,t){var a=e.match(/(\d+)$/);a&&a[0]&&(t.chapterNumber=parseInt(a[0]))}var i=new(function(){function i(e){var t,a;this.id=e.id,this.name=e.sourceName,this.icon="multisrc/lightnovelwp/".concat(e.id.toLowerCase(),"/icon.png"),this.site=e.sourceSite;var r=(null===(t=e.options)||void 0===t?void 0:t.versionIncrements)||0;this.version="1.1.".concat(4+r),this.options=null!==(a=e.options)&&void 0!==a?a:{},this.filters=e.filters}return i.prototype.getHostname=function(e){var t=(e=e.split("/")[2]).split(".");return t.pop(),t.join(".")},i.prototype.safeFecth=function(a,r){return e(this,void 0,void 0,(function(){var e,l,n,o,i;return t(this,(function(t){switch(t.label){case 0:return[4,(0,s.fetchApi)(a)];case 1:if(!(e=t.sent()).ok&&1!=r)throw new Error("Could not reach site ("+e.status+") try to open in webview.");return[4,e.text()];case 2:if(l=t.sent(),n=null===(i=null===(o=l.match(/<title>(.*?)<\/title>/))||void 0===o?void 0:o[1])||void 0===i?void 0:i.trim(),this.getHostname(a)!=this.getHostname(e.url)||n&&("Bot Verification"==n||"You are being redirected..."==n||"Un instant..."==n||"Just a moment..."==n||"Redirecting..."==n))throw new Error("Captcha error, please open in webview");return[2,l]}}))}))},i.prototype.parseNovels=function(e){var t=this;e=(0,a.load)(e).html();var r=[];return(e.match(/<article([\s\S]*?)<\/article>/g)||[]).forEach((function(e){var a=e.match(/<a href="(.*?)".*title="(.*?)"/)||[],s=a[1],l=a[2];if(l&&s){var o=e.match(/<img.*src="(.*?)"(?:\sdata-src="(.*?)")?.*\/?>/)||[];r.push({name:l,cover:o[2]||o[1]||n.defaultCover,path:s.replace(t.site,"")})}})),r},i.prototype.popularNovels=function(a,r){return e(this,arguments,void 0,(function(e,a){var r,s,l,n,o,i,c,u,v,p=a.filters,h=a.showLatestNovels;return t(this,(function(t){switch(t.label){case 0:for(l in r=null!==(v=null===(u=this.options)||void 0===u?void 0:u.seriesPath)&&void 0!==v?v:"series/",s=this.site+r+"?page="+e,p||(p=this.filters||{}),h&&(s+="&order=latest"),p)if("object"==typeof p[l].value)for(n=0,o=p[l].value;n<o.length;n++)i=o[n],s+="&".concat(l,"=").concat(i);else p[l].value&&(s+="&".concat(l,"=").concat(p[l].value));return[4,this.safeFecth(s,!1)];case 1:return c=t.sent(),[2,this.parseNovels(c)]}}))}))},i.prototype.parseNovel=function(a){return e(this,void 0,void 0,(function(){var e,s,i,c,u,v,p,h,d,f,m,b,g,y,w,C,k,S,x;return t(this,(function(t){switch(t.label){case 0:return e=this.site,[4,this.safeFecth(e+a,!1)];case 1:return s=t.sent(),i={path:a,name:"",genres:"",summary:"",author:"",artist:"",status:"",chapters:[]},c=!1,u=!1,v=!1,p=!1,h=!1,d=!1,f=!1,m=!1,b=!1,g=!1,y=0,w=!1,C=[],k={},S=new r.Parser({onopentag:function(t,a){var r;!i.cover&&(null===(r=a.class)||void 0===r?void 0:r.includes("ts-post-image"))?(i.name=a.title,i.cover=a["data-src"]||a.src||n.defaultCover):"genxed"===a.class||"sertogenre"===a.class?c=!0:c&&"a"===t?u=!0:"div"!==t||"entry-content"!==a.class&&"description"!==a.itemprop?"spe"===a.class||"serl"===a.class?p=!0:p&&"span"===t?h=!0:"div"===t&&"sertostat"===a.class?(p=!0,h=!0,m=!0):a.class&&a.class.includes("eplister")?b=!0:b&&"li"===t?g=!0:g&&("a"===t&&void 0===k.path?k.path=a.href.replace(e,"").trim():"epl-num"===a.class?y=1:"epl-title"===a.class?y=2:"epl-date"===a.class?y=3:"epl-price"===a.class&&(y=4)):v=!0},ontext:function(e){var t,a;if(c)u&&(i.genres+=e+", ");else if(v)i.summary+=e.trim();else if(p){if(h){var r=e.toLowerCase().replace(":","").trim();if(d)i.author+=e||"Unknown";else if(f)i.artist+=e||"Unknown";else if(m)switch(r){case"مكتملة":case"completed":case"complété":case"completo":case"completado":case"tamamlandı":i.status=l.NovelStatus.Completed;break;case"مستمرة":case"ongoing":case"en cours":case"em andamento":case"en progreso":case"devam ediyor":i.status=l.NovelStatus.Ongoing;break;case"متوقفة":case"hiatus":case"en pause":case"hiato":case"pausa":case"pausado":case"duraklatıldı":i.status=l.NovelStatus.OnHiatus;break;default:i.status=l.NovelStatus.Unknown}switch(r){case"الكاتب":case"author":case"auteur":case"autor":case"yazar":d=!0;break;case"الحالة":case"status":case"statut":case"estado":case"durum":m=!0;break;case"الفنان":case"artist":case"artiste":case"artista":case"çizer":f=!0}}}else if(b&&g)if(1===y)o(e,k);else if(2===y)k.name=(null===(a=null===(t=e.match(RegExp("^".concat(i.name.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"\\s*(.+)"))))||void 0===t?void 0:t[1])||void 0===a?void 0:a.trim())||e.trim(),k.chapterNumber||o(e,k);else if(3===y)k.releaseTime=e;else if(4===y){switch(r=e.toLowerCase().trim()){case"free":case"gratuit":case"مجاني":case"livre":case"":w=!1;break;default:w=!0}}},onclosetag:function(e){var t,a,r;c?u?u=!1:(c=!1,i.genres=null===(t=i.genres)||void 0===t?void 0:t.slice(0,-2)):v?"br"===e?i.summary+="\n":"div"===e&&(v=!1):p?h?"span"===e&&(h=!1,d&&i.author?d=!1:f&&i.artist?f=!1:m&&""!==i.status&&(m=!1)):"div"===e&&(p=!1,i.author=null===(a=i.author)||void 0===a?void 0:a.trim(),i.artist=null===(r=i.artist)||void 0===r?void 0:r.trim()):b&&(g?1===y||2===y||3===y||4===y?y=0:"li"===e&&(g=!1,k.chapterNumber||(k.chapterNumber=0),w||C.push(k),k={}):"ul"===e&&(b=!1))}}),S.write(s),S.end(),C.length&&((null===(x=this.options)||void 0===x?void 0:x.reverseChapters)&&C.reverse(),i.chapters=C),[2,i]}}))}))},i.prototype.parseChapter=function(r){return e(this,void 0,void 0,(function(){var e,s,l,n,o,i=this;return t(this,(function(t){switch(t.label){case 0:return[4,this.safeFecth(this.site+r,!1)];case 1:if(e=t.sent(),null===(l=this.options)||void 0===l?void 0:l.customJs)try{(s=(0,a.load)(e))("div.entry-content script").remove(),s("div.entry-content > p").each((function(e,t){var a,l=i.site+r.slice(0,-1),n=l.length*l.charCodeAt(l.length-1)*2%3,o=null!==(a=new Map([[0,4223],[1,12415],[2,7007]]).get(n))&&void 0!==a?a:4223;s(t).text(s(t).text().split("").map((function(e){var t=e.charCodeAt(0);return t<o||t>o+255?e:String.fromCharCode(t-o)})).join(""))})),e=s.html()}catch(e){throw console.error("Error executing customJs:",e),e}return[2,(null===(o=null===(n=e.match(/<div.*class="epcontent ([\s\S]*?)<div.*class="bottomnav"/g))||void 0===n?void 0:n[0].match(/<p.*>([\s\S]*?)<\/p>/g))||void 0===o?void 0:o.join("\n"))||""]}}))}))},i.prototype.searchNovels=function(a,r){return e(this,void 0,void 0,(function(){var e,s;return t(this,(function(t){switch(t.label){case 0:return e=this.site+"page/"+r+"/?s="+a,[4,this.safeFecth(e,!0)];case 1:return s=t.sent(),[2,this.parseNovels(s)]}}))}))},i}())({id:"requiemtls",sourceSite:"https://requiemtls.com/",sourceName:"Requiem Translations",options:{lang:"English",reverseChapters:!0,customJs:"\n        $('div.entry-content script').remove();\n        $('div.entry-content > p').each((_,el) => {\n          const url = this.site + chapterPath.slice(0, -1);\n          const encode = url.length * url.charCodeAt(url.length - 1) * 2 % 3;\n\n          const offsets = new Map([[0, 4223], [1, 12415], [2, 7007]]);\n          const offset = offsets.get(encode) ?? 4223;\n\n          $(el).text($(el).text().split('').map(char => {\n            let code = char.charCodeAt(0);\n            return (code < offset || code > offset+255) ? char : String.fromCharCode(code-offset);\n          }).join(''));\n        });\n",versionIncrements:2},filters:{"genre[]":{type:"Checkbox",label:"Genre",value:[],options:[{label:"Academy",value:"academy"},{label:"Apocalypse",value:"apocalypse"},{label:"Comedy",value:"comedy"},{label:"Daily Life",value:"daily-life"},{label:"Distantchicken",value:"distantchicken"},{label:"Drama",value:"drama"},{label:"Fantasy",value:"fantasy"},{label:"Gallery",value:"gallery"},{label:"Growth",value:"growth"},{label:"Harem",value:"harem"},{label:"Hero",value:"hero"},{label:"Internet Broadcasting",value:"internet-broadcasting"},{label:"Martial Arts",value:"martial-arts"},{label:"Modern",value:"modern"},{label:"Munchkin",value:"munchkin"},{label:"Mystery",value:"mystery"},{label:"Obsession",value:"obsession"},{label:"Possession",value:"possession"},{label:"Pure Love",value:"pure-love"},{label:"Purelove",value:"purelove"},{label:"Regression",value:"regression"},{label:"Regret",value:"regret"},{label:"Reincarnation",value:"reincarnation"},{label:"Romance",value:"romance"},{label:"Salvation",value:"salvation"},{label:"SF",value:"sf"},{label:"SM",value:"sm"},{label:"Sports",value:"sports"},{label:"TS",value:"ts"},{label:"Yandere",value:"yandere"},{label:"Yuri",value:"yuri"}]},"type[]":{type:"Checkbox",label:"Type",value:[],options:[{label:"Mature",value:"mature"}]},status:{type:"Picker",label:"Status",value:"",options:[{label:"All",value:""},{label:"Ongoing",value:"ongoing"},{label:"Hiatus",value:"hiatus"},{label:"Completed",value:"completed"}]},order:{type:"Picker",label:"Order by",value:"",options:[{label:"Default",value:""},{label:"A-Z",value:"title"},{label:"Z-A",value:"titlereverse"},{label:"Latest Update",value:"update"},{label:"Latest Added",value:"latest"},{label:"Popular",value:"popular"},{label:"Rating",value:"rating"}]}}});exports.default=i;