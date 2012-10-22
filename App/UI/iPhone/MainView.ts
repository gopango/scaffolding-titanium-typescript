
module scaffold.ui.iphone {
    export class MainView implements IMainView {
        private window : TitaniumUIWindowStatic;
        private view : TitaniumUIViewStatic;

        constructor () {
            this.view = Ti.UI.createView();

            var label = Ti.UI.createLabel();
            label.color = 'white';
            label.text = String.format(L('welcome'), '@@name-@@version (iphone)');
            label.height = label.width = <any>'auto';
            this.view.add(label);
        }

        attach (window : TitaniumUIWindowStatic) {
            this.window = window;
            this.window.add(this.view);
        }
    }
}
