(function (window, $){
	var t_dialog = {
		//获取dialog
		getDialog: function () {
			var dialog = '<div class="t_dialog_black" style="z-index:' + this.dialog_index + '"></div>'
				+'  <div class="t_dialog_box" style="top:'+this.options.top+' ;left:'+this.options.left+' ;z-index:' + (this.dialog_index + 1) + '">'
				+'    <div class="t_dialog_title">提示</div>'
				+'    <div class="t_dialog_body">'
				+'      <div class="t_dialog_buttons">'
				+'        <a href="#" class="t_dialog_button t_dialog_ok" onclick="t_dialog.ok(this)">保存</a>'
				+'      </div>'
				+'      <a class="t_dialog_close" href="javascript:void(0)" onclick="t_dialog.close(this)"></a>'
				+'    </div>'
				+'  </div>';

			return dialog;
		},
		//dialog默认项
		options: {
			title: '提示', 
			hint: '', 
			content: '', 
			okVal: '确认',
			left: '40%',
			top: '30%', 
			ok: function () {
			},
			cancelVal: '',
			cancel: function() {
			}
		},

		//还原dialog默认项		
		optionRestore: function() {
			this.options = {
				title: '提示', 
				hint: '', 
				content: '', 
				okVal: '确认',
				left: '40%',
				top: '30%', 
				ok: function () {
				},
				cancelVal: '',
				cancel: function() {
				}
			}
		},
		//dialog jquery对象
		dialogEntity: '',
		//dialog 调用主函数
		dialog: function (settings) {
			//var options = {title:'提示',hint:'',content:'',okVal:'保存',ok:function(){}};
			$.extend(this.options, settings);

			//把定事件 放入事件确定栈
			this.okArr.push(this.options.ok);
			this.cancelArr.push(this.options.cancel);

			//获取dialog html 并封装成jquery对象
			this.dialogEntity = $(this.getDialog());
			//插入title的内容
			$('.t_dialog_title', this.dialogEntity).html(this.options.title);
			//插入content的内容
			this.options.content && $('.t_dialog_buttons', this.dialogEntity).before(this.options.content);
			//插入hint（提示的内容）
			this.options.hint && $('.t_dialog_body', this.dialogEntity).before('<div class="t_dialog_hint">' + this.options.hint + '</div>');
			//需要取消按钮
			if(this.options.cancelVal) {
				$(".t_dialog_buttons", this.dialogEntity).append('<a href="#" class="t_dialog_button t_dialog_cancel" onclick="t_dialog.cancel(this)">'+this.options.cancelVal+'</a>');
			}
			//修改按钮 文字
			this.options.okVal && $(".t_dialog_ok", this.dialogEntity).html(this.options.okVal);

			this.dialog_index += 10;

			this.dialogEntity.insertAfter('body');
			$('.t_dialog_black').fadeIn();
			$('.t_dialog_box').fadeIn();

		},
		//点击关闭时调用
		close: function (obj, popEvent) {
			var dialog = $(obj).parents('.t_dialog_box');
			var black = dialog.prev();

			//隐出 特效
			dialog.fadeOut();
			black.fadeOut();

			//如果事件已经取出 则跳过
			if('ok' == popEvent) {
				this.cancelArr.pop();
			} else if('cancel' == popEvent) {
				this.okArr.pop();
			} else {
				this.okArr.pop();
				this.cancelArr.pop();
			}
			
			//还原option
			this.optionRestore();

			setTimeout(function () {
				//删除 dialog
				dialog.remove();
				black.remove();
			}, 500);
		},
		//点击确定函数时调用的函数
		ok: function (obj) {
			var okEvent = this.okArr.pop();
			okEvent && okEvent();
			this.close(obj, 'ok');
		},
		//取消函数
		cancel: function(obj) {
			var cancelEvent = this.cancelArr.pop();
			cancelEvent && cancelEvent();
			this.close(obj, 'cancel');
		},
		//dialog 的z-index属性
		dialog_index: 500,
		//确定事件，调用栈
		okArr: [],
		//取消事件，调用栈
		cancelArr: [],
	}

	window.t_dialog = t_dialog;
})(window, jQuery);
