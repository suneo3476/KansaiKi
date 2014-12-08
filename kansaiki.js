/* このスクリプトは装備の最適解を出すものではなく、意思決定を早めるためのツールです */
/* 当スクリプトの出力結果に対する判断は利用した提督の責任とします */

/* 提督！各種情報を教えてください */

/* - 出撃情報 - */
/* どこに出撃しますか？ */
/* 例：2-2 */
var attackMap = "5-2";
/* どれぐらいの制空戦力を希望しますか？ */
/* 航空優勢:0,制空権確保:1 */
var skywarLevel = 1;
/* 被撃墜分が考慮されますが,制空戦力をどのぐらい底上げしますか？ */
/* デフォルト:10ですが適宜調整してください */
var skywarForceBias = 10;

/* - 装備情報 - */
/* 彩雲または二式艦上偵察機を載せますか？ */
/* 両機載せる:2 *//* 片方だけ:1 *//* 載せない:0 */
var numOfSpyAircrafts = 1;
/* 艦攻・艦爆を積むために1隻あたり何スロット残しますか？ */
/* 0では攻撃不可能になります */
var numOfExtraSlots = 2;
/* 艦攻・艦爆を積むスロットの艦載機の数は多くしますか？少なくしますか？ */
/* 多い:1 少ない:0 */
var savingPlanes = 1;

/* - 編成情報 - */
/* 艦種ごとに何隻の艦娘を編成しますか？ */
var numOfSeiki = 2;	/*正規空母*//*装甲空母もここにカウントします*/
var numOfKei = 1;	/*軽空母*/
/* ここはゆくゆく実装しますので、今のところ航空艦の入力はなしでお願いします… */
var numOfSenkan = 0;	/*航空戦艦*/
var numOfJunyokan = 0;	/*航空巡洋艦*/

/* 出撃可能な艦娘をすべて選んでください.編成の候補になります. */
/* "名前":0or1(不可能:0,可能:1) */
var kanmusuInput = {
	/* 正規空母 */
	"赤城":0,	"赤城改":1,
	"加賀":0,	"加賀改":1,
	"蒼龍":0,	"蒼龍改":0,	"蒼龍改二":1,
	"飛龍":0,	"飛龍改":0,	"飛龍改二":1,
	"翔鶴":0,	"翔鶴改":1,
	"瑞鶴":0,	"瑞鶴改":1,
	"雲龍":0,	"雲龍改":0,
	/* 装甲空母(正規空母扱いです) */
	"大鳳":1,	"大鳳改":0,
	/* 軽空母 */
	"鳳翔":1,	"鳳翔改":0,
	"龍驤":0,	"龍驤改":0,	"龍驤改二":1,
	"龍鳳":0,	"龍鳳改":0,
	"祥鳳":1,	"祥鳳改":0,
	"瑞鳳":0,	"瑞鳳改":1,
	"飛鷹":0,	"飛鷹改":1,
	"隼鷹":0,	"隼鷹改":0,	"隼鷹改二":1,
	"千歳航":0,	"千歳航改":0,		"千歳航改二":1,
	"千代田航":0,	"千代田航改":0,	"千代田航改二":1,
	/* 航空戦艦 */
	"扶桑改":1,	"扶桑改二":0,
	"山城改":1,	"山城改二":0,
	"日向改":1,
	"伊勢改":1,
	/* 航空巡洋艦 */
	"鈴谷改":1,
	"熊野改":1,
	"最上改":1,
	"三隈改":1,
	"利根改二":1,
	"筑摩改二":0
}

