$(function() {

            var TabsViewModel = can.Map.extend({
    panels: [],
    active: null,
    addPanel: function( panel ){
        var panels = this.attr("panels");
        panels.push(panel);
        panel.attr("visible", false);
        //activate panel if it is the first one
        if ( panels.attr("length") === 1 ){
            this.activate( panel );
        }
    },
    removePanel: function( panel ){
        var panels = this.attr("panels");
        var index = panels.indexOf(panel);
        panels.splice(index, 1);
        //activate a new panel if panel being removed was the active panel
        if( this.attr("active") === panel ){
            panels.attr("length") ? this.activate(panels[0]) : this.attr("active", null)
        }
    },
    activate: function( panel ){
        var active = this.attr("active")
        if( active !== panel ){
            active && active.attr("visible", false);
            this.attr("active", panel.attr("visible", true));
        }
    }
});

can.Component.extend({
    tag: "tabs",
    scope: TabsViewModel,
    template: "<ul>\
    {{#each panels}}\
    <li can-click='activate'>{{title}}</li>\
    {{/each}}\
    </ul>\
    <content />"
});

can.Component.extend({
	tag: "panel",
	template: "{{#if visible}}<content />{{/if}}",
	scope: {
		title: "@"
	},
	events: {
		inserted: function() {
			this.element.parent().scope().addPanel( this.scope )
		},
		removed: function() {
			this.element.parent().scope().removePanel( this.scope )
		}
	}
});
	var menu_data = can.Model({
	    						findAll: 'GET data/drupal_menu.json',
							  }, {});
	var menuitem;
menu_data.findAll({},
					function(data){
						console.log(data);
					 	menuitem=data;
					});
var part = can.view("templates/main_app.mustache",{menuitem:menuitem});
$("#menu").html(part);
});
