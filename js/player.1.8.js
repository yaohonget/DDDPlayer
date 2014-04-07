(function(){
function player(){	
	/*
	 * debug variables
	 */ 
	// if show the informations of debug in console 
	// how to show the message of error: 1 - console , 0 - alert
	errorHandlerType 	= 1;
	// how to show the message of debug: 1 - console , 0 - alert
	this.events			= [];
	this.fps			= 0;
	this.framerate		= 0;
	this.webgl			= null;
	/*
	 * Server
	 */	
	this.parentID		= null;
	// xml option
	this.xmlDoc			= {};
	this.xmlLoaded		= false;
	// configuration from the server
	this.videoSrc 		= [];
	this.thumbnail		= "";
	this.title			= "title";
	this.author			= "author";
	this.description	= "description";
	this.id				= 9;
	this.key			= 0;	
	// language
	this.lang			= {};
	// control
	this.played					= 0;
	this.loop					= false;
	this.allowFullScreen		= true;
	this.playedWithMute			= false;
	this.autoload				= false;
	this.autoplay				= false;
	this.lightsoffEnabled		= true;
	this.autoLightsoff			= false;
	// interface
	this.showFullScreenButton 	= true;
	this.showStopButton			= false;
	this.showInfoButton			= true;
	this.showRating				= true;
	this.showLightsbutton		= true;
	this.showOptionButton		= true;
	/*
	 *  Variables
	 */
	// Style
	this.width			= 480;
	this.height			= 320;
	this.oriWidth		= 480;
	this.oriHeight		= 320;
	this.winWidth		= 0.6;
	this.winHeight		= 0.6;
	this.lengthUnit		= "px";
	this.sound			= 0.6;
	// zIndex for windows
	this.zIndex			= 100;
	this.voteIndex		= 101;
	this.controlIndex	= 102;
	this.canvasIndex	= 100;
	this.statusIndex	= 101;
	this.msgIndex		= 105;
	this.wrapperIndex	= 104;
	this.threeDIndex	= 103;
	this.infoIndex		= 103;
	this.optionIndex	= 103;
	// the ratio of the video	
	
	this.ratioList		= ['4/3', '16/10', '16/9'];
	this.ratio			= null;
	this.threeDMode		= false;
	this.playbackRate	= 33;  // 30pfs = 33ms per frame
	this.frameNum		= 0;
	// timer for draw frame of the video
	this.drawTimer		= null;	
	this.eventTimer		= null;
	this.fpsTimer		= null;
	// time
	this.durationTime	= 0;
	this.playedTime		= 0;
	this.downloadTime	= 0;
	this.currentTime	= 0;	
	// objects
	this.player			= null;
	this.video			= null;
    this.canvas			= null;
    this.context		= null;
    /* 
     * static html content
     */
    this.cleanDiv = "<div style='clear:both;'></div>";      
	/*
	 * Classes, relative to CSS
	 */
	
	/*
	 * IDs
	 */
	// player wrapper
	playerContainerID	= "playerContainer";
	// votebench wrapper
	voteContainerID		= "voteContainer";
	// window
	winTitleID			= "winTitle";
	winHeaderID			= "winHeader";
	winContentID		= "winContent";
	winWrapperID		= "Wrapper";
	// button
	btnContentID		= "btnContent";
	btnCheckboxID		= "btnCheckbox";
	// message window	
	msgContainerID		= "msgContainer";
	msgHeaderID			= "msgHeader";
	msgTitleIconID		= "msgTitleIcon";
	msgTitleID			= "msgTitle";
	msgContainerCloseID	= "msgContainerClose";
	msgContentID		= "msg";
	msgWrapperID		= "msgContainerWrapper";	
	// info window	
	infoContainerID		= "infoContainer";
	infoHeaderID		= "infoHeader";
	infoTitleIconID		= "infoTitleIcon";
	infoTitleID			= "infoTitle";
	infoContainerCloseID = "infoContainerClose";
	infoContentID		= "info";	
	// 3d window
	threeDContainerID	= "threeDContainer";
	threeDHeaderID		= "threeDHeader";
	threeDTitleIconID	= "threeDTitleIcon";
	threeDTitleID		= "threeDTitle";
	threeDContainerCloseID = "threeDContainerClose";
	threeDContentID		= "threeD";
	// option window
	optionContainerID	= "optionContainer";
	optionHeaderID		= "optionHeader";
	optionTitleIconID	= "optionTitleIcon";
	optionTitleID		= "optionTitle";
	optionContainerCloseID = "optionContainerClose";
	optionContentID		= "options";
	// video status
	statusContainerID	= "statusContainer";
	videoStatusContainerID = "videoStatusConatiner";
	videoStatusID		= "videoStatus";
	// canvas element
	canvasElementID		= "c";
	// video element
	videoElementID		= "video";
	// control wrapper
	controlContainerID	= "controlContainer";
	// progressbar wrapper
	progressbarContainerID	= "progressbarContainer";
	progressbarBgID		= "progressBarBg";
	downloadProgresbarID	= "downloadProgressBar";
	playProgressbarID	= "playProgressBar";
	slideTimeID			= "slideTime"
	// control bench
	controlBenchID		= "control";
	controlButtomID		= "controlButtom";
	// sound bench
	soundContainerID	= "soundContainer";
	soundButtomID		= "soundButtom";
	volumeContainerID	= "volumeContainer";
	volumeProgressbarID	= "volumeProgressBar";
	slideVolumeID		= "slideVolume";
	// time wrapper
	timeContainerID		= "timeContainer";
	timeSepraterID		= "timeSeprater";
	durationTimeID		= "durationTime";
	playedTimeID		= "playedTime";
	// function bench
	functionContainerID	= "functionContainer";
	lightButtomID		= "lightButtom";
	fullScreenButtomID	= "fullScreenButtom";
	infoButtomID		= "infoButtom";
	threeDButtomID		= "threeDButtom";
	optionButtomID		= "optionButtom";
	  
};


player.prototype.getAttributeById = function(element, attrName){
	var self = this;
	if(!element) { throw(' Error Code : 1020 '); return null; };
	var e = self.byId(element);
	var result = null;
    if(e) {
        attrs = e.attributes;
        len = attrs.length;
        for(var i = 0; i < len; i++)
           if(attrs[i].nodeName === attrName)
              result = attrs[i].nodeValue;
    }
    return result;
}


player.prototype.loadXML = function(xmlFile) {
   
    try{
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", xmlFile, false);
    }
    catch (Exception){
        var ie = (typeof window.ActiveXObject != 'undefined');
        if (ie){
            this.xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            this.xmlDoc.async = false;
            while(this.xmlDoc.readyState != 4){  };
            this.xmlDoc.load(xmlfile);
            this.xmlLoaded = true;
        }
        else{
            this.xmlDoc = document.implementation.createDocument("", "", null);
            this.xmlDoc.onload = readXML;
            this.xmlDoc.load(xmlfile);
            this.xmlLoaded = true;
        }
    }
    if (!this.xmlLoaded)
    {
        xmlhttp.setRequestHeader('Content-Type', 'text/xml')
        xmlhttp.send("");
        this.xmlDoc = xmlhttp.responseXML;
        this.xmlLoaded = true;
    }
    /* var globalXmlContent = this.a(xmlFile, {}, "post", false, false);
	if(!globalXmlContent){
		return null;
	}
	this.xmlDoc = globalXmlContent.documentElement;
  	*/
};

/*
 * general functions
 */
player.prototype.getXmlAttr = function(tagName, attrName){
	try{
		return this.xmlDoc.getElementsByTagName(tagName)[0].attributes.getNamedItem(attrName).nodeValue;
	} catch(e) {
		return null;
	}
	
};

player.prototype.getXmlNodeContent = function(tagName){
	try{
		return this.xmlDoc.getElementsByTagName(tagName)[0].textContent;
	} catch(e) {
		return null;
	}
};

player.prototype.getNodeValue = function(tagName, index, parentTag){
	var resNodes;
	var resNodesLength;
	var srcElement;
	index 			= !index ? 0 : intval(index);
	srcElement 		= !parentTag ?  this.xmlDoc  :  this.xmlDoc.getElementsByTagName(parentTag)[0];
	resNodes		= srcElement.getElementsByTagName(tagName)[0].childNodes;
	resNodesLength 	= resNodes.length;
	if(index >= 0 && index < resNodesLength){
		if(resNodes[index].nodeType == 3 && !(/^\s+$/.test(resNodes[index].nodeValue))){    			
    			return resNodes[index].nodeValue;
   		}
   	}    	
   	return null;
};
    
player.prototype.getNodeName = function(tagName, index, parentTag){
	var resNodes;
	var resNodesLength;
	var srcElement;
	index 			= !index ? 0 : intval(index);
	srcElement 		= !parentTag ? this.xmlDoc :  this.xmlDoc.getElementsByTagName(parentTag)[0];
	resNodes		= srcElement.getElementsByTagName(tagName)[0].childNodes;
	resNodesLength 	= resNodes.length;
	if(index >= 0 && index < resNodesLength){
		return resNodes[index].nodeName;
	}    	
	return null;
};    
    
player.prototype.getNodeDate = function(search, tagName, parentTag){
	var resNodes;
	var resNodesLength;
	var srcElement;
	var resNodeName;
	var data 		= {};
	srcElement 		= !parentTag ?  this.xmlDoc :  this.xmlDoc.getElementsByTagName(parentTag)[0];
	resNodes		= srcElement.getElementsByTagName(tagName)[0].childNodes;
	resNodesLength 	= resNodes.length;    	
	// depth search
	for(var i = 0; i < resNodesLength; i++ ){    		
		if(resNodes[i].nodeType == 1){
			if(resNodes[i].childNodes.length > 0){
				resNodeName 		= resNodes[i].nodeName;
				data[resNodeName] 	= getNodeDate(resNodeName, tagName);
    		}
		}
		else if(childs[i].nodeType == 3 && (/^\s+$/.test(childs[i].nodeValue))){
			// found the empty node of the xml
		}
		else{
			resNodeName 		= resNodes[i].nodeName;
			data[resNodeName] 	= getNodeDate(resNodeName, tagName);
		}    		
	}
	return data;
};
// recurison to find the child element of a father element
player.prototype.getChildElementsById = function(ele, id) {
	if(!ele){
		throw('Error Code : 1002 '); // 1002 : the element is not exist.
		return null;
	}
	if (!(ele && ele.nodeType && ele.nodeType === 1 )) {
		throw('Error Code : 1001 '); // 1001 : the element is not a dom node.
		return null;
	}
	if(id){
		id = id.replace(/^\s+|\s+$/g, '');
	}
	else{
		throw('Error Code : 1003 '); // 1003 : the id is empty.
		return null;
	}	
	var child 		= ele.firstChild;
	var toFindEle 	= null;
	while (child) { // the deep search
		if (child.nodeType == 1) {
			if (('id' in child) && child.id === id) {
				toFindEle = child;
				break;
			} else {
				toFindEle = arguments.callee(child, id);
				if( toFindEle ){
					break;
				}
			}
		}
		child = child.nextSibling;
	}
	return toFindEle;
};
// find DOM element by id
player.prototype.byId = function() {
	try {
		var self 		= this;
		var argLen 		= arguments.length;
		var toFindObj 	= null;
		var tempObj 	= null;
		var argObj 		= null;
		var argObjLen 	= 0;
		if (argLen > 0) {
			for (var i = 0; i < argLen; i++) {
				if ( typeof arguments[i] === "string") {
					argObj = arguments[i].split(/\s+/);
					argObjLen = argObj.length;
					if (argObjLen >= 1) {
						for (var j = 0; j < argObjLen; j++) {
							if (j == 0) {
								tempObj = document.getElementById(argObj[0].toString());
							} else if (tempObj) {
								tempObj = self.getChildElementsById(tempObj, argObj[j].toString());
							} else {
								throw (" Error : The argument " + arguments[i] + " is not a valid id or it's type is not a string.");
								tempObj = null;
								break;
							}
						}
					}
					if (argLen == 1) {
						toFindObj = tempObj;
					} else {
						toFindObj[i] = tempObj;
					}
				} else {
					throw ("the argument " + arguments[i] + " is not a valid id or it's type is not a string.");
					toFindObj = null;
					break;
				}
			}
		}
		return toFindObj;
	} catch(Exception) {
		this.errorHandler(errorHandlerType, Exception);
	}
};
// delete the blank space at the front and the end of a string
player.prototype.trim = function(str){
	if(str){
		return str.replace(/^\s+|\s+$/g, '');
	}
	else{
		return null;
	}
};
// parse a string into html code
player.prototype.parseDiv = function(arg){
	var objEle = document.createElement('div');
	objEle.innerHTML = arg;
	return objEle.childNodes;
};
// detect if the element has a class
player.prototype.hasClass = function(element, classStr){
	var self = this;
	element = self.byId(element);
	classStr = self.trim(classStr);
	var classes = element.className;
	if (!classes){
		throw(" Error Code : 1005 "); // the class string is not exist.
		return false; }	
	if (classes == classStr){ return true; }
	return element.className.search("\\b" + classStr + "\\b") != -1;
};
// add a class name into a element
player.prototype.addClass = function(element, classStr){
	var self = this;
	classStr = self.trim(classStr);
	if (self.hasClass(element, classStr)){ return; }
	element = self.byId(element);
	if (element.className){ 
		classStr = self.trim(element.className) + " " + classStr;
	};
	element.className = classStr;
};
// remove a class name of a element
player.prototype.removeClass = function(element, classStr){
	var self = this;
	element = self.byId(element);
	classStr = self.trim(classStr);
	element.className = element.className.replace(new RegExp("\\b" + classStr + "\\b\\s*", "g"), "");
};
// set the style of a element
player.prototype.setCss = function(element, css){
	var self = this;
	var node = null;
	if(element && typeof(element) == 'string'){
		node = self.byId(element);
	}
	else{
		throw(" Error Code : 1004 "); // the element is not exist.
		return;
	}
    for(var attr in css){
        var arr = attr.split('-');
        var atr = attr;
        //var isie = !-[1,];
        for(var i = 1; i < arr.length; i++){
            arr[i] = arr[i].substring(0,1).toUpperCase() + arr[i].substring(1);
        }
        atr = arr.join('');
        switch(atr){
        	case null:
        		break;
            //case 'opacity':
            //   isie ? node.style.filter = 'alpha(opacity='+css[attr]*100+')' : node.style[atr] = css[attr];
            //    break;
            //case 'float':
            //   isie ? node.style.styleFloat = css[attr] : node.style.cssFloat = css[attr];
            //    break;
            default:
            	if(node){
            		node.style[atr] = css[attr];
            	}            		
                break;
        }
    }
};
// set functions for a element
player.prototype.setFunc = function(element, functions){
	var self = this;
	if(element && typeof(element) == 'string'){
		element = self.byId(element);
	}		
	if(!element){
		throw(" Error Code : 1006 "); // the element is not exist.
		return;
	}
	for (var i in functions) {
		var oldFunc = '';
		if(element.getAttribute(i)){
			oldFunc = element.getAttribute(i);
		}
		if(oldFunc != ''){
			oldFunc = oldFunc + ' ';
		}
		if(typeof(functions[i]) === 'string'){
			element.setAttribute(i, oldFunc + functions[i]);
		}
	}
};
// set attribute of a element
player.prototype.setAttributes = function(element, attributes){
try{
	var self = this;
	if(element && typeof(element) == 'string'){
		element = self.byId(element);
	}		
	if(!element){
		throw(" Error Code : 1007 "); // the element is not exist.
		return;
	}
	for (var i in attributes) {
		var oldAttr = '';
		var attName = i;
		if(attName == 'clas'){ attName = 'class';}
		if(attName == 'fo'){ attName = 'for';}
		if(element.getAttribute(attName)){
			oldAttr = element.getAttribute(attName);
		}
		if(oldAttr != ''){
			oldAttr = oldAttr + ' ';
		}
		if(typeof(attributes[i]) === 'string'){
			element.setAttribute(attName, oldAttr + attributes[i]);
		}
		else if(attributes[i]){			
			element.setAttribute(attName, oldAttr + attributes[i].join(' '));			
		}
	}
}
catch(Exception){
	this.errorHandler(errorHandlerType, Exception);
}
};
// create a element
player.prototype.create = function(data) {
	var self = this;
	var parent = data.parentId ? self.byId(data.parentId) ?
			self.byId(data.parentId) : document.getElementsByTagName('body')[0] :
		document.getElementsByTagName('body')[0];
	var type = data.type ? data.type : 'div';
	var attributes = data.attributes ? data.attributes : {};
	var content = data.content ? data.content : '';
	var repeat	= data.repeat ? data.repeat : 1;
	var repeatAttr = data.repeatAttr ? data.repeatAttr : [];	
	for (var repeatIndex = 0; repeatIndex < repeat; repeatIndex++){
		var tempElement = document.createElement(type);	
		self.setAttributes(tempElement, attributes);	
		self.setAttributes(tempElement, repeatAttr[repeatIndex]);
		tempElement.innerHTML = content[repeatIndex] ? content[repeatIndex] : content;
		if(!data.notAppend){
			parent.appendChild(tempElement);
		}
	}
	if(repeat > 1){
		parent.appendChild(self.parseDiv(self.cleanDiv)[0]);
	}
};
// set content of a element
player.prototype.setContent = function(data){
	var self = this;
	var repeat = data.length;
	for (var i = 0; i < repeat; i++){
		var tempElement = self.byId(data[i].parentId);
		if(tempElement){
			tempElement.innerHTML = data[i].content ? data[i].content : '';
		}
	}
}
/*
 * build player element
 */
// build the message window
player.prototype.msg = function(title, content, mode) {
	var self = this;
	var msgObj = document.getElementById(msgContainerID);	
	if(!msgObj){
		var playerObj = document.getElementById(playerContainerID);
		var msgObj = document.createElement('div');
		msgObj.id = msgContainerID;
		msgObj.className = winContainerClass;
		msgObj.style.zIndex = self.msgIndex;
		msgObj.style.position = 'absolute';
		msgObj.style.display = 'none';
		playerObj.appendChild(msgObj);		
		var winHeaderObj = document.createElement('div');
		winHeaderObj.id = winHeaderID;
		winHeaderObj.className = winHeaderClass;
		msgObj.appendChild(winHeaderObj);		
		var winTitleIconObj = document.createElement('div');
		winTitleIconObj.id = msgTitleIconID;
		winTitleIconObj.className = winIconClass + ' ' + msgIconClass;
		winHeaderObj.appendChild(winTitleIconObj);		
		var winTitleObj = document.createElement('div');
		winTitleObj.id = winTitleID;
		winTitleObj.className = winTitleClass;
		winTitleObj.innerHTML = title;
		winHeaderObj.appendChild(winTitleObj);		
		var winCloseObj = document.createElement('div');
		winCloseObj.id = msgContainerCloseID;
		winCloseObj.className = winCloseClass;
		winHeaderObj.appendChild(winCloseObj);		
		var winContentObj = document.createElement('div');
		winContentObj.id = winContentID;
		winContentObj.className = winContentClass;
		msgObj.appendChild(winContentObj);
		var msgContentObj = document.createElement('div');
		msgContentObj.id = msgContentID;
		msgContentObj.className = winContentClass;
		msgContentObj.innerHTML = content;
		winContentObj.appendChild(msgContentObj);
		msgContentObj.style.padding = '4px';		
		var winWrapperObj = document.createElement('div');
		winWrapperObj.id = msgContainerID + winWrapperID;
		winWrapperObj.className = winWrapperClass;
		winWrapperObj.style.zIndex = self.wrapperIndex;
		playerObj.appendChild(winWrapperObj);
		winWrapperObj.style.top = '0px';
		winWrapperObj.style.left = '0px';
		winWrapperObj.style.display = 'none';
	}
	else{		
		var winContentObj = document.getElementById(msgContentID);
		if(!winContentObj) { throw(' Error Code : 1009 '); return; } // the message window has no content element.
		winContentObj.innerHTML = content;		
		
	}
	var winWrapperObj = document.getElementById( msgContainerID + winWrapperID );
	var winCloseObj = document.getElementById(msgContainerCloseID);
	if(!winCloseObj) { throw(' Error Code : 1010 '); return; } // the message window has no close button.
	
	winCloseObj.addEventListener('click',function() {
		msgObj.style.display = 'none';
		if(winWrapperObj){
			winWrapperObj.style.display = 'none';
		}
	}, false);
};
// build vote window
player.prototype.buildVote = function(voted, starNum){
	var self = this;
	var voteObj = {
		parentId : playerContainerID,
		attributes : {
			id : voteContainerID,
			clas : voteContainerClass,
			style : ['z-index: ' +  self.voteIndex]
		}
	};		
	var voteButtoms = {
		parentId : voteContainerID,
		attributes : {
			clas : voteButtomClass
		}
	};
	
	if(starNum == undefined){
		starNum = 5;
	}
	voteButtoms.repeat = starNum;
	voteButtoms.repeatAttr = [];
	for(var i = 1; i<=starNum; i++){
		var starClass = 'unstar';
		if(i <= voted){
			starClass = 'star';
		}
		voteButtoms.repeatAttr.push({ id: 'star'+i, clas: starClass});
	}
	
	self.create(voteObj);
	self.create(voteButtoms);

};

// build buttons
player.prototype.buildBtn = function(data){
	var self = this;
	if(self.byId(data.btnContainerID)){ return; }
	var btnObj = {
		parentId : data.parentID,
		type : 'label',
		attributes : {
			id : data.btnContainerID,
			clas : btnContainerClass,
			style : ['display:block;'],
			fo : data.btnContainerID + 'Input'
		}};
	var btnType = null;
	if(data.type == 'radio'){
		btnType = {
			parentId : data.btnContainerID,
			type : 'input',
			attributes : {
				id : data.btnContainerID  + 'Input',
				style : ["display:none;"],
				type : 'radio'
			}};	
	}
	else if(data.type == 'checkbox' || !data.type){		
		btnType = {
			parentId : data.btnContainerID,
			type : 'input',
			attributes : {
				id : data.btnContainerID  + 'Input',
				style : ["display:none;"],
				type : 'checkbox'
			}};
	}		
	if(data.group){
		btnType['attributes'].name = data.group;
	}
	if(data.value){
		btnType['attributes'].value = data.value;
	}	
	var btnTextObj = {
		parentId : data.btnContainerID,
		attributes : {
			id : btnContentID,
			clas : btnContentClass
		}};
	var btnCheckboxObj = {
		parentId : data.btnContainerID,
		attributes : {
			id : btnCheckboxID,
			clas : btnCheckboxClass
		}};
	self.create(btnObj);
	self.create(btnType);	
	self.create(btnCheckboxObj);
	self.create(btnTextObj);
	if(data.checked){
		self.addClass((data.btnContainerID + ' ' + btnCheckboxID), btnCheckedClass);
		self.byId(data.btnContainerID + 'Input').checked = 'checked';
	}
	else{
		self.addClass((data.btnContainerID + ' ' + btnCheckboxID), btnUncheckedClass);
	}
	self.byId(data.btnContainerID).appendChild(self.parseDiv(self.cleanDiv)[0]);
	if(data.content){ 
		self.byId(data.btnContainerID + ' ' + btnContentID).innerHTML 	= data.content;	
	}	
	var btn = self.byId(data.btnContainerID + 'Input');
	if(btn){
		btn.addEventListener('change', function(){
			if(btn.checked){
				if(self.hasClass((data.btnContainerID + ' ' + btnCheckboxID), btnUncheckedClass)){
					self.removeClass((data.btnContainerID + ' ' + btnCheckboxID), btnUncheckedClass);
				}
				if(!self.hasClass((data.btnContainerID + ' ' + btnCheckboxID), btnCheckedClass)){
					self.addClass((data.btnContainerID + ' ' + btnCheckboxID), btnCheckedClass);
				}				
				if(data.type == 'radio' && data.group){
					var groups = document.getElementsByName(data.group);
					var grpLength = groups.length;
					for(var i = 0; i < grpLength; i++){
						if(groups[i].id != (data.btnContainerID + 'Input')){
							if(self.hasClass((groups[i].parentNode.id + ' ' + btnCheckboxID), btnCheckedClass)){
								self.removeClass((groups[i].parentNode.id + ' ' + btnCheckboxID), btnCheckedClass);
							}
							if(!self.hasClass((groups[i].parentNode.id + ' ' + btnCheckboxID), btnUncheckedClass)){
								self.addClass((groups[i].parentNode.id + ' ' + btnCheckboxID), btnUncheckedClass);
							}
						}
					}
				}
			}
			else{
				if(self.hasClass((data.btnContainerID + ' ' + btnCheckboxID), btnCheckedClass)){
					self.removeClass((data.btnContainerID + ' ' + btnCheckboxID), btnCheckedClass);
				}
				if(!self.hasClass((data.btnContainerID + ' ' + btnCheckboxID), btnUncheckedClass)){
					self.addClass((data.btnContainerID + ' ' + btnCheckboxID), btnUncheckedClass);
				}
			}
		});
	}
	
};
player.prototype.buildWin = function(data){
	var self = this;
	if(self.byId(data.winContainerID)){ return; }
	var winObj = {
		parentId : data.parentID,
		attributes : {
			id : data.winContainerID,
			clas : winContainerClass,
			style : data.style}};
	var winHeaderObj = {
		parentId : data.winContainerID,
		attributes : {
			id : winHeaderID,
			clas : winHeaderClass
		}};
	var winHeaderContentObj = {
		parentId : data.winContainerID + ' ' + winHeaderID,
		attributes : {},
		repeat : 3,
		repeatAttr : [ {id : data.winTitleIconID, clas : [winIconClass, data.winTitleIconClass]}, 
			{ id : winTitleID,	clas : winTitleClass },
			{ id : data.winContainerCloseID, clas : winCloseClass }]};
	var winContentObj = {
		parentId : data.winContainerID,
		attributes : {
			id : winContentID,
			clas : winContentClass, 
			style : ['overflow-y: auto; overflow-x: hidden; position: relative; margin: 0 auto;']
		}};
	var contentObj = {
		parentId : data.winContainerID + ' ' + winContentID,
		attributes : {
			id : data.winContentID,
			clas : data.winContentClass
		}};				
	self.create(winObj);
	self.create(winHeaderObj);
	self.create(winHeaderContentObj);
	self.create(winContentObj);
	self.create(contentObj);
	if(data.title){ 
		self.byId(data.winContainerID + ' ' + winTitleID).innerHTML = data.title; 
	}
	if(data.content){ 
		self.byId(data.winContainerID + ' ' + data.winContentID).innerHTML 	= data.content;	
	}	
	self.setCss(data.winContainerID, { 'display' : 'none' });
	var v = self.byId(data.winContainerCloseID);
	if(v){
		v.addEventListener('click',function() {
			self.setCss(data.winContainerID, { 'display' : 'none'});
			self.switchBtn(data.winBtn, false);
		}, false);
	}
};
// show the window
player.prototype.showWin = function(element, position){
	var self = this;
	var c = self.byId(element);
	position = position ? position : 'middle';
	if(!c){	throw(' Error Code : 1011 ' ); return; } // the element is not exist.
	self.setCss(element, { display : 'block' });
	var winWrapperObj = self.byId(element + winWrapperID);
	if(winWrapperObj){ self.setCss(element + winWrapperID, { display : 'block' }); }
	var cti = self.byId(element + ' ' + winHeaderID);
	if(!cti){ throw(' Error Code : 1012 ' ); return; } // can not find title of the window.
	var ctx = self.byId(element + ' ' + winContentID);
	if(!ctx){ throw(' Error Code : 1013 ' ); return; } // can not find context of the window.
	self.posWin(msgContainerID, position);		
	var cScrollWidth = c.clientWidth;
	var cOffsetWidth = c.offsetWidth;
	var cBorderWidth = cOffsetWidth - cScrollWidth;
	var cScrollHeight = c.clientHeight;
	var cOffsetHeight = c.offsetHeight;
	var cBorderHeight = cOffsetHeight - cScrollHeight;	
	var ctxBorderWidth = ctx.offsetWidth - ctx.clientWidth;
	var ctxBorderHeight = ctx.offsetHeight - ctx.clientHeight;
	var ctxHeight = (c.clientHeight - cti.offsetHeight - ctxBorderHeight) * 90 / c.clientHeight;
	var ctxWidth = (c.clientWidth - ctxBorderWidth) * 90 / c.clientWidth;
	self.setCss(element + ' ' + winContentID , { display : 'block', height : ctxHeight + '%', width : ctxWidth + '%'});
};
// hide window
player.prototype.hiddenWin = function(element){
	var self = this;	
	var c = self.byId(element);
	if(!c){	throw(' Error Code : 1014 ' ); return; } // the element is not exist.
	self.setCss(element, { 'display' : 'none' });	
};
// switch the status of show and hide of a window
player.prototype.switchWin = function(element, position){
	var self = this;	
	var c = self.byId(element);
	position = position ? position : 'middle';
	if(!c){	throw(' Error Code : 1015 ' ); return false; } // the element is not exist.
	else{
		if(c.style.display != 'none'){
			self.hiddenWin(element);
			return false;
		}
		else{
			self.showWin(element, position);
			return true;
		}
	}
};
// set the position of a window
player.prototype.posWin = function(element, pos, height, width){
	var self = this;
	var style = {};
	var w = width ? width : style.width ? style.width : self.winWidth;
	var h = height ? height : style.height ? style.height : self.winHeight;
	var l = 0;
	var t = 0;
	var b = 0;
	var p = pos ? pos : 'middle';
	if(p == 'middle'){
		l = (1 - w)*100/2 + '%';
		t = (1 - h)*100/2 + '%';
		w = w * 100 + '%';
		h = h * 100 + '%';
		style = {height: h, width: w , left: l, top: t};
	}
	else if(p == 'bottom'){
		var p = self.byId(playerContainerID);
		w = 0.9;
		h = 0.6 * 100 + '%';
		l = (1 - w)*100/2 + '%';
		w = w * 100 + '%';
		var c = self.byId(controlContainerID);
		b = c.scrollHeight +  b + self.lengthUnit;
		style = {width: w, height: h, left: l, bottom: b };
	}
	self.setCss(element, style);
};
// build the window of the information
player.prototype.buildInfoWin = function(title, content){
	var self = this;
	var data = {
		parentID 		: playerContainerID,
		winContainerID 	: infoContainerID,
		style : [ 'z-index: ' +  self.infoIndex ],
		winHeaderID 	: infoHeaderID,
		winTitleIconID 	: infoTitleIconID,
		winTitleIconClass 	: infoIconClass,
		winTitleID 			: infoTitleID,
		winContainerCloseID : infoContainerCloseID,
		winContentID 	: infoContentID,
		winBtn			: infoButtomID,
		title 			: title,
		content 		: content		
	};
	self.buildWin(data);
	var imgObj = {
		parentId : infoContainerID + ' ' + winContentID,
		type : 'img',
		attributes : {
			id : 'infoThumbnail',
			src : self.desriptionPic,
			style : ['position : relative;', 'float : left;', 'width : 30%;' ]
		}		
	}
	self.create(imgObj);
	var infoObj = {
		parentId : infoContainerID + ' ' + winContentID,
		attributes : {},
		repeat : 3,
		repeatAttr :
			[
				{ id: 'infoTitle', 
					clas: '', 
					style : ['position : relative;', 'float : right;', 'width : 60%; height : 10%;']
				},
				{ id: 'infoAuthor', 
					clas: '',
					style : ['position : relative;', 'float : right;', 'width : 60%; height : 10%;']
				},
				{ id: 'infoDescription', 
					clas: '',
					style : ['position : relative;', 'float : right;', 'width : 60%; height : 40%;']
				}
			]
	};
	self.create(infoObj);
	self.setContent([
		{parentId : infoContainerID + ' infoTitle', content : self.title },
		{parentId : infoContainerID + ' infoAuthor', content : self.author},
		{parentId : infoContainerID + ' infoDescription', content : self.description }
		]);
	self.posWin(infoContainerID, 'bottom');
}
// build option window
player.prototype.buildOptionWin = function(title, content){
	var self = this;
	var data = {
		parentID 		: playerContainerID,
		winContainerID 	: optionContainerID,
		style : [ 'z-index: ' +  self.optionIndex ],
		winHeaderID 	: optionHeaderID,
		winTitleIconID 	: optionTitleIconID,
		winTitleIconClass 	: optionTitleIconClass,
		winTitleID 			: optionTitleID,
		winContainerCloseID : optionContainerCloseID,
		winContentID 	: optionContentID,
		winBtn			: optionButtomID,
		title 			: title,
		content 		: content
	};
	self.buildWin(data);
	
	var fieldsetObj = {		
			parentId : optionContentID,
			type : 'fieldset',
			attributes : {
				id : 'loopFieldset'
			}
		};
	var fieldsetTitleObj = {
		parentId : 'loopFieldset',
		type : 'legend',
		content : [self.getLang('optionslooplabel')]
		};
	self.create(fieldsetObj);
	self.create(fieldsetTitleObj);
	var btnData = {
		parentID		: 'loopFieldset',
		btnContainerID	: 'loopBtn',
		content			: self.getLang('optionslooplabel')
	}
	if(self.loop){ btnData.checked = self.loop; }
	self.buildBtn(btnData);
	var loopBtn = self.byId('loopBtnInput');
	if(loopBtn){
		loopBtn.addEventListener('change', function(){
			if(loopBtn.checked){
				self.loop = true;
			}
			else{
				self.loop = false;
			}
			self.video.loop = self.loop;	
		}, false);
	}
	
	var fieldsetObj = {		
			parentId : optionContentID,
			type : 'fieldset',
			attributes : {
				id : 'autoLightFieldset'
			}
		};
	var fieldsetTitleObj = {
		parentId : 'autoLightFieldset',
		type : 'legend',
		content : [self.getLang('optionsautolightsofflabel')]
		};
	self.create(fieldsetObj);
	self.create(fieldsetTitleObj);
	var btnData = {
		parentID		: 'autoLightFieldset',
		btnContainerID	: 'autoLightBtn',
		content			: [self.getLang('onofflabel')]
	}
	if(self.autoLightsoff){ btnData.checked = self.autoLightsoff; }
	self.buildBtn(btnData);
	var autoLightBtn = self.byId('autoLightBtnInput');
	if(autoLightBtn){
		autoLightBtn.addEventListener('change', function(){	
			if(autoLightBtn.checked){
				self.autoLightsoff = true;
			}
			else{
				self.autoLightsoff = false;
			}
		}, false);
	}
	
	if(self.ratioList){
		fieldsetObj = {		
			parentId : optionContentID,
			type : 'fieldset',
			attributes : {
				id : 'ratioFieldset'
			}
		};
		fieldsetTitleObj = {
			parentId : 'ratioFieldset',
			type : 'legend',
			content : [self.getLang('aspectratiolabel')]
		};
		self.create(fieldsetObj);
		self.create(fieldsetTitleObj);
		
		btnData = {
			parentID		: 'ratioFieldset',
			btnContainerID	: 'oriRatioBtn',
			type			: 'radio',
			group			: 'ratioBtns',
			content			: [self.getLang('originalRatiolabel')]
		}
		if(self.ratio == null){ btnData.checked = true; }
		else{ btnData.checked = false; }
		self.buildBtn(btnData);
		var ratioBtn = self.byId('oriRatioBtnInput');
		if(ratioBtn){
			ratioBtn.addEventListener('change', function(){
				if(this.checked){
					self.ratio = null;
					self.resize();
				}				
			}, false);
		}
		
		var ratioListLength = self.ratioList.length;
		for(var i = 0; i < ratioListLength; i++){
			btnData = {
				parentID		: 'ratioFieldset',
				btnContainerID	: 'ratioBtn'+i,
				type			: 'radio',
				group			: 'ratioBtns',
				content			: self.ratioList[i],
				value			: self.ratioList[i]
			}
			if(self.ratio == self.ratioList[i]){ btnData.checked = true; }
			else{ btnData.checked = false; }
			self.buildBtn(btnData);
			var ratioBtn = self.byId('ratioBtn'+i+'Input');
			if(ratioBtn){
				self.byId('ratioBtn'+i+'Input').addEventListener('change', function(){
					if(this.checked){
						self.ratio = this.value;
						self.resize();
					}				
				}, false);
			}			
		}	
	}
	self.posWin(optionContainerID, 'middle');
};
// build 3d window
player.prototype.buildThreeDWin = function(title, content){
	var self = this;
	var data = {
		parentID 		: playerContainerID,
		winContainerID 	: threeDContainerID,
		style : [ 'z-index: ' +  self.threeDIndex ],
		winHeaderID 	: threeDHeaderID,
		winTitleIconID 	: threeDTitleIconID,
		winTitleIconClass 	: threeDTitleIconClass,
		winTitleID 			: threeDTitleID,
		winContainerCloseID : threeDContainerCloseID,
		winContentID 	: threeDContentID,
		winBtn			: threeDButtomID,
		title 			: title,
		content 		: content
	};
	self.buildWin(data);
	
	var fieldsetObj = {		
			parentId : threeDContentID,
			type : 'fieldset',
			attributes : {
				id : 'threeDSwitcherFieldset'
			}
		};
	var fieldsetTitleObj = {
		parentId : 'threeDSwitcherFieldset',
		type : 'legend',
		content : [self.getLang('twoDthreeDlabel')]
		};
	self.create(fieldsetObj);
	self.create(fieldsetTitleObj);
	var btnData = {
		parentID		: 'threeDSwitcherFieldset',
		btnContainerID	: 'threeDSwitcherBtn',
		content			: [self.getLang('threeDOnOfflabel')]
	}
	if(self.webgl){ btnData.checked = self.webgl.get3DMode(); }
	self.buildBtn(btnData);
	var threeDBtn = self.byId('threeDSwitcherBtnInput');
	if(threeDBtn && self.webgl){
		threeDBtn.addEventListener('change', function(){
			if(threeDBtn.checked){
				self.webgl.set3DMode(true, false);
				var inputBtns = document.getElementsByName('inputFormatBtns');
				var inputVal = self.webgl.getInputType();
				for(var i = 0; i<inputBtns.length; i++){
					if(inputBtns[i].checked){
						inputVal = inputBtns[i].value;
						break;
					}
				}
				var effectInputBtns = document.getElementsByName('effectBtns');
				var effectVal = self.webgl.getEffectType();
				for(var i = 0; i<effectInputBtns.length; i++){
					if(effectInputBtns[i].checked){
						effectVal = effectInputBtns[i].value;
						break;
					}
				}			
				self.webgl.setInputType(inputVal, false);
				self.webgl.setEffectType(effectVal, false);
				self.webgl.set3DMode(true);							
			}
			else{
				self.webgl.set3DMode(false, false);
				self.webgl.setInputType(self.webgl.defaultInputType);
				self.webgl.setEffectType(self.webgl.defaultEffectType);
				self.webgl.set3DMode(false);				
			}		
			self.resize();			
		}, false);
	}
	
	fieldsetObj = {		
			parentId : threeDContentID,
			type : 'fieldset',
			attributes : {
				id : 'threeDInputFormatFieldset'
			}
		};
	fieldsetTitleObj = {
		parentId : 'threeDInputFormatFieldset',
		type : 'legend',
		content : [self.getLang('videoInputFormatlabel')]
		};
	self.create(fieldsetObj);
	self.create(fieldsetTitleObj);
	
	btnData = {
		parentID		: 'threeDInputFormatFieldset',
		btnContainerID	: 'lrBtn',
		type			: 'radio',
		group			: 'inputFormatBtns',
		content			: self.getLang('leftRightlabel'),
		value			: '1'
	}
	if(self.webgl && self.webgl.getInputType() == 1){ btnData.checked = true; }
	self.buildBtn(btnData);
	var lrBtn = self.byId('lrBtnInput');
	if(lrBtn){
		lrBtn.addEventListener('change', function(){
			if(lrBtn.checked){
				self.webgl.setInputType(1);
			}
			self.resize();			
		}, false);
	}
	
	btnData = {
		parentID		: 'threeDInputFormatFieldset',
		btnContainerID	: 'auBtn',
		type			: 'radio',
		group			: 'inputFormatBtns',
		content			: self.getLang('aboveUnterlabel'),
		value			: '2'
	}
	if(self.webgl && self.webgl.getInputType() == 2){ btnData.checked = true; }
	self.buildBtn(btnData);
	var auBtn = self.byId('auBtnInput');
	if(auBtn){
		auBtn.addEventListener('change', function(){
			if(auBtn.checked){
				self.webgl.setInputType(2);
			}
			self.resize();			
		}, false);
	}
	
	fieldsetObj = {		
			parentId : threeDContentID,
			type : 'fieldset',
			attributes : {
				id : 'effectFieldset'
			}
		};
	fieldsetTitleObj = {
		parentId : 'effectFieldset',
		type : 'legend',
		content : [self.getLang('effectlabel')]
		};
	self.create(fieldsetObj);
	self.create(fieldsetTitleObj);
	
	btnData = {
		parentID		: 'effectFieldset',
		btnContainerID	: 'rcBtn',
		type			: 'radio',
		group			: 'effectBtns',
		content			: self.getLang('redCyanlabel'),
		value			: '1'
	}
	if(self.webgl && self.webgl.getEffectType() == 1){ btnData.checked = true; }
	self.buildBtn(btnData);
	var rcBtn = self.byId('rcBtnInput');
	if(rcBtn){
		rcBtn.addEventListener('change', function(){
			if(rcBtn.checked){
				self.webgl.setEffectType(1);
			}
			self.resize();		
		}, false);
	}
	
	btnData = {
		parentID		: 'effectFieldset',
		btnContainerID	: 'hrcBtn',
		type			: 'radio',
		group			: 'effectBtns',
		content			: self.getLang('redCyanHalfcolorlabel'),
		value			: '9'
	}
	if(self.webgl && self.webgl.getEffectType() == 9){ btnData.checked = true; }
	self.buildBtn(btnData);
	var hrcBtn = self.byId('hrcBtnInput');
	if(hrcBtn){
		hrcBtn.addEventListener('change', function(){
			if(hrcBtn.checked){
				self.webgl.setEffectType(9);
			}
			self.resize();		
		}, false);
	}
	
	btnData = {
		parentID		: 'effectFieldset',
		btnContainerID	: 'orcBtn',
		type			: 'radio',
		group			: 'effectBtns',
		content			: self.getLang('redCyanOpticolorlabel'),
		value			: '10'
	}
	if(self.webgl && self.webgl.getEffectType() == 10){ btnData.checked = true; }
	self.buildBtn(btnData);
	var orcBtn = self.byId('orcBtnInput');
	if(orcBtn){
		orcBtn.addEventListener('change', function(){
			if(orcBtn.checked){
				self.webgl.setEffectType(10);
			}
			self.resize();		
		}, false);
	}
	
	btnData = {
		parentID		: 'effectFieldset',
		btnContainerID	: 'gmBtn',
		type			: 'radio',
		group			: 'effectBtns',
		content			: self.getLang('greenMagentalabel'),
		value			: '2'
	}
	if(self.webgl && self.webgl.getEffectType() == 2){ btnData.checked = true; }
	self.buildBtn(btnData);
	var gmBtn = self.byId('gmBtnInput');
	if(gmBtn){
		gmBtn.addEventListener('change', function(){
			if(gmBtn.checked){
				self.webgl.setEffectType(2);
			}
			self.resize();		
		}, false);
	}
	
	btnData = {
		parentID		: 'effectFieldset',
		btnContainerID	: 'ybBtn',
		type			: 'radio',
		group			: 'effectBtns',
		content			: self.getLang('yellowBluelabel'),
		value			: '3'
	}
	if(self.webgl && self.webgl.getEffectType() == 3){ btnData.checked = true; }
	self.buildBtn(btnData);
	var ybBtn = self.byId('ybBtnInput');
	if(ybBtn){
		ybBtn.addEventListener('change', function(){
			if(ybBtn.checked){
				self.webgl.setEffectType(3);
			}
			self.resize();		
		}, false);
	}
	
	
	
	btnData = {
		parentID		: 'effectFieldset',
		btnContainerID	: 'rlBtn',
		type			: 'radio',
		group			: 'effectBtns',
		content			: self.getLang('rightLeftlabel'),
		value			: '4'
	}
	if(self.webgl && self.webgl.getEffectType() == 4){ btnData.checked = true; }
	self.buildBtn(btnData);
	var rlBtn = self.byId('rlBtnInput');
	if(rlBtn){
		rlBtn.addEventListener('change', function(){
			if(rlBtn.checked){
				self.webgl.setEffectType(4);
			}
			self.resize();		
		}, false);
	}
	
	
	btnData = {
		parentID		: 'effectFieldset',
		btnContainerID	: 'uaBtn',
		type			: 'radio',
		group			: 'effectBtns',
		content			: self.getLang('unterAbovelabel'),
		value			: '5'
	}
	if(self.webgl && self.webgl.getEffectType() == 5){ btnData.checked = true; }
	self.buildBtn(btnData);
	var uaBtn = self.byId('uaBtnInput');
	if(uaBtn){
		uaBtn.addEventListener('change', function(){
			if(uaBtn.checked){
				self.webgl.setEffectType(5);
			}
			self.resize();		
		}, false);
	}
	
	btnData = {
		parentID		: 'effectFieldset',
		btnContainerID	: 'ciBtn',
		type			: 'radio',
		group			: 'effectBtns',
		content			: self.getLang('columnInterleavedlabel'),
		value			: '6'
	}
	if(self.webgl && self.webgl.getEffectType() == 6){ btnData.checked = true; }
	self.buildBtn(btnData);
	var ciBtn = self.byId('ciBtnInput');
	if(ciBtn){
		ciBtn.addEventListener('change', function(){
			if(ciBtn.checked){
				self.webgl.setEffectType(6);	
			}
			self.resize();		
		}, false);
	}
	
	btnData = {
		parentID		: 'effectFieldset',
		btnContainerID	: 'riBtn',
		type			: 'radio',
		group			: 'effectBtns',
		content			: self.getLang('rowInterleavedlabel'),
		value			: '7'
	}
	if(self.webgl && self.webgl.getEffectType() == 7){ btnData.checked = true; }
	self.buildBtn(btnData);
	var riBtn = self.byId('riBtnInput');
	if(riBtn){
		riBtn.addEventListener('change', function(){
			if(riBtn.checked){
				self.webgl.setEffectType(7);
				self.resize();
			}			
		}, false);
	}
	
	btnData = {
		parentID		: 'effectFieldset',
		btnContainerID	: 'tsBtn',
		type			: 'radio',
		group			: 'effectBtns',
		content			: self.getLang('timeForSpacelabel'),
		value			: '8'
	}
	if(self.webgl && self.webgl.getEffectType() == 8){ btnData.checked = true; }
	self.buildBtn(btnData);
	var tsBtn = self.byId('tsBtnInput');
	if(tsBtn){
		tsBtn.addEventListener('change', function(){
			if(tsBtn.checked){
				self.webgl.setEffectType(8);
				self.resize();
			}			
		}, false);
	}
	
	fieldsetObj = {		
			parentId : threeDContentID,
			type : 'fieldset',
			attributes : {
				id : 'swapFieldset'
			}
		};
	fieldsetTitleObj = {
		parentId : 'swapFieldset',
		type : 'legend',
		content : [self.getLang('swapLeftRightlabel')]
		};
	self.create(fieldsetObj);
	self.create(fieldsetTitleObj);
	
	btnData = {
		parentID		: 'swapFieldset',
		btnContainerID	: 'swapBtn',
		content			: self.getLang('swapLeftRightlabel')
	}
	if(self.webgl && self.webgl.getSeqType() == false){ btnData.checked = true; }
	self.buildBtn(btnData);
	var swapBtn = self.byId('swapBtnInput');
	if(swapBtn){
		swapBtn.addEventListener('change', function(){
			if(swapBtn.checked){
				self.webgl.setSeqType(false);
			}
			else{
				self.webgl.setSeqType(true);
			}
			self.resize();		
		}, false);
	}
	
	self.posWin(threeDContainerID, 'middle');
};
// build status panel
player.prototype.buildStatus = function(){
	var self = this;
	var statusObj = {
		parentId : playerContainerID,
		attributes : {
			id : statusContainerID,
			clas : statusContainerClass,
			style : [ 'z-index: ' +  self.statusIndex ]
		}
	};	
	var videoStatusObj = {
		parentId : statusContainerID,
		attributes : {
			id : videoStatusContainerID,
			clas : videoStatusContainerClass
		}
	};
	var videoStatusButtomObj = {
		parentId : videoStatusContainerID,
		attributes : {
			id : videoStatusID,
			clas : [statusButtomClass, playStatusClass]
		}
	};
	self.create(statusObj);
	self.create(videoStatusObj);
	self.create(videoStatusButtomObj);		
	self.posWin(videoStatusContainerID, 'middle', 0.2, 0.2 );		
};
// build canvas and video element
player.prototype.buildCanvas = function(){
	var self = this;
	var videoObj = {
		parentId : playerContainerID,
		type : 'video',
		attributes : {
			id : videoElementID,
			style : [ 'display: none;' ],
			height : self.height + self.lengthUnit +';',
			width : self.width + self.lengthUnit +';'
		}
	};
	self.create(videoObj);
	self.video = self.byId(videoElementID);
	var canvasObj = {
		parentId : playerContainerID,
		type : 'canvas',
		attributes : {
			id : canvasElementID,
			style : [ 'position: relative; margin:0 auto;  border: 0' + self.lengthUnit +';'],
			height : self.height + self.lengthUnit +';',
			width : self.width + self.lengthUnit +';'
		}
	};
	self.create(canvasObj);
	if(this.threeDMode && this.webglSupport()){
		try{			
			//this.webgl = new webgl();
			this.webgl = __;
		}
		catch(Exception){
			this.errorHandler(errorHandlerType, 'please check if the necessary javascript library included.');
		}		
		if(this.webgl){
			this.webgl.init(canvasElementID, videoElementID);
		}
		else{
			this.threeDMode = false;
			
		}		
	}
};

player.prototype.updateFrame = function(){
	var self = this;
	if(self.threeDMode){
		return self.webgl.drawScene();
	}
	else{
		var v = self.video;	
		var ctx = self.context;	
		if(ctx){
			ctx.drawImage(v, 0, 0, self.width, self.height);
			return true;
		}
		else{
			return false;
		}
	}
	
};

player.prototype.getThumbnail = function(){
	var self = this;
	var ctx = self.context;
	var thumbnail = new Image();
	if(ctx){
		thumbnail.onload = function(){
			if(self.threeDMode){
				self.webgl.drawScene(thumbnail);
			}
			else{
				ctx.drawImage(thumbnail, 0, 0, self.width, self.height);
			}			
		};
		thumbnail.src = self.thumbnail;
	}	
};

player.prototype.setVideoSrc = function(ele, src){
	var srcLen = src ? src.length : 0;
	if( srcLen > 0 ){
		var videoSrcObj = {
			parentId : ele,
			type : 'source',
			attributes : {},
			repeat : 0,
			repeatAttr : []
		};
		videoSrcObj.repeat = srcLen;
		for( var srcIndex = 0; srcIndex < srcLen; srcIndex++ ){
			videoSrcObj.repeatAttr[srcIndex] = { src : src[srcIndex]};
		}
		this.create(videoSrcObj);
	}
};

player.prototype.buildControl = function(){
	var self = this;
	var controlObj = {
		parentId : playerContainerID,
		attributes : {
			id : controlContainerID,
			clas : controlContainerClass,	
			style : [ 'z-index:' + self.controlIndex + ';']			
		}
	};
	self.create(controlObj);
};

player.prototype.buildProgressbar = function(){
	var self = this;
	var progressbarObj = {
		parentId : controlContainerID,
		attributes : {
			id : progressbarContainerID,
			clas : progressbarContainerClass				
		}			
	};
	var slideTimeObj = {
		parentId : progressbarContainerID,
		attributes : {
			id : slideTimeID,	
			style : 
			[ 	
				'position: absolute;',
				'background: #fff;',
				'font-size: 9px;',
				'bottom: 13px;',
				'padding: 2px;',
				'display: none;',
				'border: 1px solid #000;'
			]
		},
		content : ['00:00']		
	};
	var progressbarBgObj = {
		parentId : progressbarContainerID,
		attributes : {
			id : progressbarBgID,
			clas : progressbarBgClass				
		}		
	};
	var downloadbarObj = {
		parentId : progressbarBgID,
		attributes : {
			id : downloadProgresbarID,
			clas : downloadProgresbarClass				
		}			
	};
	var playedbarObj = {
		parentId : downloadProgresbarID,
		attributes : {
			id : playProgressbarID,
			clas : playProgressbarClass			
		}			
	};	
	self.create(progressbarObj);
	self.create(slideTimeObj);
	self.create(progressbarBgObj);
	self.create(downloadbarObj);
	self.create(playedbarObj);
};

player.prototype.elePos = function(ele){
 	var self = this;
	var obj = self.byId(ele);
	var left = obj.offsetLeft;
	while ( obj = obj.offsetParent){
		left += obj.offsetLeft;
	}
	return left;
}

player.prototype.setFrameRate = function(framerate){
	this.framerate = framerate;
}

player.prototype.getFrameNumber = function(currentTime){
	var frameNr =  Math.floor(currentTime * this.framerate);
	this.setContent([{ parentId : 'frameNumber', content : ' -  Frame Nr : ' + frameNr}]); 
	return frameNr;
}

player.prototype.seek = function(event, notSetTime){
	var self = this;
	var pb = self.byId(progressbarBgID);
	var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
	var mouseX = event.pageX || event.clientX + scrollX;
	
	mouseX = mouseX - self.elePos(progressbarBgID);	
	mouseX = mouseX < 0 ? 0 : mouseX > pb.scrollWidth ? pb.scrollWidth : mouseX;	
	
	var target = mouseX / pb.scrollWidth;	
	target = target > 1 ? self.durationTime : target * self.durationTime;
	var v = self.video ? self.video : self.byId(videoElementID);
	if(notSetTime == undefined) {
		if(v && v.readyState != 0) {
			v.currentTime = target;
		}
	}
	self.getFrameNumber(target);
	//console.log(self.getFrameNumber(target));
	self.setCss(slideTimeID, { left : mouseX , display : 'block'});
	self.setContent([{parentId: slideTimeID, content: self.parseTime(target, true)}]);
};
// update download progressbar
player.prototype.updateDownloadProgressbar = function(){
	var self = this;
	var v = self.video ? self.video : self.byId(videoElementID);
	var currentPlaybackTime = v.currentTime;
	var totalDuration = self.durationTime;
	var buffered = v.buffered;
	if(buffered){
		//var dpb = self.byId(downloadProgresbarID);
		var pb = self.byId(progressbarBgID);
		var bufferedLength = buffered.length;
		for(var i = 0; i < bufferedLength; i++){
			var bStart 	= buffered.start(i);
			var bEnd	= buffered.end(i);
			if(currentPlaybackTime >= bStart && currentPlaybackTime <= bEnd){
				var duration = bEnd - bStart;				
				var w = (duration / totalDuration)*100 + '%';
				var l = (bStart / totalDuration)*100 + '%';
				self.setCss(downloadProgresbarID, {width: w , left: l });
				break;
			}
		}
	}
};
// update play progressbar
player.prototype.updatePlayProgressbar = function(){
	var self = this;
	var v = self.video ? self.video : self.byId(videoElementID);
	var currentPlaybackTime = v.currentTime;
	var buffered = v.buffered;
	if(buffered){
		var bufferedLength = buffered.length;
		for(var i = 0; i < bufferedLength; i++){
			var bStart 	= buffered.start(i);
			var bEnd	= buffered.end(i);
			if(currentPlaybackTime >= bStart && currentPlaybackTime <= bEnd){
				var duration = currentPlaybackTime - bStart;
				var totalDuration = bEnd - bStart;
				var w = (duration / totalDuration)*100 + '%';
				self.setCss(playProgressbarID, { width: w  });			
				break;
			}
		}
	}
};
// build control bench
player.prototype.buildControlBench = function(){
	var self = this;
	var controlBenchObj = {
		parentId : controlContainerID,
		attributes : {
			id : controlBenchID,
			clas : controlBenchClass				
		}		
	};
	self.create(controlBenchObj);
	var controlContentObj = {
		parentId : controlBenchID,
		attributes : {},
		repeat : 4,
		repeatAttr : [
			{ id : controlButtomID,	clas : [controlButtomClass, playButtomClass]},
			{ id : soundContainerID, clas : soundContainerClass},
			{ id : timeContainerID, clas : timeContainerClass},
			{ id : functionContainerID, clas : functionContainerClass}]		
	};
	self.create(controlContentObj);
	var soundContentObj = {
		parentId : soundContainerID,
		attributes : {},
		repeat : 2,
		repeatAttr : [ { id : soundButtomID, clas : soundButtomClass},
		 	{ id : volumeContainerID, clas : volumeContainerClass }
		 ]
	};
	var volumebarObj = {
		parentId : volumeContainerID,
		attributes : { id : volumeProgressbarID, clas : volumeProgressbarClass }
	};
	var slideVolumeObj = {
		parentId : soundContainerID,
		attributes : {
			id : slideVolumeID,	
			style : 
			[ 	
				'position: absolute;',
				'background: #fff;',
				'font-size: 9px;',
				'bottom: 18px;',
				'padding: 2px;',
				'display: none;',
				'border: 1px solid #000;'
			]	
		},
		content : ['00']		
	};
	self.create(soundContentObj);
	self.create(volumebarObj);
	self.create(slideVolumeObj);
	var timeContentObj = {
		parentId : timeContainerID,
		attributes : {},
		content : [self.parseTime(self.durationTime), '-', self.parseTime(self.playedTime), ' -  FPS : 0', ' -  Frame Nr : '],
		repeat : 5,
		repeatAttr : [ { id : durationTimeID, clas : textClass},
		 	{ id : timeSepraterID, clas : textClass },
		 	{ id : playedTimeID, clas : textClass },
		 	{ id : 'infoText', clas : textClass },
		 	{ id : 'frameNumber', clas : textClass }
		 ]
	};
	self.create(timeContentObj);
	var functionContentObj = {
		parentId : functionContainerID,
		attributes : {},
		repeat : 5,
		repeatAttr : []
	};
	
	if(self.showLightsbutton){
		functionContentObj.repeatAttr.push({ id : lightButtomID, clas : [controlButtomClass, funcLightButtomClass]});
	}
	if(self.showInfoButton){
		functionContentObj.repeatAttr.push({ id : infoButtomID, clas : [controlButtomClass, funcInfoButtomClass]});
	}
	if(self.showFullScreenButton){
		functionContentObj.repeatAttr.push({ id : fullScreenButtomID, clas : [controlButtomClass, funcFullScreenOnButtomClass]});
	}
	if(self.threeDMode){
		functionContentObj.repeatAttr.push({ id : threeDButtomID, clas : [controlButtomClass, funcThreeDButtomClass]});
	}
	if(self.showOptionButton){
		functionContentObj.repeatAttr.push({ id : optionButtomID, clas : [controlButtomClass, funcOptionButtomClass]});
	}	
	self.create(functionContentObj);
};
// the background mask
player.prototype.wrapperMask = function(ref, btn, open){
	var self = this;
	var r = self.byId(ref);
	var newId = ref + 'mask';
	var obj = self.byId(newId);
	if(obj && !open){
		r.style.zIndex = self.zIndex;
		obj.parentNode.removeChild(obj);
		return false;
	}
	else{
		if(!obj){
			var tempElement = document.createElement('div');
			self.setAttributes(tempElement, { id: newId, clas: wrapperClass } );
			var overIndex = 10001;
			var underIndex = 10000;
			r.style.zIndex = overIndex;
			tempElement.style.zIndex = underIndex;
			tempElement.onclick = function(){ var md = self.byId(newId); md.parentNode.removeChild(md); self.switchBtn(btn, false); };
			r.parentNode.appendChild(tempElement);
			
		}
		self.switchBtn(btn, true);
		return true;
	}
};
// resize
player.prototype.resize = function(mode){
	var self = this;
	var c = self.byId(playerContainerID);
	var ca = self.canvas;
	var v = self.video;	
	if(mode == 'fullscreen'){
		if (document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen) {
			mode = 'expand';
		}
		else {
			mode = 'collapse';
		}
	}
	self.setSize();
	if(mode == 'expand'){
		c.style.width = '100%';
		c.style.height = '100%';
		ca.width = self.width;
		ca.height = self.height;
		
		if(!self.hasClass(fullScreenButtomID, funcFullScreenOffButtomClass)){
			self.addClass(fullScreenButtomID, funcFullScreenOffButtomClass)
		}
		if(self.hasClass(fullScreenButtomID, funcFullScreenOnButtomClass)){
			self.removeClass(fullScreenButtomID, funcFullScreenOnButtomClass)
		}
	}
	else if(mode == 'collapse'){
		c.style.width = '100%';
		c.style.height = '100%';
		ca.width = self.width;
		ca.height = self.height;
		if(self.hasClass(fullScreenButtomID, funcFullScreenOffButtomClass)){
			self.removeClass(fullScreenButtomID, funcFullScreenOffButtomClass)
		}
		if(!self.hasClass(fullScreenButtomID, funcFullScreenOnButtomClass)){
			self.addClass(fullScreenButtomID, funcFullScreenOnButtomClass)
		}
	}
	else{
		c.style.width = '100%';
		c.style.height = '100%';
		ca.width = self.width;
		ca.height = self.height;
	}
	self.posCanvas();
	if(self.threeDMode){
		self.webgl.setGLViewport(ca);
	}
	if(self.played == 0 || v.ended){
		self.getThumbnail();
	}
	else{
		self.updateFrame();
	}
	var msgObj = self.byId(msgContainerID);
	if(msgObj && msgObj.style.display != 'none'){
		self.showWin(msgContainerID, 'middle');
	}
	var infoObj = self.byId(infoContainerID);
	if(infoObj && infoObj.style.display != 'none'){
		self.showWin(infoContainerID, 'bottom');
	}
	var threeDObj = self.byId(threeDContainerID);
	if(threeDObj && threeDObj.style.display != 'none'){
		self.showWin(threeDContainerID, 'middle');
	}
	var optionObj = self.byId(optionContainerID);
	if(optionObj && optionObj.style.display != 'none'){
		self.showWin(optionContainerID,'middle');
	}
};
// fullscreen
player.prototype.fullScreen = function(){
	var self = this;
	var c = self.byId(playerContainerID);
	if (c.requestFullScreen) {		
		if (!document.fullScreen) {
			c.requestFullscreen();			
		} else {
			document.exitFullScreen();
		}		
	} else if (c.mozRequestFullScreen) {		
		if (!document.mozFullScreen) {
			c.mozRequestFullScreen();			
		} else {
			document.mozCancelFullScreen();
		}		
	} else if (c.webkitRequestFullScreen) {
		if (!document.webkitIsFullScreen) {
			c.webkitRequestFullScreen();		
		} else {
			document.webkitCancelFullScreen();
		}		
	}
};
// player status
player.prototype.updatePlayerStatus = function(status){
	var self = this;
	if(status == 'ended' || status == 'paused'){
		if(!self.hasClass(videoStatusID, playStatusClass )){
			self.addClass(videoStatusID, playStatusClass);			
		}
		if(self.hasClass(videoStatusID, loadingStatusClass )){
			self.removeClass(videoStatusID, loadingStatusClass);			
		}
		self.setCss( videoStatusContainerID, { display : 'block'});
	}
	else if(status == 'loading'){
		if(self.hasClass(videoStatusID, playStatusClass )){
			self.removeClass(videoStatusID, playStatusClass);			
		}
		if(!self.hasClass(videoStatusID, loadingStatusClass )){
			self.addClass(videoStatusID, loadingStatusClass);			
		}
		self.setCss( videoStatusContainerID, { display : 'block'});
	}
	else if(status == undefined || status == '' || status == 'playing'){
		var v = self.byId(videoElementID);
		if(v.paused || v.ended){ 
			if(!self.hasClass(videoStatusID, playStatusClass )){
				self.addClass(videoStatusID, playStatusClass);			
			}
			if(self.hasClass(videoStatusID, loadingStatusClass )){
				self.removeClass(videoStatusID, loadingStatusClass);			
			}
			self.setCss( videoStatusContainerID, { display : 'block'});
			}
		else {
			if(self.hasClass(videoStatusID, playStatusClass )){
				self.removeClass(videoStatusID, playStatusClass);			
			}
			if(self.hasClass(videoStatusID, loadingStatusClass )){
				self.removeClass(videoStatusID, loadingStatusClass);			
			}
			self.setCss( videoStatusContainerID, { display : 'none'});
		}
		
		
	}
};
// change volume
player.prototype.changeVolume = function(event){
	var self = this;
	var pb = self.byId(volumeContainerID);	
	var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
	var mouseX = event.pageX || event.clientX + scrollX;
	mouseX = mouseX - self.elePos(volumeContainerID);	
	mouseX = mouseX < 0 ? 0 : mouseX > pb.scrollWidth ? pb.scrollWidth : mouseX;
	var target = mouseX / pb.scrollWidth;
	target = target > 1 ? 1 : target < 0 ? 0 : target;
	var sb = self.byId(soundButtomID);
	var l = mouseX + sb.scrollWidth;
	self.setCss( slideVolumeID, { display : 'block', left : l});
	var va = Math.round(target * 100) + '';
		self.setContent([{parentId: slideVolumeID, content: va}]);
	var v = self.video ? self.video : self.byId(videoElementID);
	v.volume = target;
	self.updateVolume();
};
// update volume botton and slidebar
player.prototype.updateVolume = function(){

	var self = this;
	var v = self.video ? self.video : self.byId(videoElementID);
	var vb = self.byId(soundButtomID);
	var vc = self.byId(volumeContainerID);
	var vpb = self.byId(volumeProgressbarID);
	var volume = typeof(v.volume) == 'number' ? v.volume : self.sound;
	var w = volume * vc.scrollWidth;
	if(vpb.scrollWidth != w){
		self.setCss(volumeProgressbarID, { width: w + self.lengthUnit });
	}
	var volumeStatus = [];
	if(typeof(volumeButtomClass) == 'string'){
		volumeStatus.push(volumeButtomClass);
	}
	else{
		volumeStatus = volumeButtomClass;
	}
	var volumeLength = volumeStatus.length - 1;
	volumeLength = volumeLength < 1 ? 1 : volumeLength;
	var threshold = 1 / volumeLength;
	var volumeIndex = 0;
	for(var i = 0; i < volumeLength; i++){
		var thresholdVolume = i * threshold;
		if(volume > thresholdVolume){
			volumeIndex = i + 1;
		}
		else if(volume == thresholdVolume){
			volumeIndex = i;
		}
		else{
			break;
		}
	}
	volumeLength = volumeStatus.length;
	volumeIndex = volumeIndex > volumeLength ? volumeLength : volumeIndex;
	for(var i = 0; i < volumeStatus.length; i++){
		if(i == volumeIndex){
			if(!self.hasClass(soundButtomID, volumeStatus[i])){
				self.addClass(soundButtomID, volumeStatus[i]);
				
			}
		}
		else{
			if(self.hasClass(soundButtomID, volumeStatus[i])){
				self.removeClass(soundButtomID, volumeStatus[i]);
			}
		}
	}
};
// build player
player.prototype.buildPlayer = function(){	
	var self = this;
	var playerObj = {
		parentId : self.parentID,
		attributes : {
			id : playerContainerID,
			clas : playerContainerClass,
			style : 
				[ 	
					'height: 100%;' ,
					'width: 100%;' ,
					'z-index:' + self.zIndex + ';'
				]
		}
	};		
	self.create(playerObj);
};

player.prototype.setFps = function(fps){
	if(fps){
		fps = parseInt(fps);
		if(fps<0)fps = 1;
		this.playbackRate = parseInt(Math.ceil(1000/fps));	
	}
}

player.prototype.initPlayer = function(data){//data  width, height, xml, mode, parentId, lang
	try{	
		var errStr = '';
		var width = data.width ? parseFloat(data.width) : this.width;
		var height = data.height ? parseFloat(data.height) : this.height;
		var mode = data.threeDMode != undefined ? data.threeDMode : this.threeDMode;
		this.threeDMode = mode;
		var xml = data.xmlUrl ? data.xmlUrl : '';
		var parentId = data.parentId ? data.parentId : 'document.body';
		var langJson = data.langJson ? data.langJson : null;
		var cssJson = data.cssJson ? data.cssJson : null;
		if(data.fps) this.setFps(data.fps);
		this.framerate = data.framerate ? parseInt(data.framerate) : 0;
		this.sound = data.volume ? parseFloat(data.volume) : this.sound;
		if(!this.videoSupport()){
			errStr += '<br />Your Broswer do not support the HTML5 Video Tag.';
		}
		if(!this.canvasSupport()){
			errStr += '<br />Your Broswer do not support the HTML5 Canvas Tag.';
		}
		this.threeDMode = mode;
		this.loadXML(xml);
		this.init(width, height, parentId);
		this.initLangJson(langJson);
		this.initCssJson(cssJson);	
		this.buildPlayer();
		this.setSize();
		this.buildCanvas();
				
		this.posCanvas();
		this.buildStatus();
		this.buildControl();
		this.buildProgressbar();
		this.buildControlBench();
		
		this.setVideoSrc(videoElementID, this.videoSrc);
		if(errStr == ''){
			this.ready();
			this.getThumbnail();		
			this.updateVolume();
			if(this.autoplay){
				this.byId(controlButtomID).click();
			}
			return true;
		}
		else{
			throw(errStr);
			return false;
		}
		
	} catch(Exception) {
		return false;
		//this.errorHandler(0, Exception);
	}	
};
// set the position of the canvas
player.prototype.posCanvas = function(){
	var self = this;
	var _p = self.byId(playerContainerID);
	var _pWidth = _p.clientWidth;
	var _pHeight = _p.clientHeight;
	var c = self.byId(canvasElementID);
	if(c){
		c.style.top = (_pHeight - this.height)/2 + self.lengthUnit;
		c.style.left = (_pWidth - this.width)/2 + self.lengthUnit;
	}	
};
// calculate the radio of the video
player.prototype.setSize = function(){
	
	var self = this;	
	this.width = this.oriWidth;
	this.height = this.oriHeight;
	ratio = this.ratio ? eval(this.ratio) : (this.oriWidth / this.oriHeight);
	var _p = self.byId(playerContainerID);
	var _pWidth = _p.clientWidth;
	var _pHeight = _p.clientHeight;
	var _h = 0;
	var _w = 0;
	var _r = 1;
	if( _pHeight >= this.oriHeight && _pWidth < this.oriWidth ){
		_h = (_pWidth / this.oriWidth) * this.oriHeight;
		_w = _pWidth;
	}
	else if( _pHeight < this.oriHeight && _pWidth >= this.oriWidth ){
		_w = (_pHeight / this.oriHeight) * this.oriWidth;
		_h = _pHeight;
	}
	else{
		 _w = (_pHeight / this.oriHeight) * this.oriWidth;
		 if(_w > _pWidth){
		 	_h = (_pWidth / this.oriWidth) * this.oriHeight;
		 	_w = _pWidth;
		 }
		 else{
		 	_h = _pHeight;
		 }
	}	
	var _rh = _h;
	var _rw = _w;	
	_rw = _h * ratio;
	if(_rw > _pWidth){
		_rh = _w / ratio;
		_rw = _w; 
	}
	else{
		if(_h < _pHeight){
			_rw = _pWidth;
			_rh = _rw * (1 / ratio);
			if(_rh > _pHeight){
				_rh = _pHeight;
				_rw = _rh * ratio;
			}
		}
		else{
			_rh = _h;
		}
	}
	this.width = _rw;
	this.height = _rh;
}

player.prototype.getEval = function(val, type){
	if(type == 'bool'){	
		if(val == 'true') return true;
		else if(val == 'false') return false;
	}
	else if(type == 'number'){
		return parseInt(val)
	}
	else if(type == 'float'){
		return parseFloat(val);
	}
	else{
		return val;
	}
}

player.prototype.init = function(width, height, parendId){
	// read xml
	this.oriWidth = width;
	this.oriHeight = height;	
	//this.ratio	
	this.parentID 			= parendId ? parendId : null;
	this.loop 				= this.getEval(this.getXmlNodeContent('loop'), 'bool');
	this.allowFullScreen	= this.getEval(this.getXmlNodeContent('allowfullscreen'), 'bool');
	this.autoload			= this.getEval(this.getXmlNodeContent('autoload'), 'bool');
	this.autoplay			= this.getEval(this.getXmlNodeContent('autoplay'), 'bool');	
	this.showFullScreenButton 	= this.getEval(this.getXmlNodeContent('showfullscreenbutton'), 'bool');
	this.showInfoButton			= this.getEval(this.getXmlNodeContent('showinfobutton'), 'bool');
	this.showRating				= this.getEval(this.getXmlNodeContent('showrating'), 'bool');
	this.showLightsbutton	= this.getEval(this.getXmlNodeContent('showlightsbutton'), 'bool');
	this.showOptionButton  	= this.getEval(this.getXmlNodeContent('showoptionbutton'), 'bool');
	
	this.videoSrc 		= [ this.getXmlNodeContent('file') ];
	this.thumbnail		= this.getXmlNodeContent('previewpic');
	this.desriptionPic	= this.getXmlNodeContent('description_pic');
	this.title			= this.getXmlNodeContent('title');
	this.author			= this.getXmlNodeContent('author');
	this.description	= this.getXmlNodeContent('description');
	this.id				= this.getXmlNodeContent('id');
	this.key			= this.getXmlNodeContent('key');
	this.lightsoffEnabled	= this.getEval(this.getXmlNodeContent('lightsoffenabled'), 'bool');
	this.autoLightsoff		= this.getEval(this.getXmlNodeContent('autolightsoff'), 'bool');
	
};

player.prototype.checkVideoSrc = function(src){
	try{
		if(src){
			var srcLength = src.length
			var res = false;
			for(var i = 0; i < srcLength; i++){
				if(!src[i]){ throw(this.getLang('noAvaliVideolabel')); continue; }
				var reg = /(\\+)/g;  
	    		var pfn = src[i].replace(reg, "#");  
	    		var arrpfn = pfn.split("#");  
	    		var fn = arrpfn[arrpfn.length - 1];  
	    		var arrfn = fn.split(".");  
	    		var format = arrfn[arrfn.length - 1];
	    		format = format.toLowerCase();
	    		if(format == 'ogv'){
	    			format = 'ogg';
	    		}	    		
	    		var support = this.videoFormatSupport('video/'+ format);
	    		if(support){
	    			res = true;
	    			break;
	    		}
			}
			if(!res){
				throw(this.getLang('notSupportForamtlabel'));
				return false;
			}
			else if(!this.video.currentSrc || this.video.networkState == 3){
				throw(this.getLang('notFoundVideo'));
				return false;
			}
			return res;
		}		
		else{
			throw(this.getLang('noAvaliVideolabel'));
			return false;
		}
	}
	catch(Exception){
		this.errorHandler(errorHandlerType, Exception);
	}
}

player.prototype.getLang = function(index){
	if(index){
		if(this.lang[index]){
			return this.lang[index];
		}
		else{
			return index;
		}
	}
	else{
		return ' ';
	}
}

player.prototype.initCssJson = function(cssJson){
	if(cssJson){
		var cssJsonLength = cssJson.length;
		var evalStr = '';
		for(var prop in cssJson){
			if(typeof(cssJson[prop]) == 'string')
				evalStr = prop + ' = "' + cssJson[prop] + '";';
			else if(typeof(cssJson[prop]) == 'object'){
				evalStr = prop + ' = [' + cssJson[prop] + '];';
			}
			else{
				evalStr = '';
			}
			eval(evalStr);
		}
	}
}

player.prototype.initLangJson = function(langJson){
	if(langJson){
		var langJsonLength = langJson.length;
		for(var prop in langJson){
			this.lang[prop] = langJson[prop];
		}
	}
}

player.prototype.parseTime = function(second, simply){
	second = second ? parseInt(second) : 0;
	var timeSeprator = ':'; 
	var hour = parseInt(second/3600);
	var min = parseInt((second%3600)/60);
	var sec = parseInt(second - hour*3600 - min*60);
	var hourStr = '';
	if(simply){
		hourStr = hour <= 0 ? '' : (hour/10)>=1 ? hour + timeSeprator : '0' + hour + timeSeprator;
	}
	else{
		hourStr = (hour/10)>=1 ? hour + timeSeprator : '0' + hour + timeSeprator;
	}
	var minStr = (min/10)>=1 ? min : '0' + min;
	var secStr = (sec/10)>=1 ? sec : '0' + sec;
	var str = hourStr + minStr + timeSeprator + secStr;
	return (str); 
};

player.prototype.supportedVideoFormat =	function() {
   var returnExtension = "";
   if (video.canPlayType("video/webm") =="probably" || 
       video.canPlayType("video/webm") == "maybe") {
         returnExtension = "webm";
   } else if(video.canPlayType("video/mp4") == "probably" || 
       video.canPlayType("video/mp4") == "maybe") {
         returnExtension = "mp4";
   } else if(video.canPlayType("video/ogg") =="probably" || 
       video.canPlayType("video/ogg") == "maybe") {
         returnExtension = "ogg";
   }
   return returnExtension;
};


player.prototype.canvasSupport = function() {
     //return Modernizr.canvas;
    return !!document.createElement('canvas').getContext;
};

player.prototype.webglSupport = function() {
     //return Modernizr.canvas;
    if(this.canvasSupport()){
    	if(document.createElement('canvas').getContext("webgl") || document.createElement('canvas').getContext("experimental-webgl")){
    		return true;
    	}
    	else{
    		false;
    	}
    }
    else{
    	return false;
    };
};

player.prototype.videoSupport = function(){
	return !!document.createElement('video').canPlayType;
}

player.prototype.videoFormatSupport = function(format) {
    if (!this.videoSupport()) { return false; }
	var v = document.createElement("video");
	var res = v.canPlayType(format);
	if(res =="probably" || res == "maybe"){
		return true;
	}
	else{
		return false;
	}
};

player.prototype.stopBubble = function(e){
	if ( e && e.stopPropagation )
		e.stopPropagation();
	else
		window.event.cancelBubble = true;
}

player.prototype.ready = function(){
try{
	var self = this;
	if(!self.webglSupport()){
		self.threeDMode = false;
	}	
	// get canvas content
	self.canvas = self.byId(canvasElementID);
	var c = self.canvas;	
	if(self.threeDMode){
		self.context = c.getContext("webgl") || c.getContext("experimental-webgl");
	}
	else{
		self.context = c.getContext("2d");
	}
	
	var pc = self.byId(playerContainerID);
	if(pc){
		var controlBench = self.byId(controlContainerID);
		if(controlBench){
			var cTimer = null;
			/*pc.addEventListener('mouseover', function(event){	
				clearTimeout(cTimer);				
				self.setCss(controlContainerID, {display: 'block',});
				cTimer = window.setTimeout(function(){
					self.setCss(controlContainerID, {display: 'none',});
				}, 2000);
				//self.stopBubble(event);	
			});*/			
			pc.addEventListener('mouseout', function(event){	
				clearTimeout(cTimer);
				cTimer = window.setTimeout(function(){
					self.setCss(controlContainerID, {display: 'none'});
				}, 2000);
				//self.stopBubble(event);					
			});
			
			
			pc.addEventListener('mousemove', function(event){		
				clearTimeout(cTimer);				
				self.setCss(controlContainerID, {display: 'block'});
				cTimer = window.setTimeout(function(){
					self.setCss(controlContainerID, {display: 'none'});
				}, 2000);
				//self.stopBubble(event);
			});
			
		}
	}
	
	// video event
	var v = self.video ? self.video : self.byId(videoElementID);
	v.addEventListener("loadedmetadata", function(){
		self.updatePlayerStatus('loading');
	  	self.durationTime = v.duration;
	  	var data = [{parentId : durationTimeID, content : self.parseTime(self.durationTime)}];
	  	self.setContent(data);
	  	v.loop = self.loop ? 'loop' : '';
	  	v.preload = self.autoload ? 'load' : 'meta';
	  	v.muted = self.playedWithMute ? self.playedWithMute : false;
	  	v.volume = self.sound ? self.sound : 1;
	  	self.updateVolume();
	  	
	}, false);
	
	
	v.addEventListener('canplay',function(){ self.updatePlayerStatus(); });
	
	v.addEventListener('play',function() {
		if(!self.checkVideoSrc(self.videoSrc)){
			v.pause();
			return false;
		}
		if(self.threeDMode && self.webgl){
			if(!self.webgl.getStatus()){
				v.pause();
				return false;
			}
		}
		self.frameNum = 0;
		self.drawTimer = window.setInterval( function() {
				if(self.updateFrame()){ 
					self.frameNum++;
				}
				else{v.pause(); }
		}, self.playbackRate);
		
		self.fpsTimer = window.setInterval( function() {
				var thisFrameFPS = Math.floor(self.frameNum);				
  				self.setContent([{parentId: 'infoText', content: ' -  FPS : '+self.frameNum}]);
  				self.frameNum = 0;
		}, 1000);
			
		if(self.autoLightsoff && self.lightsoffEnabled){			
			self.wrapperMask(playerContainerID, lightButtomID, true);	
		}
		if(!self.hasClass(controlButtomID, pauseButtomClass)){
			self.addClass(controlButtomID, pauseButtomClass);
		}
		if(self.hasClass(controlButtomID, playButtomClass)){
			self.removeClass(controlButtomID, playButtomClass);
		}
	},false);
	v.addEventListener('playing',function() {
		self.played++;
		if(!self.hasClass(controlButtomID, pauseButtomClass)){
			self.addClass(controlButtomID, pauseButtomClass);
		}
		if(self.hasClass(controlButtomID, playButtomClass)){
			self.removeClass(controlButtomID, playButtomClass);
		}
		self.updatePlayerStatus('playing');
	},false);
	v.addEventListener('pause',function() {
		window.clearInterval(self.drawTimer);
		self.drawTimer = null;
		self.updatePlayerStatus('paused');
		if(self.hasClass(controlButtomID, pauseButtomClass)){
			self.removeClass(controlButtomID, pauseButtomClass);
		}
		if(!self.hasClass(controlButtomID, playButtomClass)){
			self.addClass(controlButtomID, playButtomClass);
		}
		if(self.fpsTimer){
			window.clearInterval(self.fpsTimer);
			self.fpsTimer = null;
		}
	},false);
	v.addEventListener('ended',function() {
		window.clearInterval(self.drawTimer);
		self.getThumbnail();
		self.updatePlayerStatus('ended');
		if(self.fpsTimer){
			window.clearInterval(self.fpsTimer);
			self.fpsTimer = null;
		}
	},false);	
	v.addEventListener('timeupdate', function(){
		self.currentTime = v.currentTime;
		self.getFrameNumber(v.currentTime);
		self.setContent([{parentId: playedTimeID, content: self.parseTime(self.currentTime)}]);
		self.updateDownloadProgressbar();
		self.updatePlayProgressbar();
	}, false);
	v.addEventListener('volumechange', function(){
		self.updateVolume();
	}, false);
	v.addEventListener('progress', function(){
		self.updateDownloadProgressbar();
		self.updatePlayProgressbar();
	}, false);// Fires when the browser is downloading the audio/video
	v.addEventListener('suspend', function(){
		self.updateDownloadProgressbar();
		self.updatePlayProgressbar();
	}, false);// Fires when the browser is intentionally not getting media data
	v.addEventListener('waiting',function(){ self.updatePlayerStatus('loading') });// Fires when the video stops because it needs to buffer the next frame
	v.addEventListener('stalled',function(){throw(self.getLang('noAvaliVideolabel'));}, false);// Fires when the browser is trying to get media data, but data is not available
	v.addEventListener('abort',function(){throw(self.getLang('noAvaliVideolabel'));}, false);
	v.addEventListener('error',function(){throw(self.getLang('unknownErrorlabel'));}, false);
	// status event
	v.addEventListener('seeking',function(){ });
	v.addEventListener('seeked', function(){
		self.updateFrame();
		self.updateDownloadProgressbar();
		self.updatePlayProgressbar();
		if(window.document.onmousemove == null){
			self.updatePlayerStatus();
		}
	});
	var sc = self.byId(statusContainerID);
	if(sc){
		//var cTimer = null;
		sc.addEventListener('click',function(){	
			if (self.eventTimer) clearTimeout(self.eventTimer);
			self.eventTimer = window.setTimeout(function(){
				var cb = self.byId(controlButtomID);
				if(cb){ cb.click();}}, 200);
		},false);
		sc.addEventListener('dblclick',function(){	
			window.clearTimeout(self.eventTimer);
			self.eventTimer = null;
			var fb = self.byId(fullScreenButtomID);
			if(fb){ fb.click(); }
		},false);
	}
	// progressbar event	
	var pb = self.byId(progressbarBgID);
	pb.addEventListener('click',function(event){ 
		self.updatePlayerStatus('loading');
		self.seek(event);
	}, false);
	pb.addEventListener('mousedown', function(){
		self.updatePlayerStatus('loading');
		window.document.onmousemove = function(event){
			//self.updateFrame();
			self.seek(event);				
		};
		window.document.onmouseup = function(){			
			window.document.onmousemove = null;	
			//self.seek(event);
			self.updatePlayerStatus();			
		};
	}, false);
	pb.addEventListener('mousemove', function(event){
		self.setCss(slideTimeID, { display : 'block'});
		var slideTimeObj = self.byId(slideTimeID);
		var slideTimeWidth = slideTimeObj.offsetWidth;
		var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;		
		var mouseX = event.pageX || event.clientX + scrollX;
		var left = 0;
		if(mouseX+slideTimeWidth >= document.documentElement.scrollWidth){ 
			left -= slideTimeWidth; 
		}
		else if(slideTimeObj.scrollLeft < 0){
			left += slideTimeWidth; 
		}
		mouseX = mouseX - self.elePos(progressbarBgID);	
		mouseX = mouseX < 0 ? 0 : mouseX > pb.scrollWidth ? pb.scrollWidth : mouseX;
		left += mouseX;
		var target = mouseX / pb.scrollWidth;	
		target = target > 1 ? self.durationTime : target * self.durationTime;
		self.setCss(slideTimeID, { left : left });
		self.setContent([{parentId: slideTimeID, content: self.parseTime(target, true)}]);
	});
	pb.addEventListener('mouseout', function(event){
		self.setCss(slideTimeID, { display : 'none' });		
	});
	document.addEventListener('mouseup', function(){
		self.setCss(slideTimeID, { display : 'none'});
		self.setCss(slideVolumeID, { display : 'none'});
	});
	// play button
	var cb = self.byId(controlButtomID);
	cb.addEventListener('click', function(){
		if(v.paused || v.ended){ 
			v.play();
		}
		else {
			v.pause();
		}		
	}, false);
	// volume button	
	var vb = self.byId(soundButtomID);
	vb.addEventListener('click', function(){
		if(v.volume == 0 || v.muted == true){
			v.volume = self.sound ? self.sound : 0.6;
		}
		else{
			self.sound = v.volume;
			v.volume = 0;
		}
	}, false);
	// volume progressbar	
	var vc = self.byId(volumeContainerID);	
	vc.addEventListener('click', function(event){
		self.changeVolume(event);
	}, false);
	vc.addEventListener('mousedown', function(){		
		window.document.onmousemove = function(event){
			self.changeVolume(event);
		};
		window.document.onmouseup = function(){
			window.document.onmousemove = null;
		};
	}, false);	
	vc.addEventListener('mousemove', function(event){
		self.setCss(slideVolumeID, { display : 'block'});
		var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
		var mouseX = event.pageX || event.clientX + scrollX;
		mouseX = mouseX - self.elePos(volumeContainerID);	
		mouseX = mouseX < 0 ? 0 : mouseX > vc.scrollWidth ? vc.scrollWidth : mouseX;
		var target = mouseX / vc.scrollWidth;
		target = target > 1 ? 1 : target < 0 ? 0 : target;
		var sb = self.byId(soundButtomID);
		var l = mouseX + sb.scrollWidth;
		self.setCss( slideVolumeID, { display : 'block', left : l});
		var v = Math.round(target * 100) + '';
		self.setContent([{parentId: slideVolumeID, content:  v}]);
	});
	vc.addEventListener('mouseout', function(event){
		self.setCss(slideVolumeID, { display : 'none' });		
	});	
	// fullscreen event		
	if(self.allowFullScreen){
		var fb = self.byId(fullScreenButtomID);
		fb.addEventListener('click', function(){  
			self.fullScreen();
		}, false);
	}	
	document.addEventListener("fullscreenchange", function () {
	    self.resize('fullscreen');
	}, false);
	document.addEventListener("mozfullscreenchange", function () {
	   	self.resize('fullscreen');
	}, false);
	document.addEventListener("webkitfullscreenchange", function () {
		self.resize('fullscreen');
	}, false);
	// light event	
	if(self.lightsoffEnabled){
		var lb = self.byId(lightButtomID);
		lb.addEventListener('click', function(){
				self.switchBtn(lightButtomID, self.wrapperMask(playerContainerID, lightButtomID));	
			}, false);
	}	
	// info button		
	if(self.showInfoButton){
		self.buildInfoWin(self.getLang('infoWinTitle'), '');
		var ib = self.byId(infoButtomID);
		ib.addEventListener('click', function(){
			self.switchBtn(infoButtomID, self.switchWin(infoContainerID));
			self.resize();
		}, false);
	}
	// 3-D Button	
	if(self.threeDMode){
		self.buildThreeDWin(self.getLang('threeDWinTitle'), '');
		var tb = self.byId(threeDButtomID);	
		tb.addEventListener('click', function(){
			self.switchBtn(threeDButtomID, self.switchWin(threeDContainerID));
			self.resize();
		}, false);
	}
	// Options Button
	if(self.showOptionButton){	
		self.buildOptionWin(self.getLang('optionWinTitle'), '');
		var ob = self.byId(optionButtomID);	
		ob.addEventListener('click', function(){
			self.switchBtn(optionButtomID, self.switchWin(optionContainerID));
			self.resize();
		}, false);
	}
}
catch(Exception){
	this.errorHandler(errorHandlerType, Exception);
}
};

player.prototype.switchBtn = function(btn, mode){
	if(mode){
		this.setCss(btn, { opacity:'0.5', filter:'alpha(opacity=50)'});
	}
	else{
		this.setCss(btn, { opacity:'1.0', filter:'alpha(opacity=100)'});
	}
};
/*
* common functions
*/
//error handler
player.prototype.errorHandler = function(type, e, emsg) {
	try {
		if (!type) {
			type = !errorHandlerType ? 0 : errorHandlerType;
		}
		var msg = "";
		if(e){
			if (typeof(e) == 'object') {			
				if(e.line){
					msg += " - line : " + e.line;
				}
				if(e.lineNumber){
					msg += " - line : " + e.lineNumber;
				}
				if(e.message){
					msg += " - Message : " + e.message;
				}
			}
			else{
				msg += " - Message : " + e;
			}
		}
		if(emsg){
			msg += emsg;
		}

		var _timer = new Date();
		if (!_timer) {
			throw ("Initailize the Date()-Object failed.");
		}
		var _msg = "!Error!<br /> -Time : " + _timer.getFullYear() + "/" + (_timer.getMonth() + 1) + "/" + _timer.getDate() + "  " + _timer.getHours() + ":" + _timer.getMinutes() + ":" + _timer.getSeconds();// + ":" + _timer.getMilliseconds();
		_msg += '<br />' + msg;
		if (type == 0) {
			alert(_msg);
		} else if (type == 1) {
			this.msg('Error', _msg);
			this.showWin(msgContainerID, 'middle');
		}
		return false;
	} catch(e) {
		alert(arguments.callee.name + " - line : " + e.line + " - message : " + e.message);
	}
}; 

/*
 *
 *	ajax handler
 */
player.prototype.a = function(url, data, type, async, cache) {
	try {
		var self = this;
		var _response = "";
		if (!type || (type.toLowerCase() != "post" && type.toLowerCase() != "get")) {
			type = "get";
		}
		if (!data || data instanceof Object) {
			data = {};
		}
		if (cache != false && cache != true) {
			cache = true;
		}

		var _async;
		if (async != false && async != true) {
			_async = true;
		} else {
			_async = async == true ? true : false;
		}

		if ( typeof jQuery == 'undefined') {
			var _xmlHttp;
			var _url = url;
			var _parameters = "";

			try {
				// Firefox, Opera 8.0+, Safari, IE7
				_xmlHttp = new XMLHttpRequest();
			} catch(e) {
				// Old IE
				try {
					_xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {
					self.errorHandler(errorHandlerType, "Your browser does not support XMLHTTP!");
					return null;
				}
			}

			for (var _parameterKey in data) {
				if ( typeof (data[_parameterKey]) == "function") {
					data[_parameterKey]();
				} else {
					_parameters += _parameterKey + "=" + data[_parameterKey] + "&";
				}
			}
			if (type == 'get') {
				if (_parameters !== "undefined" && _parameters != null) {
					_url += '?' + _parameters;
				}
				_parameters = null;
			}
			_xmlHttp.onreadystatechange = function() {
				if (_xmlHttp.readyState == 4 && _xmlHttp.status == 200) {
					_response = _xmlHttp.responseText;
				}
			};
			_xmlHttp.open(type, _url, _async);
			_xmlHttp.send(_parameters);
		} else {
			$.ajax({
				type : type,
				url : url,
				async : async,
				data : data,
				beforeSend : function() {
				},
				success : function(data) {
					_response = data;
				},
				complete : function() {
				},
				error : function() {
					self.errorHandler(errorHandlerType, "ajax error");
					return null;
				}
			});
		}
		return _response;
	} catch(e) {
		this.errorHandler(errorHandlerType, e);
	}
}; 
window['_'] = new player;
})();