/* 編成に必ず組み込みたい艦娘を指名してください. */
/* "名前":0or1(必ず組み込む:1,違う:0) */
var requiredKanmusuInput = {
	/* 正規空母 */
	"赤城":0,	"赤城改":0,
	"加賀":0,	"加賀改":0,
	"蒼龍":0,	"蒼龍改":0,	 	"蒼龍改二": 		0,
	"飛龍":0,	"飛龍改":0,	 	"飛龍改二": 		0,
	"翔鶴":0,	"翔鶴改":0,
	"瑞鶴":0,	"瑞鶴改":1,
	"雲龍":0,	"雲龍改":0,
	/* 装甲空母(正規空母扱いです) */
	"大鳳":0,	"大鳳改":0,
	/* 軽空母 */
	"鳳翔":0,	"鳳翔改":0,
	"龍驤":0,	"龍驤改":0,		"龍驤改二": 		0,
	"龍鳳":0,	"龍鳳改":0,
	"祥鳳":0,	"祥鳳改":0,
	"瑞鳳":0,	"瑞鳳改":0,
	"飛鷹":0,	"飛鷹改":1,
	"隼鷹":0,	"隼鷹改":0,		"隼鷹改二": 		0,
	"千歳航":0,	"千歳航改":0,		"千歳航改二": 	0,
	"千代田航":0,	"千代田航改":0,	"千代田航改二": 	0,
	/* 航空戦艦 */
	"扶桑改":0,	"扶桑改二":0,
	"山城改":0,	"山城改二":0,
	"日向改":0,
	"伊勢改":0,
	/* 航空巡洋艦 */
	"鈴谷改":0,
	"熊野改":0,
	"最上改":0,
	"三隈改":0,
	"利根改二":0,
	"筑摩改二":0
}

/* 装備可能な艦載機・水上機の数を入力 */
/* 使わない装備があれば0として構いません */
/* "名前": */
var sobiInput = {
	/* 艦上戦闘機 */
	"九六式艦戦": 			0,
	"零式艦戦21型": 			0,
	"零式艦戦21型(熟練)": 	2,
	"零式艦戦52型": 			0,
	"零式艦戦52型丙(六〇一空)":0,
	"紫電改二": 				0,
	"烈風": 					10,
	"烈風改": 				1,
	"烈風(六〇一空)": 		0,
	"震電改": 				0,
	/* 艦上爆撃機 */
	"零式艦戦62型(爆戦)": 7,
	"九九式艦爆(熟練)": 	1,
	"彗星(江草隊)": 		1,
	/*　艦上攻撃機 */
	"九七式艦攻(友永隊)":1,
	"天山一二型(友永隊)":1,
	/* 水上爆撃機 */
	"瑞雲": 				16,
	"瑞雲(六三四空)": 	3,
	"瑞雲12型": 			0,
	"瑞雲12型(六三四空)": 0
}

/* データセット */
/* 正規空母・軽空母・航空戦艦・航空巡洋艦 */
/* "名前":[各スロットの艦載機数の配列] */
var kanmusuSlot = {
	/* 正規空母 */
	"赤城":[18,18,27,10],	"赤城改":[20,20,32,10],
	"加賀":[18,18,45,12],	"加賀改":[20,20,46,12],
	"蒼龍":[12,27,18,7],	"蒼龍改":[18,27,18,10],	"蒼龍改二":[18,35,20,6],
	"飛龍":[12,28,18,7],	"飛龍改":[18,27,18,10],	"飛龍改二":[18,36,22,3],
	"翔鶴":[21,21,21,12],	"翔鶴改":[24,24,24,12],
	"瑞鶴":[21,21,21,12],	"瑞鶴改":[24,24,24,12],
	"雲龍":[18,24,3,6],	"雲龍改":[18,21,27,3],
	/* 装甲空母(正規空母扱いです) */
	"大鳳":[18,18,18,7],	"大鳳改":[30,24,24,8],
	/* 軽空母 */
	"鳳翔":[8,11,0,0],	"鳳翔改":[14,16,12,0],
	"龍驤":[9,24,5,0],	"龍驤改":[9,24,5,5],	"龍驤改二":[18,28,6,3],
	"龍鳳":[18,7,6,0],	"龍鳳改":[21,9,9,6],
	"祥鳳":[18,9,3,0],	"祥鳳改":[18,12,12,6],
	"瑞鳳":[18,9,3,0],	"瑞鳳改":[18,12,12,6],
	"飛鷹":[12,18,18,10],	"飛鷹改":[18,18,18,12],
	"隼鷹":[12,18,18,10],	"隼鷹改":[18,18,18,12],	"隼鷹改二":[24,18,20,4],
	"千歳航":[21,9,6,0],		"千歳航改":[24,16,8,8],	"千歳航改二":[24,16,11,8],
	"千代田航":[21,9,6,0],	"千代田航改":[24,16,8,8],	"千代田航改二":[24,16,11,8],
	/* 航空戦艦 */
	"扶桑改":[10,10,10,10],	"扶桑改二":[4,4,9,23],
	"山城改":[10,10,10,10],	"山城改二":[4,4,9,23],
	"日向改":[11,11,11,14],
	"伊勢改":[11,11,11,14],
	/* 航空巡洋艦 */
	"鈴谷改":[5,6,5,3],
	"熊野改":[5,6,5,3],
	"最上改":[5,6,5,3],
	"三隈改":[5,6,5,3],
	"利根改二":[2,2,9,5],
	"筑摩改二":[2,2,9,5]
};

