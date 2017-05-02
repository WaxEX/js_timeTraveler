// TIMEZONE.DEFAULT
// TIMEZONE.LIST
// でアクセス

var TIMEZONE = (function(){
	var _DEFAULT = ['JST', 'UTC', 'PDT'];

	var _DEFINE  = [
		{name:'UTC',	offset:'+00:00',	summer:0,	desc:'協定世界時'},

		{name:'JST',	offset:'+09:00',	summer:0,	desc:'日本標準時'},

		{name:'EST',	offset:'-05:00',	summer:0,	desc:'米国東部標準時'},
		{name:'EDT',	offset:'-04:00',	summer:1,	desc:'米国東部標準時(夏時間)'},
		{name:'CST',	offset:'-06:00',	summer:0,	desc:'米国中部標準時'},
		{name:'CDT',	offset:'-05:00',	summer:1,	desc:'米国中部標準時(夏時間)'},
		{name:'MST',	offset:'-07:00',	summer:0,	desc:'米国山岳部標準時'},
		{name:'MDT',	offset:'-06:00',	summer:1,	desc:'米国山岳部標準時(夏時間)'},
		{name:'PST',	offset:'-08:00',	summer:0,	desc:'米国太平洋標準時'},
		{name:'PDT',	offset:'-07:00',	summer:1,	desc:'米国太平洋標準時(夏時間)'},
		{name:'AKST',	offset:'-09:00',	summer:0,	desc:'アラスカ標準時'},
		{name:'AKDT',	offset:'-08:00',	summer:1,	desc:'アラスカ標準時(夏時間)'},
		{name:'HAST',	offset:'-10:00',	summer:0,	desc:'ハワイアリューシャン標準時'},
		
		{name:'GMT',	offset:'+00:00',	summer:0,	desc:'グリニッジ標準時'},
		{name:'BST',	offset:'+01:00',	summer:1,	desc:'英国夏時間'},
		{name:'CET',	offset:'+01:00',	summer:0,	desc:'中央ヨーロッパ時間'},
		{name:'CEST',	offset:'+02:00',	summer:1,	desc:'中央ヨーロッパ時間(夏時間)'},
		{name:'EET',	offset:'+02:00',	summer:0,	desc:'東ヨーロッパ時間'},
		{name:'EEST',	offset:'+03:00',	summer:1,	desc:'東ヨーロッパ時間(夏時間)'},
		{name:'WET',	offset:'+00:00',	summer:0,	desc:'西ヨーロッパ時間'},
		{name:'WEST',	offset:'+01:00',	summer:1,	desc:'西ヨーロッパ時間(夏時間)'}
	];


	return {
		LIST: _DEFINE,
		DEFAULT : (function(){
			var retArr = [];
			_DEFINE.forEach(function(val){
				var i = _DEFAULT.indexOf(val.name);
				if(i>=0){retArr[i] = val;}
			});
			return retArr;
		})()
	};
})();
