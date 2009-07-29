Ext.namespace("Ext.ux.form");Ext.ux.form.Spinner=function(a){Ext.ux.form.Spinner.superclass.constructor.call(this,a);this.addEvents({spin:true,spinup:true,spindown:true})};Ext.extend(Ext.ux.form.Spinner,Ext.form.TriggerField,{triggerClass:"x-form-spinner-trigger",splitterClass:"x-form-spinner-splitter",alternateKey:Ext.EventObject.shiftKey,strategy:undefined,onRender:function(b,a){Ext.ux.form.Spinner.superclass.onRender.call(this,b,a);this.splitter=this.wrap.createChild({tag:"div",cls:this.splitterClass,style:"width:13px; height:2px;"});this.splitter.show().setRight((Ext.isIE)?1:2);this.splitter.show().setTop(10);this.proxy=this.trigger.createProxy("",this.splitter,true);this.proxy.addClass("x-form-spinner-proxy");this.proxy.setStyle("left","0px");this.proxy.setSize(14,1);this.proxy.hide();this.dd=new Ext.dd.DDProxy(this.splitter.dom.id,"SpinnerDrag",{dragElId:this.proxy.id});this.initSpinner()},initTrigger:function(){this.trigger.addClassOnOver("x-form-trigger-over");this.trigger.addClassOnClick("x-form-trigger-click")},initSpinner:function(){this.keyNav=new Ext.KeyNav(this.el,{up:function(a){a.preventDefault();this.onSpinUp()},down:function(a){a.preventDefault();this.onSpinDown()},pageUp:function(a){a.preventDefault();this.onSpinUpAlternate()},pageDown:function(a){a.preventDefault();this.onSpinDownAlternate()},scope:this});this.repeater=new Ext.util.ClickRepeater(this.trigger);this.repeater.on("click",this.onTriggerClick,this,{preventDefault:true});this.trigger.on("mouseover",this.onMouseOver,this,{preventDefault:true});this.trigger.on("mouseout",this.onMouseOut,this,{preventDefault:true});this.trigger.on("mousemove",this.onMouseMove,this,{preventDefault:true});this.trigger.on("mousedown",this.onMouseDown,this,{preventDefault:true});this.trigger.on("mouseup",this.onMouseUp,this,{preventDefault:true});this.wrap.on("mousewheel",this.handleMouseWheel,this);this.dd.setXConstraint(0,0,10);this.dd.setYConstraint(1500,1500,10);this.dd.endDrag=this.endDrag.createDelegate(this);this.dd.startDrag=this.startDrag.createDelegate(this);this.dd.onDrag=this.onDrag.createDelegate(this);if("object"==typeof this.strategy&&this.strategy.xtype){switch(this.strategy.xtype){case"number":this.strategy=new Ext.ux.form.Spinner.NumberStrategy(this.strategy);break;case"date":this.strategy=new Ext.ux.form.Spinner.DateStrategy(this.strategy);break;case"time":this.strategy=new Ext.ux.form.Spinner.TimeStrategy(this.strategy);break;default:delete (this.strategy);break}delete (this.strategy.xtype)}if(this.strategy==undefined){this.strategy=new Ext.ux.form.Spinner.NumberStrategy()}},onMouseOver:function(){if(this.disabled){return}var a=this.getMiddle();this.__tmphcls=(Ext.EventObject.getPageY()<a)?"x-form-spinner-overup":"x-form-spinner-overdown";this.trigger.addClass(this.__tmphcls)},onMouseOut:function(){this.trigger.removeClass(this.__tmphcls)},onMouseMove:function(){if(this.disabled){return}var a=this.getMiddle();if(((Ext.EventObject.getPageY()>a)&&this.__tmphcls=="x-form-spinner-overup")||((Ext.EventObject.getPageY()<a)&&this.__tmphcls=="x-form-spinner-overdown")){}},onMouseDown:function(){if(this.disabled){return}var a=this.getMiddle();this.__tmpccls=(Ext.EventObject.getPageY()<a)?"x-form-spinner-clickup":"x-form-spinner-clickdown";this.trigger.addClass(this.__tmpccls)},onMouseUp:function(){this.trigger.removeClass(this.__tmpccls)},onTriggerClick:function(){if(this.disabled||this.getEl().dom.readOnly){return}var b=this.getMiddle();var a=(Ext.EventObject.getPageY()<b)?"Up":"Down";this["onSpin"+a]()},getMiddle:function(){var b=this.trigger.getTop();var c=this.trigger.getHeight();var a=b+(c/2);return a},isSpinnable:function(){if(this.disabled||this.getEl().dom.readOnly){Ext.EventObject.preventDefault();return false}return true},handleMouseWheel:function(a){if(this.wrap.hasClass("x-trigger-wrap-focus")==false){return}var b=a.getWheelDelta();if(b>0){this.onSpinUp();a.stopEvent()}else{if(b<0){this.onSpinDown();a.stopEvent()}}},startDrag:function(){this.proxy.show();this._previousY=Ext.fly(this.dd.getDragEl()).getTop()},endDrag:function(){this.proxy.hide()},onDrag:function(){if(this.disabled){return}var b=Ext.fly(this.dd.getDragEl()).getTop();var a="";if(this._previousY>b){a="Up"}if(this._previousY<b){a="Down"}if(a!=""){this["onSpin"+a]()}this._previousY=b},onSpinUp:function(){if(this.isSpinnable()==false){return}if(Ext.EventObject.shiftKey==true){this.onSpinUpAlternate();return}else{this.strategy.onSpinUp(this)}this.fireEvent("spin",this);this.fireEvent("spinup",this)},onSpinDown:function(){if(this.isSpinnable()==false){return}if(Ext.EventObject.shiftKey==true){this.onSpinDownAlternate();return}else{this.strategy.onSpinDown(this)}this.fireEvent("spin",this);this.fireEvent("spindown",this)},onSpinUpAlternate:function(){if(this.isSpinnable()==false){return}this.strategy.onSpinUpAlternate(this);this.fireEvent("spin",this);this.fireEvent("spinup",this)},onSpinDownAlternate:function(){if(this.isSpinnable()==false){return}this.strategy.onSpinDownAlternate(this);this.fireEvent("spin",this);this.fireEvent("spindown",this)}});Ext.reg("uxspinner",Ext.ux.form.Spinner);Ext.ux.form.Spinner.Strategy=function(a){Ext.apply(this,a)};Ext.extend(Ext.ux.form.Spinner.Strategy,Ext.util.Observable,{defaultValue:0,minValue:undefined,maxValue:undefined,incrementValue:1,alternateIncrementValue:5,validationTask:new Ext.util.DelayedTask(),onSpinUp:function(a){this.spin(a,false,false)},onSpinDown:function(a){this.spin(a,true,false)},onSpinUpAlternate:function(a){this.spin(a,false,true)},onSpinDownAlternate:function(a){this.spin(a,true,true)},spin:function(a,c,b){this.validationTask.delay(500,function(){a.validate()})},fixBoundries:function(a){return a}});Ext.ux.form.Spinner.NumberStrategy=function(a){Ext.ux.form.Spinner.NumberStrategy.superclass.constructor.call(this,a)};Ext.extend(Ext.ux.form.Spinner.NumberStrategy,Ext.ux.form.Spinner.Strategy,{allowDecimals:true,decimalPrecision:2,spin:function(b,e,c){Ext.ux.form.Spinner.NumberStrategy.superclass.spin.call(this,b,e,c);var a=parseFloat(b.getValue());var d=(c==true)?this.alternateIncrementValue:this.incrementValue;(e==true)?a-=d:a+=d;a=(isNaN(a))?this.defaultValue:a;a=this.fixBoundries(a);b.setRawValue(a)},fixBoundries:function(b){var a=b;if(this.minValue!=undefined&&a<this.minValue){a=this.minValue}if(this.maxValue!=undefined&&a>this.maxValue){a=this.maxValue}return this.fixPrecision(a)},fixPrecision:function(b){var a=isNaN(b);if(!this.allowDecimals||this.decimalPrecision==-1||a||!b){return a?"":b}return b.toFixed(this.decimalPrecision)}});Ext.ux.form.Spinner.DateStrategy=function(a){Ext.ux.form.Spinner.DateStrategy.superclass.constructor.call(this,a)};Ext.extend(Ext.ux.form.Spinner.DateStrategy,Ext.ux.form.Spinner.Strategy,{defaultValue:new Date(),format:"Y-m-d",incrementValue:1,incrementConstant:Date.DAY,alternateIncrementValue:1,alternateIncrementConstant:Date.MONTH,spin:function(d,g,e){Ext.ux.form.Spinner.DateStrategy.superclass.spin.call(this);var a=d.getRawValue();a=Date.parseDate(a,this.format);var c=(g==true)?-1:1;var f=(e==true)?this.alternateIncrementValue:this.incrementValue;var b=(e==true)?this.alternateIncrementConstant:this.incrementConstant;if(typeof this.defaultValue=="string"){this.defaultValue=Date.parseDate(this.defaultValue,this.format)}a=(a)?a.add(b,c*f):this.defaultValue;a=this.fixBoundries(a);d.setRawValue(Ext.util.Format.date(a,this.format))},fixBoundries:function(b){var d=b;var c=(typeof this.minValue=="string")?Date.parseDate(this.minValue,this.format):this.minValue;var a=(typeof this.maxValue=="string")?Date.parseDate(this.maxValue,this.format):this.maxValue;if(this.minValue!=undefined&&d<c){d=c}if(this.maxValue!=undefined&&d>a){d=a}return d}});Ext.ux.form.Spinner.TimeStrategy=function(a){Ext.ux.form.Spinner.TimeStrategy.superclass.constructor.call(this,a)};Ext.extend(Ext.ux.form.Spinner.TimeStrategy,Ext.ux.form.Spinner.DateStrategy,{format:"H:i",incrementValue:1,incrementConstant:Date.MINUTE,alternateIncrementValue:1,alternateIncrementConstant:Date.HOUR});Ext.tree.ColumnTree=Ext.extend(Ext.tree.TreePanel,{lines:false,borderWidth:Ext.isBorderBox?0:2,cls:"x-column-tree",onRender:function(){Ext.tree.ColumnTree.superclass.onRender.apply(this,arguments);this.headers=this.body.createChild({cls:"x-tree-headers"},this.innerCt.dom);var e=this.columns,f;var b=0;for(var d=0,a=e.length;d<a;d++){f=e[d];b+=f.width;this.headers.createChild({cls:"x-tree-hd "+(f.cls?f.cls+"-hd":""),cn:{cls:"x-tree-hd-text",html:f.header},style:"width:"+(f.width-this.borderWidth)+"px;"})}this.headers.createChild({cls:"x-clear"});this.headers.setWidth(b);this.innerCt.setWidth(b)}});Ext.tree.ColumnTreeNode=Ext.extend(Ext.tree.TreeNode,{setColumnValue:function(b,d){var c=this.getOwnerTree();var a=this[c.columns[b].dataIndex];this[c.columns[b].dataIndex]=d;this.attributes[[c.columns[b].dataIndex]]=d;if(this.rendered){this.ui.onColumnValueChange(this,b,d,a)}this.fireEvent("columnvaluechange",this,b,d,a)}});Ext.tree.ColumnNodeUI=Ext.extend(Ext.tree.TreeNodeUI,{focus:Ext.emptyFn,onColumnValueChange:function(f,b,d,a){if(this.rendered){var e=f.getOwnerTree().columns[b];this.columnNodes[b].innerHTML=(e.renderer?e.renderer(d,f,null):d)}},renderElements:function(e,q,l,r){this.indentMarkup=e.parentNode?e.parentNode.ui.getChildIndent():"";var s=e.getOwnerTree();var p=s.columns;var o=s.borderWidth;var m=p[0];var f=typeof q.checked=="boolean";var b=q.href?q.href:Ext.isGecko?"":"#";var d=['<li class="x-tree-node"><div ext:tree-node-id="',e.id,'" class="x-tree-node-el x-tree-node-leaf x-unselectable ',q.cls,'" unselectable="on">','<div class="x-tree-col" style="width:',m.width-o,'px;">','<span class="x-tree-node-indent">',this.indentMarkup,"</span>",'<img src="',this.emptyIcon,'" class="x-tree-ec-icon x-tree-elbow">','<img src="',q.icon||this.emptyIcon,'" class="x-tree-node-icon',(q.icon?" x-tree-node-inline-icon":""),(q.iconCls?" "+q.iconCls:""),'" unselectable="on" />',f?('<input class="x-tree-node-cb" type="checkbox" '+(q.checked?'checked="checked" />':"/>")):"",'<a hidefocus="on" class="x-tree-node-anchor" href="',b,'" tabIndex="1" ',q.hrefTarget?' target="'+q.hrefTarget+'"':"",">",'<span unselectable="on">',e.text||(m.renderer?m.renderer(q[m.dataIndex],e,q):q[m.dataIndex]),"</span></a>","</div>"];for(var g=1,k=p.length;g<k;g++){m=p[g];d.push('<div class="x-tree-col ',(m.cls?m.cls:""),'" style="width:',m.width-o,'px;">','<div class="x-tree-col-text">',(m.renderer?m.renderer(q[m.dataIndex],e,q):q[m.dataIndex]),"</div>","</div>")}d.push('<div class="x-clear"></div></div>','<ul class="x-tree-node-ct" style="display:none;"></ul>',"</li>");if(r!==true&&e.nextSibling&&e.nextSibling.ui.getEl()){this.wrap=Ext.DomHelper.insertHtml("beforeBegin",e.nextSibling.ui.getEl(),d.join(""))}else{this.wrap=Ext.DomHelper.insertHtml("beforeEnd",l,d.join(""))}this.elNode=this.wrap.childNodes[0];this.ctNode=this.wrap.childNodes[1];var j=this.elNode.firstChild.childNodes;this.indentNode=j[0];this.ecNode=j[1];this.iconNode=j[2];var h=3;if(f){this.checkbox=j[3];this.checkbox.defaultChecked=this.checkbox.checked;h++}this.anchor=j[h];this.columnNodes=[j[h].firstChild];for(var g=1,k=p.length;g<k;g++){this.columnNodes[g]=this.elNode.childNodes[g].firstChild}}});Ext.form.FileUploadField=Ext.extend(Ext.form.TextField,{buttonText:"Browse...",buttonOnly:false,buttonOffset:3,readOnly:true,autoSize:Ext.emptyFn,initComponent:function(){Ext.form.FileUploadField.superclass.initComponent.call(this);this.addEvents("fileselected")},onRender:function(c,a){Ext.form.FileUploadField.superclass.onRender.call(this,c,a);this.wrap=this.el.wrap({cls:"x-form-field-wrap x-form-file-wrap"});this.el.addClass("x-form-file-text");this.el.dom.removeAttribute("name");this.fileInput=this.wrap.createChild({id:this.getFileInputId(),name:this.name||this.getId(),cls:"x-form-file",tag:"input",type:"file",size:1});var b=Ext.applyIf(this.buttonCfg||{},{text:this.buttonText});this.button=new Ext.Button(Ext.apply(b,{renderTo:this.wrap}));if(this.buttonOnly){this.el.hide();this.wrap.setWidth(this.button.getEl().getWidth())}this.fileInput.on("change",function(){var d=this.fileInput.dom.value;this.setValue(d);this.fireEvent("fileselected",this,d)},this)},getFileInputId:function(){return this.id+"-file"},onResize:function(a,b){Ext.form.FileUploadField.superclass.onResize.call(this,a,b);this.wrap.setWidth(a);if(!this.buttonOnly){var a=this.wrap.getWidth()-this.button.getEl().getWidth()-this.buttonOffset;this.el.setWidth(a)}},preFocus:Ext.emptyFn,getResizeEl:function(){return this.wrap},getPositionEl:function(){return this.wrap},alignErrorIcon:function(){this.errorIcon.alignTo(this.wrap,"tl-tr",[2,0])}});Ext.reg("fileuploadfield",Ext.form.FileUploadField);Ext.ux.FullProgressBar=Ext.extend(Ext.ProgressBar,{initComponent:function(){Ext.ux.FullProgressBar.superclass.initComponent.call(this)},updateProgress:function(c,d,b){this.value=c||0;if(d){this.updateText(d)}if(this.rendered){var a=Math.floor(c*this.el.dom.firstChild.offsetWidth/100);this.progressBar.setWidth(a,b===true||(b!==false&&this.animate));if(this.textTopEl){this.textTopEl.removeClass("x-hidden").setWidth(a)}}this.fireEvent("update",this,c,d);return this}});Ext.reg("fullprogressbar",Ext.ux.FullProgressBar);Ext.override(Ext.form.RadioGroup,{afterRender:function(){var a=this;this.items.each(function(b){a.relayEvents(b,["check"])});Ext.form.RadioGroup.superclass.afterRender.call(this)},getName:function(){return this.items.first().getName()},getValue:function(){var a;this.items.each(function(b){a=b.getRawValue();return !b.getValue()});return a},setValue:function(a){if(!this.items.each){return}this.items.each(function(c){var b=(c.el.getValue()==String(a));c.setValue(b)})}});