/* 艦種ごとの艦娘の一覧 */
var allSeiki = [
/* 正規空母 */
"赤城", "赤城改",
"加賀", "加賀改",
"蒼龍", "蒼龍改", "蒼龍改二",
"飛龍", "飛龍改", "飛龍改二",
"翔鶴", "翔鶴改",
"瑞鶴", "瑞鶴改",
"雲龍", "雲龍改",
"大鳳", "大鳳改"];
/*var allSoko = ["大鳳", "大鳳改"];*/
var allSoko = [
/* 装甲空母 */
];
var allKei = [
/* 軽空母 */
"鳳翔", "鳳翔改",
"龍驤", "龍驤改", "龍驤改二",
"龍鳳", "龍鳳改",
"祥鳳", "祥鳳改",
"瑞鳳", "瑞鳳改",
"飛鷹", "飛鷹改",
"隼鷹", "隼鷹改", "隼鷹改二",
"千歳航", "千歳航改", "千歳航改二",
"千代田航", "千代田航改", "千代田航改二"];
var allSenkan = [
/* 航空戦艦 */
"扶桑改", "扶桑改二",
"山城改", "山城改二",
"日向改",
"伊勢改"];
var allJunyokan = [
/* 航空巡洋艦 */
"鈴谷改",
"熊野改",
"最上改",
"三隈改",
"利根改二",
"筑摩改二"];

/* 改造関係で見た艦娘の一覧 */
var kanmusuIdentify = [
/* 正規空母 */
["赤城", "赤城改"],
["加賀", "加賀改"],
["蒼龍", "蒼龍改", "蒼龍改二"],
["飛龍", "飛龍改", "飛龍改二"],
["翔鶴", "翔鶴改"],
["瑞鶴", "瑞鶴改"],
["雲龍", "雲龍改"],
/* 装甲空母(正規空母扱いです) */
["大鳳", "大鳳改"],
/* 軽空母 */
["鳳翔", "鳳翔改"],
["龍驤", "龍驤改", "龍驤改二"],
["龍鳳", "龍鳳改"],
["祥鳳", "祥鳳改"],
["瑞鳳", "瑞鳳改"],
["飛鷹", "飛鷹改"],
["隼鷹", "隼鷹改", "隼鷹改二"],
["千歳航", "千歳航改", "千歳航改二"],
["千代田航", "千代田航改", "千代田航改二"],
/* 航空戦艦 */
["扶桑改", "扶桑改二"],
["山城改", "山城改二"],
["日向改"],
["伊勢改"],
/* 航空巡洋艦 */
["鈴谷改"],
["熊野改"],
["最上改"],
["三隈改"],
["利根改二"],
["筑摩改二"]];

