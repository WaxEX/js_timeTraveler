
	var timerContainer = document.querySelector("dl");

	getTimezoneList().forEach(function(val){
		appendTimer(val.name, val.offset, timerContainer);
	});

	document.querySelector('#ResetBtn').addEventListener('click', startUpdate);

	startUpdate();







	// 表示する時間帯のリスト
	function getTimezoneList(){
		// todo from starage
		return TIMEZONE.DEFAULT;
	}

	// 時間制御用のDOMセットをappend
	function appendTimer(name, offset, appendNode){
		var title = document.createElement('dt');
		var dd    = document.createElement('dd');
		var timer = document.createElement('input');
		var copy  = document.createElement('input');

		title.textContent = name;

		timer.type = 'datetime-local';
		timer.step = '1';
		timer.dataset.offset = offset;

		timer.addEventListener('focus',  stopUpdate);
		timer.addEventListener('change', propageTime);
		timer.addEventListener('update', updateTime);

		copy.type  = 'button';
		copy.value = 'Copy';
		copy.className = 'copyTime';

		// type="datatime-local"だとclipboard.jsがうまく動かないので、ほんの少し力技
		new Clipboard(copy, {
			text: function(){return toMysqlFormat(timer.value);}
		});
		//.on("success", function(e){console.log('copy: '+e.text);});	// DEBUG

		dd.appendChild(timer);
		dd.appendChild(copy);

		appendNode.appendChild(title);
		appendNode.appendChild(dd);
	}




	/////////////////////////////////////////////
	// タイマー
	/////////////////////////////////////////////

	var timer;
	function startUpdate(){
		stopUpdate();
		timer = setInterval(updateAllTime, 500);
		updateAllTime(); //最初の一回はすぐ実行
	}
	function stopUpdate(){
		clearInterval(timer);
	}


	/////////////////////////////////////////////
	// イベントリスナー達
	/////////////////////////////////////////////
	function updateTime(event){
		var timestamp = event.detail.timestamp;
		var offset    = this.dataset.offset;

		this.value = timestampToLocaltime(timestamp, offset);
	}

	function propageTime(){
		var timestamp = localtimeToTimestamp(this.value, this.dataset.offset);
		updateAllTime(timestamp);
	}


	function updateAllTime(_timestamp){
		_timestamp = _timestamp || new Date().getTime();

		//カスタムイベント飛ばす
		var ev = new CustomEvent('update', {
			detail: {timestamp: _timestamp}
		});

		Array.prototype.forEach.call(document.querySelectorAll("input[type='datetime-local']"), function(node) {
			node.dispatchEvent(ev);
		});
	}

	/////////////////////////////////////////////
	// 時間制御
	/////////////////////////////////////////////

	/** Unix Timestamp => YYYY-MM-DDThh:mm:ss
	* @param number timestamp Unix Timestamp (msec)
	* @param string offset    "±hh:mm"
	* @return string          "YYYY-MM-DDThh:mm:ss"
	*/
	function timestampToLocaltime(timestamp, offset){
		// offset文字列を数値へ変換
		var tmp = offset.split(':');
		var shift = ( (+tmp[0]) * 60 + (+tmp[1]) ) * 60 * 1000;

		var date = new Date(timestamp + shift);
		return date.toISOString().split(".")[0];
		//return date.toISOString().replace(/(.*)T(.*)\.(.*)/, '$1 $2');
	}

	/** YYYY-MM-DDThh:mm:ss => Unix Timestamp
	* @param  string dateFormat "YYYY-MM-DDThh:mm:ss"
	* @param  string offset     "±hh:mm"
	* @return number            Unix Timestamp (msec)
	*/
	function localtimeToTimestamp(dateFormat, offset){
		var date = new Date(dateFormat + offset);
		return date.getTime();
	}

	// YYYY-MM-DDThh:mm:ss => YYYY-MM-DD hh:mm:ss
	function toMysqlFormat(dateFormat){
		return dateFormat.replace('T',' ');
	}
