function SelectList(setting) {
    this.rootEle = setting.rootEle;
    this.prompt = setting.prompt;
    this.dataList = setting.dataList;
    this.height=setting.appearance.height || 20;
    this.width=setting.appearance.width || 120;
    this.fontSize=setting.appearance.fontSize || 14;
    this.fgColor=setting.appearance.borderColor || "#D0D0D0";
    this.bgColor=setting.appearance.color || "#006699";
    this.rootEle.css({
        "height": this.height + "px",
        "width": this.width + "px",
        "font-size": this.fontSize + "px",
        "overflow": "hidden",
        "border": this.fgColor + " 1px solid",
        "padding":"5px",
    });
    this.rootEle.append("<div>" + this.prompt + "</div><div></div>");
    var selectValueEle = this.rootEle.children(":eq(0)");
    var selectListWrapEle = null;
    var hideSelectList = function() {
        if (selectListWrapEle) {
            selectListWrapEle.remove();
            selectListWrapEle = null
        }
    };
    selectValueEle.css({
        "float": "left",
        "height": this.height+ "px",
        "width": (this.width - 20) + "px",
        "white-space": "nowrap",
        "overflow": "hidden",
        "text-overflow": "ellipsis"
    });
    var selectTabEle = this.rootEle.children(":eq(1)");
    selectTabEle.css({
        "float": "right",
        "width": "0",
        "height":"0",
        "border-left": "6px solid transparent",
        "border-right": "6px solid transparent",
        "border-top": "6px solid #D0D0D0",
        "margin-top":"7px",
        "margin-right":"2px"
    });
    this.getVal=function(){
        return selectValueEle.text();
    }
    this.showSelectList = function() {
        var rootEle = setting.rootEle;
        var dataList = setting.dataList;
        if (selectListWrapEle != null) {
            hideSelectList()
        } else {
            rootEle.after("<div></div>");
            selectListWrapEle = rootEle.next();
            var selectWidth = rootEle.outerWidth() - 2;
            var selectHeight = rootEle.outerHeight();
            var selectTop = rootEle.offset().top;
            var selectLeft = rootEle.offset().left;
            selectListWrapEle.css({
                "position": "absolute",
                "top": selectTop + selectHeight,
                "left": selectLeft,
                "z-index": "100",
                "width": selectWidth,
                "border": (setting.appearance.borderColor || "#D0D0D0") + " 1px solid",
                "border-top": "none",
                "min-height": "20px"
            });
            for (i = 0; i < dataList.length; i++) {
                selectListWrapEle.append("<div>" + dataList[i] + "</div>");
                var selectItemEle = selectListWrapEle.children(":eq(" + i + ")");
                selectItemEle.css({
                    "padding": "5px",
                    "height": (setting.appearance.height || 20) + "px",
                    "width": (setting.appearance.width || 120)+ "px",
                    "font-size": (setting.appearance.fontSize || 14) + "px",
                    "overflow": "hidden",
                    "white-space": "nowrap",
                    "text-overflow": "ellipsis"
                });
                selectItemEle.click(function() {
                    selectValueEle.text($(this).text());
                    hideSelectList()
                });
                selectItemEle.hover(function() {
                    selectListWrapEle.children().css({
                        "background": "#FFF",
                        "color": "#000"
                    });
                    $(this).css({
                        "background": (setting.appearance.color || "#006699"),
                        "color": "#FFF",
                        "cursor": "pointer"
                    })
                })
            }
        }
    };
    this.rootEle.click(this.showSelectList);
    var rootEle = this.rootEle;
    $(document).click(function(e) {
        if (rootEle.has(e.target).length === 0) {
            hideSelectList()
        }
    })
}