/* 航空戦に参加する艦戦・艦爆・艦攻・水爆 */
/* "名前":対空値 */
var sobiTaiku = {
	/* 艦上戦闘機 */
	"九六式艦戦":2,
	"零式艦戦21型":5,
	"零式艦戦52型":6,
	"零式艦戦21型(熟練)":8,
	"紫電改二":9,
	"零式艦戦52型丙(六〇一空)":9,
	"烈風":10,
	"烈風(六〇一空)":11,
	"烈風改":12,
	"震電改":15,
	/* 艦上爆撃機 */
	"零式艦戦62型(爆戦)":4,
	"九九式艦爆(熟練)":1,
	"彗星(江草隊)":1,
	/* 艦上攻撃機 */
	"九七式艦攻(友永隊)":1,
	"天山一二型(友永隊)":1,
	/* 水上爆撃機 */
	"瑞雲":2,
	"瑞雲(六三四空)":2,
	"瑞雲12型":3,
	"瑞雲12型(六三四空)":3
}

/* 艦載機・水上機のリスト */
var allKansen = [
	/* 艦上戦闘機 */
	"九六式艦戦",
	"零式艦戦21型",	"零式艦戦21型(熟練)",
	"零式艦戦52型",	"零式艦戦52型丙(六〇一空)",
	"紫電改二",
	"烈風",	"烈風(六〇一空)",	"烈風改",
	"震電改",
];
var allKankou = [
	/* 艦上攻撃機 */
	"九七式艦攻(友永隊)",
	"天山一二型(友永隊)",
];
var allKanbaku = [
	/* 艦上爆撃機 */
	"零式艦戦62型(爆戦)",
	"九九式艦爆(熟練)",
	"彗星(江草隊)",
];
var allSuibaku = [
	/* 水上爆撃機 */
	"瑞雲",		"瑞雲(六三四空)",
	"瑞雲12型",	"瑞雲12型(六三四空)"
];

/* マップの航空優勢・制空権確保にあたる制空値 */
/* "マップ":[航空優勢,制空権確保] */
var mapSeikuStr = ['航空優勢','制空権確保'];
var mapSeiku = {
	"1-4":[30,60],
	"1-5":[36,72],
	"2-1":[42,84],
	"2-2":[81,162],
	"2-3":[56,111],
	"2-4":[123,246],
	"2-5":[153,306],
	"3-1":[108,216],
	"3-2":[117,234],
	"3-3":[119,237],
	"3-4":[123,246],
	"3-5":[381,762],
	"4-1":[72,144],
	"4-2":[113,225],
	"4-3":[114,228],
	"4-4":[156,312],
	"5-1":[156,312],
	"5-2":[146,291],
	"5-3":[114,228],
	"5-4":[174,348],
	"6-1":[270,540],
	"6-2":[252,504]
}

/* 組み込みメソッド群 */

/* 隻数の検証 */
if(sv(numOfKubo)||sv(numOfSeiki)||sv(numOfKei)||sv(numOfSenkan)||sv(numOfJunyokan)){
	console.log("隻数を0~6に設定してください\n");
	process.exit();
}
/* 隻数の検証 */
/* sv = ShipValidate */
/* if invalid then return true */
function sv(num){
	if(num < 0 || num > 6) return true;
}

/* 隻数同士の検証 */
if(sv(numOfSeiki + numOfKei)||sv(numOfSenkan + numOfJunyokan)){
	console.log("以下が満たされていません\nnumOfKubo >= numOfSeiki + numOfKei\n0<= numOfKubo + numOfSenkan + numOfJunyokan <= 6\n");
	process.exit();
}

/* ある艦娘がその艦種に該当するかどうか */
function isSeiki(str){
	return allSeiki.indexOf(str) != -1;
}
function isKei(str){
	return allKei.indexOf(str) != -1;
}
function isSoko(str){
	return allSoko.indexOf(str) != -1;
}
function isKubo(str){
	return isSeiki(str)||isKei(str)||isSoko(str);
}
function isSenkan(str){
	return allSenkan.indexOf(str) != -1;
}
function isJunyokan(str){
	return allJunyokan.indexOf(str) != -1;
}
function isKoku(str){
	return isSenkan(str)||isJunyokan(str);
}

