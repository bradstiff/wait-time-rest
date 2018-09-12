/* eslint-disable */

/**
* @project: ComicBubbles
* @description: Speech balloon JavaScript library
* @version: 1.2
* @file: comicbubbles.js
* @author: Wojciech Gajewski (comicbubbles.com)
* @contact: comicbubbles.com/contact
* @copyright: Copyright 2016-2017 Wojciech Gajewski
*/
import ComicBubblesEditor from './comicbubbles_editor';

export default function ComicBubbles(id) {

    var cb = this, cb_arguments = arguments, elementID = id, cb_element, cb_parent, cbCanvasWrapper, cbCanvas, cbCanvasContext, canvasWidth, canvasHeight, touchy = (navigator.userAgent.toLowerCase().search("android") > -1 || navigator.userAgent.toLowerCase().search("iphone") > -1) || false,
        defaults = { 'text': "", 'bubbleWidth': 140, 'bubbleHeight': 65, 'bgColor': "#ffffff", 'txtColor': "#000000", 'fontFamily': "Arial, Helvetica, sans-serif", 'fontSize': "15px", 'fontStyle': "normal", 'fontWeight': "normal", 'textAlign': "center", 'lineHeight': 1.2, 'opacity': 0.8, 'readonly': true, 'settable': true, 'bubbleStyle': -1 },
        presets = {}, defaultText = defaults['text'], bubbleWidth = defaults['bubbleWidth'], bubbleHeight = defaults['bubbleHeight'], bgColor = defaults['bgColor'], txtColor = defaults['txtColor'], fontFamily = defaults['fontFamily'], fontSize = defaults['fontSize'], fontStyle = defaults['fontStyle'], fontWeight = defaults['fontWeight'], textAlign = defaults['textAlign'], lineHeight = defaults['lineHeight'], opacity = defaults['opacity'], readonly = defaults['readonly'], settable = defaults['settable'], bubbleStyle = defaults['bubbleStyle'], autoWidth = false, autoHeight = false, bubbles = [], tails = [], tailSize = 6, tailMargin = 0, refresh, INTERVAL = 30, selectionID = -1, MINSIZE = 10, tempP = "", timestamp = 0, txtareatimeout, SERATIO = 0.17, settingsBox = document.createElement('div'), common_fonts = ['Arial, Helvetica, sans-serif', '"Arial Black", Gadget, sans-serif', '"Comic Sans MS", cursive, sans-serif', '"Courier New", Courier, monospace', 'Georgia, serif', 'Impact, Charcoal, sans-serif', '"Lucida Console", Monaco, monospace', '"Lucida Sans Unicode", "Lucida Grande", sans-serif', '"Palatino Linotype", "Book Antiqua", Palatino, serif', 'Tahoma, Geneva, sans-serif', '"Times New Roman", Times, serif', '"Trebuchet MS", Helvetica, sans-serif', 'Verdana, Geneva, sans-serif'], colors140 = { 'indianred': '#cd5c5c', 'lightcoral': '#f08080', 'salmon': '#fa8072', 'darksalmon': '#e9967a', 'lightsalmon': '#ffa07a', 'crimson': '#dc143c', 'red': '#ff0000', 'firebrick': '#b22222', 'darkred': '#8b0000', 'pink': '#ffc0cb', 'lightpink': '#ffb6c1', 'hotpink': '#ff69b4', 'deeppink': '#ff1493', 'mediumvioletred': '#c71585', 'palevioletred': '#db7093', 'lightsalmon': '#ffa07a', 'coral': '#ff7f50', 'tomato': '#ff6347', 'orangered': '#ff4500', 'darkorange': '#ff8c00', 'orange': '#ffa500', 'gold': '#ffd700', 'yellow': '#ffff00', 'lightyellow': '#ffffe0', 'lemonchiffon': '#fffacd', 'lightgoldenrodyellow': '#fafad2', 'papayawhip': '#ffefd5', 'moccasin': '#ffe4b5', 'peachpuff': '#ffdab9', 'palegoldenrod': '#eee8aa', 'khaki': '#f0e68c', 'darkkhaki': '#bdb76b', 'lavender': '#e6e6fa', 'thistle': '#d8bfd8', 'plum': '#dda0dd', 'violet': '#ee82ee', 'orchid': '#da70d6', 'fuchsia': '#ff00ff', 'magenta': '#ff00ff', 'mediumorchid': '#ba55d3', 'mediumpurple': '#9370db', 'amethyst': '#9966cc', 'blueviolet': '#8a2be2', 'darkviolet': '#9400d3', 'darkorchid': '#9932cc', 'darkmagenta': '#8b008b', 'purple': '#800080', 'indigo': '#4b0082', 'slateblue': '#6a5acd', 'darkslateblue': '#483d8b', 'mediumslateblue': '#7b68ee', 'greenyellow': '#adff2f', 'chartreuse': '#7fff00', 'lawngreen': '#7cfc00', 'lime': '#00ff00', 'limegreen': '#32cd32', 'palegreen': '#98fb98', 'lightgreen': '#90ee90', 'mediumspringgreen': '#00fa9a', 'springgreen': '#00ff7f', 'mediumseagreen': '#3cb371', 'seagreen': '#2e8b57', 'forestgreen': '#228b22', 'green': '#008000', 'darkgreen': '#006400', 'yellowgreen': '#9acd32', 'olivedrab': '#6b8e23', 'olive': '#808000', 'darkolivegreen': '#556b2f', 'mediumaquamarine': '#66cdaa', 'darkseagreen': '#8fbc8f', 'lightseagreen': '#20b2aa', 'darkcyan': '#008b8b', 'teal': '#008080', 'aqua': '#00ffff', 'cyan': '#00ffff', 'lightcyan': '#e0ffff', 'paleturquoise': '#afeeee', 'aquamarine': '#7fffd4', 'turquoise': '#40e0d0', 'mediumturquoise': '#48d1cc', 'darkturquoise': '#00ced1', 'cadetblue': '#5f9ea0', 'steelblue': '#4682b4', 'lightsteelblue': '#b0c4de', 'powderblue': '#b0e0e6', 'lightblue': '#add8e6', 'skyblue': '#87ceeb', 'lightskyblue': '#87cefa', 'deepskyblue': '#00bfff', 'dodgerblue': '#1e90ff', 'cornflowerblue': '#6495ed', 'mediumslateblue': '#7b68ee', 'royalblue': '#4169e1', 'blue': '#0000ff', 'mediumblue': '#0000cd', 'darkblue': '#00008b', 'navy': '#000080', 'midnightblue': '#191970', 'cornsilk': '#fff8dc', 'blanchedalmond': '#ffebcd', 'bisque': '#ffe4c4', 'navajowhite': '#ffdead', 'wheat': '#f5deb3', 'burlywood': '#deb887', 'tan': '#d2b48c', 'rosybrown': '#bc8f8f', 'sandybrown': '#f4a460', 'goldenrod': '#daa520', 'darkgoldenrod': '#b8860b', 'peru': '#cd853f', 'chocolate': '#d2691e', 'saddlebrown': '#8b4513', 'sienna': '#a0522d', 'brown': '#a52a2a', 'maroon': '#800000', 'white': '#ffffff', 'snow': '#fffafa', 'honeydew': '#f0fff0', 'mintcream': '#f5fffa', 'azure': '#f0ffff', 'aliceblue': '#f0f8ff', 'ghostwhite': '#f8f8ff', 'whitesmoke': '#f5f5f5', 'seashell': '#fff5ee', 'beige': '#f5f5dc', 'oldlace': '#fdf5e6', 'floralwhite': '#fffaf0', 'ivory': '#fffff0', 'antiquewhite': '#faebd7', 'linen': '#faf0e6', 'lavenderblush': '#fff0f5', 'mistyrose': '#ffe4e1', 'gainsboro': '#dcdcdc', 'lightgrey': '#d3d3d3', 'silver': '#c0c0c0', 'darkgray': '#a9a9a9', 'gray': '#808080', 'dimgray': '#696969', 'lightslategray': '#778899', 'slategray': '#708090', 'darkslategray': '#2f4f4f', 'black': '#000000' }, line_heights = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0], textDrawingCount = 0, skip = false, selectionAndSettingsAllowed = false, myconsole = document.getElementById(elementID + '-comic-bubbles-output'), all_bubble_settings = '', console_update, delayed_refresh, delayed_temp_removal, pointer_events = false, textDrawing = false, ellipse = false, editor;

    this.action = "auto";
    this.mouseX = 0;
    this.mouseY = 0;
    this.mX = 0;
    this.mY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.selectedBubbleID = 0;
    this.insideTail = false;
    this.mousePressed = false;
    this.events_added = false;
    this.png_in_progress = false;
    this.encoded_canvas;
    this.bubbleStateChanged;

    function getTextStyle(ffa, fsi, fst, fwe, c, l, t, w, h, visib, ta, lh) {
        ffa = ffa || fontFamily;
        fsi = fsi || fontSize;
        fst = fst || fontStyle;
        fwe = fwe || fontWeight;
        c = c || txtColor;
        l = l || "auto";
        t = t || "auto";
        w = w || "auto";
        h = h || "auto";
        visib = visib || "hidden";
        ta = ta || textAlign;
        lh = lh || lineHeight;
        return 'position: absolute !important; left: ' + l + ' !important; top: ' + t + ' !important; width: ' + w + ' !important; height: ' + h + ' !important; right: auto !important; bottom: auto !important; display: block; visibility: ' + visib + ' !important; text-align: ' + ta + ' !important; line-height: ' + lh + ' !important; border: 0 !important; margin: 0 !important; font-family: ' + ffa + '; font-size: ' + fsi + '; font-style: ' + fst + '; font-weight: ' + fwe + '; background-color: transparent !important; color: ' + c + '; outline: 0 solid transparent !important; overflow: hidden !important; word-wrap: break-word !important; overflow-wrap: break-word !important; white-space: normal !important';
    }

    function Bubble() {
        this.id = "";
        this.x = cb.mouseX;
        this.y = cb.mouseY;
        this.width = bubbleWidth;
        this.height = bubbleHeight;
        this.fill = bgColor;
        this.color = txtColor;
        this.ellipse = ellipse;
        this.tailLocation = -1;
        this.bubbleStyle = bubbleStyle;
        this.frame = false;
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.fontStyle = fontStyle;
        this.fontWeight = fontWeight;
        this.textAlign = textAlign;
        this.lineHeight = lineHeight;
        this.baselineFromTop = 0;
        this.lineH = 0;
        this.consoleText = "";
        this.readonly = readonly;
        this.settable = settable;
        this.txtarea = document.createElement("p");
        this.txtarea.className = "cb-bubble-field";
        this.txtarea.id = 0;
        this.txtarea.style.cssText = getTextStyle();
        this.txtarea.innerHTML = defaultText;
        this.txtarea.contentEditable = !readonly;
        this.txtarea.spellcheck = false;
        this.NodeInsEvt = false;
        this.lettersCoordinates = [];
        this.tailX0 = 0;
        this.tailY0 = 0;
        this.tailX1 = 0;
        this.tailY1 = 0;
        this.tailX2 = 0;
        this.tailY2 = 0;
        this.tailX3 = 0;
        this.tailY3 = 0;
        this.tailX4 = 0;
        this.tailY4 = 0;
        this.tailX5 = 0;
        this.tailY5 = 0;
        this.tailX6 = 0;
        this.tailY6 = 0;
        this.tailX7 = 0;
        this.tailY7 = 0;
        this.opacity = opacity;
        this.name = "";
        this.off = false;
        this.autoWidth = autoWidth;
        this.autoHeight = autoHeight;
        this.action_in_progress;
        this.postponed_actions = [];
        this.draw = function (n) {
            if (!this.off) {
                cbCanvasContext.fillStyle = hexToRgba(this.fill, this.opacity);
                if (this.x > canvasWidth || this.y > canvasHeight) return;
                if (this.x + this.width < 0 || this.y + this.height < 0) return;
                drawEllipseOrRectangle(this, n);
                this.txtarea.style.cssText = getTextStyle(this.fontFamily, this.fontSize, this.fontStyle, this.fontWeight, this.color, this.x + "px", this.y + "px", this.width + "px", this.height + "px", "visible", this.textAlign, this.lineHeight);
                cbCanvasContext.fillStyle = this.color;
                cbCanvasContext.font = this.fontStyle + " " + this.fontWeight + " " + this.fontSize + " " + this.fontFamily;
                var thistxtarea = this.txtarea, thisBubble = this;
                if (this.txtarea.innerHTML != "") {
                    cbCanvasContext.fillStyle = this.color;
                    if (this.lettersCoordinates.length == 0) prepareText(this);
                    if (cb.png_in_progress) {
                        drawText(this);
                    }
                    else {
                        if (!document.getElementById(this.txtarea.id) && n != selectionID) drawText(this);
                    }
                }
            }
            else {
                this.txtarea.style.cssText = getTextStyle(this.fontFamily, this.fontSize, this.fontStyle, this.fontWeight, this.color, this.x + "px", this.y + "px", this.width + "px", this.height + "px", "hidden", this.textAlign, this.lineHeight);
                if (this.lettersCoordinates.length == 0) prepareText(this);
            }
        }
        this.drawSelectedBubble = function (n, s) {
            if (this.off) return;
            cbCanvasContext.globalCompositeOperation = 'source-atop';
            cbCanvasContext.fillStyle = hexToRgba(this.fill, this.opacity);
            if (this.x > canvasWidth || this.y > canvasHeight) return;
            if (this.x + this.width < 0 || this.y + this.height < 0) return;
            drawEllipseOrRectangle(this, n);
            cbCanvasContext.globalCompositeOperation = 'source-over';
            this.txtarea.style.cssText = getTextStyle(this.fontFamily, this.fontSize, this.fontStyle, this.fontWeight, this.color, this.x + "px", this.y + "px", this.width + "px", this.height + "px", "visible", this.textAlign, this.lineHeight);
            var thisBubble = this, thistxtarea = this.txtarea;
            if (this.frame) {
                thistxtarea.onmousedown = function (e) {
                    refreshBubbleCanvas(false);
                    clearTimeout(txtareatimeout);
                };
                thistxtarea.onmouseup = function (e) {
                };
                thistxtarea.onkeydown = function (e) {
                    clearTimeout(txtareatimeout);
                };
                thistxtarea.onkeypress = function (e) {
                    if (e.which == 13) {
                        if (e.shiftKey && !isIE()) e.preventDefault();
                    }
                };
                if (!thisBubble.NodeInsEvt) {
                    thistxtarea.addEventListener('DOMNodeInserted', function () { cb.applyStyleToChild(thisBubble); }, false);
                    thisBubble.NodeInsEvt = true;
                }
                thistxtarea.onkeyup = function (e) {
                    clearTimeout(txtareatimeout);
                    txtareatimeout = setTimeout(function () {
                        prepareText(thisBubble);
                        txtareatimeout = null;
                        updateConsole();
                    }, 500);
                };
                thistxtarea.onpaste = function (e) {
                    e.preventDefault();
                    var text = '';
                    if (e.clipboardData)
                        text = e.clipboardData.getData('text/plain');
                    else if (window.clipboardData)
                        text = window.clipboardData.getData('Text');
                    else if (e.originalEvent.clipboardData)
                        text = e.originalEvent.clipboardData.getData('text');
                    if (document.queryCommandSupported('insertText')) {
                        document.execCommand('insertHTML', false, text);
                    }
                    else {
                        var sel, range, html = text;
                        if (window.getSelection) {
                            sel = window.getSelection();
                            if (sel.getRangeAt && sel.rangeCount) {
                                range = sel.getRangeAt(0);
                                range.deleteContents();
                                var el = document.createElement("div");
                                el.innerHTML = html;
                                var frag = document.createDocumentFragment(), node, lastNode;
                                while (node = el.firstChild) {
                                    lastNode = frag.appendChild(node);
                                }
                                range.insertNode(frag);
                                if (lastNode) {
                                    range = range.cloneRange();
                                    range.setStartAfter(lastNode);
                                    range.collapse(true);
                                    sel.removeAllRanges();
                                    sel.addRange(range);
                                }
                            }
                        } else if (document.selection && document.selection.type != "Control") {
                            document.selection.createRange().pasteHTML(html);
                        }
                    }
                    clearTimeout(txtareatimeout);
                    txtareatimeout = setTimeout(function () {
                        prepareText(thisBubble);
                        txtareatimeout = null;
                        updateConsole();
                    }, 200);
                };
                if (selectionAndSettingsAllowed && !this.readonly) {
                    cbCanvasContext.fillStyle = 'red';
                    cbCanvasContext.strokeStyle = 'red';
                    if (touchy) {
                        cbCanvasContext.globalAlpha = 0.2;
                        cbCanvasContext.fillRect(this.x - tailSize, this.y - tailSize, this.width + tailSize * 2, this.height + tailSize * 2);
                    }
                    cbCanvasContext.globalAlpha = 1;
                    cbCanvasContext.lineWidth = 2;
                    cbCanvasContext.strokeRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);
                    var t2 = tailSize / 2, i = 1;
                    tails[0].x = this.x - tailSize + i - 1;
                    tails[0].y = this.y - tailSize + i - 1;
                    tails[1].x = this.x + this.width / 2 - t2;
                    tails[1].y = this.y - tailSize + i - 1;
                    tails[2].x = this.x + this.width - i + 1;
                    tails[2].y = this.y - tailSize + i - 1;
                    tails[3].x = this.x - tailSize + i - 1;
                    tails[3].y = this.y + this.height / 2 - t2;
                    tails[4].x = this.x + this.width - i + 1;
                    tails[4].y = this.y + this.height / 2 - t2;
                    tails[5].x = this.x - tailSize + i - 1;
                    tails[5].y = this.y + this.height - i + 1;
                    tails[6].x = this.x + this.width / 2 - t2;
                    tails[6].y = this.y + this.height - i + 1;
                    tails[7].x = this.x + this.width - i + 1;
                    tails[7].y = this.y + this.height - i + 1;
                    for (var i = 0; i < 8; i++) {
                        var tail = tails[i];
                        if (touchy) {
                            cbCanvasContext.lineWidth = 2;
                            cbCanvasContext.beginPath();
                            cbCanvasContext.arc(tail.x + tailSize / 2, tail.y + tailSize / 2, tailSize / 2, 0, Math.PI * 2, true);
                            cbCanvasContext.closePath();
                            cbCanvasContext.stroke();
                        }
                        else {
                            cbCanvasContext.fillRect(tail.x, tail.y, tailSize, tailSize);
                        }
                    }
                    if (this.ellipse) {
                        if (touchy) {
                            cbCanvasContext.beginPath();
                            cbCanvasContext.arc(tails[8].x + tailSize / 2, tails[8].y + tailSize / 2, tailSize / 2, 0, Math.PI * 2, true);
                            cbCanvasContext.closePath();
                            cbCanvasContext.stroke();
                        }
                        else {
                            cbCanvasContext.lineWidth = 2;
                            cbCanvasContext.strokeRect(tails[8].x - 1, tails[8].y - 1, tailSize + 2, tailSize + 2);
                        }
                    }
                    if (s == 1 && this.settable && editor) editor.addSettingsBox(this.x, this.y + this.height);
                }
                if (cb.mousePressed && cb.action != "auto" && cb.action != "pointer") {
                    if (pointer_events) {
                        this.txtarea.style.pointerEvents = "none";
                    }
                    else {
                        if (document.getElementById(this.txtarea.id)) cbCanvasWrapper.removeChild(this.txtarea);
                    }
                }
                else {
                    if (!document.getElementById(this.txtarea.id)) {
                        cbCanvasWrapper.appendChild(this.txtarea);
                        this.NodeInsEvt = false;
                    }
                }
                cbCanvasContext.font = this.fontStyle + " " + this.fontWeight + " " + this.fontSize + " " + this.fontFamily;
                cbCanvasContext.fillStyle = this.color;
                if (thistxtarea.innerHTML != "") {
                    if (!skip && !document.getElementById(thistxtarea.id)) {
                        if (cb.action != "move" && cb.action != "crosshair") prepareLetters(this);
                        drawText(this);
                    }
                }
            }
        }
        this.setId = function (p, callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'setId', 'p': p, 'callback': callback });
            }
            else {
                if (changeId(this, p)) refreshD();
                if (typeof callback === "function") {
                    callback(this.getBubbleSettings());
                }
            }
            return this;
        }
        this.getId = function () {
            return this.id;
        }
        this.setName = function (p, callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'setName', 'p': p, 'callback': callback });
            }
            else {
                this.name = p;
                refreshD();
                if (typeof callback === "function") {
                    callback(this.getBubbleSettings());
                }

            }
            return this;
        }
        this.getName = function () {
            return this.name;
        }
        this.setText = function (p, callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'setText', 'p': p, 'callback': callback });
            }
            else {
                this.txtarea.innerHTML = textToHtml(p);
                this.lettersCoordinates = [];
                if (this.autoWidth || this.autoHeight) {
                    var auto_size = autoSize(this);
                    if (this.autoWidth) this.width = auto_size.width;
                    if (this.autoHeight) this.height = auto_size.height;
                }
                refreshBubbles();
                if (typeof callback === "function") {
                    callback(this.getBubbleSettings());
                }
            }
            return this;
        }
        this.getText = function () {
            if (this.consoleText == "") prepareText(this);
            return this.consoleText.replace(/<br>/gi, '\n').replace(/&nbsp;/g, ' ');
        }
        this.setX = function (p, callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'setX', 'p': p, 'callback': callback });
            }
            else {
                if (setParameter('x', p, this)) {
                    this.lettersCoordinates = [];
                    refreshD();
                }
                if (typeof callback === "function") {
                    callback(this.getBubbleSettings());
                }
            }
            return this;
        }
        this.getX = function () {
            return this.x;
        }
        this.setY = function (p, callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'setY', 'p': p, 'callback': callback });
            }
            else {
                if (setParameter('y', p, this)) {
                    this.lettersCoordinates = [];
                    refreshD();
                }
                if (typeof callback === "function") {
                    callback(this.getBubbleSettings());
                }
            }
            return this;
        }
        this.getY = function () {
            return this.y;
        }
        this.setWidth = function (p, callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'setWidth', 'p': p, 'callback': callback });
            }
            else {
                if (p == "auto") {
                    this.autoWidth = true;
                    var auto_size = autoSize(this);
                    this.width = auto_size.width;
                    this.lettersCoordinates = [];
                    refreshD();
                }
                else {
                    this.autoWidth = false;
                    if (setParameter('width', p, this)) {
                        if (!this.autoHeight) correctWidth(this, this.height);
                        this.lettersCoordinates = [];
                        refreshD();
                    }
                }
                if (typeof callback === "function") {
                    callback(this.getBubbleSettings());
                }
            }
            return this;
        }
        this.getWidth = function () {
            return this.width;
        }
        this.setHeight = function (p, callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'setHeight', 'p': p, 'callback': callback });
            }
            else {
                if (p == "auto") {
                    this.autoHeight = true;
                    var auto_size = autoSize(this);
                    this.height = auto_size.height;
                    this.lettersCoordinates = [];
                    refreshD();
                }
                else {
                    this.autoHeight = false;
                    if (setParameter('height', p, this)) {
                        this.lettersCoordinates = [];
                        refreshD();
                    }
                }
                if (typeof callback === "function") {
                    callback(this.getBubbleSettings());
                }
            }
            return this;
        }
        this.getHeight = function () {
            return this.height;
        }
        this.setFontFamily = function (p, callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'setFontFamily', 'p': p, 'callback': callback });
            }
            else {
                this.fontFamily = getVerifiedFontFamily(p);
                this.lettersCoordinates = [];
                adjustSize(this);
                refreshD();
                if (typeof callback === "function") {
                    callback(this.getBubbleSettings());
                }
            }
            return this;
        }
        this.getFontFamily = function () {
            return this.fontFamily;
        }
        this.setFontSize = function (p, callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'setFontSize', 'p': p, 'callback': callback });
            }
            else {
                this.fontSize = getVerifiedFontSize(p);
                this.lettersCoordinates = [];
                adjustSize(this);
                refreshD();
                if (typeof callback === "function") {
                    callback(this.getBubbleSettings());
                }
            }
            return this;
        }
        this.getFontSize = function () {
            return parseInt(this.fontSize);
        }
        this.setFontStyle = function (p, callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'setFontStyle', 'p': p, 'callback': callback });
            }
            else {
                this.fontStyle = getVerifiedFontStyle(p);
                this.lettersCoordinates = [];
                adjustSize(this);
                refreshD();
                if (typeof callback === "function") {
                    callback(this.getBubbleSettings());
                }
            }
            return this;
        }
        this.getFontStyle = function () {
            return this.fontStyle;
        }
        this.setFontWeight = function (p, callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'setFontWeight', 'p': p, 'callback': callback });
            }
            else {
                this.fontWeight = getVerifiedFontWeight(p);
                this.lettersCoordinates = [];
                adjustSize(this);
                refreshD();
                if (typeof callback === "function") {
                    callback(this.getBubbleSettings());
                }
            }
            return this;
        }
        this.getFontWeight = function () {
            return this.fontWeight;
        }
        this.setTextAlign = function (p, callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'setTextAlign', 'p': p, 'callback': callback });
            }
            else {
                this.textAlign = getVerifiedTextAlign(p);
                this.lettersCoordinates = [];
                adjustSize(this);
                refreshD();
                if (typeof callback === "function") {
                    callback(this.getBubbleSettings());
                }
            }
            return this;
        }
        this.getTextAlign = function () {
            return this.textAlign;
        }
        this.setLineHeight = function (p, callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'setLineHeight', 'p': p, 'callback': callback });
            }
            else {
                this.lineHeight = getVerifiedLineHeight(p);
                this.lettersCoordinates = [];
                adjustSize(this);
                refreshD();
                if (typeof callback === "function") {
                    callback(this.getBubbleSettings());
                }
            }
            return this;
        }
        this.getLineHeight = function () {
            return this.lineHeight;
        }
        this.setBackground = function (p, callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'setBackground', 'p': p, 'callback': callback });
            }
            else {
                var c = getVerifiedColor(p) || bgColor;
                this.fill = c;
                refreshD();
                if (typeof callback === "function") {
                    callback(this.getBubbleSettings());
                }
            }
            return this;
        }
        this.getBackground = function () {
            return this.fill;
        }
        this.setColor = function (p, callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'setColor', 'p': p, 'callback': callback });
            }
            else {
                var c = getVerifiedColor(p) || txtColor;
                this.color = c;
                refreshD();
                if (typeof callback === "function") {
                    callback(this.getBubbleSettings());
                }
            }
            return this;
        }
        this.getColor = function () {
            return this.color;
        }
        this.setOpacity = function (p, callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'setOpacity', 'p': p, 'callback': callback });
            }
            else {
                if (setParameter('opacity', p, this)) {
                    refreshD();
                }
                if (typeof callback === "function") {
                    callback(this.getBubbleSettings());
                }
            }
            return this;
        }
        this.getOpacity = function () {
            return this.opacity;
        }
        this.setReadonly = function (p, callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'setReadonly', 'p': p, 'callback': callback });
            }
            else {
                if (setParameter('readonly', p, this)) {
                    refreshD();
                }
                if (typeof callback === "function") {
                    callback(this.getBubbleSettings());
                }
            }
            return this;
        }
        this.isReadonly = function () {
            return this.readonly;
        }
        this.setSettable = function (p, callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'setSettable', 'p': p, 'callback': callback });
            }
            else {
                if (setParameter('settable', p, this)) {
                    refreshD();
                }
                if (typeof callback === "function") {
                    callback(this.getBubbleSettings());
                }
            }
            return this;
        }
        this.isSettable = function () {
            return this.settable;
        }
        this.setTailLocation = function (p, callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'setTailLocation', 'p': p, 'callback': callback });
            }
            else {
                if (this.tailLocation > -1) {
                    var tn = getTNumber(p);
                    this.tailLocation = tn;
                    this['tailX' + tn] = getDefaultTailX(this);
                    this['tailY' + tn] = getDefaultTailY(this);
                    refreshD();
                }
                if (typeof callback === "function") {
                    callback(this.getBubbleSettings());
                }
            }
            return this;
        }
        this.getTailLocation = function () {
            if (this.bubbleStyle > -1) {
                return getTLocation(this.tailLocation);
            }
            else {
                return "";
            }
        }
        this.setTailX = function (p, callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'setTailX', 'p': p, 'callback': callback });
            }
            else {
                if (this.tailLocation > -1) {
                    if (setParameter('tailX', p, this)) {
                        refreshD();
                    }
                }
                if (typeof callback === "function") {
                    callback(this.getBubbleSettings());
                }
            }
            return this;
        }
        this.getTailX = function () {
            if (this.tailLocation > -1) {
                return this['tailX' + this.tailLocation];
            }
            else {
                return "";
            }
        }
        this.setTailY = function (p, callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'setTailY', 'p': p, 'callback': callback });
            }
            else {
                if (this.tailLocation > -1) {
                    if (setParameter('tailY', p, this)) {
                        refreshD();
                    }
                }
                if (typeof callback === "function") {
                    callback(this.getBubbleSettings());
                }
            }
            return this;
        }
        this.getTailY = function () {
            if (this.tailLocation > -1) {
                return this['tailY' + this.tailLocation];
            }
            else {
                return "";
            }
        }
        this.setBubbleStyle = function (p, callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'setBubbleStyle', 'p': p, 'callback': callback });
            }
            else {
                this.bubbleStyle = getCSNumber(p);
                if (this.tailLocation == -1) {
                    this.ellipse = true;
                    this.tailLocation = 7;
                    this.tailX7 = getDefaultTailX(this);
                    this.tailY7 = getDefaultTailY(this);
                }
                if (this.bubbleStyle == -1) {
                    this.ellipse = false;
                    this.tailLocation == -1;
                }
                else {
                    this.ellipse = true;
                }
                refreshD();
                if (typeof callback === "function") {
                    callback(this.getBubbleSettings());
                }
            }
            return this;
        }
        this.getBubbleStyle = function () {
            return getCStyle(this.bubbleStyle);
        }
        this.show = function (callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'show', 'p': '', 'callback': callback });
            }
            else {
                this.off = false;
                refreshD();
                if (typeof callback === "function") {
                    callback(this.getBubbleSettings());
                }
            }
            return this;
        }
        this.hide = function (callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'hide', 'p': '', 'callback': callback });
            }
            else {
                this.off = true;
                refreshD();
                if (typeof callback === "function") {
                    callback(this.getBubbleSettings());
                }
            }
            return this;
        }
        this.isVisible = function () {
            return !this.off;
        }
        this.fadeIn = function (p, callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'fadeIn', 'p': p, 'callback': callback });
            }
            else {
                var bub = this, opc = bub.opacity, step = 0.02, stepn = opc / step, col = bub.color, r, g, b, op = 0, pt = 1000;
                if (typeof p !== "function") {
                    pt = p || 1000;
                    pt = parseInt(pt) < INTERVAL ? INTERVAL : parseInt(pt);
                }
                r = hexToR(col);
                g = hexToG(col);
                b = hexToB(col);
                bub.off = false;
                bub.opacity = 0;
                bub.color = "rgba(" + r + "," + g + "," + b + "," + 0 + ")";
                bub.action_in_progress = setInterval(function () {
                    if (bub.opacity + step <= opc) {
                        bub.opacity = bub.opacity + step;
                        op = op + ((100 / stepn) / 100);
                        if (op > 1) op = 1;
                        bub.color = "rgba(" + r + "," + g + "," + b + "," + op + ")";
                        refreshBubbles();
                    }
                    else {
                        bub.opacity = opc;
                        bub.color = col;
                        refreshBubbles();
                        clearInterval(bub.action_in_progress);
                        bub.action_in_progress = null;
                        executePostponed(bub);
                        if (typeof p === "function") {
                            p(bub.getBubbleSettings());
                        }
                        else {
                            if (typeof callback === "function") {
                                callback(bub.getBubbleSettings());
                            }
                        }
                    }
                }, pt / stepn);
            }
            return this;
        }
        this.fadeOut = function (p, callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'fadeOut', 'p': p, 'callback': callback });
            }
            else {
                var bub = this, opc = bub.opacity, step = 0.02, stepn = opc / step, col = bub.color, r, g, b, op = 1, pt = 1000;
                if (typeof p !== "function") {
                    pt = p || 1000;
                    pt = parseInt(pt) < INTERVAL ? INTERVAL : parseInt(pt);
                }
                r = hexToR(col);
                g = hexToG(col);
                b = hexToB(col);
                bub.action_in_progress = setInterval(function () {
                    if (bub.opacity - step >= 0) {
                        bub.opacity = bub.opacity - step;
                        op = op - ((100 / stepn) / 100);
                        if (op < 0) op = 0;
                        bub.color = "rgba(" + r + "," + g + "," + b + "," + op + ")";
                        refreshBubbles();
                    }
                    else {
                        bub.off = true;
                        bub.opacity = opc;
                        bub.color = col;
                        refreshBubbles();
                        clearInterval(bub.action_in_progress);
                        bub.action_in_progress = null;
                        executePostponed(bub);
                        if (typeof p === "function") {
                            p(bub.getBubbleSettings());
                        }
                        else {
                            if (typeof callback === "function") {
                                callback(bub.getBubbleSettings());
                            }
                        }
                    }
                }, pt / stepn);
            }
            return this;
        }
        this.moveTo = function (px, py, pt, callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'moveTo', 'px': px, 'py': py, 'pt': pt, 'callback': callback });
            }
            else {
                px = isNaN(parseInt(px)) ? this.x : parseInt(px);
                py = isNaN(parseInt(py)) ? this.y : parseInt(py);
                var a = Math.abs(px - this.x), b = Math.abs(py - this.y), ptm = 800;
                if (a > 0 || b > 0) {
                    var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)), c_now = 0;
                    if (typeof pt !== "function") {
                        if (pt == 'fastest') {
                            ptm = 0;
                        }
                        else if (pt == 'faster') {
                            ptm = 100;
                        }
                        else if (pt == 'fast') {
                            ptm = 300;
                        }
                        else if (pt == 'slow') {
                            ptm = 1600;
                        }
                        else if (pt == 'slower') {
                            ptm = 3000;
                        }
                        else if (pt == 'slowest') {
                            ptm = 6000;
                        }
                        else {
                            ptm = 800;
                        }
                    }
                    var bub = this, bubx = bub.x, buby = bub.y, step = c > 50 ? 10 : c / 5, stepn = c / step;
                    bub.action_in_progress = setInterval(function () {
                        if (c_now < c) {
                            if (c_now == 0) {
                                bub.lettersCoordinates = [];
                                refreshBubbles();
                            }
                            c_now = c_now + step;
                            var x_now = a / c * c_now;
                            var y_now = b / c * c_now;
                            if (px > bubx) {
                                x_now = bubx + x_now;
                                if (x_now > px) x_now = px;
                            }
                            else {
                                x_now = bubx - x_now;
                                if (x_now < px) x_now = px;
                            }
                            if (py > buby) {
                                y_now = buby + y_now;
                                if (y_now > py) y_now = py;
                            }
                            else {
                                y_now = buby - y_now;
                                if (y_now < py) y_now = py;
                            }
                            if (ptm == 0) {
                                x_now = px;
                                y_now = py;
                            }
                            x_now = Math.round(x_now);
                            y_now = Math.round(y_now);
                            var offset_x = x_now - bub.x;
                            var offset_y = y_now - bub.y;
                            bub.x = x_now;
                            bub.y = y_now;
                            if (bub.ellipse) {
                                bub['tailX' + bub.tailLocation] = bub['tailX' + bub.tailLocation] + offset_x;
                                bub['tailY' + bub.tailLocation] = bub['tailY' + bub.tailLocation] + offset_y;
                            }
                            refreshBubbles();
                        }
                        else {
                            bub.x = px;
                            bub.y = py;
                            bub.lettersCoordinates = [];
                            refreshBubbles();
                            clearInterval(bub.action_in_progress);
                            bub.action_in_progress = null;
                            executePostponed(bub);
                            if (typeof pt === "function") {
                                pt(bub.getBubbleSettings());
                            }
                            else {
                                if (typeof callback === "function") {
                                    callback(bub.getBubbleSettings());
                                }
                            }
                        }
                    }, ptm / stepn);
                }
            }
            return this;
        }
        this.pumpUp = function (pt, callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'pumpUp', 'pt': pt, 'callback': callback });
            }
            else {
                var bub = this, pw = bub.width, ph = bub.height, btl = bub.tailLocation, init_size = Math.ceil(pw < ph ? 0.05 * pw : 0.05 * ph) * 2, dist_w = pw - init_size, dist_h = ph - init_size, step_w = (btl > -1) ? (dist_w < 5 ? 2 : 5) : (dist_w < 5 ? 1 : 2), step_h = (btl > -1) ? (dist_h < 5 ? 2 : 5) : (dist_h < 5 ? 1 : 2), steps = 0, original_text = bub.txtarea.innerHTML, body_time = 20, b_x = bub.x, b_y = bub.y, bub_x = bub.x, bub_y = bub.y, bub_tx = bub['tailX' + btl], bub_ty = bub['tailY' + btl], dist_x = 0, dist_y = 0, step_x = 10, step_y = 10, steps0 = 0, pump_in_progress = null, tail_time = 5;
                bub.txtarea.innerHTML = '';
                bub.off = false;
                if (typeof pt !== "function") {
                    if (pt == 'fastest') {
                        body_time = 2;
                    }
                    else if (pt == 'faster') {
                        body_time = 7;
                    }
                    else if (pt == 'fast') {
                        body_time = 12;
                    }
                    else if (pt == 'slow') {
                        body_time = 30;
                    }
                    else if (pt == 'slower') {
                        body_time = 45;
                    }
                    else if (pt == 'slowest') {
                        body_time = 60;
                    }
                    else {
                        body_time = 20;
                    }
                }
                if (btl == 1) {
                    bub_x = bub.x + (dist_w / 2);
                    bub_tx = bub_tx - (init_size / 2);
                }
                else if (btl == 2) {
                    bub_x = bub.x + dist_w;
                    bub_tx = bub_tx - init_size;
                }
                else if (btl == 3) {
                    bub_y = bub.y + (dist_h / 2);
                    bub_ty = bub_ty - (init_size / 2);
                }
                else if (btl == 4) {
                    bub_x = bub.x + dist_w;
                    bub_y = bub.y + (dist_h / 2);
                    bub_tx = bub_tx - init_size;
                    bub_ty = bub_ty - (init_size / 2);
                }
                else if (btl == 5) {
                    bub_y = bub.y + dist_h;
                    bub_ty = bub_ty - init_size;
                }
                else if (btl == 6) {
                    bub_x = bub.x + (dist_w / 2);
                    bub_y = bub.y + dist_h;
                    bub_tx = bub_tx - (init_size / 2);
                    bub_ty = bub_ty - init_size;
                }
                else if (btl == 7) {
                    bub_x = bub.x + dist_w;
                    bub_y = bub.y + dist_h;
                    bub_tx = bub_tx - init_size;
                    bub_ty = bub_ty - init_size;
                }
                dist_x = bub_x - bub_tx;
                dist_y = bub_y - bub_ty;
                var x_direction = 0, y_direction = 0;
                if (dist_x > 0) {
                    x_direction = 1;
                }
                if (dist_x < 0) {
                    x_direction = -1;
                }
                if (dist_y > 0) {
                    y_direction = 1;
                }
                if (dist_y < 0) {
                    y_direction = -1;
                }
                dist_x = Math.abs(dist_x);
                dist_y = Math.abs(dist_y);
                if (dist_x <= 20) step_x = 5;
                if (dist_y <= 20) step_y = 5;
                if (dist_x <= 6) step_x = 2;
                if (dist_y <= 6) step_y = 2;
                if (dist_x < dist_y) {
                    steps0 = dist_y / step_y;
                }
                else {
                    steps0 = dist_x / step_x;
                }
                step_x = dist_x / steps0;
                step_y = dist_y / steps0;
                tail_time = body_time * 8 / steps0;
                if (btl > -1) {
                    bub.x = bub_tx;
                    bub.y = bub_ty;
                }
                bub.width = init_size;
                bub.height = init_size;
                bub.action_in_progress = setInterval(function () {
                    if ((bub.x == bub_x && bub.y == bub_y) || btl == -1) {
                        clearInterval(bub.action_in_progress);
                        bub.action_in_progress = null;
                        bub.x = bub_x;
                        bub.y = bub_y;
                        if (dist_w < dist_h) {
                            steps = Math.floor(dist_w / step_w);
                        }
                        else {
                            steps = Math.floor(dist_h / step_h);
                        }
                        step_w = dist_w / steps;
                        step_h = dist_h / steps;
                        pump_in_progress = setInterval(function () {
                            if (bub.width == pw && bub.height == ph) {
                                clearInterval(pump_in_progress);
                                pump_in_progress = null;
                                bub.x = b_x;
                                bub.y = b_y;
                                bub.txtarea.innerHTML = original_text;
                                executePostponed(bub);
                                if (typeof pt === "function") {
                                    pt(bub.getBubbleSettings());
                                }
                                else {
                                    if (typeof callback === "function") {
                                        callback(bub.getBubbleSettings());
                                    }
                                }
                            }
                            else {
                                if (bub.width <= pw - step_w) {
                                    if (btl == 1 || btl == 6) {
                                        bub.x = bub.x - (step_w / 2);
                                    }
                                    else if (btl == 2 || btl == 4 || btl == 7) {
                                        bub.x = bub.x - step_w;
                                    }
                                    bub.width = bub.width + step_w;
                                }
                                else {
                                    bub.width = pw;
                                    bub.x = b_x;
                                }
                                if (bub.height <= ph - step_h) {
                                    if (btl == 3 || btl == 4) {
                                        bub.y = bub.y - (step_h / 2);
                                    }
                                    else if (btl == 5 || btl == 6 || btl == 7) {
                                        bub.y = bub.y - step_h;
                                    }
                                    bub.height = bub.height + step_h;
                                }
                                else {
                                    bub.height = ph;
                                    bub.y = b_y;
                                }
                            }
                            refreshBubbles();
                        }, body_time);
                    }
                    else {
                        if (x_direction > 0) {
                            if (bub.x <= bub_x - step_x) {
                                bub.x = bub.x + step_x;
                            }
                            else {
                                bub.x = bub_x;
                            }
                        }
                        if (x_direction < 0) {
                            if (bub.x >= bub_x + step_x) {
                                bub.x = bub.x - step_x;
                            }
                            else {
                                bub.x = bub_x;
                            }
                        }
                        if (y_direction > 0) {
                            if (bub.y <= bub_y - step_y) {
                                bub.y = bub.y + step_y;
                            }
                            else {
                                bub.y = bub_y;
                            }
                        }
                        if (y_direction < 0) {
                            if (bub.y >= bub_y + step_y) {
                                bub.y = bub.y - step_y;
                            }
                            else {
                                bub.y = bub_y;
                            }
                        }
                        refreshBubbles();
                    }
                }, tail_time);
            }
            return this;
        }
        this.delay = function (p, callback) {
            var bub = this;
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'delay', 'p': p, 'callback': callback });
            }
            else {
                var pt = 1000;
                if (typeof p !== "function") {
                    pt = p || 1000;
                    pt = parseInt(pt) < INTERVAL ? INTERVAL : parseInt(pt);
                }
                bub.action_in_progress = setTimeout(function () {
                    bub.action_in_progress = null;
                    executePostponed(bub);
                    if (typeof p === "function") {
                        p(bub.getBubbleSettings());
                    }
                    else {
                        if (typeof callback === "function") {
                            callback(bub.getBubbleSettings());
                        }
                    }
                }, pt);
            }
            return this;
        }
        this.remove = function (callback) {
            if (this.action_in_progress) {
                this.postponed_actions.push({ 'f': 'remove', 'p': '', 'callback': callback });
                return this;
            }
            else {
                var bid = -1;
                for (var i = 0; i < bubbles.length; i++) {
                    if (this === bubbles[i]) bid = i;
                }
                if (bid > -1) {
                    if (document.getElementById(this.txtarea.id)) cbCanvasWrapper.removeChild(this.txtarea);
                    bubbles.splice(bid, 1);
                }
                refreshBubbles();
                if (typeof callback === "function") {
                    callback({ "bubbleState": "removed" });
                }
            }
        }
        this.onMouseEvent = function (callback, evt) {
            if (typeof callback === "function") {
                evt = evt || "click";
                var evts = evt.split(",");
                for (var i = 0; i < evts.length; i++) {
                    var e = evts[i].trim();
                    if (e == "click" || e == "mousedown" || e == "mouseup" || e == "mouseover" || e == "mouseout") {
                        if (!document.getElementById(this.txtarea.id)) cbCanvasWrapper.appendChild(this.txtarea);
                        this.txtarea.className = "cb-bubble-field clickable";
                        this.txtarea["on" + e] = function (event) {
                            event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
                            callback();
                        }
                    }
                }
            }
            return this;
        }
        this.offMouseEvent = function (callback, evt) {
            evt = evt || "click";
            var evts = evt.split(",");
            for (var i = 0; i < evts.length; i++) {
                var e = evts[i].trim();
                if (e == "click" || e == "mousedown" || e == "mouseup" || e == "mouseover" || e == "mouseout") {
                    this.txtarea.className = "cb-bubble-field";
                    this.txtarea["on" + e] = ""
                    if (typeof callback === "function") callback();
                }
            }
            return this;
        }
        this.getBubbleSettings = function () {
            return { "id": this.id, "name": this.getName(), "text": this.getText(), "x": this.getX(), "y": this.getY(), "width": this.getWidth(), "height": this.getHeight(), "fontFamily": this.getFontFamily(), "fontSize": this.getFontSize(), "fontStyle": this.getFontStyle(), "fontWeight": this.getFontWeight(), "textAlign": this.getTextAlign(), "lineHeight": this.getLineHeight(), "background": this.getBackground(), "color": this.getColor(), "opacity": this.getOpacity(), "readonly": this.isReadonly(), "settable": this.isSettable(), "visible": this.isVisible(), "bubbleStyle": getCStyle(this.bubbleStyle), "tailLocation": getTLocation(this.tailLocation), "tailX": this['tailX' + this.tailLocation], "tailY": this['tailY' + this.tailLocation] };
        }
    }

    function changeId(bub, new_id) {
        var valid_id = (new_id && new_id != "") ? true : false;
        if (valid_id) {
            for (var i = 0; i < bubbles.length; i++) {
                if (bubbles[i].id == new_id) valid_id = false;
            }
            if (valid_id) bub.id = new_id;
        }
        if (!valid_id) console.log('Bubble id cannot be changed');
        return valid_id;
    }

    function adjustSize(bub) {
        if (bub.autoWidth || bub.autoHeight) {
            var auto_size = autoSize(bub);
            if (bub.autoWidth) bub.width = auto_size.width;
            if (bub.autoHeight) bub.height = auto_size.height;
        }
    }
    function autoSize(bub) {
        var aw = (bub.autoWidth) ? 'auto' : bub.width + 'px';
        var ah = (bub.autoHeight) ? 'auto' : bub.height + 'px';
        tempPInDOM(true);
        tempP.style.cssText = getTextStyle(bub.fontFamily, bub.fontSize, bub.fontStyle, bub.fontWeight, null, '-9999px', '-9999px', aw, ah, 'hidden', bub.textAlign, bub.lineHeight);
        tempP.innerHTML = bub.txtarea.innerHTML;
        var w = parseInt(tempP.offsetWidth + 2);
        if (w < MINSIZE) w = MINSIZE;
        var h = parseInt(tempP.offsetHeight);
        if (h < MINSIZE) h = MINSIZE;
        return { 'width': w, 'height': h };
    }

    function isIE() {
        var ua = window.navigator.userAgent, old_ie = ua.indexOf('MSIE '), new_ie = ua.indexOf('Trident/');
        if ((old_ie > -1) || (new_ie > -1)) {
            return true;
        }
        else {
            return false;
        }
    }

    function bubbleTail() {
        this.x = 0;
        this.y = 0;
    }

    function executePostponed(bub) {
        for (var i = 0; i < bub.postponed_actions.length; i++) {
            var f = bub.postponed_actions[i].f;
            var c = bub.postponed_actions[i].callback || 0;
            if (f == "moveTo") {
                var px = bub.postponed_actions[i].px;
                var py = bub.postponed_actions[i].py;
                var pt = bub.postponed_actions[i].pt;
                bub.postponed_actions.splice(0, i + 1);
                bub[f](px, py, pt, c);
                break;
            }
            else if (f == "pumpUp") {
                var pt = bub.postponed_actions[i].pt;
                bub.postponed_actions.splice(0, i + 1);
                bub[f](pt, c);
                break;
            }
            else {
                var p = bub.postponed_actions[i].p;
                if (f == "fadeIn" || f == "fadeOut" || f == "delay") bub.postponed_actions.splice(0, i + 1);
                if (p == "") {
                    bub[f](c);
                }
                else {
                    bub[f](p, c);
                }
                if (f == "fadeIn" || f == "fadeOut" || f == "delay") break;
            }
        }
    }

    function getDefaultTailX(bub) {
        var tailX = 0;
        switch (bub.tailLocation) {
            case 0:
                tailX = bub.x - 60;
                break;
            case 1:
                tailX = bub.x + bub.width / 2;
                break;
            case 2:
                tailX = bub.x + bub.width + 60;
                break;
            case 3:
                tailX = bub.x - 80;
                break;
            case 4:
                tailX = bub.x + bub.width + 80;
                break;
            case 5:
                tailX = bub.x - 60;
                break;
            case 6:
                tailX = bub.x + bub.width / 2;
                break;
            case 7:
                tailX = bub.x + bub.width + 60;
                break;
        }
        return tailX;
    }
    function getDefaultTailY(bub) {
        var tailY = 0;
        switch (bub.tailLocation) {
            case 0:
                tailY = bub.y - 60;
                break;
            case 1:
                tailY = bub.y - 80;
                break;
            case 2:
                tailY = bub.y - 60;
                break;
            case 3:
                tailY = bub.y + bub.height / 2;
                break;
            case 4:
                tailY = bub.y + bub.height / 2;
                break;
            case 5:
                tailY = bub.y + bub.height + 60;
                break;
            case 6:
                tailY = bub.y + bub.height + 80;
                break;
            case 7:
                tailY = bub.y + bub.height + 60;
                break;
        }
        return tailY;
    }

    function resetBubbleCanvas() {
        //cbCanvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
        if (textDrawing) {
            var textareas = cbCanvasWrapper.getElementsByClassName("cb-bubble-field");
            if (textareas.length > 0) {
                for (var i = 0; i < textareas.length; i++) {
                    if (textareas[i].id != elementID + '-temp-bubble-container') cbCanvasWrapper.removeChild(textareas[i]);
                }
            }
        }
        if (settingsBox.parentNode !== null) {
            settingsBox.className = "cb-settings";
            cbCanvasWrapper.removeChild(settingsBox);
            document.getElementById(elementID + '-comic-bubbles-wrapper').style.overflow = 'hidden';
        }
    }

    function getTNumber(t) {
        var tail = 7;
        switch (t) {
            case 'nw':
                tail = 0;
                break;
            case 'n':
                tail = 1;
                break;
            case 'ne':
                tail = 2;
                break;
            case 'w':
                tail = 3;
                break;
            case 'e':
                tail = 4;
                break;
            case 'sw':
                tail = 5;
                break;
            case 's':
                tail = 6;
                break;
            case 'se':
                tail = 7;
                break;
        }
        return tail;
    }
    function getTLocation(t) {
        var tail;
        switch (t) {
            case 0:
                tail = 'nw';
                break;
            case 1:
                tail = 'n';
                break;
            case 2:
                tail = 'ne';
                break;
            case 3:
                tail = 'w';
                break;
            case 4:
                tail = 'e';
                break;
            case 5:
                tail = 'sw';
                break;
            case 6:
                tail = 's';
                break;
            case 7:
                tail = 'se';
                break;
        }
        return tail;
    }

    function getCSNumber(st) {
        var tstyle = -1;
        if (st.toLowerCase() == "speak") {
            tstyle = 0;
        }
        else if (st.toLowerCase() == "think") {
            tstyle = 1;
        }
        else if (st.toLowerCase() == "scream") {
            tstyle = 2;
        }
        else if (st.toLowerCase() == "arrow") {
            tstyle = 3;
        }
        return tstyle;
    }
    function getCStyle(st) {
        var tstyle = 'none';
        if (st == 0) {
            tstyle = 'speak';
        }
        else if (st == 1) {
            tstyle = 'think';
        }
        else if (st == 2) {
            tstyle = 'scream';
        }
        else if (st == 3) {
            tstyle = 'arrow';
        }
        return tstyle;
    }

    function addEditor() {
        var ed_err = false;
        if (typeof ComicBubblesEditor !== 'undefined' && typeof ComicBubblesEditor === "function") {
            try {
                editor = new ComicBubblesEditor(cb, cbCanvasWrapper, cbCanvas, cbCanvasContext, canvasWidth, canvasHeight, bubbles, settingsBox, common_fonts, colors140, touchy, tails, tailSize, tailMargin, MINSIZE, line_heights);
                editor.Settings(function () { editor.setEventListeners(true); });
            }
            catch (err) {
                editor = null;
                ed_err = true;
                console.log('ComicBubblesEditorError: ' + err);
            }
        }
        else {
            ed_err = true;
            console.log('ComicBubblesEditor doesn\'t exist');
        }
        if (ed_err) {
            readonly = true;
            for (var i = 0; i < bubbles.length; i++) {
                bubbles[i].readonly = true;
            }
        }
    }

    function setParameter(par, val, bub) {
        var p = parseInt(val) || 0, par_set = false;
        switch (par) {
            case 'x':
                if (p >= 0 && p < canvasWidth) {
                    bub.x = p;
                    par_set = true;
                }
                break;
            case 'y':
                if (p >= 0 && p < canvasHeight) {
                    bub.y = p;
                    par_set = true;
                }
                break;
            case 'width':
                if (p >= MINSIZE && p <= canvasWidth) {
                    if (bub) {
                        bub.width = p;
                        par_set = true;
                    }
                    else {
                        bubbleWidth = p;
                    }
                }
                break;
            case 'height':
                if (p >= MINSIZE && p <= canvasHeight) {
                    if (bub) {
                        bub.height = p;
                        par_set = true;
                    }
                    else {
                        bubbleHeight = p;
                    }
                }
                break;
            case 'opacity':
                var p2 = isNaN(parseFloat(val)) ? 1 : parseFloat(val);
                if (p2 >= 0 && p2 <= 1) {
                    if (bub) {
                        bub.opacity = p2;
                    }
                    else {
                        opacity = p2;
                    }
                }
                else {
                    if (bub) {
                        bub.opacity = 1;
                    }
                    else {
                        opacity = 1;
                    }
                }
                par_set = true;
                break;
            case 'tailX':
                if (bub.tailLocation > -1 && bub.tailLocation < 8) {
                    var p2 = isNaN(parseFloat(val)) ? -1 : parseFloat(val);
                    if (p2 >= 0 && p2 < canvasWidth) {
                        bub['tailX' + bub.tailLocation] = p2;
                        par_set = true;
                    }
                }
                break;
            case 'tailY':
                if (bub.tailLocation > -1 && bub.tailLocation < 8) {
                    var p2 = isNaN(parseFloat(val)) ? -1 : parseFloat(val);
                    if (p2 >= 0 && p2 < canvasHeight) {
                        bub['tailY' + bub.tailLocation] = p2;
                        par_set = true;
                    }
                }
                break;
            case 'readonly':
                if ((typeof (val) === "boolean" && val) || val == 1) {
                    if (bub) {
                        bub.readonly = true;
                        bub.txtarea.contentEditable = false;
                        par_set = true;
                    }
                    else {
                        readonly = true
                    }
                }
                else if ((typeof (val) === "boolean" && !val) || val == 0) {
                    if (bub) {
                        bub.readonly = false;
                        bub.txtarea.contentEditable = true;
                        par_set = true;
                    }
                    else {
                        readonly = false
                    }
                }
                var read_only = readonly;
                for (var i = 0; i < bubbles.length; i++) {
                    if (!bubbles[i].readonly) read_only = false;
                }
                if (readonly && read_only) {
                    if (cb.events_added && editor) editor.setEventListeners(false);
                }
                else {
                    if (!cb.events_added) {
                        addEditor();
                    }
                }
                break;
            case 'settable':
                if ((typeof (val) === "boolean" && val) || val == 1) {
                    if (bub) {
                        bub.settable = true;
                        par_set = true;
                    }
                    else {
                        settable = true;
                    }
                }
                else if ((typeof (val) === "boolean" && !val) || val == 0) {
                    if (bub) {
                        bub.settable = false;
                        par_set = true;
                    }
                    else {
                        settable = false;
                    }
                }
                break;
            case 'visible':
                if ((typeof (val) === "boolean" && val) || val == 1) {
                    bub.off = false;
                    par_set = true;
                }
                else if ((typeof (val) === "boolean" && !val) || val == 0) {
                    bub.off = true;
                    par_set = true;
                }
                break;
        }
        return par_set;
    }

    function outputBubbleSettings(bub) {
        var txt = bub.consoleText.replace(/<br>/gi, '\n');
        var b_settings = "id: '" + bub.id + "'";
        if (bub.name != "") b_settings += ", name: '" + bub.name + "'";
        b_settings += ", text: " + JSON.stringify(txt) + ", x: " + bub.x + ", y: " + bub.y;
        if (!autoWidth) {
            if (bub.autoWidth) {
                b_settings += ", width: 'auto'";
            }
            else {
                if (bub.width != defaults['bubbleWidth']) b_settings += ", width: " + bub.width;
            }
        }
        else {
            if (!bub.autoWidth) b_settings += ", width: " + bub.width;
        }
        if (!autoHeight) {
            if (bub.autoHeight) {
                b_settings += ", height: 'auto'";
            }
            else {
                if (bub.height != defaults['bubbleHeight']) b_settings += ", height: " + bub.height;
            }
        }
        else {
            if (!bub.autoHeight) b_settings += ", height: " + bub.height;
        }
        if (bub.fontFamily != defaults['fontFamily']) {
            var fam = bub.fontFamily.split(",")[0];
            fam = fam.replace(/\"/g, '');
            b_settings += ", fontFamily: '" + fam + "'";
        }
        if (bub.fontSize != defaults['fontSize'])
            b_settings += ", fontSize: '" + bub.fontSize + "'";
        if (bub.fontStyle != defaults['fontStyle'])
            b_settings += ", fontStyle: '" + bub.fontStyle + "'";
        if (bub.fontWeight != defaults['fontWeight'])
            b_settings += ", fontWeight: '" + bub.fontWeight + "'";
        if (bub.textAlign != defaults['textAlign'])
            b_settings += ", textAlign: '" + bub.textAlign + "'";
        if (bub.lineHeight != defaults['lineHeight'])
            b_settings += ", lineHeight: " + bub.lineHeight;
        if (bub.fill != defaults['bgColor'])
            b_settings += ", background: '" + bub.fill + "'";
        if (bub.color != defaults['txtColor'])
            b_settings += ", color: '" + bub.color + "'";
        if (bub.opacity != defaults['opacity'])
            b_settings += ", opacity: " + bub.opacity;
        if (bub.readonly != defaults['readonly'])
            b_settings += ", readonly: " + bub.readonly;
        if (bub.settable != defaults['settable'])
            b_settings += ", settable: " + bub.settable;
        if (bub.off == true)
            b_settings += ", visible: " + !bub.off;
        if (bub.bubbleStyle > -1 && bub.tailLocation > -1) {
            if (bub.bubbleStyle != defaults['bubbleStyle']) b_settings += ", bubbleStyle: '" + getCStyle(bub.bubbleStyle) + "'";
            b_settings += ", tailLocation: '" + getTLocation(bub.tailLocation) + "', tailX: " + bub['tailX' + bub.tailLocation] + ", tailY: " + bub['tailY' + bub.tailLocation];
        }
        all_bubble_settings = all_bubble_settings + "<span style='white-space: pre-wrap !important;'>{" + b_settings + "}</span>,<br>";
    }

    function updateConsole() {
        if (myconsole) {
            clearTimeout(console_update);
            console_update = setTimeout(function () {
                all_bubble_settings = "";
                var l = bubbles.length, br_l = "", br_r = "", b = "", cnv = "";
                for (var key in defaults) {
                    if (defaults.hasOwnProperty(key)) {
                        var k = key.replace("bubbleWidth", "width").replace("bubbleHeight", "height").replace("bgColor", "background").replace("txtColor", "color");
                        if ((k == "width" && autoWidth) || (k == "height" && autoHeight)) {
                            cnv += k + ": 'auto', ";
                        }
                        else {
                            if (defaults[key] != presets[key]) {
                                var val = defaults[key];
                                if (k == "bubbleStyle") val = getCStyle(val);
                                if (k == "fontFamily") {
                                    val = val.split(",")[0];
                                    val = val.replace(/\"/g, '');
                                }
                                if (k != "lineHeight" && k != "text" && k != "opacity" && k != "readonly" && k != "settable" && k != "visible") val = "'" + val + "'";
                                if (k == "text") val = JSON.stringify(val.replace(/<br>/gi, '\n'));
                                cnv += k + ": " + val + ", ";
                            }
                        }
                    }
                }
                if (cnv != "") cnv = ", {canvas: {" + cnv.substr(0, (cnv.length - 2)) + "}}";
                for (var i = 0; i < l; i++) {
                    outputBubbleSettings(bubbles[i]);
                }
                if (l > 1) {
                    br_l = "[";
                    br_r = "]";
                }
                if (all_bubble_settings != "") b = ', {bubble: ' + br_l + '<br>' + all_bubble_settings.slice(0, -5) + '<br>' + br_r + '}';
                myconsole.innerHTML = 'new ComicBubbles("' + elementID + '"' + cnv + b + ');';
            }, 500);
        }
        if (cb.bubbleStateChanged && editor) {
            if (!cb.png_in_progress) editor.bStateChanged();
        }
    }
    this.updateConsole = function () {
        updateConsole();
    }
    this.edi = function () {
        return editor;
    }

    function refreshBubbles() {
        if (!cb.mousePressed) {
            setTimeout(function () {
                if (!cb.mousePressed) clearInterval(refresh);
            }, 3000);
        }
        textDrawingCount = 0;
        if (txtareatimeout == null && cbCanvasContext != null) {
            resetBubbleCanvas();
            var l = bubbles.length;
            for (var i = 0; i < l; i++) {
                bubbles[i].draw(i);
                if (selectionID != i) bubbles[i].txtarea.style.pointerEvents = "none";
            }
            if (!cb.mousePressed) {
                clearInterval(refresh);
            }
            if (selectionID > -1) {
                bubbles[selectionID].drawSelectedBubble(selectionID, 1);
            }
            else {
                if (!cb.mousePressed && !textDrawing) {
                    var fragment = document.createDocumentFragment();
                    for (var i = 0; i < l; i++) {
                        bubbles[i].txtarea.style.pointerEvents = "none";
                        if (bubbles[i].readonly) bubbles[i].txtarea.style.pointerEvents = "auto";
                        if (!document.getElementById(bubbles[i].txtarea.id)) fragment.appendChild(bubbles[i].txtarea);
                    }
                    cbCanvasWrapper.appendChild(fragment);
                }
            }
            updateConsole();
        }
        clearTimeout(delayed_temp_removal);
        delayed_temp_removal = setTimeout(function () {
            tempPInDOM(false);
        }, 500);
    }
    this.refreshBubbles = function () {
        refreshBubbles();
    }

    function tempPInDOM(DOM) {
        var inDOM = document.getElementById(elementID + '-temp-bubble-container');
        if (DOM && !inDOM) cbCanvasWrapper.appendChild(tempP);
        if (!DOM && inDOM) {
            try { tempP.parentNode.removeChild(tempP); }
            catch (err) { }
        }
    }

    function refreshD() {
        selectionAndSettingsAllowed = false;
        clearTimeout(delayed_refresh);
        delayed_refresh = setTimeout(function () {
            refreshBubbles();
        }, 10);
    }

    function refreshBubbleCanvas(active) {
        clearInterval(refresh);
        if (active) {
            refresh = setInterval(refreshBubbles, INTERVAL);
        }
    }
    this.refreshBubbleCanvas = function (active) {
        refreshBubbleCanvas(active);
    }

    this.drawBubble = function () {
        var newBubble = new Bubble();
        bubbles.push(newBubble);
        var _id = new Date().getTime() + bubbles.length;
        newBubble.id = 'b' + _id;
        newBubble.txtarea.id = elementID + '-' + _id;
        newBubble.autoWidth = false;
        newBubble.autoHeight = false;
        if (ellipse) {
            newBubble.tailLocation = getTNumber("se");
            newBubble['tailX' + newBubble.tailLocation] = getDefaultTailX(newBubble);
            newBubble['tailY' + newBubble.tailLocation] = getDefaultTailY(newBubble);
        }
        cbCanvas.style.cursor = "auto";
        selectionID = bubbles.length - 1;
    }
    this.enableTextDrawing = function () {
        textDrawing = true;
    }
    this.disableTextDrawing = function () {
        textDrawing = false;
    }
    this.isTextDrawn = function () {
        return textDrawing;
    }
    this.getBubbleById = function (bubble_id) {
        var l = bubbles.length, bubble = null;
        for (var i = 0; i < l; i++) {
            if (bubbles[i].id == bubble_id) {
                bubble = bubbles[i];
                break;
            }
        }
        if (bubble !== null) {
            return bubble;
        }
        else {
            console.log("Bubble " + bubble_id + " doesn't exist");
            return new Bubble();
        }
    }
    this.getBubblesByName = function (bubble_name) {
        var l = bubbles.length, selection = [];
        for (var i = 0; i < l; i++) {
            if (bubbles[i].name == bubble_name)
                selection.push(bubbles[i]);
        }
        return selection;
    }
    this.getAllBubbles = function () {
        return bubbles;
    }
    this.addBubble = function (v, callback) {
        var bid = "";
        if (typeof v === "object" && 'id' in v) {
            for (var i = 0; i < bubbles.length; i++) {
                if (bubbles[i].id == v.id) bid = i;
            }
        }
        if (bid == "") {
            var addedBubble = setNewBubble(v);
            if (typeof callback === "function") {
                if (bubbles.indexOf(addedBubble) > -1) {
                    callback(addedBubble.getBubbleSettings());
                }
                else {
                    callback("new bubble error");
                }
            }
            setTimeout(function () { refreshBubbles(); }, 50);
            return addedBubble;
        }
        else {
            if (typeof callback === "function") {
                callback("bubble " + v.id + " already exists");
            }
            return bubbles[bid];
        }
    }
    this.setText = function (p) {
        defaults['text'] = defaultText = textToHtml(p);
        return this;
    }
    this.getText = function () {
        return defaultText.replace(/<br>/gi, '\n').replace(/&nbsp;/g, ' ');
    }
    this.setWidth = function (p) {
        if (p == "auto") {
            autoWidth = true;
        }
        else {
            autoWidth = false;
            setParameter('width', p, null);
            defaults['bubbleWidth'] = bubbleWidth;
        }
        return this;
    }
    this.getWidth = function () {
        return defaults['bubbleWidth'];
    }
    this.setHeight = function (p) {
        if (p == "auto") {
            autoHeight = true;
        }
        else {
            autoHeight = false;
            setParameter('height', p, null);
            defaults['bubbleHeight'] = bubbleHeight;
        }
        return this;
    }
    this.getHeight = function () {
        return defaults['bubbleHeight'];
    }
    this.setFontFamily = function (p) {
        fontFamily = getVerifiedFontFamily(p);
        if (arguments.length == 1) defaults['fontFamily'] = fontFamily;
        return this;
    }
    this.getFontFamily = function () {
        return defaults['fontFamily'];
    }
    this.setFontSize = function (p) {
        fontSize = getVerifiedFontSize(p);
        if (arguments.length == 1) defaults['fontSize'] = fontSize;
        return this;
    }
    this.getFontSize = function () {
        return parseInt(defaults['fontSize']);
    }
    this.setFontStyle = function (p) {
        fontStyle = getVerifiedFontStyle(p);
        if (arguments.length == 1) defaults['fontStyle'] = fontStyle;
        return this;
    }
    this.getFontStyle = function () {
        return defaults['fontStyle'];
    }
    this.setFontWeight = function (p) {
        fontWeight = getVerifiedFontWeight(p);
        if (arguments.length == 1) defaults['fontWeight'] = fontWeight;
        return this;
    }
    this.getFontWeight = function () {
        return defaults['fontWeight'];
    }
    this.setTextAlign = function (p) {
        textAlign = getVerifiedTextAlign(p);
        if (arguments.length == 1) defaults['textAlign'] = textAlign;
        return this;
    }
    this.getTextAlign = function () {
        return defaults['textAlign'];
    }
    this.setLineHeight = function (p) {
        lineHeight = getVerifiedLineHeight(p);
        if (arguments.length == 1) defaults['lineHeight'] = lineHeight;
        return this;
    }
    this.getLineHeight = function () {
        return defaults['lineHeight'];
    }
    this.setBackground = function (p) {
        bgColor = getVerifiedColor(p) || bgColor;
        if (arguments.length == 1) defaults['bgColor'] = bgColor;
        return this;
    }
    this.getBackground = function () {
        return defaults['bgColor'];
    }
    this.setColor = function (p) {
        txtColor = getVerifiedColor(p) || txtColor;
        if (arguments.length == 1) defaults['txtColor'] = txtColor;
        return this;
    }
    this.getColor = function () {
        return defaults['txtColor'];
    }
    this.setOpacity = function (p) {
        setParameter('opacity', p, null);
        if (arguments.length == 1) defaults['opacity'] = opacity;
        return this;
    }
    this.getOpacity = function () {
        return defaults['opacity'];
    }
    this.setReadonly = function (p) {
        setParameter('readonly', p, null);
        defaults['readonly'] = readonly;
        return this;
    }
    this.isReadonly = function () {
        return defaults['readonly'];
    }
    this.setSettable = function (p) {
        setParameter('settable', p, null);
        defaults['settable'] = settable;
        return this;
    }
    this.isSettable = function () {
        return defaults['settable'];
    }
    this.setBubbleStyle = function (p) {
        var bsn = getCSNumber(p);
        if (bsn != -1) {
            ellipse = true;
        }
        defaults['bubbleStyle'] = bubbleStyle = bsn;
    }
    this.getBubbleStyle = function () {
        return getCStyle(defaults['bubbleStyle']);
    }
    this.getDefaultSettings = function () {
        return { "text": this.getText(), "width": this.getWidth(), "height": this.getHeight(), "fontFamily": this.getFontFamily(), "fontSize": this.getFontSize(), "fontStyle": this.getFontStyle(), "fontWeight": this.getFontWeight(), "textAlign": this.getTextAlign(), "lineHeight": this.getLineHeight(), "background": this.getBackground(), "color": this.getColor(), "opacity": this.getOpacity(), "readonly": this.isReadonly(), "settable": this.isSettable() };
    }
    this.getBID = function () {
        return selectionID;
    }
    this.setBID = function (id) {
        selectionID = id;
    }
    this.getTextDrawingCount = function () {
        return textDrawingCount;
    }
    this.enableEditing = function () {
        selectionAndSettingsAllowed = true;
    }
    this.onBubbleStateChange = function (callback) {
        if (typeof callback === "function") {
            cb.bubbleStateChanged = callback;
        }
        return this;
    }
    this.applyStyleToChild = function (bu) {
        var el = bu.txtarea.getElementsByTagName('div');
        if (el.length == 0) el = bu.txtarea.getElementsByTagName('p');
        var bub_styles = getComputedStyle(bu.txtarea, null);
        for (var i = 0; i < el.length; i++) {
            var el_styles = getComputedStyle(el[i], null);
            if (el_styles.getPropertyValue('color') != bub_styles.getPropertyValue('color')) {
                el[i].style.color = bu.txtarea.style.color;
            }
            if (el_styles.getPropertyValue('font-family') != bub_styles.getPropertyValue('font-family')) {
                el[i].style.fontFamily = bu.txtarea.style.fontFamily;
            }
            if (el_styles.getPropertyValue('font-size') != bub_styles.getPropertyValue('font-size')) {
                el[i].style.fontSize = bu.txtarea.style.fontSize;
            }
            if (el_styles.getPropertyValue('font-style') != bub_styles.getPropertyValue('font-style')) {
                el[i].style.fontStyle = bu.txtarea.style.fontStyle;
            }
            if (el_styles.getPropertyValue('font-weight') != bub_styles.getPropertyValue('font-weight')) {
                el[i].style.fontWeight = bu.txtarea.style.fontWeight;
            }
            if (el_styles.getPropertyValue('text-align') != bub_styles.getPropertyValue('text-align')) {
                el[i].style.textAlign = bu.txtarea.style.textAlign;
            }
            if (el_styles.getPropertyValue('line-height') != bub_styles.getPropertyValue('line-height')) {
                el[i].style.lineHeight = bu.txtarea.style.lineHeight;
            }
            if (el_styles.getPropertyValue('text-transform') != bub_styles.getPropertyValue('text-transform')) {
                el[i].style.textTransform = bu.txtarea.style.textTransform;
            }
        }
    }
    this.getBubblesData = function () {
        var ro = cb.isReadonly();
        if (!editor) {
            cb.setReadonly(false);
            if (ro) cb.setReadonly(ro);
        }
        if (editor) {
            return editor.getBubbles(cb_element);
        }
        else {
            return "";
        }
    }

    function prepareBubbleCanvas() {
        cb_element = document.getElementById(elementID);
        if (!cb_element) throw "Element doesn't exist";

        cbCanvasWrapper = document.createElement('div');
        cbCanvasWrapper.id = elementID + '-comic-bubbles-wrapper';
        cbCanvasWrapper.className = 'comic-bubbles-wrapper';
        document.body.appendChild(cbCanvasWrapper);

        cbCanvas = cb_element;
        canvasWidth = cb_element.width;
        canvasHeight = cb_element.height;

        cbCanvasContext = cbCanvas.getContext('2d');
        cbCanvasContext.font = fontStyle + " " + fontWeight + " " + fontSize + " " + fontFamily;
        for (var i = 0; i < 9; i++) {
            var tail = new bubbleTail();
            tails.push(tail);
        }
        refreshBubbleCanvas(true);
        tempP = document.createElement('p');
        tempP.style.cssText = getTextStyle(null, null, null, null, null, '-9999px', '-9999px', 'auto', 'auto', 'hidden', 'center');
        tempP.style.visibility = 'hidden';
        tempP.id = elementID + '-temp-bubble-container';
        tempP.className = 'cb-bubble-field';
        tempPInDOM(true);
        if ('pointerEvents' in tempP.style) pointer_events = true;
        var styleElement = document.getElementById('comic-bubbles-style');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            styleElement.id = 'comic-bubbles-style';
            document.getElementsByTagName('head')[0].appendChild(styleElement);
            var styles = '.comic-bubbles-wrapper .cb-bubble-field { -moz-box-sizing: border-box !important; -webkit-box-sizing: border-box !important; box-sizing: border-box !important; padding: 1px; line-height: normal; -webkit-user-select: auto; }\n';
            styles += '.comic-bubbles-wrapper .cb-bubble-field .wrap { display: inline !important; position: static !important; margin: 0 !important; padding: 0 !important; border: 0 !important; text-transform: inherit !important; font-family: inherit !important; font-size: inherit !important; font-style: inherit !important; font-weight: inherit !important; }\n';
            styles += '.comic-bubbles-wrapper .cb-bubble-field p, .comic-bubbles-wrapper .cb-bubble-field div { margin: 0 !important; padding: 0 !important; background: transparent !important; line-height: inherit; font-family: inherit; font-size: inherit; font-style: inherit; font-weight: inherit; text-align: inherit; }\n';
            styles += '.comic-bubbles-wrapper .cb-bubble-field.clickable { cursor: pointer; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }\n';
            styles += '.comic-bubbles-wrapper, .comic-bubbles-wrapper img { -khtml-user-select: none; -o-user-select: none; -moz-user-select: none; -webkit-user-select: none; user-select: none; }\n';
            styles += '.comic-bubbles-output { font-family: Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New; }\n';
            styleElement.appendChild(document.createTextNode(styles));
        }
    }

    function makeBubbleCanvas() {
        cb_element = document.getElementById(elementID);
        if (!cb_element) throw "Element doesn't exist";
        canvasWidth = cb_element.width;
        canvasHeight = cb_element.height;
        //canvasWidth = cb_element.offsetWidth;
        //canvasHeight = cb_element.offsetHeight;
        cbCanvasWrapper = document.createElement('div');
        cbCanvasWrapper.id = elementID + '-comic-bubbles-wrapper';
        cbCanvasWrapper.className = 'comic-bubbles-wrapper';
        var po = "relative", le = 0, ri = "auto", to = 0, bo = "auto", fl = "none", ml = 0, mr = 0, mt = 0, mb = 0;
        if (window.getComputedStyle) {
            po = cssValue(cb_element, 'position');
            le = cssValue(cb_element, 'left');
            ri = cssValue(cb_element, 'right');
            to = cssValue(cb_element, 'top');
            bo = cssValue(cb_element, 'bottom');
            fl = cssValue(cb_element, 'float');
            ml = cssValue(cb_element, 'margin-left');
            mr = cssValue(cb_element, 'margin-right');
            mt = cssValue(cb_element, 'margin-top');
            mb = cssValue(cb_element, 'margin-bottom');
            if (po == "static") po = "relative";
            cb_element.style.position = 'static';
            cb_element.style.marginLeft = 0;
            cb_element.style.marginRight = 0;
            cb_element.style.marginTop = 0;
            cb_element.style.marginBottom = 0;
        }
        cbCanvasWrapper.style.cssText = 'width: ' + canvasWidth + 'px !important; height: ' + canvasHeight + 'px !important; float: ' + fl + ' !important; position: ' + po + ' !important; right: ' + ri + ' !important; bottom: ' + bo + ' !important; left: ' + le + ' !important; top: ' + to + ' !important; display: inline-block !important; visibility: visible !important; border: 0; padding: 0 !important; overflow: hidden; margin-left: ' + ml + ' !important; margin-right: ' + mr + ' !important; margin-top: ' + mt + ' !important; margin-bottom: ' + mb + ' !important';
        cb_parent = cb_element.parentNode;
        cb_parent.insertBefore(cbCanvasWrapper, cb_element);
        cbCanvasWrapper.appendChild(cb_element);
        cbCanvas = document.createElement('canvas');
        cbCanvas.id = elementID + '-comic-bubbles';
        cbCanvas.width = canvasWidth;
        cbCanvas.height = canvasHeight;
        cbCanvas.style.cssText = 'width: auto !important; height: auto !important; position: absolute !important; right: auto !important; bottom: auto !important; left: 0 !important; top: 0 !important; display: block !important; visibility: visible !important; border: 0 !important; margin: 0 !important; padding: 0 !important';
        if (touchy) {
            tailSize = 22;
            tailMargin = 2;
        }
        cbCanvasWrapper.appendChild(cbCanvas);
        cbCanvasContext = cbCanvas.getContext('2d');
        cbCanvasContext.font = fontStyle + " " + fontWeight + " " + fontSize + " " + fontFamily;
        for (var i = 0; i < 9; i++) {
            var tail = new bubbleTail();
            tails.push(tail);
        }
        refreshBubbleCanvas(true);
        tempP = document.createElement('p');
        tempP.style.cssText = getTextStyle(null, null, null, null, null, '-9999px', '-9999px', 'auto', 'auto', 'hidden', 'center');
        tempP.style.visibility = 'hidden';
        tempP.id = elementID + '-temp-bubble-container';
        tempP.className = 'cb-bubble-field';
        tempPInDOM(true);
        if ('pointerEvents' in tempP.style) pointer_events = true;
        var styleElement = document.getElementById('comic-bubbles-style');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            styleElement.id = 'comic-bubbles-style';
            document.getElementsByTagName('head')[0].appendChild(styleElement);
            var styles = '.comic-bubbles-wrapper .cb-bubble-field { -moz-box-sizing: border-box !important; -webkit-box-sizing: border-box !important; box-sizing: border-box !important; padding: 1px; line-height: normal; -webkit-user-select: auto; }\n';
            styles += '.comic-bubbles-wrapper .cb-bubble-field .wrap { display: inline !important; position: static !important; margin: 0 !important; padding: 0 !important; border: 0 !important; text-transform: inherit !important; font-family: inherit !important; font-size: inherit !important; font-style: inherit !important; font-weight: inherit !important; }\n';
            styles += '.comic-bubbles-wrapper .cb-bubble-field p, .comic-bubbles-wrapper .cb-bubble-field div { margin: 0 !important; padding: 0 !important; background: transparent !important; line-height: inherit; font-family: inherit; font-size: inherit; font-style: inherit; font-weight: inherit; text-align: inherit; }\n';
            styles += '.comic-bubbles-wrapper .cb-bubble-field.clickable { cursor: pointer; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }\n';
            styles += '.comic-bubbles-wrapper, .comic-bubbles-wrapper img { -khtml-user-select: none; -o-user-select: none; -moz-user-select: none; -webkit-user-select: none; user-select: none; }\n';
            styles += '.comic-bubbles-output { font-family: Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New; }\n';
            styleElement.appendChild(document.createTextNode(styles));
        }
    }

    function drawEllipseOrRectangle(t, n) {
        if (t.ellipse) {
            drawEllipse(cbCanvasContext, t.x + t.width / 2, t.y + t.height / 2, t.width / 2 * Math.sqrt(2), t.height / 2 * Math.sqrt(2), n, t.bubbleStyle, t);
            var w1 = 12, w2 = 18, w10, w20, tailOffset = 8;
            if (t.width > t.height) {
                if (0.25 * t.height > w1) w1 = 0.25 * t.height;
                if (0.35 * t.height > w2) w2 = 0.35 * t.height;
            }
            else {
                if (0.25 * t.width > w1) w1 = 0.25 * t.width;
                if (0.35 * t.width > w2) w2 = 0.35 * t.width;
            }
            if (t.bubbleStyle == 3) {
                w1 = w1 / 2;
                w2 = w2 / 2;
            }
            if (t.tailLocation == 0) {
                w10 = t.x + w2;
                w20 = t.y + w2;
                if (t.x + t.width < w10) w10 = t.x + t.width;
                if (t.y + t.height < w20) w20 = t.y + t.height;
                drawTail(cbCanvasContext, t.x, w20, w10, t.y, t.tailX0, t.tailY0, t.bubbleStyle, n, t.x + tailOffset, t.y + tailOffset, t.tailLocation);
                tails[8].x = t.tailX0 - tailSize / 2;
                tails[8].y = t.tailY0 - tailSize / 2;
            }
            else if (t.tailLocation == 1) {
                if (t.width < MINSIZE + 4) w1 = w1 - 2;
                w10 = t.x + t.width / 2 - w1;
                w20 = t.x + t.width / 2 + w1;
                if (t.width < w20 - w10) {
                    w10 = t.x;
                    w20 = t.x + t.width;
                }
                drawTail(cbCanvasContext, w10, t.y, w20, t.y, t.tailX1, t.tailY1, t.bubbleStyle, n, t.x + t.width / 2, t.y - tailOffset / 2, t.tailLocation);
                tails[8].x = t.tailX1 - tailSize / 2;
                tails[8].y = t.tailY1 - tailSize / 2;
            }
            else if (t.tailLocation == 2) {
                w10 = t.x + t.width - w2;
                w20 = t.y + w2;
                if (t.x > w10) w10 = t.x;
                if (t.y + t.height < w20) w20 = t.y + t.height;
                drawTail(cbCanvasContext, w10, t.y, t.x + t.width, w20, t.tailX2, t.tailY2, t.bubbleStyle, n, t.x + t.width - tailOffset, t.y + tailOffset, t.tailLocation);
                tails[8].x = t.tailX2 - tailSize / 2;
                tails[8].y = t.tailY2 - tailSize / 2;
            }
            else if (t.tailLocation == 3) {
                if (t.height < MINSIZE + 4) w1 = w1 - 2;
                w10 = t.y + t.height / 2 - w1;
                w20 = t.y + t.height / 2 + w1;
                if (t.height < w20 - w10) {
                    w10 = t.y;
                    w20 = t.y + t.height;
                }
                drawTail(cbCanvasContext, t.x, w10, t.x, w20, t.tailX3, t.tailY3, t.bubbleStyle, n, t.x - tailOffset / 2, t.y + t.height / 2, t.tailLocation);
                tails[8].x = t.tailX3 - tailSize / 2;
                tails[8].y = t.tailY3 - tailSize / 2;
            }
            else if (t.tailLocation == 4) {
                if (t.height < MINSIZE + 4) w1 = w1 - 2;
                w10 = t.y + t.height / 2 - w1;
                w20 = t.y + t.height / 2 + w1;
                if (t.height < w20 - w10) {
                    w10 = t.y;
                    w20 = t.y + t.height;
                }
                drawTail(cbCanvasContext, t.x + t.width, w10, t.x + t.width, w20, t.tailX4, t.tailY4, t.bubbleStyle, n, t.x + t.width + tailOffset / 2, t.y + t.height / 2, t.tailLocation);
                tails[8].x = t.tailX4 - tailSize / 2;
                tails[8].y = t.tailY4 - tailSize / 2;
            }
            else if (t.tailLocation == 5) {
                w10 = t.y + t.height - w2;
                w20 = t.x + w2;
                if (t.y > w10) w10 = t.y;
                if (t.x + t.width < w20) w20 = t.x + t.width;
                drawTail(cbCanvasContext, t.x, w10, w20, t.y + t.height, t.tailX5, t.tailY5, t.bubbleStyle, n, t.x + tailOffset, t.y + t.height - tailOffset, t.tailLocation);
                tails[8].x = t.tailX5 - tailSize / 2;
                tails[8].y = t.tailY5 - tailSize / 2;
            }
            else if (t.tailLocation == 6) {
                if (t.width < MINSIZE + 4) w1 = w1 - 2;
                w10 = t.x + t.width / 2 - w1;
                w20 = t.x + t.width / 2 + w1;
                if (t.width < w20 - w10) {
                    w10 = t.x;
                    w20 = t.x + t.width;
                }
                drawTail(cbCanvasContext, w10, t.y + t.height, w20, t.y + t.height, t.tailX6, t.tailY6, t.bubbleStyle, n, t.x + t.width / 2, t.y + t.height + tailOffset / 2, t.tailLocation);
                tails[8].x = t.tailX6 - tailSize / 2;
                tails[8].y = t.tailY6 - tailSize / 2;
            }
            else if (t.tailLocation == 7) {
                w10 = t.x + t.width - w2;
                w20 = t.y + t.height - w2;
                if (t.x > w10) w10 = t.x;
                if (t.y > w20) w20 = t.y;
                drawTail(cbCanvasContext, w10, t.y + t.height, t.x + t.width, w20, t.tailX7, t.tailY7, t.bubbleStyle, n, t.x + t.width - tailOffset, t.y + t.height - tailOffset, t.tailLocation);
                tails[8].x = t.tailX7 - tailSize / 2;
                tails[8].y = t.tailY7 - tailSize / 2;
            }
        }
        else {
            drawRectangle(cbCanvasContext, t.x, t.y, t.width, t.height, n);
        }
    }

    function drawEllipse(context, cx, cy, rx, ry, n, bubbleStyle, bub) {
        if (bubbleStyle == 3) {
            context.beginPath();
            var mar = 5, cx = bub.x - mar, cy = bub.y - mar, cw = bub.width + mar * 2, ch = bub.height + mar * 2;
            var r = cx + cw, b = cy + ch, rad = 6;
            context.moveTo(cx + rad, cy);
            context.lineTo(r - rad, cy);
            context.quadraticCurveTo(r, cy, r, cy + rad);
            context.lineTo(r, cy + ch - rad);
            context.quadraticCurveTo(r, b, r - rad, b);
            context.lineTo(cx + rad, b);
            context.quadraticCurveTo(cx, b, cx, b - rad);
            context.lineTo(cx, cy + rad);
            context.quadraticCurveTo(cx, cy, cx + rad, cy);
        }
        else if (bubbleStyle == 2) {
            var m = 180, points = [], points2 = [], rays = [], pi = Math.PI / m;
            var ray = 20, ray_dist = 15, r_d = 0;
            if (bub.width > bub.height) {
                if (bub.width > 50) ray = 25;
                if (bub.width > 100) {
                    ray = 30;
                    ray_dist = bub.width / 6;
                    if (ray_dist > bub.height / 2) ray_dist = bub.height / 2;
                }
            }
            else {
                if (bub.height > 100) ray = 25;
                if (bub.height > 100) {
                    ray = 30;
                    ray_dist = bub.height / 6;
                    if (ray_dist > bub.width / 2) ray_dist = bub.width / 2;
                }
            }
            for (var p = 0; p < m * 2; p++) {
                var a = cx, b = cy, c = 0, sn = Math.sin(p * pi) * 0.9, cs = Math.cos(p * pi) * 0.9;
                a = rx * cs + cx;
                b = ry * sn + cy;
                points.push({ 'x': a, 'y': b });
            }
            for (var i = 0; i < points.length; i++) {
                var x1 = points[i].x, y1 = points[i].y;
                var x3 = points[0].x, y3 = points[0].y;
                if (i + 1 < points.length) {
                    x3 = points[i + 1].x;
                    y3 = points[i + 1].y;
                }
                var a = Math.abs(y1 - y3), b = Math.abs(x1 - x3);
                var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
                if (i == 0) {
                    points2.push({ 'x': x1, 'y': y1 });
                }
                r_d = r_d + c;
                if (r_d > ray_dist) {
                    points2.push({ 'x': x1, 'y': y1 });
                    r_d = 0;
                }
            }
            for (var i = 0; i < points2.length; i++) {
                var x1 = points2[i].x, y1 = points2[i].y;
                var x2 = 0, y2 = 0;
                var x3 = points2[0].x, y3 = points2[0].y;
                if (i + 1 < points2.length) {
                    x3 = points2[i + 1].x;
                    y3 = points2[i + 1].y;
                }
                var x4 = (x1 + x3) / 2, y4 = (y1 + y3) / 2;
                var a = Math.abs(y1 - y3), b = Math.abs(x1 - x3);
                var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
                var m = 1, tp = cy - bub.height / 2, dn = cy + bub.height / 2;
                var lf = cx - bub.width / 2, rh = cx + bub.width / 2;
                if (bub.width > bub.height) {
                    if (y4 < tp + 5 || y4 > dn - 5) {
                        if (i % 4 == 0) m = 1.3;
                    }
                    else {
                        m = 0.8;
                    }
                }
                else {
                    if (x4 < lf + 5 || x4 > rh - 5) {
                        if (i % 4 == 0) m = 1.3;
                    }
                    else {
                        m = 0.8;
                    }
                }
                if (x4 > cx) {
                    x2 = x4 + (a / c * ray * m);
                }
                else {
                    x2 = x4 - (a / c * ray * m);
                }
                if (y4 < cy) {
                    y2 = y4 - (b / c * ray * m);
                }
                else {
                    y2 = y4 + (b / c * ray * m);
                }
                if (c > ray_dist / 2) {
                    rays.push({ 'x': x1, 'y': y1 });
                    rays.push({ 'x': x2, 'y': y2 });
                }
            }
            context.beginPath();
            context.moveTo(rays[0].x, rays[0].y);
            for (var i = 1; i < rays.length; i++) {
                context.lineTo(rays[i].x, rays[i].y);
            }
            context.closePath();
        }
        else {
            context.save();
            context.beginPath();
            context.translate(cx - rx, cy - ry);
            context.scale(rx, ry);
            context.arc(1, 1, 1, 0, 2 * Math.PI, false);
            if (cb.mousePressed && n != selectionID) {
                if (bubbleStyle != 0) context.fill();
                context.restore();
                return;
            }
            context.restore();
        }
        if (bubbles.length > 0) bubbles[n].frame = false;
        if ((selectionID == n) || ((context.isPointInPath(cb.mouseX, cb.mouseY)) || (context.isPointInPath(cb.mX, cb.mY) && cb.mousePressed))) {
            if (cbCanvas.style.cursor == "auto" && selectionAndSettingsAllowed) selectionID = n;
            if (bubbles.length > 0) bubbles[n].frame = true;
        }
        if (bubbleStyle != 0 && bubbleStyle != 2 && bubbleStyle != 3) context.fill();
        try {
            if (selectionID > - 1) cb.selectedBubbleID = bubbles[selectionID].txtarea.id;
        } catch (err) { }
    }

    function drawSmallEllipse(context, cx, cy, rx, ry) {
        var wi = rx, he = ry;
        context.moveTo(cx, cy - he / 2);
        context.bezierCurveTo(cx + wi / 2, cy - he / 2, cx + wi / 2, cy + he / 2, cx, cy + he / 2);
        context.bezierCurveTo(cx - wi / 2, cy + he / 2, cx - wi / 2, cy - he / 2, cx, cy - he / 2);
    }

    function dT(c, t, x1, y1, x2, y2, x3, y3, cS, x0, y0) {
        if (t == 1) {
            c.moveTo(x2, y2);
            c.lineTo(x1, y1);
        }
        else {
            c.moveTo(x1, y1);
            c.lineTo(x2, y2);
        }
        if (cS == 0 || cS == 2) {
            c.lineTo(x3, y3);
        }
        else {
            var angle = Math.atan2(y3 - y0, x3 - x0), ar_l = 20, ar_w = 6;
            c.lineTo(x3, y3);
            c.moveTo(x3, y3);
            c.lineTo(x3 - ar_l * Math.cos(angle - Math.PI / ar_w), y3 - ar_l * Math.sin(angle - Math.PI / ar_w));
            c.lineTo(x3 - ar_l * Math.cos(angle + Math.PI / ar_w), y3 - ar_l * Math.sin(angle + Math.PI / ar_w));
            c.lineTo(x3, y3);
            c.lineTo(x3 - ar_l * Math.cos(angle - Math.PI / ar_w), y3 - ar_l * Math.sin(angle - Math.PI / ar_w));
        }
    }
    function drawTail(context, x1, y1, x2, y2, x3, y3, bubbleStyle, n, x0, y0, tail) {
        if (bubbleStyle == 0 || bubbleStyle == 2 || bubbleStyle == 3) {
            var t = 0;
            if (tail == 0) {
                t = 1;
                if (x3 < x2) {
                    if ((x2 - x3) < (y3 - y2)) t = 2;
                }
                else {
                    if ((x3 - x2) > (y2 - y3)) t = 2;
                }
            }
            else if (tail == 1) {
                if (y3 < y1) {
                    t = 1;
                }
                else {
                    t = 2;
                }
            }
            else if (tail == 2) {
                t = 1;
                if (x3 > x1) {
                    if ((x3 - x1) < (y3 - y1)) t = 2;
                }
                else {
                    if ((x1 - x3) > (y1 - y3)) t = 2;
                }
            }
            else if (tail == 4) {
                if (x3 > x1) {
                    t = 1;
                }
                else {
                    t = 2;
                }
            }
            else if (tail == 3) {
                if (x3 < x1) {
                    t = 2;
                }
                else {
                    t = 1;
                }
            }
            else if (tail == 5) {
                t = 2;
                if (x3 < x2) {
                    if ((x2 - x3) < (y2 - y3)) t = 1;
                }
                else {
                    if ((x3 - x2) > (y3 - y2)) t = 1;
                }
            }
            else if (tail == 6) {
                if (y3 > y1) {
                    t = 2;
                }
                else {
                    t = 1;
                }
            }
            else if (tail == 7) {
                t = 2;
                if (x3 > x1) {
                    if ((x3 - x1) < (y1 - y3)) t = 1;
                }
                else {
                    if ((x1 - x3) > (y3 - y1)) t = 1;
                }
            }
            dT(context, t, x1, y1, x2, y2, x3, y3, bubbleStyle, x0, y0);
        }
        else if (bubbleStyle == 1) {
            context.beginPath();
            var thisB = bubbles[n];
            var eWidth = thisB.width * SERATIO;
            var eHeight = thisB.height * SERATIO;
            var a = 0, b = 0, c = 0, dist = 0, distance = 0, xx = 0, yy = 0, i = 1, gap = 14;
            b = Math.abs(x0 - x3);
            a = y3 - y0;
            c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
            var b2 = Math.abs(b / a * eHeight);
            var c2 = Math.sqrt(Math.pow(eHeight, 2) + Math.pow(b2, 2));
            if (b2 > eWidth) {
                b2 = Math.abs(a / b * eWidth);
                c2 = Math.sqrt(Math.pow(eWidth, 2) + Math.pow(b2, 2));
            }
            if (eWidth > eHeight) {
                if (gap < eWidth) gap = eWidth;
            }
            else {
                if (gap < eHeight) gap = eHeight;
            }
            dist = c2 + gap;
            distance = dist;
            while (distance < c) {
                i++;
                distance = i * dist;
            }
            var smallEfunc_n1 = i - 1, smallEW = eWidth / 2 * Math.sqrt(2), smallEH = eHeight / 2 * Math.sqrt(2);
            var smallEW2 = smallEW * 0.50, smallEH2 = smallEH * 0.50;
            var decrW = (smallEW - smallEW2) / smallEfunc_n1, decrH = (smallEH - smallEH2) / smallEfunc_n1;
            i = 1;
            distance = dist;
            while (distance < c) {
                yy = a / c * distance;
                xx = Math.sqrt(Math.pow(distance, 2) - Math.pow(yy, 2));
                yy = yy + y0;
                if (x3 <= x0) {
                    xx = x0 - xx;
                }
                else {
                    xx = x0 + xx;
                }
                var eW = smallEW - (decrW * (i - 1)), eH = smallEH - (decrH * (i - 1));
                if (eW < smallEW * 0.35) {
                    eW = smallEW * 0.35;
                    eH = smallEH * 0.35;
                }
                drawSmallEllipse(context, xx, yy, eW * 3, eH * 2.25);
                distance = distance + (dist * eW / smallEW);
                i++;
            }
        }
        context.closePath();
        if (context.isPointInPath(cb.currentX, cb.currentY) && n == selectionID) {
            cb.insideTail = true;
        }
        else {
            cb.insideTail = false;
        }
        context.fill();
    }

    function drawRectangle(context, cx, cy, rx, ry, n) {
        var radius = 2;
        var x = cx - 1;
        var y = cy - 1;
        var width = rx + 2;
        var height = ry + 2;
        context.beginPath();
        context.rect(x, y, width, height);
        context.fill();
        if (cb.mousePressed && n != selectionID) return;
        if (bubbles.length > 0) bubbles[n].frame = false;
        if ((selectionID == n) || ((context.isPointInPath(cb.mouseX, cb.mouseY)) || (context.isPointInPath(cb.mX, cb.mY) && cb.mousePressed))) {
            if (cbCanvas.style.cursor == "auto") selectionID = n;
            if (bubbles.length > 0) bubbles[n].frame = true;
        }
        if (selectionID > - 1) cb.selectedBubbleID = bubbles[selectionID].txtarea.id;
    }

    function prepareText(thisBubble) {
        tempPInDOM(true);
        tempP.style.cssText = getTextStyle(thisBubble.fontFamily, thisBubble.fontSize, thisBubble.fontStyle, thisBubble.fontWeight, null, '-9999px', '-9999px', 'auto', 'auto', 'hidden', thisBubble.textAlign, thisBubble.lineHeight);
        tempP.innerHTML = "<img id='wg8100048293' src='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' style='position: static !important; float: none !important; display: inline !important; width: 1px !important; height: 1px !important; padding: 0 !important; margin: 0 !important; border: 0 !important; vertical-align: baseline !important'><span id='wg8100048294' class='wrap'>abc</span><br><span id='wg8100048295' class='wrap'>def</span>";
        var temp_el = document.getElementById('wg8100048293');
        var temp_el1 = document.getElementById('wg8100048294');
        var temp_el2 = document.getElementById('wg8100048295');
        if (temp_el && temp_el1 && temp_el2) {
            var offtop = temp_el.offsetTop;
            var offtop1 = temp_el1.offsetTop;
            var offtop2 = temp_el2.offsetTop;
            thisBubble.baselineFromTop = offtop + 1 - offtop1;
            thisBubble.lineH = offtop2 - offtop1;
            var uc = cssValue(tempP, 'text-transform') == "uppercase" ? true : false;
            var wrapped_characters = thisBubble.txtarea.innerHTML.replace(/(<.*?>)|(&lt;|&gt;|&nbsp;|\ |.)/g, function (m0, tag, ch) {
                return tag || ("<span class='wrap'>" + ((uc && ch != '&lt;' && ch != '&gt;' && ch != '&nbsp;') ? ch.toUpperCase() : ch) + "</span>");
            });
            tempP.style.cssText = getTextStyle(thisBubble.fontFamily, thisBubble.fontSize, thisBubble.fontStyle, thisBubble.fontWeight, null, '-9999px', '-9999px', thisBubble.width + 'px', 'auto', 'hidden', thisBubble.textAlign, thisBubble.lineHeight);
            tempP.innerHTML = wrapped_characters;
            tempP.setAttribute('data-txt-id', thisBubble.txtarea.id);
            prepareLetters(thisBubble);
        }
    }
    this.prepareText = function (thisBubble) {
        prepareText(thisBubble);
    }
    this.removeCanvas = function () {
        if (cb_element && cb_parent) {
            cb_parent.insertBefore(cb_element, cbCanvasWrapper);
            cb_parent.removeChild(cbCanvasWrapper);
        }
        if (myconsole) myconsole.innerHTML = "";
        myconsole = null;
    }

    function prepareLetters(thisBubble) {
        tempPInDOM(true);
        if (thisBubble.txtarea.id != tempP.getAttribute('data-txt-id')) prepareText(thisBubble);
        tempP.style.cssText = getTextStyle(thisBubble.fontFamily, thisBubble.fontSize, thisBubble.fontStyle, thisBubble.fontWeight, null, '-9999px', '-9999px', thisBubble.width + 'px', 'auto', 'hidden', thisBubble.textAlign, thisBubble.lineHeight);
        var max_y = thisBubble.y + thisBubble.height;
        thisBubble.lettersCoordinates = [];
        var spans = tempP.getElementsByClassName("wrap");
        var last_x = 0, last_y = 0;
        for (i = 0; i < spans.length; i++) {
            var letter = spans[i].innerText || spans[i].textContent;
            var letter_x = spans[i].offsetLeft + thisBubble.x;
            var letter_y = spans[i].offsetTop + thisBubble.y + thisBubble.baselineFromTop;
            if (letter_y < max_y) {
                if (letter != " ") thisBubble.lettersCoordinates.push({ 'letter': letter, 'x': spans[i].offsetLeft, 'y': spans[i].offsetTop });
                if (letter_x > last_x) last_x = letter_x;
                if (letter_y > last_y) last_y = letter_y;
            }
        }
        tempP.style.cssText = getTextStyle(thisBubble.fontFamily, thisBubble.fontSize, thisBubble.fontStyle, thisBubble.fontWeight, null, '-9999px', '-9999px', 'auto', 'auto', 'hidden', thisBubble.textAlign, thisBubble.lineHeight);
        tempP.style.paddingTop = 0;
        tempP.style.lineHeight = 1;
        var el = tempP.getElementsByTagName('span');
        for (var i = 0; i < el.length; i++) {
            el[i].style.paddingTop = 0;
            el[i].style.lineHeight = 1;
        }
        var spans2 = tempP.getElementsByClassName("wrap"), total_br = 0, current_ln = 1, bubble_txt = "";
        for (i = 0; i < spans2.length; i++) {
            var letter = spans2[i].innerHTML;
            var letter_y = spans2[i].offsetTop;
            if (letter_y == current_ln) {
                bubble_txt += letter;
            }
            else {
                let current_y = letter_y;
                var nl_nb = (current_y / thisBubble.lineH) - total_br, nl = "";
                for (let j = 0; j < nl_nb; j++) {
                    nl += "<br>";
                    total_br++;
                }
                bubble_txt += nl + letter;
                current_ln = letter_y;
            }
        }
        thisBubble.consoleText = bubble_txt;
    }

    function drawText(thisBubble) {
        if (!pointer_events || textDrawing || cb.png_in_progress) {
            if (thisBubble.lettersCoordinates.length > 0) {
                for (l = 0; l < thisBubble.lettersCoordinates.length; l++) {
                    cbCanvasContext.fillText(thisBubble.lettersCoordinates[l]['letter'], thisBubble.lettersCoordinates[l]['x'] + thisBubble.x, thisBubble.lettersCoordinates[l]['y'] + thisBubble.y + thisBubble.baselineFromTop);
                }
            }
            textDrawingCount++;
        }
    }

    function browser(b) {
        return (navigator.userAgent.toLowerCase().indexOf(b.toLowerCase()) != -1);
    }

    function hexToRgba(hex, opac) {
        hex = hex.replace(/#/g, '');
        hex = (hex + hex + hex).substr(0, 6);
        var bigint = parseInt(hex, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        return "rgba(" + r + "," + g + "," + b + "," + opac + ")";
    }
    function hexToR(hex) {
        hex = hex.replace(/#/g, '');
        var bigint = parseInt(hex, 16);
        var r = (bigint >> 16) & 255;
        return r;
    }
    function hexToG(hex) {
        hex = hex.replace(/#/g, '');
        var bigint = parseInt(hex, 16);
        var g = (bigint >> 8) & 255;
        return g;
    }
    function hexToB(hex) {
        hex = hex.replace(/#/g, '');
        var bigint = parseInt(hex, 16);
        var b = bigint & 255;
        return b;
    }

    function wrapElementAndAddBubbleCanvas() {
        //makeBubbleCanvas();
        prepareBubbleCanvas();
    }

    function getVerifiedFontFamily(font_family) {
        var fontF = font_family, unknownFont = true;
        for (var f = 0; f < common_fonts.length; f++) {
            if (common_fonts[f].indexOf(fontF.split(",")[0]) > -1) {
                fontF = common_fonts[f];
                unknownFont = false;
                break;
            }
        }
        if (unknownFont) fontF = common_fonts[0];
        return fontF;
    }
    function getVerifiedFontSize(font_size) {
        var fontS = isNaN(parseInt(font_size)) ? fontSize : parseInt(font_size);
        if (fontS < 8) {
            fontS = "8px";
        }
        else if (fontS > 99) {
            fontS = "99px";
        }
        else {
            fontS = parseInt(fontS) + "px";
        }
        return fontS;
    }
    function getVerifiedFontStyle(font_style) {
        var fontSt = font_style;
        if (fontSt != "normal" && fontSt != "italic") {
            fontSt = "normal";
        }
        return fontSt;
    }
    function getVerifiedFontWeight(font_weight) {
        var fontW = font_weight;
        if (fontW != "normal" && fontW != "bold") {
            fontW = "normal";
        }
        return fontW;
    }
    function getVerifiedTextAlign(text_align) {
        var textA = text_align;
        if (textA != "left" && textA != "center" && textA != "right" && textA != "justify") {
            textA = "left";
        }
        return textA;
    }
    function getVerifiedLineHeight(line_height) {
        var lineH = ('lineHeight' in presets) ? presets['lineHeight'] : defaults['lineHeight'];
        for (var i = 0; i < line_heights.length; i++) {
            if (line_heights[i] == line_height) lineH = line_height;
        }
        return lineH;
    }
    function getVerifiedColor(_color) {
        var c = _color ? _color.toLowerCase() : '';
        if (colors140[c] === undefined) {
            var ColorIsOK = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(c);
            if (!ColorIsOK) {
                c = null;
            }
        }
        else {
            c = colors140[c];
        }
        return c;
    }
    function textToHtml(t) {
        var t2 = (t !== null) ? t + "" : "";
        return t2.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/gi, "<br>").replace(/\ \ /g, "&nbsp; ").replace(/\ \ /g, " &nbsp;");
    }

    this.CBName = function () {
        return cb_arguments.callee.toString().match(/function ([^\(]+)/)[1].toLowerCase();
    }

    function cssValue(source, property) {
        return getComputedStyle(source, null).getPropertyValue(property);
    }

    function correctWidth(Bubb, b_height) {
        tempPInDOM(true);
        tempP.style.width = 'auto';
        tempP.style.height = 'auto';
        tempP.innerHTML = "test";
        var line_height = tempP.clientHeight;
        tempP.style.cssText = getTextStyle(Bubb.fontFamily, Bubb.fontSize, Bubb.fontStyle, Bubb.fontWeight, null, '-9999px', '-9999px', Bubb.width + 'px', 'auto', 'hidden', Bubb.textAlign, Bubb.lineHeight);
        tempP.innerHTML = Bubb.txtarea.innerHTML;
        var h = tempP.offsetHeight;
        if (h - b_height > line_height - 5) {
            var bw = Bubb.width;
            for (var i = 1; i < 100; i++) {
                tempP.style.width = (bw + i) + 'px';
                if (tempP.offsetHeight != h) {
                    Bubb.width = tempP.offsetWidth;
                    break;
                }
            }
        }
    }

    function setPresets() {
        for (var key in defaults) {
            if (defaults.hasOwnProperty(key)) {
                presets[key] = defaults[key];
            }
        }
    }

    function resetElement() {
        if (document.getElementById(elementID + '-comic-bubbles-wrapper')) {
            var wr = document.getElementById(elementID + '-comic-bubbles-wrapper');
            var par = wr.parentNode;
            par.removeChild(wr);
        }
    }
    resetElement();
    if (!document.getElementById(elementID + '-comic-bubbles-wrapper')) {// && cb['CBN' + parseInt(6302).toString(24)]() == "comicbubbles") {
        wrapElementAndAddBubbleCanvas();
        setPresets();
        var link_tags = document.getElementsByTagName('link');
        for (var l = 0; l < link_tags.length; l++) {
            if (link_tags[l].hasAttribute('href')) {
                var href_parts = link_tags[l].getAttribute('href').split('css?family=');
                if (href_parts.length > 1) {
                    var family = href_parts[1];
                    if (family.indexOf('|') > -1) {
                        var families = family.split('|');
                        for (var f = 0; f < families.length; f++) {
                            common_fonts.push(families[f].replace(/\+/g, ' ').replace(/[:].*/, '') + ', serif');
                        }
                    }
                    else {
                        common_fonts.push(family.replace(/\+/g, ' ').replace(/[:].*/, '') + ', serif');
                    }
                }
            }
        }
        if (myconsole) myconsole.classList.add('comic-bubbles-output');
        var canv = {}, bub;
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] === 'object') {
                if ('canvas' in arguments[i]) {
                    canv = arguments[i].canvas || canv;
                }
                if ('bubble' in arguments[i]) {
                    bub = arguments[i].bubble || bub;
                }
            }
        }
        if (Object.keys(canv).length > 0) {
            for (var p in canv) {
                if (typeof canv[p] === 'string' || canv[p] instanceof String)
                    canv[p] = canv[p].trim();
            }
            if ('text' in canv) {
                defaults['text'] = defaultText = textToHtml(canv['text']);
            }
            var canv_ffamily = canv['font-family'] || canv['fontFamily'] || fontFamily;
            if (canv_ffamily != fontFamily) defaults['fontFamily'] = fontFamily = getVerifiedFontFamily(canv_ffamily);
            var canv_fsize = canv['font-size'] || canv['fontSize'] || fontSize;
            if (canv_fsize != fontSize) defaults['fontSize'] = fontSize = getVerifiedFontSize(canv_fsize);
            var canv_fstyle = canv['font-style'] || canv['fontStyle'] || fontStyle;
            if (canv_fstyle != fontStyle) defaults['fontStyle'] = fontStyle = getVerifiedFontStyle(canv_fstyle);
            var canv_fweight = canv['font-weight'] || canv['fontWeight'] || fontWeight;
            if (canv_fweight != fontWeight) defaults['fontWeight'] = fontWeight = getVerifiedFontWeight(canv_fweight);
            var canv_talign = canv['text-align'] || canv['textAlign'] || textAlign;
            if (canv_talign != textAlign) defaults['textAlign'] = textAlign = getVerifiedTextAlign(canv_talign);
            var canv_lheight = canv['line-height'] || canv['lineHeight'] || lineHeight;
            if (canv_lheight != lineHeight) defaults['lineHeight'] = lineHeight = getVerifiedLineHeight(canv_lheight);
            var canv_bgcolor = canv['background-color'] || canv['backgroundColor'] || canv['background'] || bgColor;
            if (canv_bgcolor != bgColor) defaults['bgColor'] = bgColor = getVerifiedColor(canv_bgcolor) || bgColor;
            var canv_txtcolor = canv['color'] || txtColor;
            if (canv_txtcolor != txtColor) defaults['txtColor'] = txtColor = getVerifiedColor(canv_txtcolor) || txtColor;
            if ('opacity' in canv) {
                setParameter('opacity', canv['opacity'], null);
                defaults['opacity'] = opacity;
            }
            if ('readonly' in canv) {
                setParameter('readonly', canv['readonly'], null);
                defaults['readonly'] = readonly;
            }
            if ('settable' in canv) {
                setParameter('settable', canv['settable'], null);
                defaults['settable'] = settable;
            }
            if ('width' in canv) {
                if (canv['width'] != "auto") {
                    setParameter('width', canv['width'], null);
                    defaults['bubbleWidth'] = bubbleWidth;
                }
                else {
                    autoWidth = true;
                }
            }
            if ('height' in canv) {
                if (canv['height'] != "auto") {
                    setParameter('height', canv['height'], null);
                    defaults['bubbleHeight'] = bubbleHeight;
                }
                else {
                    autoHeight = true;
                }
            }
            if ('textDrawing' in canv) {
                if (canv['textDrawing']) {
                    textDrawing = true;
                }
                else {
                    textDrawing = false;
                }
            }
            if ('bubbleStyle' in canv) {
                var bs = canv['bubbleStyle'] || "none";
                var bsn = getCSNumber(bs);
                if (bsn != -1) {
                    ellipse = true;
                }
                defaults['bubbleStyle'] = bubbleStyle = bsn;
            }
        }

        if (typeof bub === 'object' && Object.prototype.toString.call(bub) !== '[object Array]') bub = [bub];
        if (Object.prototype.toString.call(bub) === '[object Array]') {
            for (var i = 0; i < bub.length; i++) {
                setNewBubble(bub[i]);
            }
            setTimeout(function () { refreshBubbleCanvas(true); }, 100);
        }
    }

    function setNewBubble(bub) {
        var newBubble = new Bubble();
        if ('x' in bub) {
            setParameter('x', bub['x'], newBubble);
        }
        else if ('X' in bub) {
            setParameter('x', bub['X'], newBubble);
        }
        if ('y' in bub) {
            setParameter('y', bub['y'], newBubble);
        }
        else if ('Y' in bub) {
            setParameter('y', bub['Y'], newBubble);
        }
        if ('text' in bub) {
            newBubble.txtarea.innerHTML = textToHtml(bub['text']);
        }
        bubbles.push(newBubble);
        var _id = new Date().getTime() + bubbles.length;
        newBubble.id = 'b' + _id;
        newBubble.txtarea.id = elementID + '-' + _id;
        var bub_ffamily = bub['font-family'] || bub['fontFamily'] || fontFamily;
        if (bub_ffamily != fontFamily) newBubble.fontFamily = getVerifiedFontFamily(bub_ffamily);
        var bub_fsize = bub['font-size'] || bub['fontSize'] || fontSize;
        if (bub_fsize != fontSize) newBubble.fontSize = getVerifiedFontSize(bub_fsize);
        var bub_fstyle = bub['font-style'] || bub['fontStyle'] || fontStyle;
        if (bub_fstyle != fontStyle) newBubble.fontStyle = getVerifiedFontStyle(bub_fstyle);
        var bub_fweight = bub['font-weight'] || bub['fontWeight'] || fontWeight;
        if (bub_fweight != fontWeight) newBubble.fontWeight = getVerifiedFontWeight(bub_fweight);
        var bub_talign = bub['text-align'] || bub['textAlign'] || textAlign;
        if (bub_talign != textAlign) newBubble.textAlign = getVerifiedTextAlign(bub_talign);
        var bub_lheight = bub['line-height'] || bub['lineHeight'] || lineHeight;
        if (bub_lheight != lineHeight) newBubble.lineHeight = getVerifiedLineHeight(bub_lheight);
        var bub_bgcolor = bub['background-color'] || bub['backgroundColor'] || bub['background'] || bgColor;
        if (bub_bgcolor != bgColor) newBubble.fill = getVerifiedColor(bub_bgcolor) || bgColor;
        var bub_txtcolor = bub['color'] || txtColor;
        if (bub_txtcolor != txtColor) newBubble.color = getVerifiedColor(bub_txtcolor) || txtColor;
        if ('bubbleStyle' in bub) {
            newBubble.bubbleStyle = getCSNumber(bub['bubbleStyle']);
        }
        if ('opacity' in bub) {
            setParameter('opacity', bub['opacity'], newBubble);
        }
        if ('readonly' in bub) {
            setParameter('readonly', bub['readonly'], newBubble);
        }
        if ('settable' in bub) {
            setParameter('settable', bub['settable'], newBubble);
        }
        if ('visible' in bub) {
            setParameter('visible', bub['visible'], newBubble);
        }
        if ('id' in bub) {
            if (changeId(newBubble, bub['id'])) newBubble.txtarea.id = elementID + '-' + bub['id'];
        }
        if ('name' in bub) {
            newBubble.name = bub['name'];
        }
        if ('width' in bub) {
            if (bub['width'] == "auto") {
                newBubble.autoWidth = true;
                var auto_size = autoSize(newBubble);
                newBubble.width = auto_size.width;
            }
            else {
                newBubble.autoWidth = false;
                setParameter('width', bub['width'], newBubble);
                var he = bubbleHeight;
                if ('height' in bub && bub['height'] != "auto") {
                    if (parseInt(bub['height']) >= MINSIZE) he = parseInt(bub['height']);
                }
                if (he != "auto") correctWidth(newBubble, he);
            }
        }
        else {
            if (autoWidth) {
                newBubble.autoWidth = true;
                var auto_size = autoSize(newBubble);
                newBubble.width = auto_size.width;
            }
        }
        if ('height' in bub) {
            if (bub['height'] == "auto") {
                newBubble.autoHeight = true;
                var auto_size = autoSize(newBubble);
                newBubble.height = auto_size.height;
            }
            else {
                newBubble.autoHeight = false;
                setParameter('height', bub['height'], newBubble);
            }
        }
        else {
            if (autoHeight) {
                newBubble.autoHeight = true;
                var auto_size = autoSize(newBubble);
                newBubble.height = auto_size.height;
            }
        }

        if ('bubbleStyle' in bub) {
            var cs = bub['bubbleStyle'] || "none";
            var csn = getCSNumber(cs);
            if (csn != -1) {
                newBubble.ellipse = true;
            }
            newBubble.bubbleStyle = csn;
        }
        if ('tailLocation' in bub || newBubble.ellipse) {
            var tl = bub['tailLocation'] || "se";
            newBubble.tailLocation = getTNumber(tl);
            newBubble['tailX' + newBubble.tailLocation] = getDefaultTailX(newBubble);
            newBubble['tailY' + newBubble.tailLocation] = getDefaultTailY(newBubble);
            if ('tailX' in bub) {
                setParameter('tailX', bub['tailX'], newBubble);
            }
            if ('tailY' in bub) {
                setParameter('tailY', bub['tailY'], newBubble);
            }
        }
        return newBubble;
    }

}
function DestroyComicBubbles(cb) {
    if (typeof cb === "object" && typeof cb.removeCanvas === "function") {
        cb.removeCanvas();
        cb = null;
        //delete cb;
    }
}