define([
  "dojo/_base/declare",
  "dojo/_base/array",
  "dojo/on",
  "dojo/dom-construct",
  "dojo/dom-style",
  "dojo/mouse",
  "dijit/Tooltip"
], function(declare, array, on, domConstruct, domStyle, mouse, Tooltip) {
  return declare("cards.mtg.GatherIt", [], {
    // Parse text node children of the specified node to find (excluding nodes listed in the exclude array):
    //    [card]Gitaxian Probe[/card]
    // Then turns that into:
    //    <span class="gather-it mtg">Gitaxian Probe</span>

    // Future enhancement would be to allow set abbr to be defined in the card tag:
    //    [card set-abbr="nph"]Gitaxian Probe[/card]
    //    OR
    //    [card set="New Phyrexia"]Gitaxian Probe[/card]
    // Which is transformed into:
    //    <span class="gather-it mtg" data-set-abbr="nph">Gitaxian Probe</span>
    //    OR
    //    <span class="gather-it mtg" data-set="New Phyrexia">Gitaxian Probe</span>

    gathererUrl: "http://gatherer.wizards.com/Handlers/Image.ashx?type=card&name=",
    baseClass: "gather-it",
    magicClass: "mtg",
    regexp: new RegExp(/\[card\](.*?)\[\/card\]/g),
    exclude: ["script", "style", "iframe", "canvas", "object", "embed"],

    constructor: function(params) {
      this.showNodeAfterParse = (params.showNodeAfterParse ? params.showNodeAfterParse : false);
      this.exclude = (params.exclude ? this.exclude.concat(params.exclude) : this.exclude);
    },

    parse: function(node) {
      var self = this;
      self.node = node;
      self._parse(self.node);
    },

    _parse: function(node) {
      var self = this,
          child = node.firstChild;
      if(child) {
        do {
          switch(child.nodeType) {
            case 1: // HTML Element
              // skip excluded HTML Element tags and their children
              if(array.indexOf(self.exclude, child.tagName.toLowerCase()) > -1) {
                continue;
              }
              // otherwise continue parsing down the DOM tree
              self._parse(child);
              break;
            case 3: // HTML Text
              var offsetDelta = 0,
                  startChildDataLength = child.data.length;
              child.data.replace(self.regexp, function(match) {
                var args = [].slice.call(arguments),
                    offset = args[args.length - 2],
                    nameMatch = args && args.length > 1 && args[1] && args[1].length > 0 ? args[1] : ""; // pull out the name without the tags
                offsetDelta = child.data.length - startChildDataLength; // calculate the offset delta
                var newNode = child.splitText(offset + offsetDelta);    // create new text node using offset plus delta
                newNode.data = newNode.data.substr(match.length);       // keep only Name from [card]Name[/card]

                // create and add the span and insert it before the new node,
                // but only update the DOM if there is actually content
                if(nameMatch && nameMatch.length > 0) {
                  var span = domConstruct.create("span", {className: self.baseClass + " " + self.magicClass});
                  span.textContent = nameMatch;
                  domConstruct.place(span, child.nextSibling, "before");

                  // setup the display on hover
                  on(span, mouse.enter, function() {
                    Tooltip.show("<img src=\"" + self.gathererUrl + span.textContent + "\">", span);
                  });
                  on(span, mouse.leave, function() { Tooltip.hide(span); });
                }

                // move onto using the new node as the next child
                child = newNode;
              });
              break;
            default:
              break;
          }
        } while(child = child.nextSibling);
      }
      self._showBaseNode();
      return node;
    },

    _showBaseNode: function() {
      if(this.showNodeAfterParse) {
        var displayed = domStyle.get(this.node, "display"),
            visible = domStyle.get(this.node, "visibility");
        if(displayed && displayed === "none") {
          domStyle.set(this.node, "display", "");
        }
        if(visible && visible === "hidden") {
          domStyle.set(this.node, "visibility", "visible");
        }
      }
    }
  });
});