/* ある装備がその種類に該当するかどうか */
function isKansen(str){
	return allKansen.indexOf(str) != -1;
}
function isKankou(str){
	return allKankou.indexOf(str) != -1;
}
function isKanbaku(str){
	return allKanbaku.indexOf(str) != -1;
}
function isSuibaku(str){
	return allSuibaku.indexOf(str) != -1;
}
/* n個の要素を持つ配列からr個の要素の組合せの配列を返す */
/*　folk from http://taichino.com/programming/3355 */
Array.prototype.combinations = function(r) {
    function equal(a, b) {
    	for (var i = 0; i < a.length; i++) {
            if (a[i] != b[i]) return false;
        }
        return true;
    }
    function values(i, a) {
        var ret = [];
        for (var j = 0; j < i.length; j++) {
            ret.push(a[i[j]]);
        }
        return ret;
    }
    var results = [];
    var n = this.length;
    var indices = [], final = [];
    for (var i = 0; i < r; i++)     { indices.push(i); }
    for (var i = n - r; i < n; i++) { final.push(i);   }
    while (!equal(indices, final)) {
        results.push(values(indices, this));
        var i = r - 1;
        while (indices[i] == n - r + i) {
            i -= 1;
        }
        indices[i] += 1;
        for (var j = i + 1; j < r; j++) {
            indices[j] = indices[i] + j - i;
        }
    }
    results.push(values(indices, this));
    return results;
};

// 変数keyをキーとしたobject{key:value}を生成
// from http://kyamada.hatenablog.com/entry/2012/12/04/164712
function hash(key, value) {
  var h = {};
  h[key] = value;
  return h;
}

/* 同一艦の検証 */
function checkIdentity(str1, str2){
	var str1ar, str2ar;
	for(var i=0; i<kanmusuIdentify.length; i++){
		if(kanmusuIdentify[i].indexOf(str1) != -1)
			str1ar = kanmusuIdentify[i];
		if(kanmusuIdentify[i].indexOf(str2) != -1)
			str2ar = kanmusuIdentify[i];
	}
	return str1ar == str2ar;
}

/* オブジェクトのコピー */
function copyObject(obj){
	var newObj = {};
	for(var prop in obj){
		if(typeof(prop)=='function')	continue;
		newObj[prop] = obj[prop];
	}
	return newObj;
}

/* メイン処理 */

/* 入力より組合せる艦娘の数を決める */
var numOfKubo = numOfSeiki + numOfKei;			/*正規空母+軽空母*/
var numOfKoku = numOfJunyokan + numOfSenkan;	/*航空戦艦+航空巡洋艦*/
var numOfWarships = numOfKubo + numOfKoku;		/*合計隻数*/

/* 入力より必ず出撃する艦娘の一覧を作り、データセットから除外する */
var requiredKanmusu = [];
for(var key in requiredKanmusuInput){
	if(requiredKanmusuInput[key] == 1){
		var obj = {};
		obj['name'] = key;
		obj['slot'] = kanmusuSlot[key].concat();
		obj['sobi'] = ['','','',''];
		requiredKanmusu.push(obj);
		for(var key2 in kanmusuInput){
			if(checkIdentity(key,key2)){
				delete kanmusuInput[key2];
				delete kanmusuSlot[key2];
			}
		}
		if(isSeiki(key))	numOfSeiki--;
		if(isKei(key))		numOfKei--;
		if(isSenkan(key))	numOfSenkan--;
		if(isJunyokan(key))	numOfJunyokan--;
	}
}

/* 必須艦に同一艦種がないか調べる */
for(var i=0; i<requiredKanmusu.length-1; i++){
	for(var j=i+1; j<requiredKanmusu.length; j++){
		if(checkIdentity(requiredKanmusu[i]['name'],requiredKanmusu[j]['name'])){
			console.log('必須感に指定された'+requiredKanmusu[i]['name']+'と'+requiredKanmusu[j]['name']+'は同一の艦娘です\n必須感に同一艦を指定しないでください');
		}
	}
}

/* 必須艦娘と指定した艦数が矛盾した場合終了 */
if(numOfSeiki<0){
	console.log("必須艦数の数が正規空母の数より大きいです\nnumOfSeikiを修正してください");
	process.exit();
}else if(numOfKei<0){
	console.log("必須艦数の数が軽空母の数より大きいです\nnumOfKeiを修正してください");
	process.exit();
}else if(numOfSenkan<0){
	console.log("必須艦数の数が航空戦艦の数より大きいです\nnumOfSenkanを修正してください");
	process.exit();
}else if(numOfJunyokan<0){
	console.log("必須艦数の数が航空巡洋艦の数より大きいです\nnumOfJunyokanを修正してください");
	process.exit();
}

