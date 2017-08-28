define(["utils/utils","mvc/upload/upload-model","mvc/upload/composite/composite-row","mvc/ui/ui-popover","mvc/ui/ui-select","mvc/ui/ui-misc"],function(a,b,c,d,e,f){return Backbone.View.extend({collection:new b.Collection,initialize:function(a){var b=this;this.app=a,this.options=a.options,this.list_extensions=a.list_extensions,this.list_genomes=a.list_genomes,this.ftp_upload_site=a.currentFtp(),this.setElement(this._template()),this.btnStart=new f.Button({title:"Start",onclick:function(){b._eventStart()}}),this.btnClose=new f.Button({title:"Close",onclick:function(){b.app.modal.hide()}}),_.each([this.btnStart,this.btnClose],function(a){b.$(".upload-buttons").prepend(a.$el)}),this.select_extension=new e.View({css:"upload-footer-selection",container:this.$(".upload-footer-extension"),data:_.filter(this.list_extensions,function(a){return a.composite_files}),onchange:function(a){b.collection.reset();var c=_.findWhere(b.list_extensions,{id:a});c&&c.composite_files&&_.each(c.composite_files,function(a){b.collection.add({id:b.collection.size(),file_desc:a.description||a.name})})}}),this.$(".upload-footer-extension-info").on("click",function(a){b._showExtensionInfo({$el:$(a.target),title:b.select_extension.text(),extension:b.select_extension.value(),placement:"top"})}).on("mousedown",function(a){a.preventDefault()}),this.select_genome=new e.View({css:"upload-footer-selection",container:this.$(".upload-footer-genome"),data:this.list_genomes,value:this.options.default_genome}),this.listenTo(this.collection,"add",function(a){b._eventAnnounce(a)}),this.listenTo(this.collection,"change add",function(){b.render()}),this.select_extension.options.onchange(this.select_extension.value()),this.render()},render:function(){var a=this.collection.first();a&&"running"==a.get("status")?(this.select_genome.disable(),this.select_extension.disable()):(this.select_genome.enable(),this.select_extension.enable()),this.collection.where({status:"ready"}).length==this.collection.length&&this.collection.length>0?(this.btnStart.enable(),this.btnStart.$el.addClass("btn-primary")):(this.btnStart.disable(),this.btnStart.$el.removeClass("btn-primary")),this.$(".upload-table")[this.collection.length>0?"show":"hide"]()},_eventAnnounce:function(a){var b=new c(this,{model:a});this.$(".upload-table > tbody:first").append(b.$el),this.$(".upload-table")[this.collection.length>0?"show":"hide"](),b.render()},_eventStart:function(){var a=this;this.collection.each(function(b){b.set({genome:a.select_genome.value(),extension:a.select_extension.value()})}),$.uploadpost({url:this.app.options.nginx_upload_path,data:this.app.toData(this.collection.filter()),success:function(b){a._eventSuccess(b)},error:function(b){a._eventError(b)},progress:function(b){a._eventProgress(b)}})},_eventProgress:function(a){this.collection.each(function(b){b.set("percentage",a)})},_eventSuccess:function(){this.collection.each(function(a){a.set("status","success")}),Galaxy.currHistoryPanel.refreshContents()},_eventError:function(a){this.collection.each(function(b){b.set({status:"error",info:a})})},_showExtensionInfo:function(a){var b=a.$el,c=a.extension,e=a.title,f=_.findWhere(this.list_extensions,{id:c});this.extension_popup&&this.extension_popup.remove(),this.extension_popup=new d.View({placement:a.placement||"bottom",container:b,destroy:!0}),this.extension_popup.title(e),this.extension_popup.empty(),this.extension_popup.append(this._templateDescription(f)),this.extension_popup.show()},_templateDescription:function(a){if(a.description){var b=a.description;return a.description_url&&(b+='&nbsp;(<a href="'+a.description_url+'" target="_blank">read more</a>)'),b}return"There is no description available for this file extension."},_template:function(){return'<div class="upload-view-composite"><div class="upload-top"><h6 class="upload-top-info"/></div><div class="upload-box"><table class="upload-table ui-table-striped" style="display: none;"><thead><tr><th/><th/><th>Description</th><th>Name</th><th>Size</th><th>Settings</th><th>Status</th></tr></thead><tbody/></table></div><div class="upload-footer"><span class="upload-footer-title">Composite Type:</span><span class="upload-footer-extension"/><span class="upload-footer-extension-info upload-icon-button fa fa-search"/> <span class="upload-footer-title">Genome/Build:</span><span class="upload-footer-genome"/></div><div class="upload-buttons"/></div>'}})});
//# sourceMappingURL=../../../../maps/mvc/upload/composite/composite-view.js.map