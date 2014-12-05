/* 提督は出撃情報、艦娘、艦載機・水上機を教えて下さい*/

/* 出撃するマップ */
/* 例：2-2 */
var attackMap = "5-2";

/* 希望制空権 */
/* 制空権確保:true,航空優勢:false */
var isGetSky = true;

/* 艦種ごとの編成に入れる隻数 */
/* 以下を満たして設定してください */

var numOfSekikubo = 6;	/*正規空母*/ /*装甲空母は正規空母にカウントします*/
var numOfKeikubo = 0;	/*軽空母*/

var numOfKokusen = 0;	/*航空戦艦*/
var numOfKokujun = 0;	/*航空巡洋艦*/

/* 出撃可能な艦娘情報を入力 */
/* "名前":0or1(不可能:0,可能:1) */
var kokukanInput = {
	"赤城":0,	"赤城改":1,
	"加賀":0,	"加賀改":1,
	"蒼龍":0,	"蒼龍改":0,	"蒼龍改二":1,
	"飛龍":0,	"飛龍改":0,	"飛龍改二":1,
	"翔鶴":0,	"翔鶴改":1,
	"瑞鶴":0,	"瑞鶴改":1,
	"雲龍":0,	"雲龍改":0,
	"大鳳":1,	"大鳳改":0,
	"鳳翔":1,	"鳳翔改":0,
	"龍驤":0,	"龍驤改":0,	"龍驤改二":1,
	"龍鳳":0,	"龍鳳改":0,
	"祥鳳":1,	"祥鳳改":0,
	"瑞鳳":0,	"瑞鳳改":1,
	"飛鷹":0,	"飛鷹改":1,
	"隼鷹":0,	"隼鷹改":0,	"隼鷹改二":1,
	"千歳航":0,	"千歳航改":0,		"千歳航改二":1,
	"千代田航":0,	"千代田航改":0,	"千代田航改二":1,
	"扶桑改":1,	"扶桑改二":0,
	"山城改":1,	"山城改二":0,
	"日向改":1,
	"伊勢改":1,
	"鈴谷改":1,
	"熊野改":1,
	"最上改":1,
	"三隈改":1,
	"利根改二":1,
	"筑摩改二":0
}