/* 入力より出撃可能な艦娘の一覧を作る */
var kanmusuInputList = [];
for(var key in kanmusuInput){
	if(kanmusuInput[key] == 1){
		var obj = {};
		obj['name'] = key;
		obj['slot'] = kanmusuSlot[key].concat();
		obj['sobi'] = ['','','',''];
		kanmusuInputList.push(obj);
	}
}
/* 艦種ごとの一覧と組合せを作る */
var seikiList = kanmusuInputList.filter(function(value, index){
	return isSeiki(value['name']);
});
var seikiCombi = seikiList.combinations(numOfSeiki);
for(var key in seikiCombi){
	for(var i=0; i<key.length-1; i++){
		for(var j=i+1; j<key.length; j++){
			if(checkIdentity(seikiCombi[key][i],seikiCombi[key][j]))
				delete seikiCombi[key];
		}
	}
}

var keiCombi = kanmusuInputList.filter(function(value, index){
	return isKei(value['name']);
});
var keikuboCombi = keiCombi.combinations(numOfKei);
for(var key in keikuboCombi){
	for(var i=0; i<key.length-1; i++){
		for(var j=i+1; j<key.length; j++){
			if(checkIdentity(keikuboCombi[key][i],keikuboCombi[key][j]))
				delete keikuboCombi[key];
		}
	}
}

var senkanList = kanmusuInputList.filter(function(value, index){
	return isSenkan(value['name']);
});
for(var key in JunyokanList){
	for(var i=0; i<key.length-1; i++){
		for(var j=i+1; j<key.length; j++){
			if(checkIdentity(JunyokanList[key][i],JunyokanList[key][j]))
				delete JunyokanList[key];
		}
	}
}
var JunyokanList = senkanList.combinations(numOfSenkan);

var kokujun = kanmusuInputList.filter(function(value, index){
	return isJunyokan(value['name']);
});
for(var key in kokujunCombi){
	for(var i=0; i<key.length-1; i++){
		for(var j=i+1; j<key.length; j++){
			if(checkIdentity(kokujunCombi[key][i],kokujunCombi[key][j]))
				delete kokujunCombi[key];
		}
	}
}
var kokujunCombi = kokujun.combinations(numOfJunyokan);

/* 艦種ごとの組合せを統合した組合せ */
var allKanmusuCombi = [];
var seikiCL = seikiCombi.length
var keiCL = keikuboCombi.length;
var senkanCL = JunyokanList.length;
var junyokanCL = kokujunCombi.length;
if(seikiCL == 0)	seikiCL = 1;
if(keiCL == 0)		keiCL = 1;
if(senkanCL == 0)	senkanCL = 1;
if(junyokanCL == 0)	junyokanCL = 1;
for(var seki=0; seki<=seikiCL; seki++){
	for(var kei=0; kei<=keiCL; kei++){
		for(var sen=0; sen<=senkanCL; sen++){
			for(var jun=0; jun<=junyokanCL; jun++){
				if(seikiCombi[seki]==undefined||keikuboCombi[kei]==undefined||JunyokanList[sen]==undefined||kokujunCombi[jun]==undefined)	continue;
				if(seki==seikiCL||kei==keiCL||sen==senkanCL||jun==junyokanCL)	continue;
				var integratedResult = [].concat(requiredKanmusu).concat(seikiCombi[seki]).concat(keikuboCombi[kei]).concat(JunyokanList[sen]).concat(kokujunCombi[jun]);
				allKanmusuCombi.push(integratedResult);
			}
		}
	}
}
/* 入力より装備可能な装備の一覧を作る */
var allSobi = [];
for(var key in sobiInput){
	if(sobiInput[key] > 0){
		for(var i=0; i<sobiInput[key]; i++){
			var obj = {};
			obj['name'] = key;
			obj['taiku'] = sobiTaiku[key];
			allSobi.push(obj);
		}
	}
}
allSobi.sort(function (a,b){
	var x = a['taiku'];
	var y = b['taiku'];
	return y-x;
});

