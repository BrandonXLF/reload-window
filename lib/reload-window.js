'use babel';

export default {
	consumeStatusBar(statusBar) {
		if (atom.config.get('reload-window.statusBar')) {
			var icon = document.createElement('a');
			icon.className = 'icon icon-sync';
			icon.addEventListener('click', function(){
				atom.commands.dispatch(
					atom.views.getView(atom.workspace),
					'window:reload'
				);
			});
			atom.tooltips.add(icon, {
		    	title () {
		    		return `Reload window`;
	    		}
		    });
			this.element = document.createElement('div');
			this.element.className = 'reload-window inline-block';
			this.element.appendChild(icon);
			this.statusBarTile = statusBar.addRightTile({
				item: this.element,
				priority: -250
			});
		}
	},
	deactivate() {
		if (this.statusBarTile ) {
			this.statusBarTile.destroy();
			this.statusBarTile = null;
		}
		if (this.element) {
			this.element.remove();
			this.element = null;
		}
	}
};