/* 必ず出撃させる艦娘を入力(艦数との整合性に注意) */
/* "名前":0or1(必ず出撃する:1,そうでもない:0) */
var kokukanMust = {
	"赤城":0,	"赤城改":0,
	"加賀":0,	"加賀改":0,
	"蒼龍":0,	"蒼龍改":0,	 	"蒼龍改二": 		0,
	"飛龍":0,	"飛龍改":0,	 	"飛龍改二": 		0,
	"翔鶴":0,	"翔鶴改":0,
	"瑞鶴":0,	"瑞鶴改":0,
	"雲龍":0,	"雲龍改":0,
	"大鳳":0,	"大鳳改":0,
	"鳳翔":0,	"鳳翔改":0,
	"龍驤":0,	"龍驤改":0,		"龍驤改二": 		0,
	"龍鳳":0,	"龍鳳改":0,
	"祥鳳":0,	"祥鳳改":0,
	"瑞鳳":0,	"瑞鳳改":0,
	"飛鷹":0,	"飛鷹改":0,
	"隼鷹":0,	"隼鷹改":0,		"隼鷹改二": 		0,
	"千歳航":0,	"千歳航改":0,		"千歳航改二": 	0,
	"千代田航":0,	"千代田航改":0,	"千代田航改二": 	0,
	"扶桑改":0,	"扶桑改二":0,
	"山城改":0,	"山城改二":0,
	"日向改":0,
	"伊勢改":0,
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
var kansaikiInput = {
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

	"零式艦戦62型(爆戦)": 7,
	"九九式艦爆(熟練)": 	1,
	"彗星(江草隊)": 		1,

	"九七式艦攻(友永隊)":1,
	"天山一二型(友永隊)":1,

	"瑞雲": 				16,
	"瑞雲(六三四空)": 	3,
	"瑞雲12型": 			0,
	"瑞雲12型(六三四空)": 0
}

/* データセット */
/* 正規空母・軽空母・航空戦艦・航空巡洋艦 */
/* "名前":[各スロットの艦載機数の配列] */
var kokukanSlot = {
	"赤城":[18,18,27,10],	"赤城改":[20,20,32,10],
	"加賀":[18,18,45,12],	"加賀改":[20,20,46,12],
	"蒼龍":[12,27,18,7],	"蒼龍改":[18,27,18,10],	"蒼龍改二":[18,35,20,6],
	"飛龍":[12,28,18,7],	"飛龍改":[18,27,18,10],	"飛龍改二":[18,36,22,3],
	"翔鶴":[21,21,21,12],	"翔鶴改":[24,24,24,12],
	"瑞鶴":[21,21,21,12],	"瑞鶴改":[24,24,24,12],
	"雲龍":[18,24,3,6],	"雲龍改":[18,21,27,3],
	"大鳳":[18,18,18,7],	"大鳳改":[30,24,24,8],
	"鳳翔":[8,11,0,0],	"鳳翔改":[14,16,12,0],
	"龍驤":[9,24,5,0],	"龍驤改":[9,24,5,5],	"龍驤改二":[18,28,6,3],
	"龍鳳":[18,7,6,0],	"龍鳳改":[21,9,9,6],
	"祥鳳":[18,9,3,0],	"祥鳳改":[18,12,12,6],
	"瑞鳳":[18,9,3,0],	"瑞鳳改":[18,12,12,6],
	"飛鷹":[12,18,18,10],	"飛鷹改":[18,18,18,12],
	"隼鷹":[12,18,18,10],	"隼鷹改":[18,18,18,12],	"隼鷹改二":[24,18,20,4],
	"千歳航":[21,9,6,0],		"千歳航改":[24,16,8,8],	"千歳航改二":[24,16,11,8],
	"千代田航":[21,9,6,0],	"千代田航改":[24,16,8,8],	"千代田航改二":[24,16,11,8],
	"扶桑改":[10,10,10,10],	"扶桑改二":[4,4,9,23],
	"山城改":[10,10,10,10],	"山城改二":[4,4,9,23],
	"日向改":[11,11,11,14],
	"伊勢改":[11,11,11,14],
	"鈴谷改":[5,6,5,3],
	"熊野改":[5,6,5,3],
	"最上改":[5,6,5,3],
	"三隈改":[5,6,5,3],
	"利根改二":[2,2,9,5],
	"筑摩改二":[2,2,9,5]
};

/* 艦種ごとの艦娘の一覧 */
var allSekikubo = [
"赤城", "赤城改",
"加賀", "加賀改",
"蒼龍", "蒼龍改", "蒼龍改二",
"飛龍", "飛龍改", "飛龍改二",
"翔鶴", "翔鶴改",
"瑞鶴", "瑞鶴改",
"雲龍", "雲龍改",
"大鳳", "大鳳改"];
/*var allSokokubo = ["大鳳", "大鳳改"];*/
var allSokokubo = [];
var allKeikubo = [
"鳳翔", "鳳翔改",
"龍驤", "龍驤改", "龍驤改二",
"龍鳳", "龍鳳改",
"祥鳳", "祥鳳改",
"瑞鳳", "瑞鳳改",
"飛鷹", "飛鷹改",
"隼鷹", "隼鷹改", "隼鷹改二",
"千歳航", "千歳航改", "千歳航改二",
"千代田航", "千代田航改", "千代田航改二"];
var allKokusen = [
"扶桑改", "扶桑改二",
"山城改", "山城改二",
"日向改",
"伊勢改"];
var allKokujun = [
"鈴谷改",
"熊野改",
"最上改",
"三隈改",
"利根改二",
"筑摩改二"];

/* 改造関係で見た艦娘の一覧 */
var kokukanIdentify = [
["赤城", "赤城改"],
["加賀", "加賀改"],
["蒼龍", "蒼龍改", "蒼龍改二"],
["飛龍", "飛龍改", "飛龍改二"],
["翔鶴", "翔鶴改"],
["瑞鶴", "瑞鶴改"],
["雲龍", "雲龍改"],
["大鳳", "大鳳改"],
["鳳翔", "鳳翔改"],
["龍驤", "龍驤改", "龍驤改二"],
["龍鳳", "龍鳳改"],
["祥鳳", "祥鳳改"],
["瑞鳳", "瑞鳳改"],
["飛鷹", "飛鷹改"],
["隼鷹", "隼鷹改", "隼鷹改二"],
["千歳航", "千歳航改", "千歳航改二"],
["千代田航", "千代田航改", "千代田航改二"],
["扶桑改", "扶桑改二"],
["山城改", "山城改二"],
["日向改"],
["伊勢改"],
["鈴谷改"],
["熊野改"],
["最上改"],
["三隈改"],
["利根改二"],
["筑摩改二"]];

/* 航空戦に参加する艦戦・艦爆・艦攻・水爆 */
/* "名前":対空値 */
/* AA = Anti-Aircraft */
var kansaikiAA = {
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

	"零式艦戦62型(爆戦)":4,
	"九九式艦爆(熟練)":1,
	"彗星(江草隊)":1,

	"九七式艦攻(友永隊)":1,
	"天山一二型(友永隊)":1,

	"瑞雲":2,
	"瑞雲(六三四空)":2,
	"瑞雲12型":3,
	"瑞雲12型(六三四空)":3
}
/* マップの航空優勢・制空権確保にあたる制空値 */
/* "マップ":[航空優勢,制空権確保] */
/* AA = Anti-Aircraft */
var mapAA = {
	"1-4":[60,30],
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
if(　sV(numOfKubo)||
	sV(numOfSekikubo)||
	sV(numOfKeikubo)||
	sV(numOfKokusen)||
	sV(numOfKokujun)){
	console.log("隻数を0~6に設定してください\n");
	process.exit();
}
/* 隻数の検証 */
/* SV = ShipValidate */
/* if invalid then return true */
function sV(num){
	if(num < 0 || num > 6) return true;
}

/* 隻数同士の検証 */
if( numOfSekikubo + numOfKeikubo > 6 ||
	numOfSekikubo + numOfKeikubo < 0 ||
	numOfKokusen + numOfKokujun > 6 ||
	numOfKokusen + numOfKokujun < 0 ){
	console.log("以下が満たされていません\nnumOfKubo >= numOfSekikubo + numOfKeikubo\n0<= numOfKubo + numOfKokusen + numOfKokujun <= 6\n");
	process.exit();
}

/* ある艦娘がその艦種に該当するかどうか */
function isSekikubo(str){
	return allSekikubo.indexOf(str) != -1;
}
function isKeikubo(str){
	return allKeikubo.indexOf(str) != -1;
}
function isSokokubo(str){
	return allSokokubo.indexOf(str) != -1;
}
function isKubo(str){
	return isSekikubo(str)||isKeikubo(str)||isSokokubo(str);
}
function isKokusen(str){
	return allKokusen.indexOf(str) != -1;
}
function isKokujun(str){
	return allKokujun.indexOf(str) != -1;
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
function checkIdentify(str1, str2){
	var str1ar, str2ar;
	for(var i=0; i<kokukanIdentify.length; i++){
		if(kokukanIdentify[i].indexOf(str1) != -1)
			str1ar = kokukanIdentify[i];
		if(kokukanIdentify[i].indexOf(str2) != -1)
			str2ar = kokukanIdentify[i];
	}
	return str1ar == str2ar;
}

/* メイン処理 */

/* 入力より組合せる艦娘の数を決める */
var numOfKubo = numOfSekikubo + numOfKeikubo;	/*正規空母+軽空母*/
var numOfOther = numOfKokujun + numOfKokusen;	/*航空戦艦+航空巡洋艦*/
var numOfShips = numOfKubo + numOfOther;		/*合計隻数*/

/* 入力より必ず出撃する艦娘の一覧を作り、データセットから除外する */
var must = [];
for(var key in kokukanMust){
	if(kokukanMust[key] == 1){
		var obj = {};
		obj['name'] = key;
		obj['slot'] = kokukanSlot[key];
		must.push(obj);
		for(var key2 in kokukanInput){
			if(checkIdentify(key,key2)){
				delete kokukanInput[key2];
				delete kokukanSlot[key2];
			}
		}
		if(isSekikubo(key))	numOfSekikubo--;
		if(isKeikubo(key))	numOfSeikubo--;
		if(isKokusen(key))	numOfKokusen--;
		if(isKokujun(key))	numOfKokujun--;
	}
}

//console.log(kokukanInput);

/* 入力より出撃可能な艦娘の一覧を作る */
var kokukan = [];
for(var key in kokukanInput){
	if(kokukanInput[key] == 1){
		var obj = {};
		obj['name'] = key;
		obj['slot'] = kokukanSlot[key];
		kokukan.push(obj);
	}
}
/* 艦種ごとの一覧と組合せを作る */
if(numOfSekikubo != 0){
	var sekikubo = kokukan.filter(function(value, index){
		return isSekikubo(value['name']);
	});
	var sekikuboCombi = sekikubo.combinations(numOfSekikubo);
	for(var key in sekikuboCombi){
		for(var i=0; i<key.length-1; i++){
			for(var j=i+1; j<key.length; j++){
				if(checkIdentify(sekikuboCombi[key][i],sekikuboCombi[key][j]))
					delete sekikuboCombi[key];
			}
		}
	}
	console.log(sekikuboCombi);
}
if(numOfKeikubo != 0){
	var keikubo = kokukan.filter(function(value, index){
		return isKeikubo(value['name']);
	});
	var keikuboCombi = keikubo.combinations(numOfKeikubo);
	// console.log(keikuboCombi);
}
if(numOfKokusen != 0){
	var kokusen = kokukan.filter(function(value, index){
		return isKokusen(value['name']);
	});
	var kokusenCombi = kokusen.combinations(numOfKokusen);
	// console.log(kokusenCombi);
}
if(numOfKokujun != 0){
	var kokujun = kokukan.filter(function(value, index){
		return isKokujun(value['name']);
	});
	var kokujunCombi = kokujun.combinations(numOfKokujun);
	// console.log(kokujunCombi);
}

/* 入力より装備可能な装備の一覧を作る */
var kansaiki = [];
for(var key in kansaikiInput){
	if(kansaikiInput[key] > 0){
		for(var i=0; i<kansaikiInput[key]; i++){
			var obj = {};
			obj['name'] = key;
			obj['AA'] = kansaikiAA[key];
			kansaiki.push(obj);
		}
	}
}
kansaiki.sort(function (a,b){
	var x = a['AA'];
	var y = b['AA'];
	return y-x;
})

/* 指定した艦隊数での全ての航空艦の */

//console.log(kokukan);
//console.log(kansaiki);
//console.log(kokukanCombi);




