/* eslint-disable */

/**
* @project: ComicBubbles
* @description: Speech balloon JavaScript library
* @version: 1.2
* @file: comicbubbles_editor.js
* @author: Wojciech Gajewski (comicbubbles.com)
* @contact: comicbubbles.com/contact
* @copyright: Copyright 2016-2017 Wojciech Gajewski
*/
export default function ComicBubblesEditor(cb, cbCanvasWrapper, cbCanvas, cbCanvasContext, canvasWidth, canvasHeight, bubbles, settingsBox, common_fonts, colors140, touchy, tails, tailSize, tailMargin, MINSIZE, line_heights) {

    var ed = this, settingsColorPicker = document.createElement('div'), transparency_timeout, x0 = 0, y0 = 0, tailX = 0, tailY = 0, bubbleWidth0 = 0, bubbleHeight0 = 0, moving = false, state_update, bubble_settings = {},
        s_gif = "<img src='data:image/png;base64,R0lGODlhDgAOALMAAP/f3/8gIP+/v//Pz//v7/9AQP8wMP9/f/8QEP9gYP////8AAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAOAA4AAAQ9cMlJK0XpHDsTUSDAIcRgLAi3FMqmSoECnO+SgEJSJwKo1waAIlBbHBQFiyGRMgwIqQoLpCD8LAUNs6iKAAA7'/>",
        x_gif = "<img src='data:image/png;base64,R0lGODlhDgAOAIAAAP////8AACH5BAAAAAAALAAAAAAOAA4AAAIajI+pa8COYFwy1ASvAnr3aTHh0WnX94nqUQAAOw=='>";

    function markColorBox(c) {
        var b = document.querySelector('div[data-bgc="' + c + '"]');
        var cboxes = settingsColorPicker.getElementsByTagName('div');
        for (var c = 0; c < cboxes.length; c++) {
            cboxes[c].className = "";
        }
        if (b) b.className = "cb-settings-color";
    }
    function closeColorPicker(e) {
        e.stopPropagation();
        var scp = getElementByClass('cb-settings-color-picker');
        if (scp) scp.parentNode.removeChild(settingsColorPicker);
    }
    function setColorPicker(e) {
        e.stopPropagation();
        var field = e.target;
        settingsColorPicker.className = "cb-settings-color-picker";
        var colorboxes = "";
        for (var co in colors140) {
            colorboxes += '<div style="background: ' + colors140[co] + '" data-bgc="' + colors140[co] + '" title="' + co + '"></div>';
        }
        settingsColorPicker.innerHTML = colorboxes;
        var scp = getElementByClass('cb-settings-color-picker');
        if (!scp) {
            field.parentNode.appendChild(settingsColorPicker);
        }
        else {
            if (field.parentNode.className != scp.parentNode.className) {
                field.parentNode.appendChild(settingsColorPicker);
            }
        }
        settingsColorPicker.onmousedown = function (e) {
            e.stopPropagation();
        }
        var cboxes = settingsColorPicker.getElementsByTagName('div');
        for (var c = 0; c < cboxes.length; c++) {
            cboxes[c].onmousedown = function (e) {
                var bgc = e.target.getAttribute('data-bgc');
                field.value = bgc;
                if (field.className == "cb-settings-bg-color") {
                    bubbles[cb.getBID()].fill = bgc;
                    bubbles[cb.getBID()].txtarea.style.backgroundColor = bgc;
                    cb.setBackground(bgc, 0);
                }
                else {
                    bubbles[cb.getBID()].color = bgc;
                    bubbles[cb.getBID()].txtarea.style.color = bgc;
                    cb.setColor(bgc, 0);
                }
                markColorBox(bgc);
                redraw();
                repaintBubbles();
            }
        }
    }

    this.Settings = function (settings_loaded) {
        var styleElement = document.getElementById('comic-bubbles-editor-style');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            styleElement.id = 'comic-bubbles-editor-style';
            document.getElementsByTagName('head')[0].appendChild(styleElement);
            var styles = '.cb-settings { background: #f2f2f2; padding: 3px 3px 1px; margin: 0; border: 1px solid black; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; position: absolute; width: 14px; height: 0; }\n';
            styles += '.cb-settings.expanded { width: 227px; height: auto; }\n';
            styles += '.cb-settings-color-picker { padding: 0 0 0 1px; margin: 3px 0 1px 0; border: 0; width: auto; max-height: 45px; overflow: auto; }\n';
            styles += '.cb-settings-color-picker > div { float: left; width: 18px; height: 15px; padding: 0; margin: 0 1px 1px 0; cursor: pointer; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; }\n';
            styles += '.cb-settings-color-picker > div[data-bgc="#ffffff"] { clear: left; }\n';
            styles += '.cb-settings-box-button { width: 14px !important; height: 14px !important; position: absolute !important; right: -1px; top: -1px; cursor: pointer; padding: 0 !important; margin: 0 !important; border: 0 !important; -moz-box-sizing: border-box !important; -webkit-box-sizing: border-box !important; box-sizing: border-box !important; }\n';
            styles += '.cb-settings-box-button > img { position: absolute !important; left: 0 !important; top: 0 !important; }\n';
            styles += '.cb-settings-container { margin: 0; padding: 0; border: 0; width: 100%; height: 100%; overflow: hidden; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; background: #f2f2f2; text-align: left; }\n';
            styles += '.cb-settings-font-family { margin: 2px 0 0 2px; padding: 0; border: 1px solid gray; font: normal normal 13px Arial; height: 22px; width: 156px; }\n';
            styles += '.cb-settings-font-size { margin: 2px 0 0 2px; padding: 0; border: 1px solid gray; font: normal normal 13px Arial; height: 22px; width: 44px; }\n';
            styles += '.cb-settings-font-weight { margin: 4px 0 0 2px; padding: 0; border: 1px solid gray; font: normal normal 12px Arial; height: 22px; width: 106px; }\n';
            styles += '.cb-settings-text-align { margin: 4px 0 0 2px; padding: 0; border: 1px solid gray; font: normal normal 12px Arial; height: 22px; width: 61px; }\n';
            styles += '.cb-settings-line-height { margin: 4px 0 0 2px; padding: 0; border: 1px solid gray; font: normal normal 12px Arial; height: 22px; width: 44px; }\n';
            styles += '.cb-settings-color-div1, .cb-settings-color-div2, .cb-settings-transparency-div { position: relative; display: block; width: 213px; font: normal normal 14px Arial; color: #0000cd; text-align: right; margin: 0 0 0 3px; border: 1px solid #f2f2f2; padding: 3px 2px 3px 0; }\n';
            styles += '.cb-settings-color-div1 { border-top: 1px solid gray; padding-top: 4px; padding-bottom: 0; }\n';
            styles += '.cb-settings-transparency-div { padding-top: 2px; }\n';
            styles += '.cb-settings-bg-color, .cb-settings-font-color { margin: 0; padding: 2px; border: 1px solid gray; font: normal normal 14px Arial; height: 16px; width: 101px; }\n';
            styles += '.cb-settings-transparency { margin: 0; padding: 2px; border: 1px solid gray; font: normal normal 14px Arial; height: 16px; width: 38px; }\n';
            styles += '.cb-settings-color { border: 3px solid red; }\n';
            styles += '.cb-settings-transparency-slider { width: 100%; margin: auto; padding: 0; }\n';
            styleElement.appendChild(document.createTextNode(styles));
        }
        settingsBox.className = "cb-settings";
        settingsBox.onmousedown = function (e) {
            closeColorPicker(e);
        }
        var settingsBoxBtn = document.createElement('div'), omd = "onmousedown", no_md = "";
        settingsBoxBtn.className = "cb-settings-box-button";
        settingsBoxBtn.innerHTML = s_gif;
        settingsBox.appendChild(settingsBoxBtn);
        settingsBoxBtn.onmousedown = function (e) {
            e.stopPropagation();
            if (settingsBox.offsetWidth < 100) {
                settingsBox.className = "cb-settings expanded";
                getElementByClass('cb-settings-box-button').innerHTML = x_gif;
                closeColorPicker(e);
                if (cb.getBID() > -1) {
                    getElementByClass('cb-settings-font-family').value = bubbles[cb.getBID()].fontFamily;
                    getElementByClass('cb-settings-font-size').value = bubbles[cb.getBID()].fontSize;
                    getElementByClass('cb-settings-bg-color').value = bubbles[cb.getBID()].fill;
                    getElementByClass('cb-settings-font-color').value = bubbles[cb.getBID()].color;
                    getElementByClass('cb-settings-font-weight').value = bubbles[cb.getBID()].fontWeight + " " + bubbles[cb.getBID()].fontStyle;
                    getElementByClass('cb-settings-text-align').value = bubbles[cb.getBID()].textAlign;
                    getElementByClass('cb-settings-line-height').value = bubbles[cb.getBID()].lineHeight;
                    var transp = Math.round((1 - bubbles[cb.getBID()].opacity) * 100);
                    getElementByClass('cb-settings-transparency').value = transp;
                    getElementByClass('cb-settings-transparency-slider').value = transp;
                }
                document.getElementById(cbCanvasWrapper.id).style.overflow = 'visible';
            }
            else {
                settingsBox.className = "cb-settings";
                getElementByClass('cb-settings-box-button').innerHTML = s_gif;
                document.getElementById(cbCanvasWrapper.id).style.overflow = 'hidden';
            }
        }
        var settingsContainer = document.createElement('div');
        settingsContainer.className = "cb-settings-container";
        settingsBox.appendChild(settingsContainer);
        var settingsFontFamily = document.createElement('select');
        settingsFontFamily.className = "cb-settings-font-family";
        settingsFontFamily.setAttribute("title", "font family");
        var opt = '';
        for (var f = 0; f < common_fonts.length; f++) {
            var main_font = common_fonts[f].split(",")[0];
            opt += '<option value=\'' + common_fonts[f] + '\'>' + main_font.replace(/\"/g, "") + '</option>';
        }
        settingsFontFamily.innerHTML = opt;
        settingsFontFamily.onchange = function (e) {
            bubbles[cb.getBID()].fontFamily = this.value;
            bubbles[cb.getBID()].txtarea.style.fontFamily = this.value;
            cb.setFontFamily(this.value, 0);
            cb.prepareText(bubbles[cb.getBID()]);
            redraw();
            repaintBubbles();
        }
        settingsContainer.appendChild(settingsFontFamily);

        var settingsFontSize = document.createElement('select');
        settingsFontSize.className = "cb-settings-font-size";
        settingsFontSize.setAttribute("title", "font size");
        opt = '';
        for (var o = 8; o < 100; o++) {
            opt += '<option value="' + o + 'px">' + o + '</option>';
        }
        settingsFontSize.innerHTML = opt;
        settingsFontSize.onchange = function (e) {
            bubbles[cb.getBID()].fontSize = this.value;
            bubbles[cb.getBID()].txtarea.style.fontSize = this.value;
            cb.setFontSize(this.value, 0);
            cb.prepareText(bubbles[cb.getBID()]);
            redraw();
            repaintBubbles();
        }
        settingsContainer.appendChild(settingsFontSize);

        var settingsFontWeight = document.createElement('select');
        settingsFontWeight.className = "cb-settings-font-weight";
        settingsFontWeight.setAttribute("title", "font weight and style");
        var weights_styles = ['normal normal', 'bold normal', 'normal italic', 'bold italic'];
        opt = '';
        for (var ws = 0; ws < weights_styles.length; ws++) {
            opt += '<option value="' + weights_styles[ws] + '">' + weights_styles[ws] + '</option>';
        }
        settingsFontWeight.innerHTML = opt;
        settingsFontWeight.onchange = function (e) {
            var w_s = this.value.split(" ");
            bubbles[cb.getBID()].fontWeight = w_s[0];
            bubbles[cb.getBID()].txtarea.style.fontWeight = w_s[0];
            cb.setFontWeight(w_s[0], 0);
            bubbles[cb.getBID()].fontStyle = w_s[1];
            bubbles[cb.getBID()].txtarea.style.fontStyle = w_s[1];
            cb.setFontStyle(w_s[1], 0);
            cb.prepareText(bubbles[cb.getBID()]);
            redraw();
            repaintBubbles();
        }
        settingsContainer.appendChild(settingsFontWeight);

        var settingsTextAlign = document.createElement('select');
        settingsTextAlign.className = "cb-settings-text-align";
        settingsTextAlign.setAttribute("title", "text align");
        var align_styles = ['left', 'center', 'right', 'justify'];
        opt = '';
        for (var as = 0; as < align_styles.length; as++) {
            opt += '<option value="' + align_styles[as] + '">' + align_styles[as] + '</option>';
        }
        settingsTextAlign.innerHTML = opt;
        settingsTextAlign.onchange = function (e) {
            bubbles[cb.getBID()].textAlign = this.value;
            bubbles[cb.getBID()].txtarea.style.textAlign = this.value;
            cb.setTextAlign(this.value, 0);
            cb.prepareText(bubbles[cb.getBID()]);
            redraw();
            repaintBubbles();
        }
        settingsContainer.appendChild(settingsTextAlign);

        var settingsLineHeight = document.createElement('select');
        settingsLineHeight.className = "cb-settings-line-height";
        settingsLineHeight.setAttribute("title", "line height");
        opt = '';
        for (var lh = 0; lh < line_heights.length; lh++) {
            opt += '<option value="' + line_heights[lh] + '">' + line_heights[lh] + '</option>';
        }
        settingsLineHeight.innerHTML = opt;
        settingsLineHeight.onchange = function (e) {
            bubbles[cb.getBID()].lineHeight = this.value;
            bubbles[cb.getBID()].txtarea.style.lineHeight = this.value;
            cb.setLineHeight(this.value, 0);
            cb.prepareText(bubbles[cb.getBID()]);
            redraw();
            repaintBubbles();
        }
        settingsContainer.appendChild(settingsLineHeight);

        var settingsBackgroundColor = document.createElement('input');
        settingsBackgroundColor.type = "text";
        settingsBackgroundColor.className = "cb-settings-bg-color";
        settingsBackgroundColor.oninput = function (e) {
            var ColorIsOK = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(this.value);
            if (ColorIsOK) {
                bubbles[cb.getBID()].fill = this.value;
                bubbles[cb.getBID()].txtarea.style.backgroundColor = this.value;
                cb.setBackground(this.value, 0);
                markColorBox(this.value);
                redraw();
                repaintBubbles();
            }
        }
        settingsBackgroundColor.onmousedown = function (e) {
            setColorPicker(e);
            markColorBox(this.value);
        }
        var inputInfo1 = document.createTextNode("background: ");
        var settingsDiv1 = document.createElement('div');
        settingsDiv1.className = "cb-settings-color-div1";
        settingsDiv1.appendChild(inputInfo1);
        settingsDiv1.appendChild(settingsBackgroundColor);
        var settingsFontColor = document.createElement('input');
        settingsFontColor.type = "text";
        settingsFontColor.className = "cb-settings-font-color";
        settingsFontColor.oninput = function (e) {
            var ColorIsOK = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(this.value);
            if (ColorIsOK) {
                bubbles[cb.getBID()].color = this.value;
                bubbles[cb.getBID()].txtarea.style.color = this.value;
                cb.setColor(this.value, 0);
                markColorBox(this.value);
                redraw();
                repaintBubbles();
            }
        }
        settingsFontColor.onmousedown = function (e) {
            setColorPicker(e);
            markColorBox(this.value);
        }
        var inputInfo2 = document.createTextNode("font color: ");
        var settingsDiv2 = document.createElement('div');
        settingsDiv2.className = "cb-settings-color-div2";
        settingsDiv2.appendChild(inputInfo2);
        settingsDiv2.appendChild(settingsFontColor);
        settingsContainer.appendChild(settingsDiv2);
        settingsContainer.appendChild(settingsDiv1);
        var settingsTransparency = document.createElement('input');
        settingsTransparency.type = "text";
        settingsTransparency.className = "cb-settings-transparency";
        settingsTransparency.oninput = function (e) {
            if (this.value != "" && this.value >= 0 && this.value <= 100) {
                bubbles[cb.getBID()].opacity = (100 - this.value) / 100;
                cb.setOpacity(((100 - this.value) / 100), 0);
                repaintBubbles();
            }
            else {
                if (this.value != "") {
                    this.value = Math.round((1 - bubbles[cb.getBID()].opacity) * 100);
                }
                else {
                    bubbles[cb.getBID()].opacity = 1;
                    cb.setOpacity(1, 0);
                    repaintBubbles();
                }
            }
            if (this.value == "") {
                settingsTransparencySlider.value = 0;
            }
            else {
                settingsTransparencySlider.value = this.value;
            }
        }
        var settingsTransparencySlider = document.createElement('input');
        settingsTransparencySlider.type = "range";
        settingsTransparencySlider.className = "cb-settings-transparency-slider";
        settingsTransparencySlider.min = 0;
        settingsTransparencySlider.max = 100;
        settingsTransparencySlider.step = 1;
        settingsTransparencySlider.oninput = function (e) {
            var val = this.value;
            clearTimeout(transparency_timeout);
            transparency_timeout = setTimeout(function () {
                settingsTransparency.value = val;
                setTransparency(val);
            }, 50);
        }
        settingsTransparencySlider.onchange = function (e) {
            var val = this.value;
            clearTimeout(transparency_timeout);
            transparency_timeout = setTimeout(function () {
                settingsTransparency.value = val;
                setTransparency(val);
            }, 50);
        }
        var inputInfo3 = document.createTextNode("transparency: ");
        var settingsDiv3 = document.createElement('div');
        settingsDiv3.className = "cb-settings-transparency-div";
        settingsDiv3.appendChild(inputInfo3);
        settingsDiv3.appendChild(settingsTransparency);
        settingsDiv3.appendChild(settingsTransparencySlider);
        settingsDiv3.onmousedown = function (e) {
            e.stopPropagation();
        }
        settingsContainer.appendChild(settingsDiv3);
        settings_loaded();
    }

    this.bStateChanged = function () {
        clearTimeout(state_update);
        state_update = setTimeout(function () {
            var changed = false, _settings = {}, modified_bubbles = {}, b_s = [], removed = [];
            for (var i = 0; i < bubbles.length; i++) {
                var bid = bubbles[i].txtarea.id;
                var bs = bubbles[i].getBubbleSettings();
                bs.state = "unchanged";
                _settings[bid] = bs;
                if (bid in bubble_settings) {
                    if (JSON.stringify(bubble_settings[bid]) !== JSON.stringify(bs)) {
                        changed = true;
                        modified_bubbles[bid] = "changed";
                    }
                }
                else {
                    changed = true;
                    modified_bubbles[bid] = "new";
                }
            }
            var bubble_settings2 = JSON.parse(JSON.stringify(bubble_settings));
            for (var key in bubble_settings2) {
                if (bubble_settings2.hasOwnProperty(key)) {
                    if (key in _settings) {
                    }
                    else {
                        changed = true;
                        bubble_settings2[key].state = "removed";
                        removed.push(bubble_settings2[key]);
                    }
                }
            }
            if (changed) {
                var _settings2 = JSON.parse(JSON.stringify(_settings));
                for (var key in modified_bubbles) {
                    if (modified_bubbles.hasOwnProperty(key)) {
                        _settings2[key].state = modified_bubbles[key];
                    }
                }
                for (var key in _settings2) {
                    if (_settings2.hasOwnProperty(key)) {
                        b_s.push(_settings2[key]);
                    }
                }
                cb.bubbleStateChanged(b_s.concat(removed));
                bubble_settings = _settings;
            }
        }, 100);
    }

    function setTransparency(tr) {
        bubbles[cb.getBID()].opacity = (100 - tr) / 100;
        cb.setOpacity(((100 - tr) / 100), 0);
        repaintBubbles();
    }

    function redraw() {
        cb.applyStyleToChild(bubbles[cb.getBID()]);
        cbCanvasContext.globalCompositeOperation = 'source-atop';
        bubbles[cb.getBID()].draw(cb.getBID());
        bubbles[cb.getBID()].drawSelectedBubble(cb.getBID(), 0);
        cbCanvasContext.globalCompositeOperation = 'source-over';
    }

    function repaintBubbles() {
        cbCanvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
        var l = bubbles.length;
        for (var i = 0; i < l; i++) {
            bubbles[i].draw(i);
            if (cb.getBID() != i) bubbles[i].txtarea.style.pointerEvents = "none";
        }
        cb.encoded_canvas = null;
        if (cb.png_in_progress) {
            cb.encoded_canvas = cbCanvas.toDataURL();
        }
        if (cb.getBID() > -1) {
            bubbles[cb.getBID()].drawSelectedBubble(cb.getBID(), 0);
        }
        cb.updateConsole();
    }

    function drawBubble(e) {
        setCoordinates(e);
        cb.drawBubble();
    }

    function resetTails() {
        bubbles[cb.getBID()].tailX0 = bubbles[cb.getBID()].x - 60;
        bubbles[cb.getBID()].tailY0 = bubbles[cb.getBID()].y - 60;
        bubbles[cb.getBID()].tailX1 = bubbles[cb.getBID()].x + parseInt(bubbles[cb.getBID()].width / 2);
        bubbles[cb.getBID()].tailY1 = bubbles[cb.getBID()].y - 80;
        bubbles[cb.getBID()].tailX2 = bubbles[cb.getBID()].x + bubbles[cb.getBID()].width + 60;
        bubbles[cb.getBID()].tailY2 = bubbles[cb.getBID()].y - 60;
        bubbles[cb.getBID()].tailX3 = bubbles[cb.getBID()].x - 80;
        bubbles[cb.getBID()].tailY3 = bubbles[cb.getBID()].y + parseInt(bubbles[cb.getBID()].height / 2);
        bubbles[cb.getBID()].tailX4 = bubbles[cb.getBID()].x + bubbles[cb.getBID()].width + 80;
        bubbles[cb.getBID()].tailY4 = bubbles[cb.getBID()].y + parseInt(bubbles[cb.getBID()].height / 2);
        bubbles[cb.getBID()].tailX5 = bubbles[cb.getBID()].x - 60;
        bubbles[cb.getBID()].tailY5 = bubbles[cb.getBID()].y + bubbles[cb.getBID()].height + 60;
        bubbles[cb.getBID()].tailX6 = bubbles[cb.getBID()].x + parseInt(bubbles[cb.getBID()].width / 2);
        bubbles[cb.getBID()].tailY6 = bubbles[cb.getBID()].y + bubbles[cb.getBID()].height + 80;
        bubbles[cb.getBID()].tailX7 = bubbles[cb.getBID()].x + bubbles[cb.getBID()].width + 60;
        bubbles[cb.getBID()].tailY7 = bubbles[cb.getBID()].y + bubbles[cb.getBID()].height + 60;
    }

    function changeShape(i) {
        resetTails();
        if (!bubbles[cb.getBID()].ellipse) {
            bubbles[cb.getBID()].ellipse = true;
            bubbles[cb.getBID()].bubbleStyle = 0;
        }
        if (bubbles[cb.getBID()].ellipse) bubbles[cb.getBID()].tailLocation = i;
    }

    function eX(e) {
        if (cbCanvasWrapper.style.position == 'fixed') {
            return e.clientX;
        }
        else {
            return e.pageX;
        }
    }
    function eY(e) {
        if (cbCanvasWrapper.style.position == 'fixed') {
            return e.clientY;
        }
        else {
            return e.pageY;
        }
    }

    function cbCanvasDoubleClick(e) {
        console.log(cbCanvasWrapper.style.position);
        e.preventDefault();
        if (cb.action == "move") return;
        if (cb.getBID() > - 1) {
            var p = getOffset(cbCanvas);
            cb.mX = eX(e) - p.x;
            cb.mY = eY(e) - p.y;
            var x1 = bubbles[cb.getBID()].x;
            var y1 = bubbles[cb.getBID()].y;
            var sz = bubbles[cb.getBID()].width;
            var wy = bubbles[cb.getBID()].height;
            var ex = e.x || e.clientX;
            var ey = e.y || e.clientY;
            var ofx = ex - cb.mX;
            var ofy = ey - cb.mY;
            if (ex >= tails[0].x + ofx - tailMargin && ex <= tails[0].x + tailSize + ofx + tailMargin && ey >= tails[0].y + ofy - tailMargin && ey <= tails[0].y + tailSize + ofy + tailMargin) {
                changeShape(0);
            }
            else if (ex >= tails[1].x + ofx - tailMargin && ex <= tails[1].x + tailSize + ofx + tailMargin && ey >= tails[1].y + ofy - tailMargin && ey <= tails[1].y + tailSize + ofy + tailMargin) {
                changeShape(1);
            }
            else if (ex >= tails[2].x + ofx - tailMargin && ex <= tails[2].x + tailSize + ofx + tailMargin && ey >= tails[2].y + ofy - tailMargin && ey <= tails[2].y + tailSize + ofy + tailMargin) {
                changeShape(2);
            }
            else if (ex >= tails[3].x + ofx - tailMargin && ex <= tails[3].x + tailSize + ofx + tailMargin && ey >= tails[3].y + ofy - tailMargin && ey <= tails[3].y + tailSize + ofy + tailMargin) {
                changeShape(3);
            }
            else if (ex >= tails[4].x + ofx - tailMargin && ex <= tails[4].x + tailSize + ofx + tailMargin && ey >= tails[4].y + ofy - tailMargin && ey <= tails[4].y + tailSize + ofy + tailMargin) {
                changeShape(4);
            }
            else if (ex >= tails[5].x + ofx - tailMargin && ex <= tails[5].x + tailSize + ofx + tailMargin && ey >= tails[5].y + ofy - tailMargin && ey <= tails[5].y + tailSize + ofy + tailMargin) {
                changeShape(5);
            }
            else if (ex >= tails[6].x + ofx - tailMargin && ex <= tails[6].x + tailSize + ofx + tailMargin && ey >= tails[6].y + ofy - tailMargin && ey <= tails[6].y + tailSize + ofy + tailMargin) {
                changeShape(6);
            }
            else if (ex >= tails[7].x + ofx - tailMargin && ex <= tails[7].x + tailSize + ofx + tailMargin && ey >= tails[7].y + ofy - tailMargin && ey <= tails[7].y + tailSize + ofy + tailMargin) {
                changeShape(7);
            }
            else {
                if (cb.action == "crosshair") {
                    resetTails();
                    bubbles[cb.getBID()].ellipse = false;
                    bubbles[cb.getBID()].tailLocation = -1;
                    bubbles[cb.getBID()].bubbleStyle = -1;
                }
                else {
                    if (!cb.insideTail && !cb.isReadonly()) {
                        drawBubble(e);
                    }
                    else {
                        if (bubbles[cb.getBID()].bubbleStyle == 0) {
                            bubbles[cb.getBID()].bubbleStyle = 1;
                        }
                        else if (bubbles[cb.getBID()].bubbleStyle == 1) {
                            bubbles[cb.getBID()].bubbleStyle = 2;
                        }
                        else if (bubbles[cb.getBID()].bubbleStyle == 2) {
                            bubbles[cb.getBID()].bubbleStyle = 3;
                        }
                        else {
                            bubbles[cb.getBID()].bubbleStyle = 0;
                        }
                    }
                }
            }
        }
        else {
            if (!cb.insideTail && !cb.isReadonly()) {
                drawBubble(e);
                setTimeout(function () {
                    cb.refreshBubbles();
                }, 100);
            }
        }
    }

    function cbCanvasMouseDown(e) {
        e.preventDefault();
        if (cb.getBID() > - 1) {
            x0 = bubbles[cb.getBID()].x;
            y0 = bubbles[cb.getBID()].y;
            bubbleWidth0 = bubbles[cb.getBID()].width;
            bubbleHeight0 = bubbles[cb.getBID()].height;
            moving = true;
            cb.action = getAction(e);
            if (bubbles[cb.getBID()].ellipse) {
                var h = bubbles[cb.getBID()].tailLocation;
                if (h == 0) {
                    tailX = bubbles[cb.getBID()].tailX0;
                    tailY = bubbles[cb.getBID()].tailY0;
                }
                else if (h == 1) {
                    tailX = bubbles[cb.getBID()].tailX1;
                    tailY = bubbles[cb.getBID()].tailY1;
                }
                else if (h == 2) {
                    tailX = bubbles[cb.getBID()].tailX2;
                    tailY = bubbles[cb.getBID()].tailY2;
                }
                else if (h == 3) {
                    tailX = bubbles[cb.getBID()].tailX3;
                    tailY = bubbles[cb.getBID()].tailY3;
                }
                else if (h == 4) {
                    tailX = bubbles[cb.getBID()].tailX4;
                    tailY = bubbles[cb.getBID()].tailY4;
                }
                else if (h == 5) {
                    tailX = bubbles[cb.getBID()].tailX5;
                    tailY = bubbles[cb.getBID()].tailY5;
                }
                else if (h == 6) {
                    tailX = bubbles[cb.getBID()].tailX6;
                    tailY = bubbles[cb.getBID()].tailY6;
                }
                else if (h == 7) {
                    tailX = bubbles[cb.getBID()].tailX7;
                    tailY = bubbles[cb.getBID()].tailY7;
                }
            }
            var end = bubbles.length - 1;
            bubbles.move(cb.getBID(), end);
            cb.setBID(end);
            if (!bubbles[cb.getBID()].readonly) cb.refreshBubbleCanvas(true);
        }
        cb.mousePressed = true;
        setCoordinates(e);
    }

    function getAction(e) {
        var act = "auto";
        if (cb.getBID() > - 1 && !bubbles[cb.getBID()].off) {
            var p = getOffset(cbCanvas);
            cb.mX = eX(e) - p.x;
            cb.mY = eY(e) - p.y;
            var x1 = bubbles[cb.getBID()].x;
            var y1 = bubbles[cb.getBID()].y;
            var wi = bubbles[cb.getBID()].width;
            var he = bubbles[cb.getBID()].height;
            var ofx_wi = wi / 2 * (Math.sqrt(2) - 1);
            var ofy_he = he / 2 * (Math.sqrt(2) - 1);
            var ex = e.x || e.clientX;
            var ey = e.y || e.clientY;
            var ofx = ex - cb.mX;
            var ofy = ey - cb.mY;
            var h = -1;
            var tailX_0 = -1, tailY_0 = -1;
            if (ofx_wi < 8) ofx_wi = 8;
            if (ofy_he < 8) ofy_he = 8;
            if (!bubbles[cb.getBID()].ellipse) {
                ofx_wi = 8;
                ofy_he = 8;
            }
            else {
                h = bubbles[cb.getBID()].tailLocation;
                if (h == 0) {
                    tailX_0 = bubbles[cb.getBID()].tailX0;
                    tailY_0 = bubbles[cb.getBID()].tailY0;
                }
                else if (h == 1) {
                    tailX_0 = bubbles[cb.getBID()].tailX1;
                    tailY_0 = bubbles[cb.getBID()].tailY1;
                }
                else if (h == 2) {
                    tailX_0 = bubbles[cb.getBID()].tailX2;
                    tailY_0 = bubbles[cb.getBID()].tailY2;
                }
                else if (h == 3) {
                    tailX_0 = bubbles[cb.getBID()].tailX3;
                    tailY_0 = bubbles[cb.getBID()].tailY3;
                }
                else if (h == 4) {
                    tailX_0 = bubbles[cb.getBID()].tailX4;
                    tailY_0 = bubbles[cb.getBID()].tailY4;
                }
                else if (h == 5) {
                    tailX_0 = bubbles[cb.getBID()].tailX5;
                    tailY_0 = bubbles[cb.getBID()].tailY5;
                }
                else if (h == 6) {
                    tailX_0 = bubbles[cb.getBID()].tailX6;
                    tailY_0 = bubbles[cb.getBID()].tailY6;
                }
                else if (h == 7) {
                    tailX_0 = bubbles[cb.getBID()].tailX7;
                    tailY_0 = bubbles[cb.getBID()].tailY7;
                }
            }
            if (touchy) {
                ofx_wi = tailSize;
                ofy_he = tailSize;
            }
            if (ex > tailX_0 + ofx - 2 - tailSize / 2 && ex < tailX_0 + ofx + 3 + tailSize / 2 && ey > tailY_0 + ofy - 2 - tailSize / 2 && ey < tailY_0 + ofy + 3 + tailSize / 2) {
                act = 'crosshair';
            }
            else if (ex >= tails[0].x + ofx - tailMargin && ex <= tails[0].x + tailSize + ofx + tailMargin && ey >= tails[0].y + ofy - tailMargin && ey <= tails[0].y + tailSize + ofy + tailMargin) {
                act = 'nw-resize';
            }
            else if (ex >= tails[1].x + ofx - tailMargin && ex <= tails[1].x + tailSize + ofx + tailMargin && ey >= tails[1].y + ofy - tailMargin && ey <= tails[1].y + tailSize + ofy + tailMargin) {
                act = 'n-resize';
            }
            else if (ex >= tails[2].x + ofx - tailMargin && ex <= tails[2].x + tailSize + ofx + tailMargin && ey >= tails[2].y + ofy - tailMargin && ey <= tails[2].y + tailSize + ofy + tailMargin) {
                act = 'ne-resize';
            }
            else if (ex >= tails[3].x + ofx - tailMargin && ex <= tails[3].x + tailSize + ofx + tailMargin && ey >= tails[3].y + ofy - tailMargin && ey <= tails[3].y + tailSize + ofy + tailMargin) {
                act = 'w-resize';
            }
            else if (ex >= tails[4].x + ofx - tailMargin && ex <= tails[4].x + tailSize + ofx + tailMargin && ey >= tails[4].y + ofy - tailMargin && ey <= tails[4].y + tailSize + ofy + tailMargin) {
                act = 'e-resize';
            }
            else if (ex >= tails[5].x + ofx - tailMargin && ex <= tails[5].x + tailSize + ofx + tailMargin && ey >= tails[5].y + ofy - tailMargin && ey <= tails[5].y + tailSize + ofy + tailMargin) {
                act = 'sw-resize';
            }
            else if (ex >= tails[6].x + ofx - tailMargin && ex <= tails[6].x + tailSize + ofx + tailMargin && ey >= tails[6].y + ofy - tailMargin && ey <= tails[6].y + tailSize + ofy + tailMargin) {
                act = 's-resize';
            }
            else if (ex >= tails[7].x + ofx - tailMargin && ex <= tails[7].x + tailSize + ofx + tailMargin && ey >= tails[7].y + ofy - tailMargin && ey <= tails[7].y + tailSize + ofy + tailMargin) {
                act = 'se-resize';
            }
            else if ((ex < x1 + ofx && ex > x1 + ofx - ofx_wi && ey > y1 + ofy && ey < y1 + he + ofy) || (ex > x1 + wi + ofx && ex < x1 + wi + ofx + ofx_wi && ey > y1 + ofy && ey < y1 + he + ofy) || (ex > x1 + ofx && ex < x1 + wi + ofx && ey > y1 + ofy - ofy_he && ey < y1 + ofy) || (ex > x1 + ofx && ex < x1 + wi + ofx && ey > y1 + he + ofy && ey < y1 + he + ofy + ofy_he)) {
                act = 'move';
            }
            else if (ex > x1 + ofx && ex < x1 + ofx + wi && ey > y1 + ofy && ey < y1 + ofy + he) {
                act = 'auto';
            }
            else {
                act = 'auto';
            }
        }
        return act;
    }

    function cbCanvasMouseUp(e) {
        e.preventDefault();
        cb.enableEditing();
        cb.mousePressed = false;
        cb.mX = -100;
        cb.mY = -100;
        if (cb.action == "auto" && !cb.insideTail) {
            cb.setBID(-1);
            cb.selectedBubbleID = 0;
        }
        if (cb.isTextDrawn()) {
            cb.refreshBubbles();
            cb.refreshBubbleCanvas(true);
        }
        else {
            for (var i = 0; i < bubbles.length; i++) {
                if (document.getElementById(bubbles[i].txtarea.id)) {
                    document.getElementById(bubbles[i].txtarea.id).blur();
                    window.getSelection().removeAllRanges();
                }
            }
            cb.refreshBubbleCanvas(true);
        }
        if (cb.isTextDrawn() && cb.action == "auto" && cb.getBID() > -1 && cb.getTextDrawingCount() < bubbles.length - 1) {
            setTimeout(function () {
                cb.mousePressed = true;
                cb.refreshBubbles();
                cb.mousePressed = false;
            }, 150);
        }
        if (!touchy) document.onkeydown = pressed;
    }

    function cbCanvasMouseMove(e) {
        e.preventDefault();
        var p = getOffset(cbCanvas);
        cb.currentX = eX(e) - p.x;
        cb.currentY = eY(e) - p.y;
        if (cb.getBID() > -1) {
            if (bubbles[cb.getBID()].readonly) return false;
            cb.mX = cb.currentX;
            cb.mY = cb.currentY;
            if (!cb.mousePressed) {
                cbCanvas.style.cursor = getAction(e);
            }
            else {
                switch (cb.action) {
                    case 'nw-resize':
                        moving = false;
                        if (bubbleHeight0 + cb.mouseY - cb.mY > MINSIZE) {
                            bubbles[cb.getBID()].height = bubbleHeight0 + cb.mouseY - cb.mY;
                            bubbles[cb.getBID()].y = y0 + cb.mY - cb.mouseY;
                            bubbles[cb.getBID()].autoHeight = false;
                        }
                        if (bubbleWidth0 + cb.mouseX - cb.mX > MINSIZE) {
                            bubbles[cb.getBID()].width = bubbleWidth0 + cb.mouseX - cb.mX;
                            bubbles[cb.getBID()].x = x0 + cb.mX - cb.mouseX;
                            bubbles[cb.getBID()].autoWidth = false;
                        }
                        break;
                    case 'n-resize':
                        moving = false;
                        if (bubbleHeight0 + cb.mouseY - cb.mY > MINSIZE) {
                            bubbles[cb.getBID()].height = bubbleHeight0 + cb.mouseY - cb.mY;
                            bubbles[cb.getBID()].y = y0 + cb.mY - cb.mouseY;
                            bubbles[cb.getBID()].autoHeight = false;
                        }
                        break;
                    case 'ne-resize':
                        moving = false;
                        if (bubbleHeight0 + cb.mouseY - cb.mY > MINSIZE) {
                            bubbles[cb.getBID()].height = bubbleHeight0 + cb.mouseY - cb.mY;
                            bubbles[cb.getBID()].y = y0 + cb.mY - cb.mouseY;
                            bubbles[cb.getBID()].autoHeight = false;
                        }
                        if (bubbleWidth0 + cb.mX - cb.mouseX > MINSIZE) {
                            bubbles[cb.getBID()].width = bubbleWidth0 + cb.mX - cb.mouseX;
                            bubbles[cb.getBID()].autoWidth = false;
                        }
                        break;
                    case 'w-resize':
                        moving = false;
                        if (bubbleWidth0 + cb.mouseX - cb.mX > MINSIZE) {
                            bubbles[cb.getBID()].width = bubbleWidth0 + cb.mouseX - cb.mX;
                            bubbles[cb.getBID()].x = x0 + cb.mX - cb.mouseX;
                            bubbles[cb.getBID()].autoWidth = false;
                        }
                        break;
                    case 'e-resize':
                        moving = false;
                        if (bubbleWidth0 + cb.mX - cb.mouseX > MINSIZE) {
                            bubbles[cb.getBID()].width = bubbleWidth0 + cb.mX - cb.mouseX;
                            bubbles[cb.getBID()].autoWidth = false;
                        }
                        break;
                    case 'sw-resize':
                        moving = false;
                        if (bubbleHeight0 + cb.mY - cb.mouseY > MINSIZE) {
                            bubbles[cb.getBID()].height = bubbleHeight0 + cb.mY - cb.mouseY;
                            bubbles[cb.getBID()].autoHeight = false;
                        }
                        if (bubbleWidth0 + cb.mouseX - cb.mX > MINSIZE) {
                            bubbles[cb.getBID()].width = bubbleWidth0 + cb.mouseX - cb.mX;
                            bubbles[cb.getBID()].x = x0 + cb.mX - cb.mouseX;
                            bubbles[cb.getBID()].autoWidth = false;
                        }
                        break;
                    case 's-resize':
                        moving = false;
                        if (bubbleHeight0 + cb.mY - cb.mouseY > MINSIZE) {
                            bubbles[cb.getBID()].height = bubbleHeight0 + cb.mY - cb.mouseY;
                            bubbles[cb.getBID()].autoHeight = false;
                        }
                        break;
                    case 'se-resize':
                        moving = false;
                        if (bubbleHeight0 + cb.mY - cb.mouseY > MINSIZE) {
                            bubbles[cb.getBID()].height = bubbleHeight0 + cb.mY - cb.mouseY;
                            bubbles[cb.getBID()].autoHeight = false;
                        }
                        if (bubbleWidth0 + cb.mX - cb.mouseX > MINSIZE) {
                            bubbles[cb.getBID()].width = bubbleWidth0 + cb.mX - cb.mouseX;
                            bubbles[cb.getBID()].autoWidth = false;
                        }
                        break;
                    case 'move':
                        if (moving) {
                            var cx = bubbles[cb.getBID()].x, cy = bubbles[cb.getBID()].y;
                            var cxW = cx + bubbles[cb.getBID()].width;
                            var cyH = cy + bubbles[cb.getBID()].height;
                            var newX = x0 + cb.mX - cb.mouseX;
                            var newY = y0 + cb.mY - cb.mouseY;
                            if ((cx > newX && cx < 1) || (cx < newX && cxW > canvasWidth - 1)) {
                                if (cx > newX) {
                                    bubbles[cb.getBID()].x = 0;
                                }
                                if (cx < newX) {
                                    bubbles[cb.getBID()].x = canvasWidth - bubbles[cb.getBID()].width;
                                }
                            }
                            else {
                                bubbles[cb.getBID()].x = newX;
                            }
                            if ((cy > newY && cy < 1) || (cy < newY && cyH > canvasHeight - 1)) {
                                if (cy > newY) {
                                    bubbles[cb.getBID()].y = 0;
                                }
                                if (cy < newY) {
                                    bubbles[cb.getBID()].y = canvasHeight - bubbles[cb.getBID()].height;
                                }
                            }
                            else {
                                bubbles[cb.getBID()].y = newY;
                            }
                        }
                        break;
                    case 'crosshair':
                        break;
                }
                if (bubbles[cb.getBID()].ellipse && cb.action != "auto") {
                    if (cb.action == "move" || cb.action == "crosshair") {
                        var h = -1;
                        h = bubbles[cb.getBID()].tailLocation;
                        if (h == 0) {
                            bubbles[cb.getBID()].tailX0 = tailX + cb.mX - cb.mouseX;
                            bubbles[cb.getBID()].tailY0 = tailY + cb.mY - cb.mouseY;
                        }
                        else if (h == 1) {
                            bubbles[cb.getBID()].tailX1 = tailX + cb.mX - cb.mouseX;
                            bubbles[cb.getBID()].tailY1 = tailY + cb.mY - cb.mouseY;
                        }
                        else if (h == 2) {
                            bubbles[cb.getBID()].tailX2 = tailX + cb.mX - cb.mouseX;
                            bubbles[cb.getBID()].tailY2 = tailY + cb.mY - cb.mouseY;
                        }
                        else if (h == 3) {
                            bubbles[cb.getBID()].tailX3 = tailX + cb.mX - cb.mouseX;
                            bubbles[cb.getBID()].tailY3 = tailY + cb.mY - cb.mouseY;
                        }
                        else if (h == 4) {
                            bubbles[cb.getBID()].tailX4 = tailX + cb.mX - cb.mouseX;
                            bubbles[cb.getBID()].tailY4 = tailY + cb.mY - cb.mouseY;
                        }
                        else if (h == 5) {
                            bubbles[cb.getBID()].tailX5 = tailX + cb.mX - cb.mouseX;
                            bubbles[cb.getBID()].tailY5 = tailY + cb.mY - cb.mouseY;
                        }
                        else if (h == 6) {
                            bubbles[cb.getBID()].tailX6 = tailX + cb.mX - cb.mouseX;
                            bubbles[cb.getBID()].tailY6 = tailY + cb.mY - cb.mouseY;
                        }
                        else if (h == 7) {
                            bubbles[cb.getBID()].tailX7 = tailX + cb.mX - cb.mouseX;
                            bubbles[cb.getBID()].tailY7 = tailY + cb.mY - cb.mouseY;
                        }
                    }
                    else {

                    }
                }
            }
        }
        else {
            cbCanvas.style.cursor = 'auto';
            cb.action = "auto";
        }
    }

    function cbCanvasTouchStart(e) {

    }

    function cbCanvasTouchEnd(e) {

    }

    function cbCanvasTouchMove(e) {

    }

    function getOffset(obj) {
        let curX, curY;
        curX = curY = 0;
        if (obj.offsetParent) {
            do {
                curX += obj.offsetLeft;
                curY += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return { x: curX, y: curY };
        }
    }

    function setCoordinates(e) {
        var p = getOffset(cbCanvas);
        cb.mouseX = eX(e) - p.x;
        cb.mouseY = eY(e) - p.y;
    }

    function pressed(e) {
        var e = window.event || e;
        var inactive = document.activeElement ? (document.activeElement.tagName.toLowerCase() != "p" ? true : false) : true;
        if (e.keyCode == 46 && cb.getBID() > -1 && inactive && settingsBox.offsetWidth < 100) {
            e.preventDefault();
            if (document.getElementById(bubbles[cb.getBID()].txtarea.id)) cbCanvasWrapper.removeChild(bubbles[cb.getBID()].txtarea);
            bubbles.splice(cb.getBID(), 1);
            cb.insideTail = false;
            cb.setBID(-1);
            cb.selectedBubbleID = 0;
            cbCanvas.style.cursor = 'auto';
            cb.refreshBubbles();
        }
    }

    Array.prototype.move = function (old_index, new_index) {
        if (new_index >= this.length) {
            var k = new_index - this.length;
            while ((k--) + 1) {
                this.push(undefined);
            }
        }
        this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    }

    this.setEventListeners = function (add_event) {
        if (cbCanvas) {
            if (add_event) {
                if (touchy) {
                    cbCanvas.addEventListener('touchstart', cbCanvasTouchStart, false);
                    cbCanvas.addEventListener('touchend', cbCanvasTouchEnd, false);
                    cbCanvas.addEventListener('touchmove', cbCanvasTouchMove, false);
                }
                else {
                    cbCanvas.addEventListener('dblclick', cbCanvasDoubleClick, false);
                    cbCanvas.addEventListener('mousedown', cbCanvasMouseDown, false);
                    cbCanvas.addEventListener('mouseup', cbCanvasMouseUp, false);
                    cbCanvas.addEventListener('mousemove', cbCanvasMouseMove, false);
                }
                cb.events_added = true;
            }
            else {
                if (touchy) {
                    cbCanvas.removeEventListener('touchstart', cbCanvasTouchStart, false);
                    cbCanvas.removeEventListener('touchend', cbCanvasTouchEnd, false);
                    cbCanvas.removeEventListener('touchmove', cbCanvasTouchMove, false);
                }
                else {
                    cbCanvas.removeEventListener('dblclick', cbCanvasDoubleClick, false);
                    cbCanvas.removeEventListener('mousedown', cbCanvasMouseDown, false);
                    cbCanvas.removeEventListener('mouseup', cbCanvasMouseUp, false);
                    cbCanvas.removeEventListener('mousemove', cbCanvasMouseMove, false);
                }
                cb.events_added = false;
            }
        }
    }

    this.addSettingsBox = function (sb_x, sb_y) {
        sb_y = sb_y + 6;
        settingsBox.style.left = sb_x + 'px';
        settingsBox.style.top = sb_y + 'px';
        resetZIndex();
        cbCanvasWrapper.style.zIndex = 1;
        cbCanvasWrapper.appendChild(settingsBox);
        getElementByClass('cb-settings-box-button').innerHTML = s_gif;
    }

    this.getBubbles = function (el) {
        var b_data = "", src = "";
        cb.png_in_progress = true;
        for (var i = 0; i < bubbles.length; i++) {
            bubbles[i].lettersCoordinates = [];
        }
        repaintBubbles();
        if (el.hasAttribute("src")) src = el.src;
        b_data = { 'img_src': src, 'png': cb.encoded_canvas };
        cb.png_in_progress = false;
        repaintBubbles();
        return b_data;
    }

    function resetZIndex() {
        var zind = 1;
        var wrappers = document.getElementsByClassName('comic-bubbles-wrapper');
        for (var i = 0; i < wrappers.length; i++) {
            wrappers[i].style.zIndex = 'auto';
        }
    }

    function getElementByClass(cl) {
        return document.getElementById(cbCanvasWrapper.id).getElementsByClassName(cl)[0];
    }

}