/* 目標とする制空戦力 */
var requiredSkywarForce = mapSeiku[attackMap][skywarLevel];

/* 計算過程の結果はresult~を変更して格納 */
var resultKanmusuCombi = new Array(allKanmusuCombi.length);
for(var i=0; i<allKanmusuCombi.length; i++){
	resultKanmusuCombi[i] = new Array(allKanmusuCombi[i].length);
	for(var j=0; j<allKanmusuCombi[i].length; j++){
		var obj = {};
		obj['name'] = allKanmusuCombi[i][j]['name'].concat();
		obj['slot'] = allKanmusuCombi[i][j]['slot'].concat();
		obj['sobi'] = allKanmusuCombi[i][j]['sobi'].concat();
		resultKanmusuCombi[i][j] = obj;
	}
}

var result = [];
/* 組合せごとに最適な装備の組合せを探していく　*/
for(var i=0; i<resultKanmusuCombi.length; i++){
	var combi = resultKanmusuCombi[i].concat();

	/* (空母のみ)艦偵スロットを決める */
	if(numOfSpyAircrafts>0){
		/* 艦偵用の最小スロットを探す */
		var minSlot = [100,100,100,100,100,100];
		for(var j=0; j<combi.length; j++){
			if(!isKubo(combi[j]['name']))
				continue;
			for(var s=0; s<4; s++){
				var numOfPlanes = combi[j]['slot'][s];
				if(numOfPlanes < minSlot[j] && numOfPlanes > 0)
					minSlot[j] = numOfPlanes;
			}
		}
		/* 希望する数に応じて艦偵スロットを決定する */
		switch(numOfSpyAircrafts){
			/* 彩雲 & 二式 */
			case 2:
			for(var j=0; j<combi.length; j++){
				for(var s=0; s<4; s++){
					if(combi[j]['slot'][s] == minSlot){
						combi[j]['sobi'][s] = '艦偵';
						combi[j]['slot'][s] = 0;
					}
				}
			}
			break;
			/* 彩雲 or 二式 */
			case 1:
			var deleteSlot = Math.min.apply(null,minSlot);
			findMinSlot: for(var j=0; j<combi.length; j++){
				for(var s=0; s<4; s++){
					if(combi[j]['slot'][s] == deleteSlot && combi[j]['slot'][s] > 0){
						combi[j]['sobi'][s] = '艦偵';
						combi[j]['slot'][s] = 0;
						break findMinSlot;
					}
				}
			}
			break;
			/* それ以外 */
			default :
			break;
		}
	}

	/* 計算用の装備リストを作る */
	var sobi = new Array(allSobi.length);
	for(var j=0; j<allSobi.length; j++){
		sobi[j] = new Array(allSobi[j].length);
		var obj = {};
		obj['name'] = allSobi[j]['name'].concat();
		obj['taiku'] = allSobi[j]['taiku'];
		sobi[j] = obj;
	}
	var kansen = sobi.filter(function(elem){return isKansen(elem['name']);});
	var kankou = sobi.filter(function(elem){return isKankou(elem['name']);});
	var kanbaku = sobi.filter(function(elem){return isKanbaku(elem['name']);});
	var suibaku = sobi.filter(function(elem){return isSuibaku(elem['name']);});

	/* (空母のみ)艦攻・艦爆スロットを決める */
	if(numOfExtraSlots > 0){
		/* 艦載機の数が多い・少ないスロットを探す */
		var maxOrMinSlot = [];
		for(var j=0; j<combi.length; j++){
			/* 一番多い・少ないスロットでソートしたスロットの先頭から、欲しい艦攻・艦爆の数だけ残す */
			maxOrMinSlot[j] = [];
			if(savingPlanes==0)
				maxOrMinSlot[j].push(combi[j]['slot'].slice().sort(function(a,b){return a>b;}));
			else if(savingPlanes==1)
				maxOrMinSlot[j].push(combi[j]['slot'].slice().sort(function(a,b){return a<b;}));
			maxOrMinSlot[j] = maxOrMinSlot[j][0].filter(function(value, index){
				return value!=0;
			});
			maxOrMinSlot[j] = maxOrMinSlot[j].slice(0,numOfExtraSlots);
		}
		/* 艦娘ごとに空母かどうか調べ、艦攻・艦爆用のスロットを決める */
		for(var j=0; j<combi.length; j++){
			if(!isKubo(combi[j]['name']))
				continue;
			for(var k=0; k<maxOrMinSlot[j].length; k++){
				findSavingSlot:
				for(var s=0; s<4; s++){
					if(maxOrMinSlot[j][k] == combi[j]['slot'][s]){
						combi[j]['sobi'][s] = '艦攻・艦爆';
						combi[j]['slot'][s] = 0;
						break findSavingSlot;
					}
				}
			}
		}
	}


	/* 艦載機の数が多いスロットから艦船を埋めていく */
	var currentSkywarForce = 0;
	while(currentSkywarForce<(requiredSkywarForce+skywarForceBias)){
		/* TODO 艦娘とスロットの選び方の考えなおし */
		var filledSlots = [0,0,0,0,0,0].slice(0,combi.length);
		var maxSlots = [];
		for(var j=0; j<combi.length; j++)
			maxSlots[j] = Math.max.apply(null,combi[j]['slot']);
		var targetKanmusu = maxSlots.indexOf(Math.max.apply(null,maxSlots));
 		var targetSlot = combi[targetKanmusu]['slot'].indexOf(maxSlots[targetKanmusu]);
		var targetPlanes = maxSlots[targetKanmusu];
		/* 装備が埋まっていれば終了 */
		if(targetPlanes==0)
			break;
		/* 艦種に応じて装備を選んで埋める */
		var targetSobi = [];
		if(isKubo(combi[targetKanmusu]['name'])){
			targetSobi = kansen.shift();
		}else if(isKoku(combi[targetKanmusu]['name'])){
			targetSobi = suibaku.shift();
		}
		combi[targetKanmusu]['sobi'][targetSlot] = targetSobi['name'];
		combi[targetKanmusu]['slot'][targetSlot] = 0;
		currentSkywarForce += Math.sqrt(targetPlanes)*targetSobi['taiku'];
		if(kansen.length<=0 || kankou.length<=0 | kanbaku.length<=0 || suibaku.length<=0)
			break;
	}
	var obj ={};
	obj['skywarForce'] = currentSkywarForce;
	for(var j=0; j<combi.length; j++)
		for(var s=0; s<4; s++)
			combi[j]['slot'][s] = allKanmusuCombi[i][j]['slot'][s];
	obj['fleet'] = combi;
	obj['skywarForce'] = currentSkywarForce;
	result.push(obj);
}

/* 出力 */
console.log("出撃マップ: "+attackMap);
console.log("希望制空権: "+mapSeikuStr[skywarLevel]);
console.log("制空値:"+requiredSkywarForce+" + 被撃墜分バイアス:"+skywarForceBias);
console.log("------------------------------------------------------------");
for(var i=0; i<result.length; i++){
	console.log('編成パターン:'+(i+1)+ " 制空戦力:"+Math.floor(result[i]['skywarForce'])+" / 制空値:"+requiredSkywarForce+" + 被撃墜分バイアス:"+skywarForceBias);
	console.log();
	if(requiredSkywarForce+skywarForceBias>result[i]['skywarForce'])
		console.log("制空戦力が足りません. numOfExtraSlots, numOfSpyAircrafts を減らすか,\nsavingSlots を0にすると良いでしょう.");
	console.log();
	for(var j=0; j<result[i]['fleet'].length; j++){
		console.log(" "+(j+1)+" "+result[i]['fleet'][j]['name']);
		for(var s=0; s<4; s++)
			console.log("  Slot"+(s+1)+" "+result[i]['fleet'][j]['slot'][s]+" "+result[i]['fleet'][j]['sobi'][s]);
	}
	console.log("------------------------------");
}

