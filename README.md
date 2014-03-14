gather-it
=========

Dojo widget for creating Magic: the Gathering card hover popups

This project spawned out of wanting a widget to function in a similar fashion to the wp-mtg-helper plugin for WordPress. Upon initialization, this widget will parse all of the text content contained within the DOM node specified, searching for card tags and turning them into span elements which popup the card image on hover over the card name.

It uses the same format as wp-mtg-helper: [card]Card Name[/card]

This becomes: &lt;span class="gather-it"&gt;Card Name&lt;/span&gt;
