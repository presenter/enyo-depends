enyo.kind({
	name: 'host.Editor',
	kind: 'Control',
	published: {
		text: "",
		index: -1
	},
	components: [
		{kind: 'onyx.Popup', classes: 'editor-popup', floating: true, autoDismiss: false, name: 'tools', components: [
			{kind: 'onyx.Toolbar', onmousedown: 'downdown', onmouseup: 'upup', classes: 'editor-bar', components: [
				{kind: 'onyx.Button', classes: 'editor-group-left', onclick: 'action', action: 'bold', components: [
					{tag: 'i', classes: 'icon-bold'}
				]},
				{kind: 'onyx.Button', classes: 'editor-group-mide', onclick: 'action', action: 'italic', components: [
					{tag: 'i', classes: 'icon-italic'}
				]},
				{kind: 'onyx.Button', classes: 'editor-group-mide', onclick: 'action', action: 'underline', components: [
					{tag: 'i', classes: 'icon-underline'}
				]},
				{kind: 'onyx.Button', classes: 'editor-group-right', onclick: 'action', action: 'strikeThrough', components: [
					{tag: 'i', classes: 'icon-strikethrough'}
				]},
				
				{kind: 'onyx.Button', classes: 'editor-group-left', onclick: 'action', action: 'justifyleft', components: [
					{tag: 'i', classes: 'icon-align-left'}
				]},
				{kind: 'onyx.Button', classes: 'editor-group-mide', onclick: 'action', action: 'justifycenter', components: [
					{tag: 'i', classes: 'icon-align-center'}
				]},
				{kind: 'onyx.Button', classes: 'editor-group-mide', onclick: 'action', action: 'justifyright', components: [
					{tag: 'i', classes: 'icon-align-right'}
				]},
				{kind: 'onyx.Button', classes: 'editor-group-right', onclick: 'action', action: 'justifyfull', components: [
					{tag: 'i', classes: 'icon-align-justify'}
				]},
				
				{kind: 'onyx.Button', classes: 'editor-group-left', content: 'X<sup>2</sup>', allowHtml: true, onclick: 'action', action: 'superscript'},
				{kind: 'onyx.Button', classes: 'editor-group-right', content: 'X<sub>2</sub>', allowHtml: true, onclick: 'action', action: 'subscript'},
				
				//{tag: "br"},
				
				{kind: 'onyx.Button', classes: 'editor-group-left', onclick: 'action', action: 'InsertOrderedList', components: [
					{tag: 'i', classes: 'icon-list-ol'}
				]},
				{kind: 'onyx.Button', classes: 'editor-group-right', onclick: 'action', action: 'InsertUnorderedList', components: [
					{tag: 'i', classes: 'icon-list-ul'}
				]},
				
				{kind: 'onyx.Button', onclick: 'insertLink', components: [
					{tag: 'i', classes: 'icon-link'}
				]},
				
				{kind: "onyx.MenuDecorator", onSelect: "format", ontap: 'ref', components: [
					{components: [
						{tag: 'i', classes: 'icon-text-height'},
						{style: 'height: 18px; padding-left: 7px; margin-right: -4px; margin-top: -4px;', components: [
							{classes: "caret"}
						]}
					]},
					{kind: "onyx.Menu", onHide: 'ref', components: [
						{content: "Title", action: 'formatBlock', format: ['<h1>']},
						{content: "Slide Header", action: 'formatBlock', format: ['<h2>']},
						{content: "Header 2", action: 'formatBlock', format: ['<h3>']},
						/*{content: "Header 3", action: 'formatBlock', format: ['<h4>']},*/
						{content: "Normal", action: 'formatBlock', format: ['<p>']}
					]}
				]},
				
				
				{kind: 'onyx.Button', content: 'Clear', allowHtml: true, onclick: 'action', action: 'removeFormat'}
			]}
		]},
		{kind: 'onyx.Popup', onHide: 'hideInsert', classes: 'editor-link', name: 'insertLink', floating: true, modal: true, centered: true, scrim: true, autoDismiss: true, components: [
			{tag: 'table', style: 'width: 100%;', components: [
				{tag: 'tr', components: [
					{tag: 'td', components: [
						{content: "URL:", classes: "editor-title"}
					]},
					{tag: 'td', components: [
						{kind: 'onyx.Input', name: 'insertUrl', classes: 'editor-input'}
					]}
				]}
				/*
				{tag: 'tr', components: [
					{tag: 'td', components: [
						{content: "Title:", classes: "editor-title"}
					]},
					{tag: 'td', components: [
						{kind: 'onyx.Input', name: 'insertTitle', classes: 'editor-input'}
					]}
				]}*/
			]},
			
			{kind: 'onyx.Button', content: 'Insert', onclick: 'createLink', classes: 'onyx-dark', style: 'width: 100%; margin-top: 10px; border: 1px solid rgba(0, 0, 0, 0.5);'}
		]},
		{name: 'holder', onkeyup: 'contentChange', allowHtml: true, classes: 'create-editable', content: "", attributes: {contentEditable: true}}
	],
	
	saveSelection: function(){
		if (window.getSelection) {
	        var sel = window.getSelection();
	        if (sel.getRangeAt && sel.rangeCount) {
	            var ranges = [];
	            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
	                ranges.push(sel.getRangeAt(i));
	            }
	            return ranges;
	        }
	    } else if (document.selection && document.selection.createRange) {
	        return document.selection.createRange();
	    }
	    return null;
	},
	
	restoreSelection: function(savedSel){
		if (savedSel) {
	        if (window.getSelection) {
	            var sel = window.getSelection();
	            sel.removeAllRanges();
	            for (var i = 0, len = savedSel.length; i < len; ++i) {
	                sel.addRange(savedSel[i]);
	            }
	        } else if (document.selection && savedSel.select) {
	            savedSel.select();
	        }
	    }
	},
	
	createLink: function(){
		var url = this.$.insertUrl.getValue();
		this.restoreSelection(this.savedSel);
		document.execCommand("CreateLink", false, url);
		this.$.insertLink.hide();
	},
	
	insertLink: function(){
		this.savedSel = this.saveSelection();
		
		this.otherOpen = true;
		this.$.insertUrl.setValue('');
		//this.$.insertTitle.setValue('');
		this.$.insertLink.show();
		this.$.insertUrl.focus();
	},
	hideInsert: function(){
		this.otherOpen = false;
		this.$node.focus();
	},
	contentChange: function(){
		this.bubble('onContentChange', {index: this.index, content: this.$node.html()});
	},
	downdown: function(){
		this.preventDown = true;
	},
	upup: function(){
		this.preventDown = false;
		this.$node.focus();
	},
	ref: function(){
		this.$node.focus();
	},
	format: function(inSender, inEvent){
		this.action(inEvent.selected);
	},
	action: function(inSender, inEvent){
		document.execCommand(inSender.action, false, inSender.format || null);
		this.$node.focus();
	},
	rendered: function(){
		this.inherited(arguments);
		this.$.holder.setContent(this.text);
		this.position = this.getBounds();
		this.position.left += 140;
		this.position.top -= 15;
		
		//Setup Events:
		if(this.$.holder.hasNode()){
			this.$node = $(this.$.holder.node);
			$(this.$node).focus(enyo.bind(this, "handleFocus"));
			$(this.$node).blur(enyo.bind(this, "dropFocus"));
		}
	},
	handleFocus: function(){
		this.$.tools.showAtPosition(this.position);
	},
	dropFocus: function(e){
		if(!this.preventDown && !this.otherOpen){
			//console.log(this.toolbarPressed, this.$node.is(':focus'));
			if(!this.$node.is(':focus')){
				this.$.tools.hide();
			}
		}else if(!this.otherOpen){
			this.$node.focus();
		}
	}
});